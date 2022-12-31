import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Header } from '@rneui/themed';
import React, { ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Apples from '../../components/Apples';
import Flag from '../../components/Flag';
import PathItem from '../../components/PathItem';
import Stars from '../../components/Stars';
import Streak from '../../components/Streak';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLessons, setUserLessons } from '../../store/lessons.reducer';
import { getLessons, getUserLessons } from '../../utils/lessons';

type Props = BottomTabScreenProps<any, 'PathScreen'>;

export default function PathScreen ({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const languageStore = useAppSelector(state => state.language);
  const userStore = useAppSelector(state => state.user);
  const lessonsStore = useAppSelector(state => state.lessons);

  async function fetchLessons () {
    const lessons = await getLessons(languageStore?.currentLanguage?.id);
    if (lessons) dispatch(setLessons(lessons));
  }

  async function fetchUserLessons () {
    const lessons = await getUserLessons(userStore?.user?.uid, languageStore?.currentLanguage?.id);
    if (lessons) dispatch(setUserLessons(lessons));
  }

  useEffect(() => {
    fetchLessons();
    fetchUserLessons();
  }, [languageStore?.currentLanguage?.id]);

  function pathStructure () {
    const lessons = lessonsStore?.lessons;
    if (lessons && lessons.length > 0) {
      const lastItem = lessons[lessons.length - 1];
      const lastStep = lastItem.step;
      let steps = [];

      for (let i = 0; i <= lastStep; i++) {
        const lessonsInStep = lessons.filter(lesson => lesson.step === i);
        const itemsInStep: ReactNode[] = [];
        lessonsInStep.forEach(l => {
          const userLesson = lessonsStore?.userLessons?.find(ul => ul.lessonId === l.id);
          itemsInStep.push(<PathItem key={l.order} lesson={l} userLesson={userLesson} />);
        });
        steps.push(
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: i > 0 ? 16 : 0
            }}
          >
            {itemsInStep}
          </View >
        );
      }

      return (
        <View style={{ marginVertical: 16, marginHorizontal: 8, flexDirection: 'column' }}>
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
