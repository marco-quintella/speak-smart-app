import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen, { HomeScreenProps } from '../screens/HomeScreen';
import LanguageSelectionScreen, { LanguageSelectionScreenProps } from '../screens/register/LanguageSelectionScreen';
import StartScreen, { StartScreenProps } from '../screens/StartScreen';
import { useAppSelector } from '../store/hooks';

const screenOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

export type AppNavigatorParamList = {
  StartScreen?: StartScreenProps;
  LanguageSelectionScreen?: LanguageSelectionScreenProps;
  HomeScreen?: HomeScreenProps;
};
export type AppNavigatorNavigationProp = NativeStackNavigationProp<AppNavigatorParamList>;

export default function AppNavigator () {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

  return !isAuthenticated ? (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}


