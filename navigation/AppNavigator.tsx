import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LanguageSelectionScreen from '../screens/register/LanguageSelectionScreen';
import StartScreen from '../screens/StartScreen';

const screenOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

function AppNavigator () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
