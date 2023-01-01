import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { extendTheme, NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import AuthLayer from './plugins/AuthLayer';
import { store } from './store';

export const colors = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

export const fonts = {
  'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  'Inter-BlackItalic': require('./assets/fonts/Inter-BlackItalic.otf'),
  'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
  'Inter-BoldItalic': require('./assets/fonts/Inter-BoldItalic.otf'),
  'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.otf'),
  'Inter-ExtraBoldItalic': require('./assets/fonts/Inter-ExtraBoldItalic.otf'),
  'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.otf'),
  'Inter-ExtraLightItalic': require('./assets/fonts/Inter-ExtraLightItalic.otf'),
  'Inter-Italic': require('./assets/fonts/Inter-Italic.otf'),
  'Inter-Light': require('./assets/fonts/Inter-Light.otf'),
  'Inter-LightItalic': require('./assets/fonts/Inter-LightItalic.otf'),
  'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
  'Inter-MediumItalic': require('./assets/fonts/Inter-MediumItalic.otf'),
  'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
  'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf'),
  'Inter-SemiBoldItalic': require('./assets/fonts/Inter-SemiBoldItalic.otf'),
  'Inter-Thin': require('./assets/fonts/Inter-Thin.otf'),
  'Inter-ThinItalic': require('./assets/fonts/Inter-ThinItalic.otf'),
};

export default function App () {
  SplashScreen.preventAutoHideAsync();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  const [fontsLoaded] = useFonts(fonts);

  const theme = extendTheme({
    colors: colors,
    fontConfig: {
      Inter: {
        100: {
          normal: 'Inter-Thin',
          italic: 'Inter-ThinItalic',
        },
        200: {
          normal: 'Inter-ExtraLight',
          italic: 'Inter-ExtraLightItalic',
        },
        300: {
          normal: 'Inter-Light',
          italic: 'Inter-LightItalic',
        },
        400: {
          normal: 'Inter-Regular',
          italic: 'Inter-Italic',
        },
        500: {
          normal: 'Inter-Medium',
          italic: 'Inter-MediumItalic',
        },
        600: {
          normal: 'Inter-SemiBold',
          italic: 'Inter-SemiBoldItalic',
        },
        700: {
          normal: 'Inter-Bold',
          italic: 'Inter-BoldItalic',
        },
        800: {
          normal: 'Inter-ExtraBold',
          italic: 'Inter-ExtraBoldItalic',
        },
        900: {
          normal: 'Inter-Black',
          italic: 'Inter-BlackItalic',
        },
      }
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'Inter',
    },
    components: {
      Button: {
        defaultProps: {
          colorScheme: 'primary',
        }
      },
      Text: {
        defaultProps: {
          fontFamily: 'body'
        }
      }
    }
  });

  useEffect(() => {
    if (fontsLoaded && isAuthenticated !== undefined) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [fontsLoaded, isAuthenticated]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <AuthLayer onAuthenticated={(value) => setIsAuthenticated(value)}>
              <AppNavigator />
            </AuthLayer>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </NativeBaseProvider>
  );
}
