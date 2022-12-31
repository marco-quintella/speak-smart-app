import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../navigation/AppNavigator';
import HomeNavigator from '../navigation/HomeNavigator';

export type HomeScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'HomeScreen'>;

export default function HomeScreen ({ navigation }: HomeScreenProps) {
  return (
    <HomeNavigator />
  );
}