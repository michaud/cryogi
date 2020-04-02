import Head from 'next/head'
import Link from 'next/link';
import Authentication from '@components/Authentication';
import { useAuth } from '@contexts/AuthProvider';

const Home = () => {

    return (
        <>
            <Head>
                <title>@Cryogi</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <header>
                    <Authentication />
                    <Link href="/portfolio/editPortfolio">
                        <a>portfolio editor</a>
                    </Link>
                </header>
                <main>
                    Cryogi
            </main>
                <footer>
                </footer>
            </div>
        </>
    )
}

export default Home
