import { useNavigation, useRoute } from '@react-navigation/native';
import { Center, HStack, Image, Pressable } from 'native-base';
import { useAppSelector } from '../store/hooks';

export default function BottomNav () {
  const userStore = useAppSelector(state => state.user);
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <HStack height={12} bg='white' alignItems='center' justifyContent='space-evenly' shadow={4}>
      <Pressable opacity={route.name === 'PathScreen' ? 1 : 0.5} py="3" flex={1} onPress={() => navigation.navigate('PathScreen')}>
        <Center>
          <Image source={require('../assets/icons/path.png')} alt="Path Screen Button" size={8} />
        </Center>
      </Pressable>
      {userStore?.userData?.isAdmin ?
        (<Pressable opacity={route.name === 'AdminHomeScreen' ? 1 : 0.5} py="3" flex={1} onPress={() => navigation.navigate('AdminHomeScreen')}>
          <Center>
            <Image source={require('../assets/icons/manager.png')} alt="Admin Screen Button" size={8} />
          </Center>
        </Pressable>)
        : undefined}
    </HStack>
  );
}