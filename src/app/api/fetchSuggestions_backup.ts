import { Firestore } from '@google-cloud/firestore';
import { Suggestion } from '../constants/types';
import dotenv from 'dotenv';
import { createLogger, format, transports } from 'winston';

// Load environment variables from .env.local file only in development
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

// Winston logger configuration
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`)
  ),
  transports: [
    new transports.Console(),
    // Add more transports (e.g., File) if needed
  ],
});

const firestoreConfig: any = {};
firestoreConfig.projectId = process.env.PROJECT_ID;

if (process.env.NODE_ENV === 'development') {
  firestoreConfig.keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH;
}

const firestore = new Firestore(firestoreConfig);

export const fetchSuggestions = (): Promise<Suggestion[]> => {
  return firestore.collection('suggestions').get()
    .then((querySnapshot) => {
      const suggestions: Suggestion[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        suggestions.push({
          id: doc.id,
          author: data.author,
          votes: data.upvotes,
          title: data.title,
          category: data.category,
          suggestionstatus: data.suggestionstatus,
          dateCreated: new Date(data.dateCreated * 1000),
        });
      });
      return suggestions;
    })
    .catch((error: any) => {
      console.error('Error fetching suggestions:', error);
      throw error;
    });
};
  