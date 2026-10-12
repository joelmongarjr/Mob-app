import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EducationMilestone } from '../types';
import { theme } from '../theme/theme';
import { Badge } from './Badge';

interface TimelineItemProps {
  milestone: EducationMilestone;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  milestone,
  isLast = false,
}) => {
  return (
    <View style={styles.rowWrapper} accessible={true} accessibilityRole="summary">
      <View style={styles.axisStem}>
        <View style={styles.dotNode} />
        {!isLast && <View style={styles.connectingLine} />}
      </View>

      <View style={styles.contentCard}>
        <View style={styles.topFlex}>
          <Text style={styles.degreeTitle}>{milestone.qualification}</Text>
          <Badge label={milestone.standing} colorScheme="emerald" small />
        </View>

        <Text style={styles.schoolName}>{milestone.institution}</Text>
        <Text style={styles.dateLocation}>
          {milestone.timeframe} • {milestone.city}
        </Text>

        <View style={styles.bulletsWrap}>
          {milestone.accomplishments.map((item, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <Text style={styles.bulletSymbol}>›</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  axisStem: {
    width: 24,
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  dotNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.white,
    marginTop: 4,
    zIndex: 1,
  },
  connectingLine: {
    width: 2,
    flex: 1,
    backgroundColor: theme.colors.border,
    marginTop: 2,
  },
  contentCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  topFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  degreeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: 6,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primaryDark,
    marginBottom: 2,
  },
  dateLocation: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.sm,
  },
  bulletsWrap: {
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletSymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    marginRight: 6,
    lineHeight: 18,
  },
  bulletText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
});
