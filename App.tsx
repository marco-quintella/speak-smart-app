import { NavigationContainer } from '@react-navigation/native';
import { createTheme, ThemeProvider } from '@rneui/themed';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import AuthLayer from './plugins/AuthLayer';
import { store } from './store';

const theme = createTheme({
  components: {
    Button: {
      raised: false,
      radius: 8,
    },
  },
});

export default function App () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthLayer>
              <AppNavigator />
            </AuthLayer>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
