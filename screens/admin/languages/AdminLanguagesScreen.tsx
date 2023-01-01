import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Button, Header, Icon, Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Flag from '../../../components/Flag';
import { HomeNavigatorParamsList } from '../../../navigation/HomeNavigator';
import colors from '../../../theme/colors';
import { Language } from '../../../types/language';
import { fetchLanguages } from '../../../utils/languages';
import { capitalize } from '../../../utils/strings';

export type AdminLanguagesScreenProps = BottomTabScreenProps<HomeNavigatorParamsList, 'AdminLanguagesScreen'>;

export default function AdminLanguagesScreen ({ navigation, route }: AdminLanguagesScreenProps) {
  const [languages, setLanguages] = useState<Language[]>([]);

  async function getLanguages () {
    const _languages = await fetchLanguages();
    if (!_languages) return;
    setLanguages(_languages);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLanguages();
    });
    return unsubscribe;
  }, []);

  function languagesList () {
    const add = <Button
      key='add'
      title="New Language"
      containerStyle={{ width: '100%' }}
      titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
      onPress={() => navigation.navigate('EditLanguagesScreen', { edit: false })}
    />;
    return [add, ...languages.map((language, index) => {
      return (<Button
        key={index} containerStyle={{ marginTop: 16, width: '100%' }}
        onPress={() => navigation.navigate('EditLanguagesScreen', { edit: true, language })}
      >
        <Flag language={language} button={false} />
        <Text style={{ color: colors.foreText, fontSize: 16, fontWeight: '700', marginLeft: 8 }} >{capitalize(language?.name)}</Text>
      </Button>);
    })];
  }

  return (
    <SafeAreaView>
      <Header
        leftComponent={
          <Button onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color={colors.foreText} />
          </Button>
        }
        centerComponent={{ text: 'Admin Languages Screen', style: { color: '#fff', fontSize: 19, fontWeight: 'bold' } }}
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
        {languagesList()}
      </View>
    </SafeAreaView>
  );
}