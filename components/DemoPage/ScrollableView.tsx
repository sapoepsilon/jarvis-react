import React, { ReactNode, useEffect, useRef } from 'react';
import backgroundImage from "../../public/Vitruvius man.jpg";

interface ScrollableViewProps {
    children: ReactNode;
}

const ScrollableView: React.FC<ScrollableViewProps> = ({ children }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [children]);

    return (
        <div
            ref={scrollRef}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="bg-contain bg-center rounded-2xl backdrop-blur-lg sticky top-0 w-full max-w-screen h-[70vh] overflow-y-scroll flex flex-col items-center justify-center p-4 opacity-80"
        >
            <img
                src="https://framerusercontent.com/images/siDJlxSbSVb9JghKi3KVEmcs6nM.png"
                alt="Decorative"
                className="w-1/3 h-1/3 object-contain"
            />
            {children}
        </div>
    );
};

export default ScrollableView;
