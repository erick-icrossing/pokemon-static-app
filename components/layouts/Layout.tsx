import { FC } from "react"
import Head from "next/head"
import { Navbar } from '../ui';

type Props = {
    children: JSX.Element | JSX.Element[],
    title?: string,
    image?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title, image }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Erick Espinoza" />
                <meta name="description" content={`Pokemon App ${title}`} /> 
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
                <meta property="og:title" content={`Informacion sobre ${title}`} />
                <meta property="og:description" content={`Contiene informacion e imagenes sobre ${title}`} />
                <meta property="og:image" content={`${origin}/banner.png`} /> 

            </Head>

            <Navbar image={ image }/>

            <main style={{
                padding: '0 20px'
            }}>
                { children }    
            </main> 
        </>
    )
}
