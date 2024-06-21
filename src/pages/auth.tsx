import Background from '@/components/backgrounds/Background';
import LoginForm from '@/components/forms/Login';
import RegisterForm from '@/components/forms/Register';
import { NextPageContext } from 'next';
import { getCsrfToken } from 'next-auth/react';

export default function auth({
    tab,
    callbackUrl,
    csrfToken,
}: {
    tab: string;
    callbackUrl: string;
    csrfToken: string;
}) {
    // console.log(tab);

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full h-100 flex items-center justify-center">
                {/* --Form-- */}
                <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex items-center justify-center">
                    {tab == 'signin' ? (
                        <LoginForm
                            callbackUrl={callbackUrl}
                            csrfToken={csrfToken}
                        />
                    ) : (
                        <RegisterForm />
                    )}
                </div>

                {/* --Background-- */}
                <Background
                    image={`"/${tab == 'signup' ? 'register' : 'signin'}.jpg"`}
                />
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx: NextPageContext) {
    const { req, query } = ctx;
    const tab = query.tab ? query.tab : 'signin';
    const callbackUrl = query.callbackUrl
        ? query.callbackUrl
        : process.env.NEXTAUTH_URL;
    const csrfToken = await getCsrfToken(ctx);

    return {
        props: { tab: JSON.parse(JSON.stringify(tab)), callbackUrl, csrfToken },
    };
}

// TODO: Change picture if sign in
