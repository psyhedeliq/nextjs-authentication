import { FunctionComponent } from 'react';

interface IBackgroundProps {
    image: string;
}

const Background: FunctionComponent<IBackgroundProps> = (props) => {
    const { image } = props;

    return (
        <div
            className="hidden min-h-screen lg:flex lg:w-1/2 xl:w-2/3 2xl:w-3/4 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${image})` }}
        ></div>
    );
};

export default Background;
