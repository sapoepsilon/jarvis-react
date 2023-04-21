import React, {ReactNode, useEffect, useRef} from 'react';

interface ScrollableViewProps {
    children: ReactNode;
}

const ScrollableView: React.FC<ScrollableViewProps> = ({children}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [children]);
    return (
        <div
            ref={scrollRef}
            className="bg-jarvis-background w-screen h-[80vh] overflow-y-scroll flex flex-col items-end p-4">
            {children}
        </div>
    );
};

export default ScrollableView;
