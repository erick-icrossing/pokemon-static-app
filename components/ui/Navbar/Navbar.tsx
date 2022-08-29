import { FC } from "react";
import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image";
import NextLink from 'next/link';

interface Props {
  image?: string
}

export const Navbar:FC<Props> = ({ image }) => {

    const { theme } = useTheme();

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0 20px',
        backgroundColor: theme?.colors.gray100.value
    }}>
        <Image src={ image || '/pokeball.png' } alt="pokemon" width={70} height={70}/>
        <NextLink href="/" passHref>
          <Link>
            <Text color='white' h2>P</Text>
            <Text color='white' h3>okemon</Text>
          </Link>
        </NextLink>
        
        <Spacer css={{ flex: 1}} />
        <NextLink href="/favoritos" passHref>
          <Link>
            <Text color='white' >Favoritos</Text>
          </Link>
        </NextLink>
        
    </div>
  )
}
