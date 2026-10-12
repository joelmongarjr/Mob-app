import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { ProjectCard } from '../components/ProjectCard';
import { JOEL_PROJECTS } from '../services/storageService';
import { OfflineBanner } from '../components/OfflineBanner';

export const ProjectsListScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.scrollScreen} contentContainerStyle={styles.scrollBody}>
      <OfflineBanner smallPill />

      <Text style={styles.headerTitle}>Student Project Portfolio</Text>
      <Text style={styles.introParagraph}>
        Practical software engineering deliverables created by Joel Eliezer Youto Mongar Jr. Tap any project card to inspect complete problem contexts, student contributions, and technical architecture.
      </Text>

      {JOEL_PROJECTS.map((proj) => (
        <ProjectCard
          key={proj.id}
          project={proj}
          onOpen={() => navigation.navigate('ProjectDetails', { projectId: proj.id })}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollScreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollBody: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  introParagraph: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
});
