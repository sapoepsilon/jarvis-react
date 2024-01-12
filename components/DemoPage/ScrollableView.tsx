import React, { ReactNode, useEffect, useRef } from 'react';

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
            className="bg-contain bg-center bg-no-repeat rounded-2xl backdrop-blur-lg sticky top-0 w-full max-w-screen h-[70vh] overflow-y-scroll flex flex-col items-center justify-center p-4 opacity-80"
            style={{ 
                backgroundImage: "url('https://framerusercontent.com/images/siDJlxSbSVb9JghKi3KVEmcs6nM.png')",
                backgroundSize: '10%'
            }}
        >
            {children}
        </div>
    );
};


export default ScrollableView;
