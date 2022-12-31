import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from '@rneui/themed';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import PathScreen from '../screens/tabs/PathScreen';
import { useAppSelector } from '../store/hooks';

const Tab = createBottomTabNavigator();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false
};

export default function HomeNavigator () {
  const userStore = useAppSelector(state => state.user);

  function AdminRoute () {
    return userStore?.userData?.isAdmin
      ? <Tab.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{ tabBarIcon: () => <Image source={require('../assets/icons/manager.png')} style={{ width: 30, height: 30 }} /> }} />
      : null;
  }


  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="PathScreen" component={PathScreen} options={{
        tabBarIcon: ({ color, focused, size }) => <Image source={require('../assets/icons/path.png')} style={{ width: 30, height: 30 }} />
      }} />
      {AdminRoute()}
    </Tab.Navigator>
  );
}