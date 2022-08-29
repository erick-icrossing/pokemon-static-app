

import { Grid } from '@nextui-org/react';
import type { NextPage, GetStaticProps } from 'next'
import { pokeApi } from '../api';
import { Layout } from '../components/layouts'
import PokemonCard from '../components/ui/PokemonCard/PokemonCard';
import { PokemonListResponse, PokemonMininalObject } from '../interfaces';


interface Props {
  pokemons: PokemonMininalObject[]
}

const HomePage: NextPage<Props> = (props) => {
  console.log({ props });

  const { pokemons } = props;

  return (
    <Layout title="Lista de Pokemones de Kanto">
      <Grid.Container gap={ 2 } justify='flex-start'>
        {pokemons.map(pokemon => (
          <PokemonCard  key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
    
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=1054');
  const { results } = data;

  const pokemons: PokemonMininalObject[] = results.map((result, id) => {
    const pokemon: PokemonMininalObject = {
      name: result.name,
      url:  result.url,
      id: `${id + 1}`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id + 1}.svg`
    }

    return pokemon;
  })

  
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
