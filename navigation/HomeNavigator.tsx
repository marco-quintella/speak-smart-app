import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PathScreen from '../screens/tabs/PathScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
};

export default function HomeNavigator () {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="PathScreen" component={PathScreen} />
    </Tab.Navigator>
  );
}