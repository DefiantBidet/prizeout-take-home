import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from '@trendyol-js/react-carousel';

interface CarouselWrapperProps {
    container: string;
}

const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ children, container }): React.ReactElement => {
    useEffect(() => {
        ReactDOM.render(
            <Carousel show={1} slide={1}>
                {children &&
                    React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child);
                        }
                    })}
            </Carousel>,
            document.getElementById(container),
        );
    }, []);
    return <></>;
};

export default CarouselWrapper;
