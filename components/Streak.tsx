import { Button, HStack, Image, Text } from 'native-base';
import { useAppSelector } from '../store/hooks';

export default function Streak () {
  const userStore = useAppSelector(state => state.user);

  return (
    <Button variant='ghost'>
      <HStack alignItems='center' space={2}>
        <Image alt='Streak Icon' source={require('../assets/icons/explosion.png')} style={{ width: 28, height: 28 }} />
        <Text style={{ fontSize: 20, color: 'white' }}>{userStore.userData?.streak ?? 0}</Text>
      </HStack>
    </Button>
  );
}