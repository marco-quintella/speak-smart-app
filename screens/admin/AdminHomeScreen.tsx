import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Header } from '@rneui/themed';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AdminHomeScreenProps = BottomTabScreenProps<any, 'AdminHomeScreen'>;

export default function AdminHomeScreen ({ navigation }: AdminHomeScreenProps) {
  return (
    <SafeAreaView>
      <Header
        leftComponent={
          <Button onPress={() => navigation.goBack()} title="Back" />
        }
        centerComponent={{ text: 'Admin Home Screen', style: { color: '#fff', fontSize: 20 } }}
      />
      <View>
        <Text>Admin Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}