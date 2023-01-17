import { Button, Image, View } from 'native-base';
import { useEffect, useState } from 'react';
import { useAppSelector } from '~/store';
import type { Language } from '~/types';
import { capitalize } from '~/utils';

const images: Record<string, NodeRequire> = {
  us: require('~/assets/flags/united-states-of-america.png'),
  brazil: require('~/assets/flags/brazil.png'),
  spain: require('~/assets/flags/spain.png'),
};

export default function Flag ({ button = true, language }: {
  button?: boolean;
  language?: Language;
}) {
  const languageStore = useAppSelector(state => state.language);
  const _language = () => language ? language : languageStore.currentLanguage;

  const [uri, setUri] = useState(images[_language()?.flag ?? 'us']);

  useEffect(() => {
    setUri(images[_language()?.flag ?? 'us']);
  }, [language, languageStore.currentLanguage?.flag]);

  const image = () => <Image alt={`${capitalize(_language?.name)} Icon`} source={uri} style={{ width: 32, height: 32 }} />;

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