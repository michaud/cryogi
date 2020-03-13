import Head from 'next/head'
import Link from 'next/link';
import Login from '@components/login';
import { useAuth } from '@contexts/AuthProvider';

const Home = () => {

    const { webId } = useAuth();

    return (
        <>
            <Head>
                <title>@Cryogi</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <header>
                    <Login />
                    <Link href="/portfolio/editor">
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
