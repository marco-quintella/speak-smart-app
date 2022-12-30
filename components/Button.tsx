import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import colors from '../theme/colors';

export interface ButtonProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.buttonBg,
    color: colors.foreText,
    padding: 16,
    borderRadius: 8,
  },
});

export default function ButtonElement ({ style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles ? styles.container : null, style]}
    >
      {props.children}
    </TouchableOpacity>
  );
}