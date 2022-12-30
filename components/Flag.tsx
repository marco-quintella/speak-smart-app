import { Image } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';

const images: Record<string, any> = {
  us: require('../assets/flags/united-states-of-america.png')
};

export default function Flag () {
  const language = useAppSelector(state => state.language);

  const [uri, setUri] = useState(require('../assets/flags/united-states-of-america.png'));

  useEffect(() => {
    setUri(language?.currentLanguage?.flag ? language?.currentLanguage?.flag : 'us');
    console.log(uri);
  }, [language?.currentLanguage]);

  return (<Image source={images[uri]} style={{ width: 48, height: 48 }} />);
}