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