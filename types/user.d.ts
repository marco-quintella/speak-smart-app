export interface FirebaseUser {
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoURL: string | null | undefined;
  uid: string | undefined;
}

export interface UserData {
  currentLanguage?: string;
  stars?: Record<number, number>;
  streak?: number;
  apples?: number;
  displayName?: string;
  isAdmin?: boolean;
}