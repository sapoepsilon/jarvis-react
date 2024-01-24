import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export type Fingerprint = {
  fingerprint: string;
  date: Date;
  values: number;
};

type FingerprintDocumentData = {
  fingerprint: string;
  date: Timestamp;
  values: number;
};

export type FingerprintDocument = {
  fingerprintValue: FingerprintDocumentData;
};
