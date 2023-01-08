export interface FirebaseUser {
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoURL: string | null | undefined;
  uid: string | undefined;
}

export interface UserData {
  currentLanguage: string;
  currentCourse: string;
  courses: {
    [key: string]: {
      stars: number;
      max_tree_level: number;
      levels: {
        id: string;
        finishedSessions: number;
        level: string;
        state: 'active' | 'locked';
      }[];
    };
  };
  stars: {
    [key: number]: number;
  };
  streak: number;
  apples: number;
  displayName: string;
  isAdmin: boolean;
}