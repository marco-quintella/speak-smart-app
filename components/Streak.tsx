import { Image, StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useAppSelector } from '../store/hooks';
import colors from '../theme/colors';

export default function Streak (props: { style: StyleProp<ViewStyle>; }) {
  const userStore = useAppSelector(state => state.user);

  return (
    <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center' }, props.style]}>
      <Image source={require('../assets/icons/explosion.png')} style={{ width: 28, height: 28, marginRight: 8 }} />
      <Text style={{ fontSize: 20, color: colors.foreText }}>{userStore.userData?.streak ?? 0}</Text>
    </TouchableOpacity>
  );
}