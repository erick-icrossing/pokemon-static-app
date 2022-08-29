import { useState } from 'react'
import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'

import Confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts'
import { PokemonInfo } from '../../interfaces'
import { getPokemonData, localFavorites } from '../../utils'

interface Props {
  pokemon: PokemonInfo 
}

const PokemonPage: NextPage<Props> = (props) => {
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

  const pokemon200 = [...Array(200)].map( (value, index) => `${index + 1}`);

  return {
    paths: pokemon200.map( id => ({
      params: { id }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const { id } = params as { id: string };
  
  
  return {
    props: {
      pokemon: await  getPokemonData(id)
    }
  }
}



export default PokemonPage