import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ScrollView, VStack } from 'native-base';
import { BottomNav, Header } from '../../components';
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
          <Button onPress={() => navigation.navigate('AdminCoursesScreen')}>Courses</Button>
          <Button onPress={() => navigation.navigate('AdminUnitsCourseSelectScreen')}>Units</Button>
          <Button onPress={() => navigation.navigate('AdminLevelCourseSelectScreen')}>Levels</Button>
        </VStack>
      </ScrollView>
      <BottomNav />
    </Box>
  );
}