import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, Flex, VStack } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { AppNavigatorParamList } from '../navigation/AppNavigator';

export type StartScreenProps = NativeStackScreenProps<AppNavigatorParamList, 'StartScreen'>;

export default function StartScreen ({ navigation }: StartScreenProps) {
  return (
    <Box safeArea height='100%' width='100%'>
      <VStack space={4} paddingX={8} paddingY={16} direction='column' height='100%'>
        <Flex flex={1} direction='column' alignItems='center' justifyContent='center'>
          <Text>duolingo</Text>
          <Text>Free</Text>
        </Flex>
        <Button onPress={() => navigation.navigate('LanguageSelectionScreen')}>Start Now</Button>
        <Button>Log In</Button>
      </VStack>
    </Box>
  );
}
