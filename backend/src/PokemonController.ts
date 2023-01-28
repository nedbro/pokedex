import { NextFunction, Response } from 'express';
import { NamedAPIResourceList, Pokemon, PokemonClient } from 'pokenode-ts';
import { AppError } from './AppError';
import { TypedRequest } from './types/TypedRequest';
import { validateInput } from './validators';

const api = new PokemonClient();

const mockPokemonCache: Map<string, Pokemon | undefined> = new Map();

const fetchAllPokemonNames = async (next: NextFunction) => {

    await api
        .listPokemons(0, 10000)
        .then((data: NamedAPIResourceList) => {
            data.results.forEach(resource => mockPokemonCache.set(resource.name, undefined))
        })
        .catch(() => {
            next(new AppError(500, "An error occurred during the pokemon api request"))
        });

}


export const getPokemonByName = async (req: TypedRequest<never, { name: string }, never>, resp: Response, next: NextFunction) => {
    validateInput(req, resp);

    if (mockPokemonCache.size === 0) {
        await fetchAllPokemonNames(next);
    }

    try {

        const result: Pokemon[] = await Promise.all(Array.from(mockPokemonCache.entries())
            .filter(([name]) => name.includes(req.query.name.toLowerCase(), 0))
            .map(async ([name, pokemon]) => {
                if (pokemon) {
                    return Promise.resolve(pokemon);
                } else {
                    const pokemon: Pokemon = await api.getPokemonByName(name);
                    mockPokemonCache.set(name, pokemon);
                    return pokemon;
                }
            }));

        resp.send(result);
    } catch (Error: unknown) {
        next(new AppError(500, "An error occurred when calling the pokéapi"))
    }
}


