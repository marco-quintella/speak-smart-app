import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityScreen, AdminCoursesScreen, AdminHomeScreen, AdminLanguagesScreen, AdminLevelCourseSelectScreen, AdminLevelScreen, AdminLevelUnitSelectScreen, AdminSkillsCourseSelectScreen, AdminUnitsCourseSelectScreen, AdminUnitsScreen, CourseSelectionScreen, EditCoursesScreen, EditLanguagesScreen, EditLevelScreen, EditUnitsScreen, PathScreen, StartScreen } from '~/screens';
import { useAppSelector } from '~/store/hooks';
import type { Course, Language, Level, Unit } from '~/types';

const screenOptions = {
  headerShown: false,
};

export type AppNavigatorParamList = {
  StartScreen?: undefined;

  CourseSelectionScreen?: undefined;

  ActivityScreen?: undefined;
  PathScreen: undefined;

  AdminHomeScreen: undefined;

  AdminLanguagesScreen: undefined;
  EditLanguagesScreen: {
    edit?: boolean;
    language?: Language;
    languages?: Language[];
  };

  AdminCoursesScreen: undefined;
  EditCoursesScreen: {
    edit?: boolean;
    course?: Course;
  };

  AdminUnitsCourseSelectScreen: undefined;
  AdminUnitsScreen: {
    course?: Course;
  };
  EditUnitScreen: {
    edit?: boolean;
    unit?: Unit;
    course?: Course;
  };

  AdminLevelCourseSelectScreen: undefined;
  AdminLevelUnitSelectScreen: {
    course?: Course;
  };
  AdminLevelScreen: {
    unit?: Unit;
  };
  EditLevelScreen: {
    edit?: boolean;
    unit?: Unit;
    level?: Level;
  };

  AdminSkillsCourseSelectScreen: undefined;
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

        <Stack.Screen key="AdminUnitsCourseSelectScreen" name="AdminUnitsCourseSelectScreen" component={AdminUnitsCourseSelectScreen} />,
        <Stack.Screen key="AdminUnitsScreen" name="AdminUnitsScreen" component={AdminUnitsScreen} />,
        <Stack.Screen key="EditUnitScreen" name="EditUnitScreen" component={EditUnitsScreen} />,

        <Stack.Screen key="AdminLevelCourseSelectScreen" name="AdminLevelCourseSelectScreen" component={AdminLevelCourseSelectScreen} />,
        <Stack.Screen key="AdminLevelUnitSelectScreen" name="AdminLevelUnitSelectScreen" component={AdminLevelUnitSelectScreen} />,
        <Stack.Screen key="AdminLevelScreen" name="AdminLevelScreen" component={AdminLevelScreen} />,
        <Stack.Screen key="EditLevelScreen" name="EditLevelScreen" component={EditLevelScreen} />,

        <Stack.Screen key="AdminSkillsCourseSelectScreen" name="AdminSkillsCourseSelectScreen" component={AdminSkillsCourseSelectScreen} />,
      ]
      : null;
  }

  return !isAuthenticated ? (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="CourseSelectionScreen" component={CourseSelectionScreen} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="PathScreen" component={PathScreen} />
      <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
      {AdminRoute()}
    </Stack.Navigator>
  );
}


