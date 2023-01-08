import { AppNavigatorParamList } from '../navigation';

export * from './courses';
export * from './env';
export * from './language';
export * from './level';
export * from './path';
export * from './skills';
export * from './user';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppNavigatorParamList { }
  }
}