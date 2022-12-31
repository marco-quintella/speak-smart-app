import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Header } from '@rneui/themed';
import React, { ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Apples from '../../components/Apples';
import Flag from '../../components/Flag';
import PathItem from '../../components/PathItem';
import Stars from '../../components/Stars';
import Streak from '../../components/Streak';
import { useAppSelector } from '../../store/hooks';
import type { Lesson } from '../../types/lessons';
import { getLessons } from '../../utils/lessons';

type Props = BottomTabScreenProps<any, 'PathScreen'>;

export default function PathScreen ({ navigation }: Props) {
  const language = useAppSelector(state => state.language);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  async function fetchLessons () {
    const lessons = await getLessons(language?.currentLanguage?.id);
    if (lessons) setLessons(lessons);
  }

  useEffect(() => {
    fetchLessons();
  }, [language?.currentLanguage?.id]);

  function pathStructure () {
    if (lessons.length > 0) {
      console.log(lessons);

      const lastItem = lessons[lessons.length - 1];
      const lastStep = lastItem.step;

      let steps = [];

      for (let i = 0; i <= lastStep; i++) {
        const lessonsInStep = lessons.filter(lesson => lesson.step === i);
        const itemsInStep: ReactNode[] = [];
        console.log('lessons in step ' + i, lessonsInStep);
        lessonsInStep.forEach(l => {
          itemsInStep.push(<PathItem key={l.order} lesson={l} />);
        });
        steps.push(
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}
          >
            {itemsInStep}
          </View >
        );
      }

      return (
        <View style={{ marginTop: 8, flexDirection: 'column' }}>
          {steps}
        </View>
      );
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Header
          leftComponent={<Flag />}
          centerComponent={
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Stars />
              <Streak style={{ marginLeft: 16 }} />
            </View>
          }
          rightComponent={<Apples />}
        />
        {pathStructure()}
      </View>
    </SafeAreaView>
  );
}
