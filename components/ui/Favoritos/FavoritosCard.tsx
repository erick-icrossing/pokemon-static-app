import { Grid, Card } from "@nextui-org/react"
import { FC } from "react"
import { useRouter } from 'next/router';

interface Props {
    name: string,
    id: number
}

export const FavoritosCard: FC<Props> = ({ name, id }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`name/${name}`);
    }
  return (
    <Grid key={id} xs={6} sm={3} md={2} xl={1} onClick={handleClick}>
        <Card isHoverable isPressable css={ {padding: 10}} >
            <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} width={'100%'} height={140}/>
        </Card>
    </Grid>
  )
}
