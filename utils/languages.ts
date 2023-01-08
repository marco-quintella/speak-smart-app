import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import type { Language } from '../types/language';


export const defaultLanguageId = 'pt-br';
export const defaultCourseId = 'en_pt-br';

export const languagesCollection = collection(db, 'languages');

export async function fetchLanguageById (languageId: string) {
  const _doc = doc(languagesCollection, languageId);
  const snapshot = await getDoc(_doc);
  if (!snapshot.exists()) {
    console.error('No matching documents on fetchLanguageById.', {
      languageId
    });
    return;
  }
  const data = snapshot.data();
  return {
    ...data as Language,
    id: data.id,
  };
}

export async function fetchLanguages () {
  const ref = collection(db, 'languages');
  const snapshot = await getDocs(ref);
  if (snapshot.empty) {
    console.error('No matching documents.');
    return;
  }
  return snapshot.docs.map(doc => {
    return {
      ...doc.data() as Language,
      id: doc.id,
    };
  });
}

export async function fetchLearningLanguages () {
  const ref = collection(db, 'languages');
  const _query = query(ref, where('learning', '==', true));
  const snapshot = await getDocs(_query);
  if (snapshot.empty) {
    console.error('No matching documents.');
    return;
  }
  return snapshot.docs.map(doc => {
    return {
      ...doc.data() as Language,
      id: doc.id,
    };
  });
}

export async function fetchAppLanguages () {
  const ref = collection(db, 'languages');
  const _query = query(ref, where('app', '==', true));
  const snapshot = await getDocs(_query);
  if (snapshot.empty) {
    console.error('No matching documents.');
    return;
  }
  return snapshot.docs.map(doc => {
    return {
      ...doc.data() as Language,
      id: doc.id,
    };
  });
}