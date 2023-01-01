import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, HStack, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { BottomNav, Header } from '../../../components';
import { AppNavigatorParamList } from '../../../navigation/AppNavigator';
import type { Lesson } from '../../../types/lessons';
import { fetchLessons } from '../../../utils/lessons';
import { capitalize } from '../../../utils/strings';

export type AdminLessonsListScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminLessonsListScreen'>;

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
    const add = <Button key='add' _text={{ fontWeight: '600' }} onPress={() => navigation.navigate('EditLessonsScreen', { edit: false })}>New Lesson</Button>;
    return [add, ...lessons.map((lesson, index) => {
      return (<Button key={index} onPress={() => navigation.navigate('EditLessonsScreen', { edit: true, lesson })}>
        <HStack space={2}>
          <Text color='white' fontWeight={700}>{lesson?.title}</Text>
          <Text color='white' fontWeight={500} fontStyle='italic'>Step:</Text>
          <Text color='white' fontStyle='italic'>{lesson?.step}</Text>
          <Text color='white' fontWeight={500} fontStyle='italic'>Order:</Text>
          <Text color='white' fontStyle='italic'>{lesson?.order}</Text>
        </HStack>
      </Button>);
    })];
  };

  return (
    <Box safeArea h='100%'>
      <Header icon='chevron-left' onPress={() => navigation.goBack()} title={capitalize(language?.name)} />
      <ScrollView>
        <VStack space={4} padding={4}>
          {lessonsList()}
        </VStack>
      </ScrollView>
      <BottomNav />
    </Box>
  );
}