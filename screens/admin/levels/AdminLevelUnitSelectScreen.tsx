import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { BottomNav, Header } from '../../../components';
import { AppNavigatorParamList } from '../../../navigation';
import { Unit } from '../../../types';
import { capitalize, fetchUnitsByCourse } from '../../../utils';

export type AdminLevelUnitSelectScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminLevelUnitSelectScreen'>;

export default function AdminLevelUnitSelectScreen ({ navigation, route }: AdminLevelUnitSelectScreenProps) {
  const course = route.params?.course;

  const [units, setUnits] = useState<Unit[]>([]);

  async function getUnits () {
    const _units = await fetchUnitsByCourse(course?.id);
    if (!_units) return;
    setUnits(_units);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      !course && navigation.goBack();
      getUnits();
    });
    return unsubscribe;
  }, []);

  function unitsList () {
    return units.map((unit, index) => {
      return (
        <Button
          key={index}
          h='12'
          onPress={() => navigation.navigate('AdminLevelScreen', { unit })}
        >
          <Text color='white'>{unit?.unitIndex} - {capitalize(unit?.teachingObjective)}</Text>
        </Button>
      );
    });
  }

  return (
    <Box safeArea h='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Levels - Unit Select'
      />
      <ScrollView>
        <VStack
          space={4}
          padding={4}
        >
          {unitsList()}
        </VStack>
      </ScrollView>
      <BottomNav />
    </Box>
  );
}