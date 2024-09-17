import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';

// Load environment variables from .env.local file only in development
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

const firestoreConfig: any = {};
firestoreConfig.projectId = process.env.PROJECT_ID;

if (process.env.NODE_ENV === 'development') {
  firestoreConfig.keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH;
}

const firestore = new Firestore(firestoreConfig);

export const fetchAdministrators = (): Promise<string[]> => {
  return firestore.collection('administrators').get()
    .then((querySnapshot) => {
      const administrators: string[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        administrators.push(data.email);
      });
      return administrators;
    });
};