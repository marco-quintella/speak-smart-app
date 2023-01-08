import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from '../../../components';
import { AppNavigatorParamList } from '../../../navigation';
import { setCourses, useAppDispatch } from '../../../store';
import { useAppSelector } from '../../../store/hooks';
import { Course } from '../../../types';
import { capitalize } from '../../../utils';
import { fetchCourses } from '../../../utils/courses';

export type AdminCoursesScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminCoursesScreen'>;

export default function AdminCoursesScreen ({ navigation }: AdminCoursesScreenProps) {
  const dispatch = useAppDispatch();
  const languageStore = useAppSelector(state => state.language);

  const [courses, _setCourses] = useState<Course[]>(languageStore?.courses ?? []);

  async function getCourses () {
    const _courses = await fetchCourses();
    if (!_courses) return;
    _setCourses(_courses);
    dispatch(setCourses(_courses));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _setCourses(languageStore?.courses ?? []);
      if (!courses || courses.length === 0) getCourses();
    });
    return unsubscribe;
  });

  function coursesList () {
    const add = <Button
      key='add'
      h='12'
      onPress={() => navigation.navigate('EditCoursesScreen', { edit: false })}
    >
      New Course
    </Button>;

    return [add, ...courses.map((course, index) => {
      return (
        <Button
          key={index}
          h='12'
          onPress={() => navigation.navigate('EditCoursesScreen', { edit: true, course })}
        >
          <Text color='white'>
            {course.id} - {capitalize(course.title)}
          </Text>
        </Button>
      );
    })];
  }

  return (
    <Box safeArea height='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Courses'
      />
      <ScrollView>
        <VStack space={2} p={4}>
          {coursesList()}
        </VStack>
      </ScrollView>
    </Box>
  );
}