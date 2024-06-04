import { NextPageContext } from 'next';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

export default function Home() {
    const { data: session } = useSession();
    console.log(session);

    return (
        <>
            <h1>Happy coding</h1>
            <button onClick={() => signIn()}>Sign in</button> <br />
            <button onClick={() => signOut()}>Sign out</button>
        </>
    );
}

export async function getServerSideProps(ctx: NextPageContext) {
    const session = await getSession(ctx);
    console.log(session);

    return {
        props: {
            session,
        },
    };
}
