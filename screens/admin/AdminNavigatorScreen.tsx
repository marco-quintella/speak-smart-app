import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import AdminNavigator from '../../navigation/AdminNavigator';

type AdminNavigatorScreenProps = BottomTabScreenProps<any, 'AdminNavigatorScreen'>;

export default function AdminNavigatorScreen ({ navigation }: AdminNavigatorScreenProps) {
  return (
    <AdminNavigator />
  );
}