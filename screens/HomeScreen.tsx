import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HomeNavigator from '../navigation/HomeNavigator';

export type HomeScreenProps = NativeStackScreenProps<any, 'HomeScreen'>;

export default function HomeScreen ({ navigation }: HomeScreenProps) {
  return (
    <HomeNavigator />
  );
}