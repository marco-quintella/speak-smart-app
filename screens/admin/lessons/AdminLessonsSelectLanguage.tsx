import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Header, Icon, Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Flag from '../../../components/Flag';
import { HomeNavigatorParamsList } from '../../../navigation/HomeNavigator';
import colors from '../../../theme/colors';
import { Language } from '../../../types/language';
import { fetchLearningLanguages } from '../../../utils/languages';
import { capitalize } from '../../../utils/strings';

export type AdminLessonsSelectLanguageProps = BottomTabScreenProps<HomeNavigatorParamsList, 'AdminLessonsSelectLanguage'>;

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
        <Text style={{ color: colors.foreText, fontSize: 16, fontWeight: '700', marginLeft: 8 }} >{capitalize(language?.name)}</Text>
      </Button>);
    });
  }

  return (
    <SafeAreaView>
      <Header
        leftComponent={
          <Button onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color={colors.foreText} />
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
    </SafeAreaView>
  );
}