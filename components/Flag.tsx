import { Image } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { Language } from '../types/language';

const images: Record<string, any> = {
  us: require('../assets/flags/united-states-of-america.png'),
  brazil: require('../assets/flags/brazil.png'),
  spain: require('../assets/flags/spain.png'),
};

export default function Flag ({ button = true, language }: {
  button?: boolean;
  language?: Language;
}) {
  const languageStore = useAppSelector(state => state.language);
  const _language = () => language ? language : languageStore.currentLanguage;

  const [uri, setUri] = useState(require('../assets/flags/united-states-of-america.png'));

  useEffect(() => {
    setUri(_language()?.flag ?? 'us');
  }, [language, languageStore.currentLanguage?.flag]);

  const image = () => <Image source={images[uri]} style={{ width: 32, height: 32 }} />;

  return button
    ? (
      <TouchableOpacity>
        {image()}
      </TouchableOpacity>
    )
    : (
      <View>
        {image()}
      </View>
    );
}