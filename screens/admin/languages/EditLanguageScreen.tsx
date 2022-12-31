import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, CheckBox, Header, Icon, Input, Text } from '@rneui/themed';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeNavigatorParamsList } from '../../../navigation/HomeNavigator';
import { db } from '../../../plugins/firebase';
import colors from '../../../theme/colors';
import { Language } from '../../../types/language';

export type EditLanguagesScreenProps = BottomTabScreenProps<HomeNavigatorParamsList, 'EditLanguagesScreen'>;

export default function EditLanguagesScreen ({ navigation, route }: EditLanguagesScreenProps) {
  const [language, setLanguage] = useState<Language | undefined>(route.params?.language ?? {
    learning: false,
    app: false,
    name: '',
    flag: ''
  });

  const [error, setError] = useState<{
    name?: string;
    flag?: string;
  }>({});

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

    navigation.goBack();
  }

  return (
    <SafeAreaView>
      <Header
        leftComponent={<Button onPress={() => navigation.goBack()}><Icon name="chevron-left" color={colors.foreText} /></Button>}
        centerComponent={{ text: 'Edit Language Screen', style: { color: '#fff', fontSize: 19, fontWeight: 'bold' } }}
        centerContainerStyle={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
      />
      <View style={{ flexDirection: 'column', marginHorizontal: 8, marginVertical: 16 }}>
        <Text style={{ fontWeight: 'bold' }}>Language: {language?.id}</Text>
        <Input
          label={<Text style={{ fontWeight: 'bold' }}>Name</Text>}
          containerStyle={{ marginTop: 16 }}
          placeholder='e.g. english'
          defaultValue={language?.name}
          onChangeText={text => setLanguage({ ...language, name: text })}
        />
        <Input
          label={<Text style={{ fontWeight: 'bold' }}>Flag Slug</Text>}
          containerStyle={{ marginTop: 16 }}
          placeholder='e.g. en'
          defaultValue={language?.flag}
          onChangeText={text => setLanguage({ ...language, flag: text })}
        />
        <CheckBox
          title="Is Learning Language"
          checked={language?.learning ?? false}
          onPress={() => setLanguage({ ...language, learning: !language?.learning })}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
        <CheckBox
          title="Is App Language"
          checked={language?.app ?? false}
          onPress={() => setLanguage({ ...language, app: !language?.app })}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
        <Button title="Save" containerStyle={{ marginTop: 16, width: '100%' }} onPress={onSave} />
      </View>
    </SafeAreaView>
  );
}