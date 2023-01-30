import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from '~/components';
import { AppNavigatorParamList } from '~/navigation';
import { Level } from '~/types';
import { capitalize, fetchLevelsByUnit } from '~/utils';

export type AdminSkillLevelSelectScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminSkillLevelSelectScreen'>;

export default function AdminSkillLevelSelectScreen ({ navigation, route }: AdminSkillLevelSelectScreenProps) {
  const unit = route.params.unit;

  const [levels, setLevels] = useState<Level[]>([]);

  async function getLevels () {
    const _levels = await fetchLevelsByUnit(unit?.id);
    if (!_levels) return;
    setLevels(_levels);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      !unit && navigation.goBack();
      getLevels();
    });
    return unsubscribe;
  }, []);

  const levelsList = () => {
    return levels.map((level, index) => {
      return (
        <Button
          key={index}
          h='12'
          onPress={() => navigation.navigate('AdminSkillSelectScreen', { level })}
        >
          <Text color='white'>{level?.index} - {capitalize(level?.teachingObjective)}</Text>
        </Button >
      );
    });
  };

  return (
    <Box safeArea h='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Levels'
      />
      <ScrollView>
        <VStack
          space={4}
          padding={4}
        >
          {levelsList()}
        </VStack>
      </ScrollView>
    </Box>
  );
}