import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import { Unit } from '../types/path';

const unitsCollection = collection(db, 'units');

export async function fetchUnitsByCourse (courseId?: string) {
  if (!courseId) return;
  const _query = query(unitsCollection, where('course', '==', courseId));
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
}

export async function fetchIndexZeroUnitByCourse (courseId: string) {
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
}

export async function fetchUnitsByLevel (levelId: string) {
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
}