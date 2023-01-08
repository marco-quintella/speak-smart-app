export interface Skill {
  id: string;
  language: string;

  explanation: string;

  finalLevelTimeLeft: number;
  hasFinalLevel: boolean;
  hasFinalReview: boolean;
  icon: string;
  lessons: number;
  levels: 6;
  shortName: string;
  skillType: 'normal';
  strength: null;
  tipsAndNotes: string | null;
}

export interface Explanation {
  id: string;
  skill: string;

  title: string;
}