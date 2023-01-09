import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from '../../../components';
import { AppNavigatorParamList } from '../../../navigation';
import { setCourses } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Course } from '../../../types';
import { capitalize, fetchCourses } from '../../../utils';

export type AdminUnitsCourseSelectScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminLevelCourseSelectScreen'>;

export default function AdminLevelCourseSelectScreen ({ navigation, route }: AdminUnitsCourseSelectScreenProps) {
  const languageStore = useAppSelector(state => state.language);
  const dispatch = useAppDispatch();
  const [courses, _setCourses] = useState<Course[]>([]);

  async function getCourses () {
    const _courses = await fetchCourses();
    if (!_courses) return;
    _setCourses(_courses);
    dispatch(setCourses(_courses));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _setCourses(languageStore?.courses ?? []);
      (!courses || courses.length === 0) && getCourses();
    });
    return unsubscribe;
  }, []);

  function coursesList () {
    return courses.map((course, index) => {
      return (
        <Button
          key={index}
          h='12'
          onPress={() => navigation.navigate('AdminLevelUnitSelectScreen', { course })}
        >
          <Text color='white'>{course.id} - {capitalize(course?.title)}</Text>
        </Button>);
    });
  }

  return (
    <Box safeArea h='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Units - Select Course'
      />
      <ScrollView>
        <VStack space={2} p={4}>
          {coursesList()}
        </VStack>
      </ScrollView>
    </Box>
  );
}