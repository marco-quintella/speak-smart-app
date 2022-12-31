import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from '@rneui/themed';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import AdminLanguagesScreen from '../screens/admin/languages/AdminLanguagesScreen';
import EditLanguagesScreen from '../screens/admin/languages/EditLanguageScreen';
import AdminLessonsListScreen from '../screens/admin/lessons/AdminLessonsList';
import AdminLessonsSelectLanguage from '../screens/admin/lessons/AdminLessonsSelectLanguage';
import EditLessonsScreen from '../screens/admin/lessons/EditLessonsScreen';
import PathScreen from '../screens/tabs/PathScreen';
import { useAppSelector } from '../store/hooks';
import { Language } from '../types/language';
import { Lesson } from '../types/lessons';


const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false
};

export type HomeNavigatorParamsList = {
  PathScreen: undefined;
  ActivityScreen: undefined;

  AdminHomeScreen: undefined;
  AdminLanguagesScreen: undefined;
  EditLanguagesScreen: {
    edit?: boolean;
    language?: Language;
  };
  AdminLessonsSelectLanguage: undefined;
  AdminLessonsListScreen: {
    language: Language;
  };
  EditLessonsScreen: {
    edit?: boolean;
    lesson?: Lesson;
  };
};

const Tab = createBottomTabNavigator<HomeNavigatorParamsList>();

export default function HomeNavigator () {
  const userStore = useAppSelector(state => state.user);

  function AdminRoute () {
    return userStore?.userData?.isAdmin
      ? [
        <Tab.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{ tabBarIcon: () => <Image source={require('../assets/icons/manager.png')} style={{ width: 30, height: 30 }} /> }} />,
        <Tab.Screen name="AdminLanguagesScreen" component={AdminLanguagesScreen} options={{ tabBarButton: () => null }} />,
        <Tab.Screen name="EditLanguagesScreen" component={EditLanguagesScreen} options={{ tabBarButton: () => null }} />,
        <Tab.Screen name="AdminLessonsSelectLanguage" component={AdminLessonsSelectLanguage} options={{ tabBarButton: () => null }} />,
        <Tab.Screen name="AdminLessonsListScreen" component={AdminLessonsListScreen} options={{ tabBarButton: () => null }} />,
        <Tab.Screen name="EditLessonsScreen" component={EditLessonsScreen} options={{ tabBarButton: () => null }} />,
      ]
      : null;
  }


  return (
    <Tab.Navigator screenOptions={screenOptions} >
      <Tab.Screen
        name="PathScreen"
        component={PathScreen}
        options={{
          tabBarIcon: ({ color, focused, size }) =>
            <Image source={require('../assets/icons/path.png')} style={{ width: 30, height: 30 }} />,
        }}
      />
      {AdminRoute()}
    </Tab.Navigator>
  );
}