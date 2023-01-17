import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { Box, Button, FormControl, Input, ScrollView, VStack } from 'native-base';
import { useState } from 'react';
import { Header } from '~/components';
import { AppNavigatorParamList } from '~/navigation';
import { Unit } from '~/types';
import { unitsCollection } from '~/utils/units';

export type EditUnitsScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'EditUnitScreen'>;

export default function EditUnitsScreen ({ navigation, route }: EditUnitsScreenProps) {
  const { edit: editProp, unit: unitProp, course: courseProp } = route.params;

  const [unit, setUnit] = useState<Partial<Unit>>(
    unitProp ?? {
      unitIndex: undefined,
      course: courseProp?.id,
      teachingObjective: undefined,
      levels: 0,
      ref: '',
    });

  const [error, setError] = useState<{
    unitIndex?: string;
    teachingObjective?: string;
  }>({});


  function setValue (key: keyof Unit, value: string) {
    setUnit(Object.assign({}, unit, { [key]: value }));
  }

  function setNumber (key: keyof Unit, value: string) {
    const n = parseInt(value);
    setUnit(Object.assign({}, unit, { [key]: !isNaN(n) ? n : undefined }));
  }

  async function onSave () {
    try {
      if (!unit) return;

      const errors = {
        unitIndex: !unit.unitIndex ? 'Unit Index is required' : undefined,
        teachingObjective: !unit.teachingObjective ? 'Teaching Objective is required' : undefined,
      };
      setError(errors);
      if (Object.values(errors).some(error => !!error)) return;

      if (editProp) {
        const docRef = doc(unitsCollection, unit.id);
        const { id, ..._ } = unit;
        await updateDoc(docRef, _);
      } else {
        await addDoc(unitsCollection, unit);
      }

      navigation.goBack();
    } catch (error) {
      console.log('Error on onSave in EditUnitScreen', error);
    }
  }

  return (
    <Box safeArea h='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Edit Unit'
      />
      <ScrollView>
        <VStack
          p={4}
          space={4}
        >
          <FormControl isRequired isInvalid={!!error.unitIndex}>
            <FormControl.Label>Unit Index</FormControl.Label>
            <Input
              placeholder='0'
              defaultValue={unit.unitIndex?.toString()}
              onChangeText={value => setNumber('unitIndex', value)}
            />
            <FormControl.ErrorMessage>{error.unitIndex}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.teachingObjective}>
            <FormControl.Label>Teaching Objective</FormControl.Label>
            <Input
              placeholder='what you gonna learn here'
              defaultValue={unit.teachingObjective}
              onChangeText={value => setValue('teachingObjective', value)}
            />
            <FormControl.ErrorMessage>{error.teachingObjective}</FormControl.ErrorMessage>
          </FormControl>
          <Button onPress={() => onSave()}>Save</Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}