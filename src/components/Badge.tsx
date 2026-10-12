import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface BadgeProps {
  label: string;
  colorScheme?: 'indigo' | 'amber' | 'emerald' | 'crimson' | 'slate';
  small?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  colorScheme = 'indigo',
  small = false,
}) => {
  const getColors = () => {
    switch (colorScheme) {
      case 'amber':
        return { bg: theme.colors.secondaryLight, text: theme.colors.secondary };
      case 'emerald':
        return { bg: theme.colors.accentLight, text: theme.colors.accent };
      case 'crimson':
        return { bg: theme.colors.dangerLight, text: theme.colors.danger };
      case 'slate':
        return { bg: theme.colors.surface, text: theme.colors.textSecondary };
      case 'indigo':
      default:
        return { bg: theme.colors.primaryLight, text: theme.colors.primaryDark };
    }
  };

  const { bg, text: textColor } = getColors();

  return (
    <View
      style={[
        styles.badgeBody,
        { backgroundColor: bg },
        small && styles.badgeBodySmall,
      ]}
      accessible={true}
      accessibilityRole="text"
    >
      <Text style={[styles.badgeText, { color: textColor }, small && styles.badgeTextSmall]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeBody: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs + 1,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  badgeBodySmall: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeTextSmall: {
    fontSize: 11,
  },
});
