import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Box, Button, FormControl, Input, ScrollView, Text, VStack } from 'native-base';
import { ReactNode, useState } from 'react';
import { Header } from '../../../components';
import { AppNavigatorParamList } from '../../../navigation/AppNavigator';
import { db } from '../../../plugins/firebase';
import { Lesson } from '../../../types/lessons';

export type EditLessonsScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'EditLessonsScreen'>;

export default function EditLessonsScreen ({ navigation, route }: EditLessonsScreenProps) {
  const [lesson, setLesson] = useState<Partial<Lesson>>(route.params?.lesson ?? {
    icon: '',
    language: '',
    levels: 1,
    order: 0,
    title: '',
    step: 0,
    steps: [1],
  });

  const [error, setError] = useState<{
    icon?: string;
    language?: string;
    levels?: string;
    order?: string;
    title?: string;
    step?: string;
    steps?: string;
  }>({});

  async function onSave () {
    if (!lesson) {
      return;
    }

    const errors = {
      icon: !lesson.icon || lesson.icon === '' ? 'Icon is required' : undefined,
      language: !lesson.language ? 'Language is required' : undefined,
      levels: !lesson.levels ? 'Levels is required' : lesson.levels === 0 ? 'Levels must be greater than 0' : undefined,
      order: lesson?.order === undefined || lesson?.order === null ? 'Order is required' : undefined,
      title: !lesson.title || lesson.title === '' ? 'Title is required' : undefined,
      step: lesson?.step === undefined || lesson?.step === null ? 'Step is required' : undefined,
      steps: !lesson.steps ? 'Steps is required' : undefined,
    };
    setError(errors);
    if (Object.values(errors).some(error => !!error)) return;
    if (lesson.steps?.some(step => step === 0)) return;

    if (route.params?.edit) {
      const { id, ...data } = lesson;
      const ref = doc(collection(db, 'lessons'), id);
      await updateDoc(ref, data);
    } else {
      const ref = collection(db, 'lessons');
      await addDoc(ref, lesson);
    }
    navigation.goBack();
  }

  function setNumber (key: keyof Lesson, value?: string, allowZero: boolean = false) {
    if (!value) { setLesson({ ...lesson, [key]: undefined }); return; }
    setLesson({ ...lesson, [key]: parseInt(value.replace(/[^0-9]/g, '')) });
  }

  function setSteps (stepNumber: number, value: string) {
    if (!lesson.steps) setLesson({ ...lesson, steps: [] });
    if (!lesson.steps) return;
    const steps = [...lesson.steps];
    if (!value) {
      steps[stepNumber] = 1;
    } else {
      steps[stepNumber] = parseInt(value.replace(/[^0-9]/g, ''));
    }
    console.log({ stepNumber, value, steps });
    setLesson({ ...lesson, steps });
  }


  function steps () {
    const steps: ReactNode[] = [];
    if (!lesson.levels) return steps;
    for (let i = 0; i < lesson.levels; i++) {
      steps.push(
        <FormControl key={i} isRequired isInvalid={lesson?.steps?.[i] === 0}>
          <FormControl.Label>Number of Steps for Level {i + 1}</FormControl.Label>
          <Input
            placeholder='e.g. 3'
            keyboardType='numeric'
            defaultValue={lesson?.steps?.[i]?.toString() ?? '1'}
            onChangeText={text => setSteps(i, text)}
          />
          <FormControl.ErrorMessage>{lesson?.steps?.[i] === 0 ? 'Steps must be greater than 0' : undefined}</FormControl.ErrorMessage>
        </FormControl>
      );
    }
    return steps;
  };

  return (
    <Box safeArea h='100%'>
      <Header title={route.params?.edit ? 'Edit Lesson' : 'Add Lesson'} icon='chevron-left' onPress={() => navigation.goBack()} />
      <ScrollView>
        <VStack space={4} padding={4}>
          <Text>{JSON.stringify(lesson)}</Text>
          <FormControl isRequired isInvalid={!!error.title}>
            <FormControl.Label>Title</FormControl.Label>
            <Input
              placeholder='e.g. greetings'
              defaultValue={lesson?.title}
              onChangeText={text => setLesson({ ...lesson, title: text })}
            />
            <FormControl.ErrorMessage>{error.title}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!error.icon}>
            <FormControl.Label>Icon Slug</FormControl.Label>
            <Input
              placeholder='e.g. greet'
              defaultValue={lesson?.icon}
              onChangeText={text => setLesson({ ...lesson, icon: text })}
            />
            <FormControl.ErrorMessage>{error.icon}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!error.step}>
            <FormControl.Label>Path Step</FormControl.Label>
            <Input
              placeholder='e.g. 3'
              keyboardType='numeric'
              defaultValue={lesson?.step?.toString() ?? '1'}
              onChangeText={text => setNumber('step', text)}
            />
            <FormControl.ErrorMessage>{error.step}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!error.order}>
            <FormControl.Label>Path Step Order</FormControl.Label>
            <Input
              placeholder='e.g. 3'
              keyboardType='numeric'
              defaultValue={lesson?.order?.toString() ?? '1'}
              onChangeText={text => setNumber('order', text)}
            />
            <FormControl.ErrorMessage>{error.order}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!error.levels}>
            <FormControl.Label>Number of Levels</FormControl.Label>
            <Input
              placeholder='e.g. 3'
              keyboardType='numeric'
              defaultValue={lesson?.levels?.toString() ?? '1'}
              onChangeText={text => {
                if (text === '0') return;
                const int = parseInt(text);
                let arr = lesson.steps ? [...lesson.steps] : [];
                if (arr.length > int) {
                  arr = arr.slice(0, int - 1);
                }
                for (let i = 0; i < int; i++) {
                  if (!arr[i]) arr[i] = 1;
                }
                console.log({ arr, lesson });
                setLesson({ ...lesson, steps: arr, levels: int });
              }}
            />
            <FormControl.ErrorMessage>{error.levels}</FormControl.ErrorMessage>
          </FormControl>
          <Box bg='gray.200' borderRadius={4}>
            <VStack space={4} p={2}>
              {steps()}
            </VStack>
          </Box>
          <Button onPress={onSave}>Save</Button>
        </VStack>
      </ScrollView>
    </Box >
  );
}
