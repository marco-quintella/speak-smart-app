import { Button, Image, View } from 'native-base';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { Language } from '../types';

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

  const image = () => <Image alt='Flag Icon' source={require('../assets/flags/united-states-of-america.png')} style={{ width: 32, height: 32 }} />;

  return button
    ? (
      <Button variant='ghost'>
        {image()}
      </Button>
    )
    : (
      <View>
        {image()}
      </View>
    );
}