import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import AdminLanguagesScreen from '../screens/admin/AdminLanguagesScreen';
import EditLanguagesScreen from '../screens/admin/languages/EditLanguageScreen';
import type { Language } from '../types/language';

const screenOptions = {
  headerShown: false,
};

export type AdminNavigatorParamList = {
  AdminHomeScreen: undefined;
  AdminLanguagesScreen: undefined;
  EditLanguagesScreen: {
    edit?: boolean;
    language?: Language;
  };
};

const Stack = createNativeStackNavigator<AdminNavigatorParamList>();

export type AdminNavigatorNavigationProp = NativeStackNavigationProp<AdminNavigatorParamList>;

export default function AdminNavigator (props: AdminNavigatorNavigationProp) {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="AdminHomeScreen">
      <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
      <Stack.Screen name="AdminLanguagesScreen" component={AdminLanguagesScreen} />
      <Stack.Screen name="EditLanguagesScreen" component={EditLanguagesScreen} />
    </Stack.Navigator>
  );
}


