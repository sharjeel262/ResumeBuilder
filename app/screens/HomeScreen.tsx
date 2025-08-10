import Header from '@/components/Header';
import SideDrawer from '@/components/SideDrawer';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { supabase } from '../../services/supabaseClient';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Use manual dark mode if set, otherwise use system preference
  const colorScheme = isDarkMode ? 'dark' : systemColorScheme;
  const colors = Colors[colorScheme || 'light'];
  
  const [stats] = useState({
    resumesCreated: resumes.length || 12,
    templatesUsed: 3,
    downloads: 8
  });

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('resumes').select('*').order('created_at', { ascending: false });
      if (!error && data) setResumes(data);
      setLoading(false);
    };
    fetchResumes();
  }, []);

  const quickActions = [
    {
      title: 'Create New Resume',
      icon: 'add-circle-outline' as const,
      color: '#4CAF50',
      onPress: () => router.push('/resume-editor')
    },
    {
      title: 'Choose Template',
      icon: 'grid-outline' as const,
      color: '#2196F3',
      onPress: () => {
        if (resumes.length === 0) {
          Alert.alert(
            'No Resume Found', 
            'Please create a resume first before choosing a template.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Create Resume', onPress: () => router.push('/resume-editor') }
            ]
          );
        } else {
          router.push('/resume-template-picker');
        }
      }
    },
    {
      title: 'Import Resume',
      icon: 'download-outline' as const,
      color: '#FF9800',
      onPress: () => Alert.alert('Coming Soon', 'Import feature will be available soon!')
    },
    {
      title: 'Export PDF',
      icon: 'document-outline' as const,
      color: '#9C27B0',
      onPress: () => Alert.alert('Coming Soon', 'Export feature will be available soon!')
    }
  ];

  const featuredTemplates = [
    {
      id: 1,
      name: 'Professional',
      description: 'Clean and modern design',
      color: '#2196F3',
      icon: 'briefcase-outline' as const
    },
    {
      id: 2,
      name: 'Creative',
      description: 'Stand out from the crowd',
      color: '#FF5722',
      icon: 'color-palette-outline' as const
    },
    {
      id: 3,
      name: 'Minimal',
      description: 'Simple and elegant',
      color: '#607D8B',
      icon: 'remove-outline' as const
    }
  ];

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header 
        title="Resume Builder"
        onMenuPress={() => setIsDrawerVisible(true)}
        onSearchPress={() => Alert.alert('Search', 'Search functionality coming soon!')}
        isDarkMode={isDarkMode}
      />
      
      <ScrollView style={styles.scrollView}>
        {/* Welcome Section */}
        <LinearGradient
          colors={[colors.tint, colors.tint + '80']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={[styles.greeting, { color: '#fff' }]}>Welcome back!</Text>
              <Text style={[styles.subtitle, { color: '#fff' }]}>Ready to build your next resume?</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle-outline" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}>
            <Ionicons name="document-text-outline" size={24} color={colors.tint} />
            <Text style={[styles.statNumber, { color: colors.text }]}>{resumes.length || stats.resumesCreated}</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Resumes Created</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}>
            <Ionicons name="grid-outline" size={24} color={colors.tint} />
            <Text style={[styles.statNumber, { color: colors.text }]}>{stats.templatesUsed}</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Templates Used</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}>
            <Ionicons name="download-outline" size={24} color={colors.tint} />
            <Text style={[styles.statNumber, { color: colors.text }]}>{stats.downloads}</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Downloads</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}
                onPress={action.onPress}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={[styles.actionTitle, { color: colors.text }]}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Templates */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Templates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templatesScroll}>
            {featuredTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[styles.templateCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => router.push('/resume-template-picker')}
              >
                <View style={[styles.templateIcon, { backgroundColor: template.color + '20' }]}>
                  <Ionicons name={template.icon} size={32} color={template.color} />
                </View>
                <Text style={[styles.templateName, { color: colors.text }]}>{template.name}</Text>
                <Text style={[styles.templateDesc, { color: colors.textSecondary }]}>{template.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Resumes */}
        {resumes.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Resumes</Text>
            <View style={[styles.activityCard, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}>
              {resumes.slice(0, 3).map((resume) => (
                <TouchableOpacity
                  key={resume.id}
                  style={styles.activityItem}
                  onPress={() =>
                    router.push({ pathname: '/resume-preview', params: { resume_id: String(resume.id) } })
                  }
                >
                  <Ionicons name="document-text-outline" size={16} color={colors.icon} />
                  <Text style={[styles.activityText, { color: colors.text }]}>
                    {resume.name || 'Untitled Resume'}
                  </Text>
                  <Text style={[styles.activityTime, { color: colors.icon }]}>
                    {resume.created_at ? new Date(resume.created_at).toLocaleDateString() : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
          <View style={[styles.activityCard, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}>
            <View style={styles.activityItem}>
              <Ionicons name="time-outline" size={16} color={colors.icon} />
              <Text style={[styles.activityText, { color: colors.text }]}>Updated &quot;Software Engineer&quot; resume</Text>
              <Text style={[styles.activityTime, { color: colors.icon }]}>2 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Ionicons name="download-outline" size={16} color={colors.icon} />
              <Text style={[styles.activityText, { color: colors.text }]}>Downloaded &quot;Marketing Manager&quot; PDF</Text>
              <Text style={[styles.activityTime, { color: colors.icon }]}>Yesterday</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.icon + '20' }]}>
          <Text style={[styles.footerText, { color: colors.icon }]}>
            Resume Builder Pro • Version 1.0.0
          </Text>
        </View>
      </ScrollView>

      {/* Side Drawer */}
      <SideDrawer 
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        onToggleTheme={handleToggleTheme}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.9,
  },
  profileButton: {
    padding: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  templatesScroll: {
    marginLeft: -5,
  },
  templateCard: {
    width: 180,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 140,
  },
  templateIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  templateName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  templateDesc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  activityCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
  },
  activityTime: {
    fontSize: 12,
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
  },
});

export default HomeScreen; 