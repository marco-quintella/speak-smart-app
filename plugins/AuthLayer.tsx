import { GOOGLE_AUTH_CLIENT_ID } from '@env';
import { AuthRequestPromptOptions, AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { ReactNode, useEffect } from 'react';
import { setAuthentication, setCurrentCourse, setCurrentLanguage, setUser, setUserData } from '~/store';
import { useAppDispatch } from '~/store/hooks';
import { UserData } from '~/types';
import { defaultCourseId, defaultLanguageId, fetchCourseById, fetchLanguageById, fillNewData, getFirebaseUser, getNewUserData } from '~/utils';
import { auth, db } from './firebase';

export const AuthContext = React.createContext<{
  promptAsync?: (options?: AuthRequestPromptOptions | undefined) => Promise<AuthSessionResult>;
}>({});

export default function AuthLayer ({ children, onAuthenticated }: { children: ReactNode, onAuthenticated: (value: boolean) => void; }) {
  WebBrowser.maybeCompleteAuthSession();

  const dispatch = useAppDispatch();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    { clientId: GOOGLE_AUTH_CLIENT_ID },
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  auth.onAuthStateChanged((user) => {
    try {
      dispatch(setUser(getFirebaseUser(user)));
      if (!!user) {
        const userRef = doc(db, 'users', user.uid);
        getDoc(userRef).then(async (snapshot) => {
          if (!snapshot.exists()) {
            const newUserRef = doc(db, 'users', user.uid);
            const newUserData = await getNewUserData({
              languageId: defaultLanguageId,
              courseId: defaultCourseId
            });
            if (user.displayName) newUserData.displayName = user.displayName;
            await setDoc(newUserRef, newUserData);
            dispatch(setUserData(newUserData));
            const language = await fetchLanguageById(newUserData.currentLanguage);
            dispatch(setCurrentLanguage(language));
            const course = await fetchCourseById(newUserData.currentCourse);
            dispatch(setCurrentCourse(course));
          } else {
            const userDocData = snapshot.data();
            const userData = await fillNewData(userDocData as UserData);
            if (userData.new) setDoc(userRef, userData.user);
            dispatch(setUserData(userData.user));
            const language = await fetchLanguageById(userData.user.currentLanguage);
            dispatch(setCurrentLanguage(language));
            const course = await fetchCourseById(userData.user.currentCourse);
            dispatch(setCurrentCourse(course));
          }
          console.log('Logging in user ' + user.displayName);
          dispatch(setAuthentication(true));
          onAuthenticated(true);
        });
      } else {
        dispatch(setAuthentication(false));
        onAuthenticated(false);
      }
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