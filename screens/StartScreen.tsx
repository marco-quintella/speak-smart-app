import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@rneui/themed';
import React from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigatorParamList } from '../navigation/AppNavigator';
import colors from '../theme/colors';

export type StartScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'StartScreen'>;

const style = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  centralView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsView: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonLabel: {
    color: colors.foreText,
  }
});

export default function StartScreen ({ navigation }: StartScreenProps) {
  return (
    <SafeAreaView style={style.pageContainer}>
      <View style={style.column}>
        <View />
        <View style={style.centralView}>
          <Text>duolingo</Text>
          <Text>Free</Text>
        </View>
        <View style={style.buttonsView}>
          <Button
            containerStyle={style.button}
            title="Start Now"
            titleStyle={{
              fontWeight: 'bold',
              fontSize: 24
            }}
            onPress={() => navigation.navigate('LanguageSelectionScreen')}
          />
          <Button
            containerStyle={style.button}
            title="Log In"
            titleStyle={{
              fontWeight: 'bold',
              fontSize: 24
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
