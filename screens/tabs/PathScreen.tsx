import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Header, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Flag from '../../components/Flag';
import Stars from '../../components/Stars';
import Streak from '../../components/Streak';
import { useAppSelector } from '../../store/hooks';

type Props = BottomTabScreenProps<any, 'PathScreen'>;

export default function PathScreen ({ navigation }: Props) {
  const language = useAppSelector(state => state.language);
  return (
    <SafeAreaView>
      <View>
        <Header
          leftComponent={<Flag />}
          centerComponent={
            <View style={{ flexDirection: 'row' }}>
              <Stars />
              <Streak style={{ marginLeft: 16 }} />
            </View>
          }
        />
        <Text>Path Screen</Text>
      </View>
    </SafeAreaView>
  );
}
