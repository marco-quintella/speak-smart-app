import { MaterialIcons } from '@expo/vector-icons';
import { Button, HStack, Icon, IconButton, Text, View } from 'native-base';

export interface HeaderProps {
  title?: string;
  onPress?: Function;
  icon?: string;
  backText?: string;
}

export default function Header ({ icon, onPress, title, backText }: HeaderProps) {
  return (
    <HStack bg="primary.600" alignItems='center' justifyContent='space-between' height={12}>
      {icon ? <IconButton
        icon={<Icon size="md" as={MaterialIcons} name={icon} color="white" />}
        onPress={onPress ? () => onPress() : undefined}
        width={12}
      /> : undefined}
      {!icon && backText ? <Button onPress={onPress ? () => onPress() : undefined}>Voltar</Button> : undefined}
      {title ? <Text color='white' fontSize={20} fontWeight='bold'>{title}</Text> : undefined}
      <View width={12} />
    </HStack>
  );
}