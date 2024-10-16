import React from 'react';
import './Carousel.css';

export function Carousel({active, children}){

    const maxVisibility = 1;

    let cardKey=0;

    return(
        <>
            <div className="carousel">
            {React.Children.map(children, (child, i) => {
                cardKey+=1;
                return(
                <div key={cardKey} className="card-container" style={{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / 3,
                    '--direction': active - i,
                    'pointerEvents': active === i ? 'auto' : 'none',
                    'opacity': Math.abs(active - i) >= maxVisibility ? '0' : '1',
                    'visibility': Math.abs(active - i) > maxVisibility ? 'invisible' : 'visible',
                }}
                >
                    {child}
                </div>
            )})}
            </div>
        </>
    );
};