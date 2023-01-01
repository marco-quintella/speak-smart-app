import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, HStack, Icon, IconButton, ScrollView, Text, View, VStack } from 'native-base';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppNavigatorParamList } from '../../navigation';
import { AuthContext } from '../../plugins';
import { setCurrentLanguage } from '../../store/language.reducer';
import type { Language } from '../../types/language';
import { fetchLearningLanguages } from '../../utils/languages';
import { capitalize } from '../../utils/strings';

export type LanguageSelectionScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'LanguageSelectionScreen'>;

export default function LanguageSelectionScreen ({ navigation }: LanguageSelectionScreenProps) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();
  const [userInfo, setUserInfo] = useState<any>(null);

  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();

  async function fetchLanguages () {
    const languages = await fetchLearningLanguages();
    if (!languages) return;
    setLanguages(languages);
  }

  useEffect(() => {
    fetchLanguages();
  }, []);

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

  function languageList () {
    return (
      languages.map((language) =>
        <Button
          key={language.name}
          opacity={!!selectedLanguage?.id ? selectedLanguage?.id === language.id ? 1 : 0.7 : 1}
          onPress={() => { setSelectedLanguage(language); }}
        >
          <Text fontSize={16} fontWeight='semibold' color='white'>
            {capitalize(language.name)}
          </Text>
        </Button>)
    );
  }

  return (
    <Box safeArea style={{ flexDirection: 'column', flex: 1 }}>
      <HStack bg="primary.600" alignItems='center' justifyContent='space-between' height={12}>
        <IconButton
          icon={<Icon size="md" as={MaterialIcons} name="chevron-left" color="white" />}
          onPress={() => navigation.goBack()}
          width={12}
        />
        <Text color='white' fontSize={20} fontWeight='bold'>Registrar</Text>
        <View width={12} />
      </HStack>
      <Box
        borderRadius={8}
        borderWidth={1}
        margin={4}
        padding={4}
        borderColor='darkgrey'
        _text={{ fontSize: 16, fontWeight: 'semibold' }}
      >
        O que você quer aprender?
      </Box>
      <ScrollView>
        <Text
          fontSize={16}
          marginX={4}
          marginBottom={4}
        >
          Para quem fala português:
        </Text>
        <VStack space={4} paddingX={4}>
          {languageList()}
        </VStack>
      </ScrollView>
      <View borderColor='gray.200' padding={4}>
        <Button
          fontSize={16}
          _text={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
          onPress={() => onSave()}>Continuar</Button>
      </View>
    </Box >
  );
};

