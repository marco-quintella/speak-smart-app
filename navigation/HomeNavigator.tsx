import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from '@rneui/themed';
import PathScreen from '../screens/tabs/PathScreen';

const Tab = createBottomTabNavigator();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false
};

export default function HomeNavigator () {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="PathScreen" component={PathScreen} options={{
        tabBarIcon: ({ color, focused, size }) => <Image source={require('../assets/icons/path.png')} style={{ width: 30, height: 30 }} />
      }} />
    </Tab.Navigator>
  );
}