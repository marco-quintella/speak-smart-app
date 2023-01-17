import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { Box, Button, FormControl, Input, ScrollView, Switch, VStack } from 'native-base';
import { useState } from 'react';
import { Header } from '~/components';
import { AppNavigatorParamList } from '~/navigation';
import { Level } from '~/types';
import { levelsCollection } from '~/utils';

export type EditLevelScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'EditLevelScreen'>;

export default function EditLevelScreen ({ navigation, route }: EditLevelScreenProps) {
  const { edit: editProp, level: levelProp, unit: unitProp } = route.params;


  const [level, setLevel] = useState<Partial<Level>>(
    levelProp ?? {
      index: 0,
      course: unitProp?.course,
      unit: unitProp?.id,
      hasLevelReview: false,
      isInProgressSequence: false,
      name: undefined,
      teachingObjective: undefined,
      skills: [],
      subtype: 'regular',
      totalSessions: 1,
      type: 'skill'
    }
  );

  const [error, setError] = useState<{
    index?: string;
    hasLevelReview?: string;
    isInProgressSequence?: string;
    name?: string;
    teachingObjective?: string;
    totalSessions?: string;
  }>({});

  function setValue (key: keyof Level, value: any) {
    setLevel(Object.assign({}, level, { [key]: value }));
  }

  function setNumber (key: keyof Level, value: string) {
    const n = parseInt(value);
    setLevel(Object.assign({}, level, { [key]: !isNaN(n) ? n : undefined }));
  }

  async function onSave () {
    try {
      if (!level) return;

      const errors = {
        index: !level.index ? 'Index is required' : undefined,
        hasLevelReview: !level.hasLevelReview ? 'Has Level Review is required' : undefined,
        isInProgressSequence: !level.isInProgressSequence ? 'Is In Progress Sequence is required' : undefined,
        name: !level.name ? 'Name is required' : undefined,
        teachingObjective: !level.teachingObjective ? 'Teaching Objective is required' : undefined,
        totalSessions: !level.totalSessions ? 'Total Sessions is required' : undefined,
      };
      setError(errors);
      if (Object.values(errors).some(error => !!error)) return;

      if (editProp) {
        const docRef = doc(levelsCollection, level.id);
        const { id, ..._ } = level;
        await updateDoc(docRef, _);
      } else {
        await addDoc(levelsCollection, level);
      }

      navigation.goBack();
    } catch (error) {
      console.log('Error on onSave in EditLevelScreen', error);
    }
  }

  return (
    <Box safeArea h='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Edit Level'
      />
      <ScrollView>
        <VStack
          p={4}
          space={4}
        >
          <FormControl isRequired isInvalid={!!error.index}>
            <FormControl.Label>Level Index</FormControl.Label>
            <Input
              placeholder='0'
              defaultValue={level.index?.toString()}
              onChangeText={value => setNumber('index', value)}
            />
            <FormControl.ErrorMessage>{error.index}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.name}>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              placeholder='Level Name'
              defaultValue={level.name}
              onChangeText={value => setValue('name', value)}
            />
            <FormControl.ErrorMessage>{error.name}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.teachingObjective}>
            <FormControl.Label>Teaching Objective</FormControl.Label>
            <Input
              placeholder='what you gonna learn here'
              defaultValue={level.teachingObjective}
              onChangeText={value => setValue('teachingObjective', value)}
            />
            <FormControl.ErrorMessage>{error.teachingObjective}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.totalSessions}>
            <FormControl.Label>Total Sessions</FormControl.Label>
            <Input
              placeholder='1'
              defaultValue={level.totalSessions?.toString()}
              onChangeText={value => setNumber('totalSessions', value)}
            />
            <FormControl.ErrorMessage>{error.totalSessions}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.hasLevelReview}>
            <FormControl.Label>Has Level Review</FormControl.Label>
            <Box flexDir='row'>
              <Switch
                defaultIsChecked={level.hasLevelReview}
                onValueChange={value => setValue('hasLevelReview', !level.hasLevelReview)}
              />
            </Box>
            <FormControl.ErrorMessage>{error.hasLevelReview}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.isInProgressSequence}>
            <FormControl.Label>Is In Progress Sequence</FormControl.Label>
            <Box flexDir='row'>
              <Switch
                defaultIsChecked={level.isInProgressSequence}
                onValueChange={value => setValue('isInProgressSequence', !level.isInProgressSequence)}
              />
            </Box>
            <FormControl.ErrorMessage>{error.isInProgressSequence}</FormControl.ErrorMessage>
          </FormControl>

          <Button onPress={() => onSave()}>Save</Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}