import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Header } from '@rneui/themed';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type AdminHomeScreenProps = NativeStackScreenProps<any, 'AdminHomeScreen'>;

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
      </View>
    </SafeAreaView>
  );
}