import { doc, getDoc } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import { useAppDispatch } from '../store/hooks';
import { setCurrentLanguage } from '../store/language.reducer';


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