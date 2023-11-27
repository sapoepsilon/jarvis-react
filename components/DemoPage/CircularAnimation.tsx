// components/CircularAnimation.tsx
import React from 'react';

interface CircularAnimationProps {
    size: number;
    waveColor: string;
    value: number;
    children: React.ReactNode;
}

const CircularAnimation: React.FC<CircularAnimationProps> = ({
                                                                 size,
                                                                 waveColor,
                                                                 value,
                                                                 children,
                                                             }) => {
    const defaultWaveSize = 0;
    const waveSize = value === 0 ? defaultWaveSize : size * value * 0.2 * 2;

    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
                {children}
            </div>
            <div
                className="absolute inset-0 flex items-center justify-center opacity-50"
                style={{
                    transform: `scale(${1 + waveSize / size})`,
                }}
            >
                <div
                    className={`w-${size} h-${size} rounded-full border-2 pointer-events-none`}
                    style={{
                        borderColor: waveColor,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default CircularAnimation;
