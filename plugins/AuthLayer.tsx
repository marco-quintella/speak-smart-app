import { useNavigation } from '@react-navigation/native';
import { AuthRequestPromptOptions, AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppNavigatorNavigationProp } from '../navigation/AppNavigator';
import { setCurrentLanguage } from '../store/language.reducer';
import { setAuthentication, setUser, setUserData } from '../store/user.reducer';
import { defaultLanguageId } from '../utils/defaultLanguages';
import { fillNewData, getFirebaseUser, getNewUserData, UserData } from '../utils/defaultUser';
import { auth, db } from './firebase';

export const AuthContext = React.createContext<{
  promptAsync?: (options?: AuthRequestPromptOptions | undefined) => Promise<AuthSessionResult>;
}>({});

export default function AuthLayer ({ children }: { children: React.ReactNode; }) {
  WebBrowser.maybeCompleteAuthSession();

  const dispatch = useDispatch();
  const navigation = useNavigation<AppNavigatorNavigationProp>();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    { clientId: '86631189717-g1k171n46qv4mj7k430v4gk1vpckn6q0.apps.googleusercontent.com' },
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const setLanguage = async (id: string = defaultLanguageId) => {
    const docRef = doc(db, 'languages', id);
    const snapshot = await getDoc(docRef);
    const language = snapshot.data();
    dispatch(setCurrentLanguage({
      id: snapshot.id,
      name: language?.name,
      flag: language?.flag,
    }));
  };

  auth.onAuthStateChanged((user) => {
    try {
      dispatch(setUser(getFirebaseUser(user)));
      if (!!user) {
        const userRef = doc(db, 'users', user.uid);
        getDoc(userRef).then(async (snapshot) => {
          if (snapshot.exists() === false) {
            const docRef = doc(db, 'languages', defaultLanguageId);
            const newUserRef = doc(db, 'users', user.uid);
            const newUserData = getNewUserData({ languageId: docRef.id });
            await setDoc(newUserRef, newUserData);
            dispatch(setUserData(newUserData));
            await setLanguage(newUserData?.currentLanguage);
          } else {
            const userDocData = snapshot.data();
            const userData = fillNewData(userDocData as UserData);
            if (userData.new) {
              setDoc(userRef, userData.user);
            }
            dispatch(setUserData(userData.user));
            await setLanguage(userData.user.currentLanguage);
          }
          dispatch(setAuthentication(true));
        });
      };
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <AuthContext.Provider value={{ promptAsync }}>
      {children}
    </AuthContext.Provider>
  );
}