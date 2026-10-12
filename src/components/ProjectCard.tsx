import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PortfolioProject } from '../types';
import { theme } from '../theme/theme';
import { Badge } from './Badge';

interface ProjectCardProps {
  project: PortfolioProject;
  onOpen: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen }) => {
  return (
    <TouchableOpacity
      style={styles.cardFrame}
      onPress={onOpen}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Open specifications for ${project.title}`}
    >
      <Text style={styles.titleHeading} numberOfLines={2}>
        {project.title}
      </Text>
      <Text style={styles.taglineHeading}>{project.overview}</Text>

      <Text style={styles.problemPreviewText} numberOfLines={3}>
        {project.problemStatement}
      </Text>

      <View style={styles.badgeCluster}>
        {project.techStack.slice(0, 3).map((item, idx) => (
          <Badge key={idx} label={item} colorScheme="indigo" small />
        ))}
        {project.techStack.length > 3 && (
          <Badge label={`+${project.techStack.length - 3} more`} colorScheme="slate" small />
        )}
      </View>

      <View style={styles.footerBar}>
        <View style={styles.offlineTag}>
          <Text style={styles.offlineTagText}>Offline Specs Ready</Text>
        </View>
        <Text style={styles.actionArrow}>Inspect Details ›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardFrame: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  titleHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    lineHeight: 23,
    marginBottom: 4,
  },
  taglineHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  problemPreviewText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  badgeCluster: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  footerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
    paddingTop: theme.spacing.sm,
  },
  offlineTag: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
  },
  offlineTagText: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  actionArrow: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
