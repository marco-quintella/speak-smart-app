import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
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
    console.error('No matching documents in fetchLanguages.');
    return;
  }
  return snapshot.docs.map(doc => {
    return {
      ...doc.data() as Language,
      id: doc.id,
    };
  });
}