import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  Fingerprint,
  FingerprintDocument,
} from "@/interfaces/FingerprintModel";
import firebase_db from "@/pages/api/.example.firebase";

class FingerprintService {
  public async addDateToFingerprint(
    fingerprint: string,
    date: Date,
    value: number,
  ): Promise<void> {
    console.log("from fingerprints");
    const fingerprintValue: Fingerprint = {
      fingerprint,
      date: date,
      values: value,
    };
    const fingerprintCollectionName: string = fingerprintValue.fingerprint;

    const fingerprintsRef = firebase_db
      .collection(`fingerprints`)
      .doc(fingerprintCollectionName);
    await fingerprintsRef
      .set(
        {
          fingerprintValue,
        },
        { merge: true },
      )
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
      .then(() => {
        console.log("Document successfully written!");
      });
  }

  public async fetchFingerprintData(
    fingerprintCollectionName: string,
  ): Promise<FingerprintDocument | null> {
    const firebaseDocRef = firebase_db
      .collection("fingerprints")
      .doc(fingerprintCollectionName);
    try {
      const doc = await firebaseDocRef.get();

      if (doc.exists) {
        const data = doc.data() as FingerprintDocument;
        return data;
      } else {
        console.error("No fingerprint data found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching fingerprint data:", error);
      return null;
    }
  }
}

export default FingerprintService;
