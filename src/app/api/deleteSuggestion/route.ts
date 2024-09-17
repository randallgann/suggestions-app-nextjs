import { NextResponse } from 'next/server';
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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'Suggestion ID is required' }, { status: 400 });
    }

    await firestore.collection('suggestions').doc(id).delete();
    console.log('Suggestion deleted successfully!');
    return NextResponse.json({ message: 'Suggestion deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting suggestion:', error);
    return NextResponse.json({ message: 'Failed to delete suggestion', error: error.message }, { status: 500 });
  }
}
