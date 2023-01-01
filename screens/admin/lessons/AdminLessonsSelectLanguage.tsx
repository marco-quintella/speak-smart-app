import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, HStack, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { BottomNav, Flag, Header } from '../../../components';
import { AppNavigatorParamList } from '../../../navigation';
import type { Language } from '../../../types';
import { capitalize, fetchLearningLanguages } from '../../../utils';

export type AdminLessonsSelectLanguageProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminLessonsSelectLanguage'>;

export default function AdminLessonsSelectLanguage ({ navigation, route }: AdminLessonsSelectLanguageProps) {
  const [languages, setLanguages] = useState<Language[]>([]);

  async function getLanguages () {
    const _languages = await fetchLearningLanguages();
    if (!_languages) return;
    setLanguages(_languages);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLanguages();
    });
    return unsubscribe;
  }, [navigation]);

  function languagesList () {
    return languages.map((language, index) => {
      return (<Button
        key={index}
        onPress={() => navigation.navigate('AdminLessonsListScreen', { language })}
        h={12}
      >
        <HStack alignItems='center' space={2}>
          <Flag language={language} button={false} />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }} >{capitalize(language?.name)}</Text>
        </HStack>
      </Button>);
    });
  }

  return (
    <Box safeArea height='100%'>
      <Header icon='chevron-left' onPress={() => navigation.goBack()} title='Select a language' />
      <ScrollView>
        <VStack space={4} padding={4}>
          {languagesList()}
        </VStack>
      </ScrollView>
      <BottomNav />
    </Box>
  );
}