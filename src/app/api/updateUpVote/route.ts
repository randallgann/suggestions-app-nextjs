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
    const { id, nickname } = await request.json();
    if (!id || !nickname) {
      return NextResponse.json({ message: 'Suggestion ID and nickname are required' }, { status: 400 });
    }

    const suggestionRef = firestore.collection('suggestions').doc(id);
    const suggestionDoc = await suggestionRef.get();

    const suggestionData = suggestionDoc.data() ?? {};
    let upvotes = suggestionData.upvotes || [];

    if (upvotes.includes(nickname)) {
      upvotes = upvotes.filter((user: any) => user !== nickname);
      await suggestionRef.update({ upvotes });
      return NextResponse.json({ message: 'User has been removed from upvotes' }, { status: 200 });
    } else {
      upvotes.push(nickname);
      await suggestionRef.update({ upvotes });
      return NextResponse.json({ message: 'User has been added to upvotes' }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update upvote', error: error.message }, { status: 500 });
  }
}
