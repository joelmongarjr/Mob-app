import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SkillItem } from '../types';
import { theme } from '../theme/theme';
import { Badge } from './Badge';

interface SkillCardProps {
  skill: SkillItem;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <View style={styles.cardContainer} accessible={true} accessibilityRole="summary">
      <View style={styles.cardTop}>
        <Text style={styles.skillHeader}>{skill.name}</Text>
        <Badge
          label={skill.proficiency}
          colorScheme={skill.proficiency === 'Advanced' ? 'amber' : 'indigo'}
          small
        />
      </View>

      <View style={styles.metaLine}>
        <Text style={styles.domainName}>{skill.domain}</Text>
        <Text style={styles.dividerDot}>•</Text>
        <Text style={styles.experienceDuration}>{skill.experienceSpan} verified practice</Text>
      </View>

      <Text style={styles.summaryParagraph}>{skill.summary}</Text>

      <View style={styles.tagsFlex}>
        {skill.badges.map((b, i) => (
          <Badge key={i} label={b} colorScheme="slate" small />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  skillHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  metaLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  domainName: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  dividerDot: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginHorizontal: 6,
  },
  experienceDuration: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  summaryParagraph: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  tagsFlex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
