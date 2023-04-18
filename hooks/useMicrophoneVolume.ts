// hooks/useMicrophoneVolume.ts
import { useEffect, useState } from 'react';

const useMicrophoneVolume = (): number => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();

                source.connect(analyser);
                analyser.fftSize = 32;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const update = () => {
                    requestAnimationFrame(update);
                    analyser.getByteFrequencyData(dataArray);
                    const volume = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
                    setValue((volume / 255) * 100);
                };

                update();
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            // Cleanup
        };
    }, []);

    return value;
};

export default useMicrophoneVolume;
