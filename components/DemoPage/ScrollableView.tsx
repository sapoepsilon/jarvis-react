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
            className="md:logoBackgroundMobile logoBackground bg-contain bg-center bg-no-repeat rounded-2xl backdrop-blur-lg sticky top-0 w-full max-w-screen h-[70vh] overflow-y-scroll flex flex-col items-center justify-center p-4"
        >
            {children}
        </div>
    );
};



export default ScrollableView;
