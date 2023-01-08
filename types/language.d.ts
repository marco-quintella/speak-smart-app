export interface Language {
  id: string;
  flag: string;
  name: string;
  translations: {
    [key: string]: string;
  };
}