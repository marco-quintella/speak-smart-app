export interface Lesson {
  id: string;
  title: string;
  order: number;
  step: number;
  language: string;
  levels: number;
  steps: number[];
  icon: string;
}

export interface UserLesson {
  id: string;
  language: string;
  lessonId: string;
  step: number;
  level: number;
}