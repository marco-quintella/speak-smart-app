import type { User } from 'firebase/auth';
import type { FirebaseUser, UserData } from '../types/user';
import { currentWeekNumber } from './date';

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

export function getNewUserData (options: {
  languageId: string,
}): UserData {
  return {
    currentLanguage: options.languageId,
    stars: {
      [currentWeekNumber()]: 0
    },
    streak: 0,
    apples: 0,
    displayName: 'New User',
    isAdmin: false,
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
