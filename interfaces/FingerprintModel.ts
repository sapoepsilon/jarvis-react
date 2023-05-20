export type Fingerprint= {
    fingerprint: string;
    date: Date;
    values: number;
};

export type FingerprintDocument = {
    fingerprintValue: Fingerprint;
};