import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { OfflineBanner } from '../components/OfflineBanner';

export const AboutScreen: React.FC = () => {
  return (
    <ScrollView style={styles.scrollScreen} contentContainerStyle={styles.scrollBody}>
      <OfflineBanner smallPill />

      <Text style={styles.headingTitle}>About & Release Metadata</Text>
      <Text style={styles.headingSubtitle}>
        INES-Ruhengeri SWE 3409 Mobile Application Development — Individual Assignment 2
      </Text>

      {/* Official Individual Verification Card */}
      <View style={styles.verificationCard} accessible={true} accessibilityRole="summary">
        <Text style={styles.cardBannerTitle}>Student Verification Card</Text>
        <View style={styles.separatorLine} />

        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Application Title:</Text>
          <Text style={styles.dataVal}>JMPortfolio</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Student Name:</Text>
          <Text style={styles.dataVal}>Joel Eliezer Youto Mongar Jr</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Registration Number:</Text>
          <Text style={styles.dataVal}>25/27585</Text>
        </View>

        <View style={styles.codeRowHighlight}>
          <Text style={styles.codeLabelHighlight}>Verification Code:</Text>
          <Text style={styles.codeValHighlight}>MOB-A2-7585</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Release Version:</Text>
          <Text style={styles.dataVal}>v1.0.0 (Standalone APK)</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Android Package ID:</Text>
          <Text style={styles.pkgCode}>rw.ac.ines.ug2527585.jmportfolio</Text>
        </View>
      </View>

      {/* Privacy & Data-Use Statement */}
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxTitle}>Data-Use & Local Privacy Statement</Text>
        <Text style={styles.infoBoxBody}>
          This application operates completely offline and maintains strict data privacy. All student profile records, input fields, and custom avatar references are persisted exclusively on this device using Android sandboxed AsyncStorage. No analytics, tracking metrics, credentials, or personal telemetry are collected, transmitted, or shared over any network.
        </Text>
      </View>

      {/* Academic Institution Card */}
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxTitle}>Academic Department</Text>
        <Text style={styles.deptMain}>
          Institut d'Enseignement Supérieur de Ruhengeri (INES-Ruhengeri)
        </Text>
        <Text style={styles.deptSub}>
          Department of Software Engineering • Faculty of Applied Fundamental Sciences
        </Text>
        <Text style={styles.deptSub}>
          Course: SWE 3409 Mobile Application Development
        </Text>
      </View>
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
  headingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  headingSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: theme.spacing.lg,
  },
  verificationCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    ...theme.shadows.md,
  },
  cardBannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.primaryDark,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  separatorLine: {
    height: 1.5,
    backgroundColor: theme.colors.borderLight,
    marginVertical: theme.spacing.sm,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  codeRowHighlight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginVertical: 4,
  },
  dataLabel: {
    fontSize: 13,
    color: theme.colors.textMuted,
    fontWeight: '600',
  },
  codeLabelHighlight: {
    fontSize: 14,
    color: theme.colors.primaryDark,
    fontWeight: '700',
  },
  dataVal: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  pkgCode: {
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  codeValHighlight: {
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: '800',
    color: theme.colors.primaryDark,
  },
  infoBox: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  infoBoxTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  infoBoxBody: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 19,
  },
  deptMain: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  deptSub: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
});
