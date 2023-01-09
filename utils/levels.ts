import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import { Level } from '../types';

export const levelsCollection = collection(db, 'levels');

export async function fetchLevelsByUnit (unitId?: string): Promise<Level[] | undefined> {
  try {
    if (!unitId) return;
    const _query = query(levelsCollection, where('unit', '==', unitId.toString()));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      console.error('No matching documents on fetchLevelsByUnit.', {
        unitId
      });
      return;
    }
    return snapshot.docs.map(doc => {
      return {
        ...doc.data() as Level,
        id: doc.id,
      };
    });
  } catch (error) {
    console.error('Error on fetchLevelsByUnit.', {
      unitId,
      error
    });
    return;
  }
}

export async function fetchLevelsByCourse (courseId?: string) {
  try {
    if (!courseId) return;
    const _query = query(levelsCollection, where('course', '==', courseId.toString()), orderBy('index', 'asc'));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      console.error('No matching documents on fetchLevelsByCourse.', {
        courseId
      });
      return;
    }
    return snapshot.docs.map(doc => {
      return {
        ...doc.data() as Level,
        id: doc.id,
      };
    });
  } catch (error) {
    console.error('Error on fetchLevelsByCourse.', {
      courseId,
      error
    });
  }
}