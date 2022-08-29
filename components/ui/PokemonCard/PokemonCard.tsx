import { FC } from "react"
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { PokemonMininalObject } from "../../../interfaces"
import { useRouter } from "next/router";

interface Props {
    pokemon: PokemonMininalObject
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
    const { id, name, image } = pokemon;

    const router = useRouter();

    const pokemonClick = () => {
        router.push(`/name/${ name }`)
    }
  return (
    <Grid key={pokemon.id} xs={6} sm={3} md={2} xl={1}>
        <Card isHoverable isPressable variant="bordered" onClick={ pokemonClick }>
            <Card.Body css={{p: 1}}>
            <Card.Image  src={image} width="100%" height={140}/>
            </Card.Body>
            <Card.Footer>
            <Row justify='space-between'>
                <Text transform='capitalize'>{ name }</Text>
                <Text>#{ id }</Text>
            </Row>
            </Card.Footer>
        </Card>
    </Grid >
  )
}

export default PokemonCard
