export const theme = {
  colors: {
    primary: '#4F46E5',        // Royal Indigo 600 - High contrast WCAG AA compliant (>4.6:1)
    primaryDark: '#3730A3',    // Indigo 800
    primaryLight: '#EEF2FF',   // Indigo 50
    secondary: '#D97706',      // Amber 600
    secondaryLight: '#FEF3C7', // Amber 100
    accent: '#059669',         // Emerald 600
    accentLight: '#D1FAE5',
    background: '#F8FAFC',
    card: '#FFFFFF',
    surface: '#F1F5F9',
    textPrimary: '#0F172A',    // Deep slate (>13:1)
    textSecondary: '#334155',  // Readable slate (>6:1)
    textMuted: '#64748B',
    border: '#CBD5E1',
    borderLight: '#E2E8F0',
    success: '#059669',        // Emerald 600
    successLight: '#D1FAE5',
    warning: '#D97706',        // Amber 600
    warningLight: '#FEF3C7',
    danger: '#DC2626',         // Red 600
    dangerLight: '#FEE2E2',
    white: '#FFFFFF',
    darkNavy: '#1E1B4B',       // Deepest Indigo
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 25,
      lineHeight: 33,
      fontWeight: '700' as const,
    },
    h2: {
      fontSize: 19,
      lineHeight: 27,
      fontWeight: '700' as const,
    },
    h3: {
      fontSize: 16,
      lineHeight: 23,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: '400' as const,
    },
    bodyBold: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: '600' as const,
    },
    caption: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '400' as const,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#1E1B4B',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.07,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#1E1B4B',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
  },
};
