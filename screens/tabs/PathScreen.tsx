import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '@rneui/themed';
import { Box, ScrollView } from 'native-base';
import React, { ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import Apples from '../../components/Apples';
import BottomNav from '../../components/BottomNav';
import Flag from '../../components/Flag';
import PathItem from '../../components/PathItem';
import Stars from '../../components/Stars';
import Streak from '../../components/Streak';
import { AppNavigatorParamList } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLessons, setUserLessons } from '../../store/lessons.reducer';
import { fetchLessons, fetchUserLessons } from '../../utils/lessons';

type Props = NativeStackScreenProps<AppNavigatorParamList, 'PathScreen'>;

export default function PathScreen ({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  const languageStore = useAppSelector(state => state.language);
  const userStore = useAppSelector(state => state.user);
  const lessonsStore = useAppSelector(state => state.lessons);

  async function getLessons () {
    const lessons = await fetchLessons(languageStore?.currentLanguage?.id);
    if (lessons) dispatch(setLessons(lessons));
  }

  async function getUserLessons () {
    const lessons = await fetchUserLessons(userStore?.user?.uid, languageStore?.currentLanguage?.id);
    if (lessons) dispatch(setUserLessons(lessons));
  }

  useEffect(() => {
    getLessons();
    getUserLessons();
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
          itemsInStep.push(<PathItem key={l.order} lesson={l} userLesson={userLesson} onPress={() => navigation.navigate('ActivityScreen')} />);
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
    <Box safeArea height='100%'>
      <View>
        <Header
          leftComponent={<Flag />}
          centerComponent={
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Stars />
              <Streak />
            </View>
          }
          rightComponent={<Apples />}
        />
      </View>
      <ScrollView>
        {pathStructure()}
      </ScrollView>
      <BottomNav />
    </Box>
  );
}
