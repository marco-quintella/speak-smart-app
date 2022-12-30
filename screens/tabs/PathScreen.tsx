import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Text } from '@rneui/themed';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = BottomTabScreenProps<any, 'PathScreen'>;


export default function PathScreen ({ navigation }: Props) {
  return (
    <SafeAreaView>
      <View style={{ width: '100%', height: '100%' }}>
        <Text>Path Screen</Text>
      </View>
    </SafeAreaView>
  );
}