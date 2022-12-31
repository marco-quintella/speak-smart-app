import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import { useAppDispatch } from '../store/hooks';
import { setCurrentLanguage } from '../store/language.reducer';
import { Language } from '../types/language';


export const defaultLanguageId = 'ADgfHLvXBaAJzzZaQiHX';

export const setLanguage = async (id: string = defaultLanguageId) => {
  const dispatch = useAppDispatch();

  const docRef = doc(db, 'languages', id);
  const snapshot = await getDoc(docRef);
  const language = snapshot.data();

  dispatch(setCurrentLanguage({
    id: snapshot.id,
    name: language?.name,
    flag: language?.flag,
  }));
};

export async function fetchLearningLanguages () {
  const ref = collection(db, 'languages');
  const _query = query(ref, where('learning', '==', true));
  const snapshot = await getDocs(_query);
  if (snapshot.empty) {
    console.log('No matching documents.');
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
    console.log('No matching documents.');
    return;
  }
  return snapshot.docs.map(doc => {
    return {
      ...doc.data() as Language,
      id: doc.id,
    };
  });
}