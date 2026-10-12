import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface OfflineBannerProps {
  smallPill?: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ smallPill = false }) => {
  if (smallPill) {
    return (
      <View style={styles.pillBox} accessible={true} accessibilityRole="text">
        <View style={styles.greenDot} />
        <Text style={styles.pillText}>Offline First • Airplane Mode Tested</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardBox} accessible={true} accessibilityRole="text">
      <View style={styles.headerRow}>
        <View style={styles.greenDot} />
        <Text style={styles.cardHeader}>Offline Resilient Architecture</Text>
      </View>
      <Text style={styles.cardBody}>
        Application records, technical skills, and student projects run locally on device storage. Optional external links are explicitly labeled.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successLight,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 6,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.success,
  },
  cardBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.success,
  },
  cardBody: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
});
