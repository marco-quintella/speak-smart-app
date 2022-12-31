import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import type { Lesson } from '../types/lessons';


export async function getLessons (languageId?: string) {
  try {
    if (!languageId) return;
    const lessonsRef = collection(db, 'lessons');
    const lessonsQuery = query(lessonsRef, where('language', '==', languageId), orderBy('step', 'asc'), orderBy('order', 'asc'));
    const snapshot = await getDocs(lessonsQuery);
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    const result: Lesson[] = [];
    snapshot.forEach(doc => {
      result.push({ id: doc.id, ...doc.data() } as Lesson);
    });
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function getUserLessons (userId?: string, language?: string) {
  try {
    if (!userId || !language) return;
    const lessonsRef = collection(db, 'users', userId, 'lessons');
    const lessonsQuery = await getDocs(query(lessonsRef, where('language', '==', language)));
    if (lessonsQuery.empty) return [];
    return lessonsQuery.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (e) {
    console.error(e);
  }
}