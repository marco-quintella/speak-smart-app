import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { Box, Button, FormControl, Input, ScrollView, Select, VStack } from 'native-base';
import { useState } from 'react';
import { Header } from '~/components';
import { AppNavigatorParamList } from '~/navigation';
import { Skill } from '~/types';
import { skillsCollection } from '~/utils';

export type EditSkillScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'EditSkillScreen'>;

export default function EditSkillScreen ({ navigation, route }: EditSkillScreenProps) {
  const { edit: editProp, level: levelProp, skill: skillProp } = route.params;

  const [skill, setSkill] = useState<Partial<Skill>>(
    skillProp ?? {
      course: levelProp?.course,
      levels: levelProp?.id ? [levelProp.id] : [],
      name: '',
      shortname: '',
      skillType: 'normal'
    }
  );

  const [error, setError] = useState<{
    course?: string;
    levels?: string;
    name?: string;
    shortname?: string;
    skillType?: string;
  }>({});

  function setValue (key: keyof Skill, value: any) {
    setSkill(Object.assign({}, skill, { [key]: value }));
  }

  function setNumber (key: keyof Skill, value: string) {
    const n = parseInt(value);
    setSkill(Object.assign({}, skill, { [key]: !isNaN(n) ? n : undefined }));
  }

  async function onSave () {
    try {
      if (!skill) return;

      const errors = {
        name: !skill.name ? 'Name is required' : undefined,
        shortname: !skill.shortname ? 'Short Name is required' : undefined,
        skillType: !skill.skillType ? 'Skill Type is required' : undefined,
      };
      setError(errors);
      if (Object.values(errors).some(error => !!error)) return;

      if (editProp) {
        const docRef = doc(skillsCollection, skill.id);
        const { id, ..._ } = skill;
        await updateDoc(docRef, _);
      } else {
        await addDoc(skillsCollection, skill);
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
          <FormControl isRequired isInvalid={!!error.name}>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              placeholder='Level Name'
              defaultValue={skill.name}
              onChangeText={value => setValue('name', value)}
            />
            <FormControl.ErrorMessage>{error.name}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.shortname}>
            <FormControl.Label>Short Name</FormControl.Label>
            <Input
              placeholder='what you gonna learn here'
              defaultValue={skill.shortname}
              onChangeText={value => setValue('shortname', value)}
            />
            <FormControl.ErrorMessage>{error.shortname}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.skillType}>
            <FormControl.Label>Skill Type</FormControl.Label>
            <Select
              selectedValue={skill.skillType}
              onValueChange={value => setValue('skillType', value)}
            >
              <Select.Item label="Normal" value="normal" />
              <Select.Item label="Special" value="special" />
            </Select>
          </FormControl>

          <Button onPress={() => onSave()}>Save</Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}