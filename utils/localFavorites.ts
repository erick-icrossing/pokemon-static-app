import { PokemonLSStructure } from "../interfaces";

const getLocalStore = ( name: string ): PokemonLSStructure[] => {
    if ( typeof window === 'undefined' ) return []

    return JSON.parse( localStorage.getItem(name) || '[]');
}

const toggleFavorites = (name: string, id: number) => {

    let favorites: PokemonLSStructure[] = getLocalStore('favorites');

    const aux: PokemonLSStructure = {
        name,
        id
    }

    if( favorites.includes(aux) ) {
        favorites = favorites.filter( favorite => favorite.name !== name)
    }else {
        favorites.push(aux);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const isFavorite = ( name: string, id: number ): boolean => {
    const favorites = getLocalStore('favorites');

    const aux: PokemonLSStructure = {
        name,
        id
    }

    return favorites.includes(aux);
}

const pokemons = ():PokemonLSStructure[] => {
    return getLocalStore('favorites');
}

export default {
    toggleFavorites,
    isFavorite,
    pokemons
}