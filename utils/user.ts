import type { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../plugins/firebase';
import type { FirebaseUser, UserData } from '../types';
import { currentWeekNumber } from './date';
import { defaultCourseId } from './languages';
import { fetchLevelsByUnit } from './levels';
import { fetchIndexZeroUnitByCourse } from './units';

const usersCollection = collection(db, 'users');

export async function getUserById (userId: string) {
  const _query = query(usersCollection, where('id', '==', userId));
  const snapshot = await getDocs(_query);
  if (snapshot.empty) {
    console.error('No matching documents on getUserById.', {
      userId
    });
    return;
  }
  const doc = snapshot.docs[0];
  return {
    ...doc.data() as UserData,
    id: doc.id,
  };
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

async function getEmptyCourse (courseId: string): Promise<UserData['courses'][0]> {
  const unitZero = await fetchIndexZeroUnitByCourse(courseId);
  if (!unitZero) {
    throw new Error('No unit zero found for course ' + courseId);
  }
  const levels = await fetchLevelsByUnit(unitZero.id);
  if (!levels) {
    throw new Error('No levels found for unit ' + unitZero.id);
  }
  return {
    stars: 0,
    max_tree_level: 0,
    levels: levels.map((level, index) => ({
      id: level.id,
      unit: unitZero.id,
      level: level.id,
      finishedSessions: 0,
      state: index === 0 ? 'active' : 'locked'
    }))
  };
}

export async function getNewUserData (options: {
  languageId: string,
  courseId: string;
}): Promise<UserData> {
  const course = await getEmptyCourse(options.courseId);
  return {
    currentLanguage: options.languageId,
    currentCourse: options.courseId,
    stars: {
      [currentWeekNumber()]: 0
    },
    streak: 0,
    apples: 0,
    displayName: 'New User',
    isAdmin: false,
    courses: {
      [options.courseId]: course
    }
  };
}

export async function fillNewData (user: UserData): Promise<{ new: boolean; user: UserData; }> {
  const newData = { new: false, user: user };
  const newUserData = await getNewUserData({
    languageId: user.currentLanguage,
    courseId: defaultCourseId
  });
  Object.keys(newUserData).forEach(key => {
    // @ts-ignore
    if (user[key] === undefined) {
      // @ts-ignore
      newData.user[key] = newUserData[key];
      newData.new = true;
    }
  });
  return newData;
}
