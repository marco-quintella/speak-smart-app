import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Header, Icon, Input } from '@rneui/themed';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ReactNode, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeNavigatorParamsList } from '../../../navigation/HomeNavigator';
import { db } from '../../../plugins/firebase';
import colors from '../../../theme/colors';
import { Lesson } from '../../../types/lessons';

export type EditLessonsScreenProps = BottomTabScreenProps<HomeNavigatorParamsList, 'EditLessonsScreen'>;

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
      order: !lesson.order ? 'Order is required' : undefined,
      title: !lesson.title || lesson.title === '' ? 'Title is required' : undefined,
      step: !lesson.step ? 'Step is required' : undefined,
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

  function setNumber (key: keyof Lesson, value?: string) {
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
    setLesson({ ...lesson, steps });
  }

  function steps () {
    const steps: ReactNode[] = [];
    if (!lesson.levels) return steps;
    for (let i = 0; i < lesson.levels; i++) {
      steps.push(
        <Input
          key={i}
          label={<Text style={{ fontWeight: 'bold' }}>Number of Steps for Level {i + 1}</Text>}
          containerStyle={{ marginTop: 16 }}
          placeholder='e.g. 3'
          keyboardType='numeric'
          defaultValue={lesson?.steps?.[i]?.toString() ?? '1'}
          onChangeText={text => setSteps(i, text)}
          errorMessage={lesson?.steps?.[i] === 0 ? 'Steps must be greater than 0' : undefined}
        />);
    }
    return steps;
  };

  return (
    <SafeAreaView style={{ flexDirection: 'column' }}>
      <View style={{ flexGrow: 1, flexDirection: 'column' }}>
        <Header
          leftComponent={<Button onPress={() => navigation.goBack()}><Icon name="chevron-left" color={colors.foreText} /></Button>}
          centerComponent={{ text: 'Lessons List', style: { color: '#fff', fontSize: 19, fontWeight: 'bold' } }}
          centerContainerStyle={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 186, paddingTop: 16, paddingHorizontal: 8 }}>
          <Text>{JSON.stringify(lesson)}</Text>
          <Input
            label={<Text style={{ fontWeight: 'bold' }}>Title</Text>}
            containerStyle={{ marginTop: 16 }}
            placeholder='e.g. greetings'
            defaultValue={lesson?.title}
            onChangeText={text => setLesson({ ...lesson, title: text })}
            errorMessage={error.title}
          />
          <Input
            label={<Text style={{ fontWeight: 'bold' }}>Icon Slug</Text>}
            containerStyle={{ marginTop: 16 }}
            placeholder='e.g. greet'
            defaultValue={lesson?.icon}
            onChangeText={text => setLesson({ ...lesson, icon: text })}
            errorMessage={error.icon}
          />
          <Input
            label={<Text style={{ fontWeight: 'bold' }}>Path Step</Text>}
            containerStyle={{ marginTop: 16 }}
            placeholder='e.g. 3'
            keyboardType='numeric'
            defaultValue={lesson?.step?.toString() ?? '1'}
            onChangeText={text => setNumber('step', text)}
            errorMessage={error.step}
          />
          <Input
            label={<Text style={{ fontWeight: 'bold' }}>Path Step Order</Text>}
            containerStyle={{ marginTop: 16 }}
            placeholder='e.g. 3'
            keyboardType='numeric'
            defaultValue={lesson?.order?.toString() ?? '1'}
            onChangeText={text => setNumber('order', text)}
            errorMessage={error.order}
          />
          <Input
            label={<Text style={{ fontWeight: 'bold' }}>Number of Levels</Text>}
            containerStyle={{ marginTop: 16 }}
            placeholder='e.g. 3'
            keyboardType='numeric'
            defaultValue={lesson?.levels?.toString() ?? '1'}
            onChangeText={text => setNumber('levels', text)}
            errorMessage={error.levels}
          />
          <View style={{ backgroundColor: 'gainsboro', borderRadius: 8 }}>
            {steps()}
          </View>

          <Button title="Save" containerStyle={{ marginTop: 16, width: '100%' }} onPress={onSave} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
