import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import AdminLanguagesScreen from '../screens/admin/AdminLanguagesScreen';
import { HomeScreenProps } from '../screens/HomeScreen';
import { LanguageSelectionScreenProps } from '../screens/register/LanguageSelectionScreen';
import { StartScreenProps } from '../screens/StartScreen';

const screenOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

export type AdminNavigatorParamList = {
  StartScreen?: StartScreenProps;
  LanguageSelectionScreen?: LanguageSelectionScreenProps;
  HomeScreen?: HomeScreenProps;
};
export type AdminNavigatorNavigationProp = NativeStackNavigationProp<AdminNavigatorParamList>;

export default function AdminNavigator () {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
      <Stack.Screen name="AdminLanguagesScreen" component={AdminLanguagesScreen} />
    </Stack.Navigator>
  );
}


