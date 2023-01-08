export interface Level {
  course: string;
  id: string;
  unit: string;

  hasLevelReview: boolean;
  isInProgressSequence: boolean;
  name: string;
  skills: string[];
  subtype: 'regular';
  teachingObjective: string;
  totalSessions: number;
  type: 'skill';
  index: number;
}