import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityScreen, LanguageSelectionScreen, StartScreen } from '../screens';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import AdminCoursesScreen from '../screens/admin/courses/AdminCoursesScreen';
import EditCoursesScreen from '../screens/admin/courses/EditCoursesScreen';
import AdminLanguagesScreen from '../screens/admin/languages/AdminLanguagesScreen';
import EditLanguagesScreen from '../screens/admin/languages/EditLanguageScreen';
import AdminLessonsListScreen from '../screens/admin/lessons/AdminLessonsList';
import AdminLessonsSelectLanguage from '../screens/admin/lessons/AdminLessonsSelectLanguage';
import EditLessonsScreen from '../screens/admin/lessons/EditLessonsScreen';
import PathScreen from '../screens/tabs/PathScreen';
import { useAppSelector } from '../store/hooks';
import type { Course, Language } from '../types';

const screenOptions = {
  headerShown: false,
};

export type AppNavigatorParamList = {
  StartScreen?: undefined;
  LanguageSelectionScreen?: undefined;
  ActivityScreen?: undefined;
  PathScreen: undefined;
  AdminHomeScreen: undefined;
  AdminLanguagesScreen: undefined;
  EditLanguagesScreen: {
    edit?: boolean;
    language?: Language;
    languages?: Language[];
  };
  AdminLessonsSelectLanguage: undefined;
  AdminLessonsListScreen: {
    language: Language;
  };
  EditLessonsScreen: {
    edit?: boolean;
    language?: Language;
  };
  AdminCoursesScreen: undefined;
  EditCoursesScreen: {
    edit?: boolean;
    course?: Course;
  };
};

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

export default function AppNavigator () {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const userStore = useAppSelector(state => state.user);

  function AdminRoute () {
    return userStore?.userData?.isAdmin
      ? [
        <Stack.Screen key="AdminHomeScreen" name="AdminHomeScreen" component={AdminHomeScreen} />,
        <Stack.Screen key="AdminLanguagesScreen" name="AdminLanguagesScreen" component={AdminLanguagesScreen} />,
        <Stack.Screen key="EditLanguagesScreen" name="EditLanguagesScreen" component={EditLanguagesScreen} />,
        <Stack.Screen key="AdminCoursesScreen" name="AdminCoursesScreen" component={AdminCoursesScreen} />,
        <Stack.Screen key="EditCoursesScreen" name="EditCoursesScreen" component={EditCoursesScreen} />,
        <Stack.Screen key="AdminLessonsSelectLanguage" name="AdminLessonsSelectLanguage" component={AdminLessonsSelectLanguage} />,
        <Stack.Screen key="AdminLessonsListScreen" name="AdminLessonsListScreen" component={AdminLessonsListScreen} />,
        <Stack.Screen key="EditLessonsScreen" name="EditLessonsScreen" component={EditLessonsScreen} />,
      ]
      : null;
  }

  return !isAuthenticated ? (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="PathScreen" component={PathScreen} />
      <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
      {AdminRoute()}
    </Stack.Navigator>
  );
}


