import { Grid, Card } from '@nextui-org/react'
import  { FC } from 'react'
import { FavoritosCard } from './FavoritosCard'
import { PokemonLSStructure } from '../../../interfaces';

interface Props {
    pokemons: PokemonLSStructure[]
}

export const FavoritosList :FC<Props> = ( { pokemons } ) => {
    return (
        <Grid.Container gap={2} direction='row' justify='flex-start'>
            {
                pokemons.map((pokemon) => (
                    <FavoritosCard key={ pokemon.id } id={ pokemon.id } name={pokemon.name} />
                ))
            }
        </Grid.Container>
    )
}
