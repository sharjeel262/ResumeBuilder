import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
  onSearchPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
  isDarkMode?: boolean;
}

export default function Header({ 
  title, 
  onMenuPress, 
  onSearchPress, 
  showBackButton = false,
  onBackPress,
  isDarkMode = false
}: HeaderProps) {
  const systemColorScheme = useColorScheme();
  // Use manual dark mode if provided, otherwise use system preference
  const colorScheme = isDarkMode ? 'dark' : systemColorScheme;
  const colors = Colors[colorScheme || 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
              <Ionicons name="menu" size={24} color={colors.text} />
            </TouchableOpacity>
          )}
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        </View>
        <View style={styles.rightSection}>
          {onSearchPress && (
            <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
              <Ionicons name="search" size={24} color={colors.text} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 