import { View, ViewProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';

interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedView(props: ThemedViewProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();

  const backgroundColor = colorScheme === 'light'
    ? (lightColor || Colors.light.background)
    : (darkColor || Colors.dark.background);

  return (
    <View 
      {...otherProps} 
      style={[
        otherProps.style,
        { backgroundColor }
      ]}
    />
  );
}
