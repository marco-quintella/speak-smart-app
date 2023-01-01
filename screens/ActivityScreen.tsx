import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text } from 'native-base';
import { Header } from '../components';
import { AppNavigatorParamList } from '../navigation';

export type ActivityScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'ActivityScreen'>;

export default function ActivityScreen ({ navigation }: ActivityScreenProps) {
  return (
    <Box safeArea>
      <Header title="Activity Screen" icon='chevron-left' onPress={() => navigation.goBack()} />
      <Text>Activity Screen</Text>
    </Box>
  );
}