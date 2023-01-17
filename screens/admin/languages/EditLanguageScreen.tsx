import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Box, Button, FormControl, Input, ScrollView, Text, VStack } from 'native-base';
import { useState } from 'react';
import { Header } from '~/components';
import { AppNavigatorParamList } from '~/navigation';
import { db } from '~/plugins/firebase';
import { setLanguages } from '~/store';
import { useAppDispatch } from '~/store/hooks';
import { Language } from '~/types';
import { fetchLanguages } from '~/utils';

export type EditLanguagesScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'EditLanguagesScreen'>;

export default function EditLanguagesScreen ({ navigation, route }: EditLanguagesScreenProps) {
  const dispatch = useAppDispatch();

  const [language, setLanguage] = useState<Partial<Language> | undefined>(
    route.params?.language ?? {
      name: undefined,
      flag: undefined,
      translations: {},
    }
  );

  const [error, setError] = useState<{
    name?: string;
    flag?: string;
  }>({});

  function setValue (key: keyof Language, value: any) {
    setLanguage(Object.assign({}, language, { [key]: value }));
  }

  function setTranslation (lang: string, value: string) {
    const translations = Object.assign({}, language?.translations, { [lang]: value });
    setLanguage(Object.assign({}, language, { translations }));
  }

  async function onSave () {
    if (!language) {
      return;
    }

    const errors = {
      name: !language.name ? 'Name is required' : undefined,
      flag: !language.flag ? 'Flag is required' : undefined,
    };
    setError(errors);
    if (Object.values(errors).some(error => !!error)) return;

    if (route.params?.edit) {
      const ref = doc(collection(db, 'languages'), language?.id);
      const { id, ..._ } = language;
      await updateDoc(ref, _);
    } else {
      const ref = collection(db, 'languages');
      await addDoc(ref, language);
    }

    dispatch(setLanguages(await fetchLanguages()));
    navigation.goBack();
  }

  return (
    <Box safeArea flexDirection='column' height='100%'>
      <Header
        icon='chevron-left'
        onPress={() => navigation.goBack()}
        title={route.params?.edit ? `Edit ${language?.name}` : 'New Language'}
      />
      <ScrollView>
        <VStack padding={4} space={4} flex={1}>
          <FormControl isRequired isInvalid={!!error.name}>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              placeholder='e.g. english'
              defaultValue={language?.name}
              onChangeText={text => setValue('name', text)}
            />
            <FormControl.ErrorMessage>{error.name}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!error.flag}>
            <FormControl.Label>Flag Slug</FormControl.Label>
            <Input
              placeholder='e.g. en'
              defaultValue={language?.flag}
              onChangeText={text => setValue('flag', text)}
            />
            <FormControl.ErrorMessage>{error.flag}</FormControl.ErrorMessage>
          </FormControl>
          <Text fontSize='md' fontWeight='bold'>Translations</Text>
          {route.params?.languages?.filter(lang => lang.id !== language?.id).map(lang => (
            <FormControl isRequired key={lang.id}>
              <FormControl.Label>{lang.name}</FormControl.Label>
              <Input
                placeholder='e.g. english'
                defaultValue={language?.translations?.[lang.id]}
                onChangeText={text => setTranslation(lang.id, text)}
              />
            </FormControl>
          ))}
        </VStack>
        <VStack space={4} padding={4}>
          <Button onPress={onSave}>Save</Button>
        </VStack>
      </ScrollView>
    </Box >
  );
}