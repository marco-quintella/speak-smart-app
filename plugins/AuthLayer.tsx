import { useNavigation } from '@react-navigation/native';
import { AuthRequestPromptOptions, AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppNavigatorNavigationProp } from '../navigation/AppNavigator';
import { setAuthentication, setUser } from '../store/user.reducer';
import { auth } from './firebase';

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

  auth.onAuthStateChanged((user) => {
    dispatch(setUser(user?.toJSON()));
    if (!!user) dispatch(setAuthentication(true));
  });

  return (
    <AuthContext.Provider value={{ promptAsync }}>
      {children}
    </AuthContext.Provider>
  );
}