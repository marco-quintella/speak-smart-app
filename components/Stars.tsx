import { Button, HStack, Image, Text } from 'native-base';
import { useAppSelector } from '../store';
import { currentWeekNumber } from '../utils';

export default function Stars () {
  const userStore = useAppSelector(state => state.user);

  return (
    <Button variant='ghost'>
      <HStack alignItems='center' space={2}>
        <Image alt='Start Icon' source={require('../assets/icons/star.png')} style={{ width: 28, height: 28 }} />
        <Text style={{ fontSize: 20, color: 'white' }}>{userStore.userData?.stars?.[currentWeekNumber()] ?? 0}</Text>
      </HStack>
    </Button>
  );
}