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

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ message: 'Suggestion ID and status are required' }, { status: 400 });
    }

    const suggestionRef = firestore.collection('suggestions').doc(id);
    const suggestionDoc = await suggestionRef.get();

    if (!suggestionDoc.exists) {
      return NextResponse.json({ message: 'Suggestion not found' }, { status: 404 });
    }

    await suggestionRef.update({ suggestionstatus: status });

    return NextResponse.json({ message: 'Status updated successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update status', error: error.message }, { status: 500 });
  }
}
