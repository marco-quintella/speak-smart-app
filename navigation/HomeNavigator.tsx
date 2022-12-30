import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PathScreen from '../screens/tabs/PathScreen';

const Tab = createBottomTabNavigator();

export default function HomeNavigator () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PathScreen" component={PathScreen} />
    </Tab.Navigator>
  );
}