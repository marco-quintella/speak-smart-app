import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Header, Icon, Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../../../components';
import Flag from '../../../components/Flag';
import { AppNavigatorParamList } from '../../../navigation/AppNavigator';
import { Language } from '../../../types/language';
import { fetchLearningLanguages } from '../../../utils/languages';
import { capitalize } from '../../../utils/strings';

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
        key={index} containerStyle={{ marginTop: 16, width: '100%' }}
        onPress={() => navigation.navigate('AdminLessonsListScreen', { language })}
      >
        <Flag language={language} button={false} />
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginLeft: 8 }} >{capitalize(language?.name)}</Text>
      </Button>);
    });
  }

  return (
    <SafeAreaView>
      <Header
        leftComponent={
          <Button onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color='white' />
          </Button>
        }
        centerComponent={{ text: 'Admin Lessons', style: { color: '#fff', fontSize: 19, fontWeight: 'bold' } }}
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
        <Text style={{ fontWeight: 'bold' }}>Select a language</Text>
        {languagesList()}
      </View>
      <BottomNav />
    </SafeAreaView>
  );
}