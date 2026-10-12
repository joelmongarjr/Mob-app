import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme/theme';
import { SkillCard } from '../components/SkillCard';
import { TimelineItem } from '../components/TimelineItem';
import { JOEL_SKILLS, JOEL_EDUCATION } from '../services/storageService';

export const SkillsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'education'>('skills');

  return (
    <ScrollView style={styles.scrollScreen} contentContainerStyle={styles.scrollBody}>
      {/* Segment Selector */}
      <View style={styles.segmentedContainer} accessible={true} accessibilityRole="tablist">
        <TouchableOpacity
          style={[styles.segmentBtn, activeTab === 'skills' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('skills')}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'skills' }}
          accessibilityLabel="Technical Skills tab"
        >
          <Text
            style={[styles.segmentLabel, activeTab === 'skills' && styles.segmentLabelActive]}
          >
            Technical Proficiencies ({JOEL_SKILLS.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segmentBtn, activeTab === 'education' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('education')}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'education' }}
          accessibilityLabel="Academic Milestones tab"
        >
          <Text
            style={[styles.segmentLabel, activeTab === 'education' && styles.segmentLabelActive]}
          >
            Academic Milestones
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'skills' ? (
        <View>
          <Text style={styles.sectionHeader}>Engineered Competencies</Text>
          <Text style={styles.sectionLead}>
            Core software proficiencies developed through practical projects and software engineering coursework at INES-Ruhengeri.
          </Text>
          {JOEL_SKILLS.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </View>
      ) : (
        <View>
          <Text style={styles.sectionHeader}>Academic Pathway</Text>
          <Text style={styles.sectionLead}>
            Structured educational progression rendered via modular timeline components.
          </Text>
          {JOEL_EDUCATION.map((item, idx) => (
            <TimelineItem
              key={item.id}
              milestone={item}
              isLast={idx === JOEL_EDUCATION.length - 1}
            />
          ))}
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
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: 4,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: theme.spacing.sm + 2,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  segmentBtnActive: {
    backgroundColor: theme.colors.card,
    ...theme.shadows.sm,
  },
  segmentLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  segmentLabelActive: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  sectionLead: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    lineHeight: 18,
  },
});
