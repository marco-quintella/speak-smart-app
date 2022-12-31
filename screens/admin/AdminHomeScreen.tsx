import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Header } from '@rneui/themed';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeNavigatorParamsList } from '../../navigation/HomeNavigator';

export type AdminHomeScreenProps = BottomTabScreenProps<HomeNavigatorParamsList, 'AdminHomeScreen'>;

export default function AdminHomeScreen ({ navigation }: AdminHomeScreenProps) {
  return (
    <SafeAreaView>
      <Header
        leftComponent={
          <Button onPress={() => navigation.goBack()} title="Back" />
        }
        centerComponent={{ text: 'Admin Home Screen', style: { color: '#fff', fontSize: 20 } }}
      />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginVertical: 16,
          marginHorizontal: 8
        }}
      >
        <Button title="Languages" containerStyle={{ width: '100%' }} onPress={() => navigation.navigate('AdminLanguagesScreen')} />
        <Button title="Lessons" containerStyle={{ width: '100%', marginTop: 16 }} onPress={() => navigation.navigate('AdminLessonsSelectLanguage')} />
      </View>
    </SafeAreaView>
  );
}