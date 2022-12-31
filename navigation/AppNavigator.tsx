import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ActivityScreen from '../screens/ActivityScreen';
import HomeScreen from '../screens/HomeScreen';
import LanguageSelectionScreen from '../screens/register/LanguageSelectionScreen';
import StartScreen from '../screens/StartScreen';
import { useAppSelector } from '../store/hooks';

const screenOptions = {
  headerShown: false,
};

export type AppNavigatorParamList = {
  StartScreen?: undefined;
  LanguageSelectionScreen?: undefined;
  HomeScreen?: undefined;
  ActivityScreen?: undefined;
};

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

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
      <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
    </Stack.Navigator>
  );
}


