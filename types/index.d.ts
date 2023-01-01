import { AppNavigatorParamList } from '../navigation';

export * from './env';
export * from './language';
export * from './lessons';
export * from './user';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppNavigatorParamList { }
  }
}