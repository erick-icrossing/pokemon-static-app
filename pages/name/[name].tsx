import { useState } from 'react'
import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'

import Confetti from 'canvas-confetti';

import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { PokemonInfo } from '../../interfaces'
import { localFavorites, getPokemonData } from '../../utils'
import { PokemonListResponse } from '../../interfaces/pokemon-list';

interface Props {
  pokemon: PokemonInfo 
}

const NamePage: NextPage<Props> = (props) => {
  const { pokemon } = props;

  // console.log(pokemon); 

  const [isFavorite, setIsFavorite] = useState(localFavorites.isFavorite(pokemon.name, pokemon.id));

  const onToggleFavorito = () => {
    localFavorites.toggleFavorites( pokemon.name, pokemon.id );
    setIsFavorite(!isFavorite);

    if(!isFavorite) {
      Confetti({
        zIndex: 1,
        particleCount: 100,
        spread: 320,
        angle: -100,
        origin: {
          x: 1,
          y: 0
        }
      })
    }
  }

  return (
      <Layout title={pokemon.name} image={pokemon.sprites.other?.dream_world.front_default}>
        <Grid.Container css={{ marginTop: '5px'}} gap={ 2}>
          <Grid xs={ 12 } sm={ 4 }>
            <Card  isHoverable css={{ padding: '30px'}}>
              <Card.Body>
                <Card.Image src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' } alt={ pokemon.name } width="100%" height={ 200 }/>
              </Card.Body>
            </Card>
          </Grid>
          <Grid xs={ 12 } sm={ 8 }>
            <Card>
              <Card.Header css={{ display: 'flex', justifyContent: 'space-between'}}>
                <Text h1 transform='capitalize'>{ pokemon.name }</Text>
                <Button color="gradient" ghost={ !isFavorite } onClick={ onToggleFavorito }>
                  { !isFavorite ? 'Guardar en favoritos' : 'Favorito'}
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={ 30 }>Sprites:</Text>
                <Container direction='row' display="flex">
                  <Image src={ pokemon.sprites.front_default} alt="Front Default" width={ 100 } height={ 100 }/>
                  <Image src={ pokemon.sprites.back_default} alt="Back Default" width={ 100 } height={ 100 }/>
                  <Image src={ pokemon.sprites.front_shiny} alt="Front Shiny Default" width={ 100 } height={ 100 }/>
                  <Image src={ pokemon.sprites.back_shiny} alt="Back Shiny Default" width={ 100 } height={ 100 }/>
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </Layout>
    )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=200');
    const { results } = data;

  const pokemon200 = results.map( (result) => result.name);

  return {
    paths: pokemon200.map( name => ({
      params: { name }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const { name } = params as { name: string };
  
  return {
    props: {
      pokemon: await getPokemonData(name)
    }
  }
}



export default NamePage
