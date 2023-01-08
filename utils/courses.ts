import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import type { Course } from '../types/course';

export const coursesCollection = collection(db, 'courses');

export async function fetchCourses () {
  const snapshot = await getDocs(coursesCollection);
  if (snapshot.empty) {
    console.error('No matching documents in fetchCourses.');
    return;
  }
  return snapshot.docs.map((doc) => ({
    ...doc.data() as Course,
    id: doc.id,
  }));
}

export async function fetchCourseById (courseId: string) {
  const docRef = doc(coursesCollection, courseId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    console.error('No matching documents in fetchCourseById.', {
      courseId,
    });
    return;
  }
  const data = snapshot.data();
  return {
    ...data as Course,
    id: snapshot.id,
  };
}
