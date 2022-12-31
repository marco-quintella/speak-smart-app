import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Header, Icon, Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeNavigatorParamsList } from '../../../navigation/HomeNavigator';
import colors from '../../../theme/colors';
import type { Lesson } from '../../../types/lessons';
import { fetchLessons } from '../../../utils/lessons';

export type AdminLessonsListScreenProps = BottomTabScreenProps<HomeNavigatorParamsList, 'AdminLessonsListScreen'>;

export default function AdminLessonsListScreen ({ navigation, route }: AdminLessonsListScreenProps) {
  const language = route.params?.language;

  const [lessons, setLessons] = useState<Lesson[]>([]);

  async function getLessons () {
    if (!language) return;
    const lessons = await fetchLessons(language.id);
    if (!lessons) return;
    setLessons(lessons);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLessons();
    });
    return unsubscribe;
  }, [navigation]);

  const lessonsList = () => {
    const add = <Button key='add' title="New Lesson" containerStyle={{ width: '100%' }} titleStyle={{ fontSize: 16, fontWeight: 'bold' }} onPress={() => navigation.navigate('EditLessonsScreen', { edit: false })} />;
    return [add, ...lessons.map((lesson, index) => {
      return (<Button key={index} containerStyle={{ marginTop: 16, width: '100%' }} buttonStyle={{ opacity: 1 - lesson.order / 5 }} onPress={() => navigation.navigate('EditLessonsScreen', { edit: true, lesson })}>
        <Text style={{ color: colors.foreText, fontSize: 16, fontWeight: '700', marginLeft: 8 }} >{lesson?.title}</Text>
        <Text style={{ marginLeft: 8, fontWeight: 'bold', color: colors.foreText, fontStyle: 'italic' }}>Step:</Text>
        <Text style={{ color: colors.foreText, marginLeft: 4, fontStyle: 'italic' }}>{lesson?.step}</Text>
        <Text style={{ marginLeft: 8, fontWeight: 'bold', color: colors.foreText, fontStyle: 'italic' }}>Order:</Text>
        <Text style={{ color: colors.foreText, marginLeft: 4, fontStyle: 'italic' }}>{lesson?.order}</Text>
      </Button>);
    })];
  };

  return (
    <SafeAreaView>
      <Header
        leftComponent={<Button onPress={() => navigation.goBack()}><Icon name="chevron-left" color={colors.foreText} /></Button>}
        centerComponent={{ text: 'Lessons List', style: { color: '#fff', fontSize: 19, fontWeight: 'bold' } }}
        centerContainerStyle={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
      />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginVertical: 16,
          marginHorizontal: 8
        }}
      >
        {lessonsList()}
      </View>
    </SafeAreaView>
  );
}