import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import type { Course } from '../types/course';

export const coursesCollection = collection(db, 'courses');

export async function fetchCourseById (courseId: string) {
  const docRef = doc(coursesCollection, courseId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    console.error('No matching documents.');
    return;
  }
  const data = snapshot.data();
  return {
    ...data as Course,
    id: snapshot.id,
  };
}
