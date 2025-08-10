import { useColorScheme as _useColorScheme } from 'react-native';

// The useColorScheme value is not properly typed, so we cast it to a valid value.
export function useColorScheme(): 'light' | 'dark' {
  return _useColorScheme() as 'light' | 'dark';
}
