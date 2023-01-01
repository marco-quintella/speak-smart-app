import { Button, HStack, Image, Text } from 'native-base';
import { useAppSelector } from '../store';

export default function Apples () {
  const userStore = useAppSelector(state => state.user);

  return (
    <Button variant='ghost'>
      <HStack alignItems='center' space={2}>
        <Image alt='Apple Icon' source={require('../assets/icons/apple.png')} style={{ width: 28, height: 28 }} />
        <Text style={{ fontSize: 20, color: 'white' }}>{userStore.userData?.apples ?? 0}</Text>
      </HStack>
    </Button>
  );
}