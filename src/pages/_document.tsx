import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
                <title>Authentification - Cornel Cristian Filip</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
