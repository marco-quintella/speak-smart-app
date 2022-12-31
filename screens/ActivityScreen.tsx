import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Header, Icon } from '@rneui/themed';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import colors from '../theme/colors';

export type ActivityScreenProps = NativeStackScreenProps<any, 'ActivityScreen'>;

export default function ActivityScreen ({ navigation }: ActivityScreenProps) {
  return (
    <SafeAreaProvider>
      <View>
        <Header
          leftComponent={
            <Button onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" color={colors.foreText} />
            </Button>
          }
        />
        <Text>Activity Screen</Text>
      </View>
    </SafeAreaProvider>
  );
}