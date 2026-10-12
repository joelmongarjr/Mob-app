import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { theme } from '../theme/theme';
import { Badge } from '../components/Badge';
import { JOEL_PROJECTS } from '../services/storageService';

export const ProjectDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { projectId } = route.params || {};

  const project = JOEL_PROJECTS.find((p) => p.id === projectId) || JOEL_PROJECTS[0];

  const handleOpenSource = async (url?: string) => {
    if (!url) return;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Notice', 'Cannot open URL on this device.');
      }
    } catch {
      Alert.alert(
        'Offline Notice',
        'This external link requires an active internet connection. Core project specifications are stored offline.'
      );
    }
  };

  return (
    <ScrollView style={styles.scrollScreen} contentContainerStyle={styles.scrollBody}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Back to projects"
      >
        <Text style={styles.backBtnText}>‹ Back to Projects</Text>
      </TouchableOpacity>

      <Text style={styles.projectTitle}>{project.title}</Text>
      <Text style={styles.projectOverview}>{project.overview}</Text>

      {/* Tech stack badges */}
      <View style={styles.badgesWrapper}>
        {project.techStack.map((tech, idx) => (
          <Badge key={idx} label={tech} colorScheme="indigo" />
        ))}
      </View>

      {/* Problem statement */}
      <View style={styles.specCard}>
        <Text style={styles.specSectionTitle}>The Problem</Text>
        <Text style={styles.specBodyText}>{project.problemStatement}</Text>
      </View>

      {/* Student Personal Contribution */}
      <View style={styles.specCardHighlight}>
        <Text style={styles.specSectionTitleHighlight}>Individual Student Contribution</Text>
        <Text style={styles.specBodyText}>{project.individualContribution}</Text>
      </View>

      {/* Architecture */}
      <View style={styles.specCard}>
        <Text style={styles.specSectionTitle}>Technical Architecture</Text>
        <Text style={styles.specBodyText}>{project.systemDesign}</Text>
      </View>

      {/* Outcomes */}
      <View style={styles.specCard}>
        <Text style={styles.specSectionTitle}>Key Verified Outcomes</Text>
        {project.measuredOutcomes.map((item, idx) => (
          <View key={idx} style={styles.outcomeRow}>
            <Text style={styles.outcomeCheck}>✔</Text>
            <Text style={styles.outcomeText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* External Repository Link with Explicit Offline Label */}
      {project.sourceUrl && (
        <View style={styles.externalCard}>
          <Text style={styles.externalHeader}>External GitHub Repository</Text>
          <Text style={styles.externalLabel}>
            (Requires Internet Connection • Core content is preserved offline)
          </Text>
          <TouchableOpacity
            style={styles.externalBtn}
            onPress={() => handleOpenSource(project.sourceUrl)}
            accessibilityRole="link"
            accessibilityLabel="View external source on GitHub"
          >
            <Text style={styles.externalBtnText}>Inspect Code on GitHub ↗</Text>
          </TouchableOpacity>
        </View>
      )}
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
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  backBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    lineHeight: 28,
    marginBottom: 4,
  },
  projectOverview: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  badgesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.lg,
  },
  specCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  specCardHighlight: {
    backgroundColor: '#EEF2FF',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1.5,
    borderColor: theme.colors.primaryLight,
    ...theme.shadows.sm,
  },
  specSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  specSectionTitleHighlight: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primaryDark,
    marginBottom: theme.spacing.sm,
  },
  specBodyText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
  outcomeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  outcomeCheck: {
    color: theme.colors.secondary,
    fontSize: 14,
    marginRight: 8,
    marginTop: 2,
  },
  outcomeText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    flex: 1,
  },
  externalCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  externalHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  externalLabel: {
    fontSize: 12,
    color: theme.colors.warning,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  externalBtn: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  externalBtnText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});
