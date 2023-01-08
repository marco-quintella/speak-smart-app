import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { Box, Button, FormControl, Input, ScrollView, Select, VStack } from 'native-base';
import { useState } from 'react';
import { Header } from '../../../components';
import { AppNavigatorParamList } from '../../../navigation';
import { setCourses, useAppSelector } from '../../../store';
import { useAppDispatch } from '../../../store/hooks';
import { Course } from '../../../types';
import { coursesCollection, fetchCourses } from '../../../utils';
import { capitalize } from '../../../utils/strings';

export type EditCoursesScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'EditCoursesScreen'>;

export default function AdminCoursesScreen ({ navigation, route }: EditCoursesScreenProps) {
  const { edit: editProp, course: courseProp } = route.params;
  const languageStore = useAppSelector(state => state.language);
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<Partial<Course>>(courseProp ?? {
    title: undefined,
    fromLanguageId: undefined,
    learningLanguageId: undefined,
  });
  const [error, setError] = useState<{
    title?: string;
    fromLanguageId?: string;
    learningLanguageId?: string;
  }>({});

  function setValue (key: keyof Course, value: string) {
    setCourse(Object.assign({}, course, { [key]: value.trimEnd() }));
  }

  async function onSave () {
    if (!course) return;

    const errors = {
      title: !course.title ? 'Title is required' : undefined,
      fromLanguageId: !course.fromLanguageId ? 'From Language is required' : undefined,
      learningLanguageId: !course.learningLanguageId ? 'Learning Language is required' : undefined,
    };
    setError(errors);
    if (Object.values(errors).some(error => !!error)) return;

    if (editProp) {
      const docRef = doc(coursesCollection, course?.id);
      const { id, ..._ } = course;
      await updateDoc(docRef, _);
    } else {
      const docRef = doc(coursesCollection, `${course?.learningLanguageId}_${course?.fromLanguageId}`);
      await setDoc(docRef, course);
    }

    dispatch(setCourses(await fetchCourses()));
    navigation.goBack();
  }

  return (
    <Box safeArea height='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Edit Courses'
      />
      <ScrollView>
        <VStack
          padding={4}
          space={4}
        >
          <FormControl isRequired isInvalid={!!error.title}>
            <FormControl.Label>Title</FormControl.Label>
            <Input
              placeholder='eg. english'
              defaultValue={course?.title}
              onChangeText={value => setValue('title', value)}
            />
            <FormControl.ErrorMessage>{error.title}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.fromLanguageId}>
            <FormControl.Label>From Language</FormControl.Label>
            <Select
              selectedValue={course?.fromLanguageId}
              onValueChange={value => setValue('fromLanguageId', value)}
            >
              {languageStore?.languages?.map(language => {
                return (
                  <Select.Item
                    key={language.id}
                    label={language.name}
                    value={language.id}
                  />
                );
              })}
            </Select>
            <FormControl.ErrorMessage>{error.fromLanguageId}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.learningLanguageId}>
            <FormControl.Label>Learning Language</FormControl.Label>
            <Select
              selectedValue={course?.learningLanguageId}
              onValueChange={value => setValue('learningLanguageId', value)}
            >
              {languageStore?.languages?.map(language => {
                return (
                  <Select.Item
                    key={language.id}
                    label={capitalize(language.name) ?? ''}
                    value={language.id}
                  />
                );
              })}
            </Select>
            <FormControl.ErrorMessage>{error.learningLanguageId}</FormControl.ErrorMessage>
          </FormControl>
          <Button onPress={() => onSave()}>Save</Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}