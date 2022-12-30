import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeNavigator from '../navigation/HomeNavigator';

export type HomeScreenProps = NativeStackScreenProps<any, 'HomeScreen'>;

export default function HomeScreen ({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView>
      <HomeNavigator />
    </SafeAreaView>
  );
}