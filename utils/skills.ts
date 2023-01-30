import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/plugins/firebase';
import { Skill } from '~/types';

export const skillsCollection = collection(db, 'skills');

export async function fetchSkillsByLevel (levelId?: string): Promise<Skill[]> {
  try {
    if (!levelId) return [];
    const _query = query(skillsCollection, where('levels', 'array-contains', levelId.toString()));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      console.error('No matching documents on fetchSkillsByLevel.', {
        levelId
      });
      return [];
    }
    return snapshot.docs.map(doc => {
      return {
        ...doc.data() as Skill,
        id: doc.id,
      };
    });
  } catch (error) {
    console.error('Error on fetchSkillsByLevel.', {
      levelId,
      error
    });
    return [];
  }
}

export async function fetchSkillsToAddToLevel (levelId?: string): Promise<Skill[]> {
  try {
    if (!levelId) return [];
    const skillsInLevel = (await fetchSkillsByLevel(levelId)).map(skill => skill.id);
    const _query = query(skillsCollection, where('levels', 'not-in', skillsInLevel));
    const snapshot = await getDocs(_query);
    if (snapshot.empty) {
      console.error('No matching documents on fetchSkillsToAddToLevel.', {
        levelId
      });
      return [];
    }
    return snapshot.docs.map(doc => {
      return {
        ...doc.data() as Skill,
        id: doc.id,
      };
    });
  } catch (error) {
    console.error('Error on fetchSkillsToAddToLevel.', {
      levelId,
      error
    });
    return [];
  }
}