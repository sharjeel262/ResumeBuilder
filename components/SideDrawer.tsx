import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface SideDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  isDarkMode?: boolean;
}

export default function SideDrawer({ isVisible, onClose, onToggleTheme, isDarkMode = false }: SideDrawerProps) {
  const router = useRouter();
  const systemColorScheme = useColorScheme();
  // Use manual dark mode if provided, otherwise use system preference
  const colorScheme = isDarkMode ? 'dark' : systemColorScheme;
  const colors = Colors[colorScheme || 'light'];

  const menuItems = [
    {
      title: 'Home',
      icon: 'home-outline' as const,
      onPress: () => {
        router.push('/');
        onClose();
      }
    },
    {
      title: 'My Resumes',
      icon: 'document-text-outline' as const,
      onPress: () => {
        router.push('/resume-editor');
        onClose();
      }
    },
    {
      title: 'Templates',
      icon: 'grid-outline' as const,
      onPress: () => {
        router.push('/resume-template-picker');
        onClose();
      }
    },
    {
      title: 'Export',
      icon: 'download-outline' as const,
      onPress: () => {
        Alert.alert('Coming Soon', 'Export feature will be available soon!');
        onClose();
      }
    },
    {
      title: 'Import',
      icon: 'cloud-upload-outline' as const,
      onPress: () => {
        Alert.alert('Coming Soon', 'Import feature will be available soon!');
        onClose();
      }
    }
  ];

  const settingsItems = [
    {
      title: 'Account Settings',
      icon: 'person-outline' as const,
      onPress: () => {
        Alert.alert('Coming Soon', 'Account settings will be available soon!');
        onClose();
      }
    },
    {
      title: 'Privacy Policy',
      icon: 'shield-outline' as const,
      onPress: () => {
        Alert.alert('Privacy Policy', 'Our privacy policy will be available soon!');
        onClose();
      }
    },
    {
      title: 'Terms of Service',
      icon: 'document-outline' as const,
      onPress: () => {
        Alert.alert('Terms of Service', 'Our terms of service will be available soon!');
        onClose();
      }
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline' as const,
      onPress: () => {
        Alert.alert('Help & Support', 'Help and support will be available soon!');
        onClose();
      }
    }
  ];

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={[styles.drawer, { backgroundColor: colors.background }]}>
        <ScrollView style={styles.content}>
          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
            <Text style={[styles.userName, { color: colors.text }]}>John Doe</Text>
            <Text style={[styles.userEmail, { color: colors.icon }]}>john.doe@example.com</Text>
          </View>

          {/* Navigation Menu */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Navigation</Text>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <Ionicons name={item.icon} size={20} color={colors.text} />
                <Text style={[styles.menuText, { color: colors.text }]}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.icon} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
            
            {/* Dark Mode Toggle */}
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon-outline" size={20} color={colors.text} />
                <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={onToggleTheme}
                trackColor={{ false: '#767577', true: colors.tint }}
                thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
              />
            </View>

            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <Ionicons name={item.icon} size={20} color={colors.text} />
                <Text style={[styles.menuText, { color: colors.text }]}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.icon} />
              </TouchableOpacity>
            ))}
          </View>

          {/* App Info */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>App Info</Text>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.icon }]}>Version</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>1.0.0</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.icon }]}>Build</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>2024.1</Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: '#FF4444' }]}
            onPress={() => {
              Alert.alert('Logout', 'Are you sure you want to logout?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => onClose() }
              ]);
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 280,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
  },
  section: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
}); 