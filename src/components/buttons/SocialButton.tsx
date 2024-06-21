import { signIn } from 'next-auth/react';
import React, { FunctionComponent } from 'react';
import {
    FaDiscord,
    FaFacebook,
    FaGithub,
    FaGoogle,
    FaSpotify,
    FaTwitter,
} from 'react-icons/fa';
import { SiAuth0 } from 'react-icons/si';

type ISocialButtonProps = {
    key: string;
    id: string;
    text: string;
    csrfToken: string;
};

const colors: any = {
    google: '#db4437',
    facebook: '#1877f2',
    auth0: '#eb5424',
    github: '#333',
    discord: '#7289da',
    spotify: '#1db954',
    twitter: '#1da1f2',
};

const SocialButton: FunctionComponent<ISocialButtonProps> = (props) => {
    const { key, id, text, csrfToken } = props;
    const createIconJSX = () => {
        switch (id) {
            case 'google':
                return <FaGoogle />;
            case 'facebook':
                return <FaFacebook />;
            case 'auth0':
                return <SiAuth0 />;
            case 'github':
                return <FaGithub />;
            case 'discord':
                return <FaDiscord />;
            case 'spotify':
                return <FaSpotify />;
            case 'twitter(Legacy)':
                return <FaTwitter />;
            default:
                return;
        }
    };

    return (
        <form method="post" action={`/api/auth/signin/${id}`}>
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <button
                className="mb-2 py-2 px-4 flex justify-center items-center gap-2 hover:bg-gray-700 w-full rounded-md text-white font-semibold transition-all duration-300 ease-in-out"
                type="button"
                onClick={() => signIn(id)}
                style={{ background: `${colors[id]}` }}
            >
                {/* {createIconJSX()}
                {text} */}
                <span className="flex items-center justify-center">
                    {createIconJSX()}
                    <span className="ml-2 whitespace-nowrap">{text}</span>
                </span>
            </button>
        </form>
    );
};

export default SocialButton;
