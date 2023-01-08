import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, HStack, ScrollView, VStack } from 'native-base';
import React, { ReactNode, useEffect } from 'react';
import Apples from '../../components/Apples';
import BottomNav from '../../components/BottomNav';
import Flag from '../../components/Flag';
import Stars from '../../components/Stars';
import Streak from '../../components/Streak';
import UnitHeader from '../../components/UnitHeader';
import { AppNavigatorParamList } from '../../navigation';
import { setUnits, useAppDispatch, useAppSelector } from '../../store';
import { fetchUnitsByCourse } from '../../utils/units';

type Props = NativeStackScreenProps<AppNavigatorParamList, 'PathScreen'>;

export default function PathScreen ({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const languageStore = useAppSelector(state => state.language);
  const pathStore = useAppSelector(state => state.path);

  async function getUnits () {
    const units = await fetchUnitsByCourse(languageStore?.currentCourse?.id);
    if (units) dispatch(setUnits(units));
  }

  useEffect(() => {
    getUnits();
  }, [languageStore?.currentLanguage?.id]);

  function pathStructure () {
    const units = pathStore?.units;
    if (units && units.length > 0) {
      let unitsStructures: ReactNode[] = [];

      units.forEach(u => {
        unitsStructures.push(<UnitHeader key={u.id} unit={u} />);
      });


      // const lastItem = levels[levels.length - 1];
      // const lastStep = lastItem.step;
      // let steps = [];

      // for (let i = 0; i <= lastStep; i++) {
      //   const lessonsInStep = levels.filter(lesson => lesson.step === i);
      //   const itemsInStep: ReactNode[] = [];
      //   lessonsInStep.forEach(l => {
      //     const userLesson = lessonsStore?.userLessons?.find(ul => ul.lessonId === l.id);
      //     itemsInStep.push(<PathItem key={l.order} lesson={l} userLesson={userLesson} onPress={() => navigation.navigate('ActivityScreen')} />);
      //   });
      //   steps.push(
      //     <View
      //       key={i}
      //       style={{
      //         flexDirection: 'row',
      //         justifyContent: 'space-evenly',
      //         marginTop: i > 0 ? 16 : 0
      //       }}
      //     >
      //       {itemsInStep}
      //     </View >
      //   );
      // }

      return (
        <VStack>
          {unitsStructures}
        </VStack>
      );
    }
  }

  return (
    <Box safeArea height='100%'>
      <HStack bg="primary.600" alignItems='center' justifyContent='space-between' height={12}>
        <Flag />
        <Stars />
        <Streak />
        <Apples />
      </HStack>
      <ScrollView>
        {pathStructure()}
      </ScrollView>
      <BottomNav />
    </Box>
  );
}
