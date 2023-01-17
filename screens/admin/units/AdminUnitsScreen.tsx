import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { BottomNav, Header } from '~/components';
import { AppNavigatorParamList } from '~/navigation';
import { Unit } from '~/types';
import { capitalize, fetchUnitsByCourse } from '~/utils';

export type AdminUnitsScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminUnitsScreen'>;

export default function AdminUnitScreen ({ navigation, route }: AdminUnitsScreenProps) {
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
    const add = <Button
      key='add'
      h='12'
      onPress={() => navigation.navigate('EditUnitScreen', { edit: false, course })}
    >
      New Unit
    </Button>;
    return [add, ...units.map((unit, index) => {
      return (
        <Button
          key={index}
          h='12'
          onPress={() => navigation.navigate('EditUnitScreen', { unit, course })}
        >
          <Text color='white'>{unit?.unitIndex} - {capitalize(unit?.teachingObjective)}</Text>
        </Button>
      );
    })];
  }

  return (
    <Box safeArea h='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Units'
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