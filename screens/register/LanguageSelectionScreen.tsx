import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';
import { Button, Header, Text } from '@rneui/themed';
import { collection, getDocs } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../plugins/AuthLayer';
import { db } from '../../plugins/firebase';
import { setCurrentLanguage } from '../../store/language.reducer';
import type { Language } from '../../types/language';

export type LanguageSelectionScreenProps = NativeStackScreenProps<any, 'LanguageSelectionScreen'>;

export default function LanguageSelectionScreen ({ navigation }: LanguageSelectionScreenProps) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageList, setLanguageList] = useState<JSX.Element[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();
  const [userInfo, setUserInfo] = useState<any>(null);

  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();

  const fetchLanguages = getDocs(collection(db, 'languages'));

  useEffect(() => {
    fetchLanguages.then((snapshot) => {
      const _: Language[] = [];
      snapshot.forEach((doc) => {
        _.push({ ...doc.data() as Language, id: doc.id });
      });
      setLanguages(_);
    });
  }, []);

  useEffect(() => {
    setLanguageList(languages.map((language) =>
      <Button
        title={language.name}
        key={language.name}
        containerStyle={{ marginBottom: 16, opacity: !!selectedLanguage?.name ? selectedLanguage?.name === language.name ? 1 : 0.7 : 1 }}
        onPress={() => { setSelectedLanguage(language); }}
      />));
  }, [selectedLanguage, languages]);

  const onSave = () => {
    try {
      if (selectedLanguage) {
        dispatch(setCurrentLanguage(selectedLanguage));
        authContext?.promptAsync && authContext.promptAsync();
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flexDirection: 'column', flex: 1 }}>
      <View style={{ flexDirection: 'column', flexGrow: 1 }}>
        <Header
          leftComponent={<Button icon={<Icon name="chevron-left" color="white" onPress={() => navigation.goBack()} />} />}
          centerComponent={{ text: 'Registrar', style: { color: '#fff', alignItems: 'center', fontSize: 24, paddingTop: 4 } }}
        />
        <View style={{
          borderRadius: 8,
          borderWidth: 1,
          margin: 16,
          padding: 16,
          borderColor: 'darkgrey',
          flex: 0
        }}>
          <Text>O que você quer aprender?</Text>
        </View>
        <ScrollView>
          <Text style={{
            fontSize: 16,
            marginHorizontal: 16,
            marginBottom: 16
          }}>
            Para quem fala português:
          </Text>
          <View style={{
            marginHorizontal: 16,
            marginBottom: 16,
          }}>
            {languageList}
          </View>
        </ScrollView>
      </View>
      <View style={{ borderTopWidth: 1, borderTopColor: 'darkgrey' }}>
        <Button title="Continuar" containerStyle={{ margin: 16 }} onPress={() => onSave()} />
      </View>
    </SafeAreaView>
  );
};

