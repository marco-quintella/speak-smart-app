import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ScrollView, Text, View, VStack } from 'native-base';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '~/components';
import { AppNavigatorParamList } from '~/navigation';
import { AuthContext } from '~/plugins';
import { setCurrentLanguage } from '~/store';
import type { Course } from '~/types';
import { capitalize, fetchCoursesSortedByLanguage } from '~/utils';

export type CourseSelectionScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'CourseSelectionScreen'>;

export default function CourseSelectionScreen ({ navigation }: CourseSelectionScreenProps) {
  const [courses, serCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course>();

  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();

  async function fetchCourses () {
    const courses = await fetchCoursesSortedByLanguage();
    if (!courses) return;
    serCourses(courses);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const onSave = () => {
    try {
      if (selectedCourse) {
        dispatch(setCurrentLanguage(selectedCourse));
        authContext?.promptAsync && authContext.promptAsync();
      };
    } catch (error) {
      console.error(error);
    }
  };

  function languageList () {
    return (
      courses.map((course) =>
        <Button
          key={course.title}
          opacity={!!selectedCourse?.id ? selectedCourse?.id === course.id ? 1 : 0.7 : 1}
          onPress={() => { setSelectedCourse(course); }}
        >
          <Text fontSize={16} fontWeight='semibold' color='white'>
            {capitalize(course.title)}
          </Text>
        </Button>)
    );
  }

  return (
    <Box safeArea style={{ flexDirection: 'column', flex: 1 }}>
      <Header title='Registrar' icon='chevron-left' onPress={() => navigation.goBack()} />
      <Box
        borderRadius={8}
        borderWidth={1}
        margin={4}
        padding={4}
        borderColor='darkgrey'
        _text={{ fontSize: 16, fontWeight: 'semibold' }}
      >
        O que você quer aprender?
      </Box>
      <ScrollView>
        <Text
          fontSize={16}
          marginX={4}
          marginBottom={4}
        >
          Para quem fala português:
        </Text>
        <VStack space={4} paddingX={4}>
          {languageList()}
        </VStack>
      </ScrollView>
      <View borderColor='gray.200' padding={4}>
        <Button
          fontSize={16}
          _text={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
          onPress={() => onSave()}>Continuar</Button>
      </View>
    </Box >
  );
};

