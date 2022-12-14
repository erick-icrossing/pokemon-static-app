import { pokeApi } from "../api";
import { PokemonInfo } from "../interfaces";

export const getPokemonData = async (str: string) => {

    try {
        const { data } = await pokeApi.get<PokemonInfo>(`pokemon/${ str }`);
        const pokemon = {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            abilities: data.abilities,
            moves: data.moves,
            types: data.types
        }

        return pokemon; 
    } catch {
        return null;
    }

    
}
  