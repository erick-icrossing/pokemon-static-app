import { useEffect, useState } from 'react';
import { Layout } from "../../components/layouts"
import { NoFavoritos, FavoritosList } from "../../components/ui";
import { localFavorites } from '../../utils';
import { PokemonLSStructure } from '../../interfaces';


const Favoritos = () => {

    const [pokemons, setPokemons] = useState<PokemonLSStructure[]>([])

    useEffect(() => {
        setPokemons(localFavorites.pokemons() )
    }, [])

    return (
        <Layout title="Favoritos">
            {
                pokemons.length > 0 ? (<FavoritosList pokemons={ pokemons }/>) :  (<NoFavoritos />)
            }
        </Layout>
    )
}

export default Favoritos
