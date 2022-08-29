import { pokeApi } from "../api";
import { PokemonInfo } from "../interfaces";

export const getPokemonData = async (str: string) => {

    const { data } = await pokeApi.get<PokemonInfo>(`pokemon/${ str }`);
    const pokemon = {
        id: data.id,
        name: data.name,
        sprites: data.sprites
    }

    return pokemon; 
}
  