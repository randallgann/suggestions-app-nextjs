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

export const fetchSuggestions = async (): Promise<Suggestion[]> => {
  logger.info('fetchSuggestions called', {
    location: 'fetchSuggestions',
    firestoreConfig,
    collection: 'suggestions',
  });

  try {
    const querySnapshot = await firestore.collection('suggestions').get();
    logger.info('Fetched suggestions from Firestore', {
      location: 'fetchSuggestions',
      documentCount: querySnapshot.size,
    });

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

    logger.info('Suggestions processed successfully', {
      location: 'fetchSuggestions',
      suggestionCount: suggestions.length,
    });

    return suggestions;
  } catch (error: any) {
    logger.error('Error fetching suggestions', {
      location: 'fetchSuggestions',
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};
