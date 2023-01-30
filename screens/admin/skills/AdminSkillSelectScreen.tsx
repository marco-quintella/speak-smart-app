import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, FormControl, HStack, ScrollView, Select, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from '~/components';
import { AppNavigatorParamList } from '~/navigation';
import { Skill } from '~/types';
import { capitalize, fetchSkillsByLevel, fetchSkillsToAddToLevel } from '~/utils';

export type AdminSkillSelectScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminSkillSelectScreen'>;

export default function AdminSkillLevelSelectScreen ({ navigation, route }: AdminSkillSelectScreenProps) {
  const level = route.params?.level;

  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsToAdd, setSkillsToAdd] = useState<Skill[]>([]);
  const [addSkill, setAddSkill] = useState<string>();

  async function getSkills () {
    const _skills = await fetchSkillsByLevel(level?.id);
    if (!_skills) return;
    setSkills(_skills);
  }

  async function getSkillsToAdd () {
    const _skills = await fetchSkillsToAddToLevel(level?.id);
    if (!_skills) return;
    setSkillsToAdd(_skills);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      !level && navigation.goBack();
      getSkills();
    });
    return unsubscribe;
  }, []);

  const skillsList = () => {
    const add = <Button
      key='add'
      h='12'
      onPress={() => navigation.navigate('EditSkillScreen', { edit: false, level })}
    >
      New Skill
    </Button>;
    return [add, ...skills.map((skill, index) => {
      return (
        <Button
          key={index}
          h='12'
          onPress={() => navigation.navigate('EditSkillScreen', { edit: true, level, skill })}
        >
          <Text color='white'>{capitalize(skill?.shortname)}</Text>
        </Button >
      );
    })];
  };

  const skillsToAddRender = () => {
    return skillsToAdd.map((skill, index) => {
      return (
        <Select.Item
          label={skill.shortname}
          value={skill.id}
        />
      );
    });
  };

  return (
    <Box safeArea h='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Skills'
      />
      <ScrollView>
        <VStack
          space={4}
          padding={4}
        >

          {skillsToAddRender().length ?
            (<Box>
              <FormControl.Label mb={-4}>Add Skill</FormControl.Label>
              <HStack space={4}>
                <Select
                  flex={4}
                  selectedValue={addSkill}
                  onValueChange={itemValue => setAddSkill(itemValue)}
                >
                  {skillsToAddRender()}
                </Select>
                <Button onPress={() => console.log('add skill')} flex={1}>Add</Button>
              </HStack>
            </Box>)
            : null}

          {skillsList().length ? skillsList() : <Text>No skills found</Text>}
        </VStack>
      </ScrollView>
    </Box>
  );
}