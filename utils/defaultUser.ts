import { User } from 'firebase/auth';
import { currentWeekNumber } from './date';

export interface FirebaseUser {
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoURL: string | null | undefined;
  uid: string | undefined;
}

export function getFirebaseUser (
  user: User | null | undefined
): FirebaseUser {
  return {
    displayName: user?.displayName,
    email: user?.email,
    photoURL: user?.photoURL,
    uid: user?.uid,
  };
}

export interface UserData {
  currentLanguage?: string;
  stars?: Record<number, number>;
  streak?: number;
  apples?: number;
}

export function getNewUserData (options: {
  languageId: string,
}): UserData {
  return {
    currentLanguage: options.languageId,
    stars: {
      [currentWeekNumber()]: 0
    },
    streak: 0,
    apples: 0
  };
}

export function fillNewData (user: UserData): { new: boolean, user: UserData; } {
  const newData = { new: false, user: user };
  Object.keys(getNewUserData({ languageId: 'en' })).forEach(key => {
    // @ts-ignore
    if (user[key] === undefined) {
      // @ts-ignore
      newData.user[key] = getNewUserData({ languageId: 'en' })[key];
      newData.new = true;
    }
  });
  return newData;
}
