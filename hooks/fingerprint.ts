import FingerprintJS from 'fingerprintjs2';
export const generateDeviceFingerprint = async (): Promise<string> => {
    return new Promise((resolve) => {
        if (typeof window !== 'undefined') {
            // Client-side fingerprint generation
            FingerprintJS.getPromise()
                .then((components: FingerprintJS.Component[]) => {
                    const values = components.map((component) => component.value);
                    const fingerprint = FingerprintJS.x64hash128(values.join(''), 31);
                    resolve(fingerprint);
                })
                .catch(() => {
                    resolve('');
                });
        }
    });
};
