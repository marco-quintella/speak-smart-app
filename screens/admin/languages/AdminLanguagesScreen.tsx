import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, HStack, ScrollView, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { BottomNav, Flag, Header } from '~/components';
import { AppNavigatorParamList } from '~/navigation';
import { setLanguages } from '~/store';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Language } from '~/types';
import { capitalize, fetchLanguages } from '~/utils';

export type AdminLanguagesScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'AdminLanguagesScreen'>;

export default function AdminLanguagesScreen ({ navigation, route }: AdminLanguagesScreenProps) {
  const dispatch = useAppDispatch();
  const languagesStore = useAppSelector(state => state.language);

  const [languages, _setLanguages] = useState<Language[]>(languagesStore?.languages ?? []);

  async function getLanguages () {
    const _languages = await fetchLanguages();
    if (!_languages) return;
    _setLanguages(_languages);
    dispatch(setLanguages(_languages));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _setLanguages(languagesStore?.languages ?? []);
      (!languages || languages.length === 0) && getLanguages();
    });
    return unsubscribe;
  }, []);

  function languagesList () {
    const add = <Button
      key='add'
      h='12'
      onPress={() => navigation.navigate('EditLanguagesScreen', { edit: false })}
      _text={{ color: 'white', fontSize: 16, fontWeight: '600' }}
    >
      New Language
    </Button>;
    return [add, ...languages.map((language, index) => {
      return (
        <Button
          key={index}
          h='12'
          onPress={() => navigation.navigate('EditLanguagesScreen', {
            edit: true,
            language,
            languages
          })}
        >
          <HStack direction='row' alignItems='center' space={2}>
            <Flag language={language} button={false} />
            <Text fontWeight={600} color='white' fontSize={16}>{capitalize(language?.name)}</Text>
          </HStack>
        </Button>);
    })];
  }

  return (
    <Box safeArea height='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title='Languages'
      />
      <ScrollView>
        <VStack
          space={4}
          padding={4}
        >
          {languagesList()}
        </VStack>
      </ScrollView>
      <BottomNav />
    </Box>
  );
}