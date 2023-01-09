import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import { Unit } from '../types/path';

export const unitsCollection = collection(db, 'units');

export async function fetchUnitsByCourse (courseId?: string) {
  try {
    if (!courseId) return;
    const _query = query(unitsCollection, where('course', '==', courseId), orderBy('unitIndex', 'asc'));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      console.error('No matching documents on fetchUnitsByCourse.', {
        courseId,
      });
      return;
    }
    return snapshot.docs.map(doc => {
      return {
        ...doc.data() as Unit,
        id: doc.id,
      };
    });
  } catch (error) {
    console.error('Error on fetchUnitsByCourse.', error);
  }
}

export async function fetchIndexZeroUnitByCourse (courseId: string) {
  try {
    const _query = query(unitsCollection, where('course', '==', courseId), where('unitIndex', '==', 0));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      console.error('No matching documents on fetchIndexZeroUnitByCourse.', {
        courseId,
      });
      return;
    }
    const docZero = snapshot.docs[0];
    return {
      ...docZero.data() as Unit,
      id: docZero.id,
    };
  } catch (error) {
    console.error('Error on fetchIndexZeroUnitByCourse.', error);
  }
}

export async function fetchUnitsByLevel (levelId: string) {
  try {
    const _query = query(unitsCollection, where('level', '==', levelId), orderBy('unitIndex', 'asc'));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      console.error('No matching documents on fetchUnitByLevel.', {
        levelId,
      });
      return;
    }
    return snapshot.docs.map(doc => {
      return {
        ...doc.data() as Unit,
        id: doc.id,
      };
    });
  } catch (error) {
    console.error('Error on fetchUnitByLevel.', error);
  }
}