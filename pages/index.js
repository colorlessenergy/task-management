import Head from 'next/head';

import Nav from '../shared/components/Nav';

export default function Home () {
    return (
        <div>
            <Head>
                <title>task management</title>
                <meta name="description" content="task management" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Nav />
            </div>
        </div>
    );
}
