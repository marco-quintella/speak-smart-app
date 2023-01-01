import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ScrollView, VStack } from 'native-base';
import { Header } from '../../components';
import BottomNav from '../../components/BottomNav';
import { AppNavigatorParamList } from '../../navigation/AppNavigator';

export type AdminHomeScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminHomeScreen'>;

export default function AdminHomeScreen ({ navigation, route }: AdminHomeScreenProps) {
  return (
    <Box safeArea height='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Admin'
      />
      <ScrollView>
        <VStack
          padding={4}
          space={4}
        >
          <Button onPress={() => navigation.navigate('AdminLanguagesScreen')}>Languages</Button>
          <Button onPress={() => navigation.navigate('AdminLessonsSelectLanguage')} >Lessons</Button>
        </VStack>
      </ScrollView>
      <BottomNav />
    </Box>
  );
}