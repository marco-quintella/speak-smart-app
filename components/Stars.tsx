import { Image, Text, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../store/hooks';
import colors from '../theme/colors';
import { currentWeekNumber } from '../utils/date';

export default function Stars () {
  const userStore = useAppSelector(state => state.user);

  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={require('../assets/icons/star.png')} style={{ width: 28, height: 28, marginRight: 8 }} />
      <Text style={{ fontSize: 20, color: colors.foreText }}>{userStore.userData?.stars?.[currentWeekNumber()] ?? 0}</Text>
    </TouchableOpacity>
  );
}