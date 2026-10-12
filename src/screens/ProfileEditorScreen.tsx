import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { theme } from '../theme/theme';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { AvatarPicker } from '../components/AvatarPicker';
import {
  loadProfile,
  persistProfile,
  resetProfile,
} from '../services/storageService';
import { StudentProfile, CandidateAvailability } from '../types';

export const ProfileEditorScreen: React.FC = () => {
  const [headline, setHeadline] = useState<string>('');
  const [shortBio, setShortBio] = useState<string>('');
  const [primarySkill, setPrimarySkill] = useState<string>('');
  const [availabilityStatus, setAvailabilityStatus] = useState<CandidateAvailability>('Available for Internship');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Field-level error messages
  const [headlineError, setHeadlineError] = useState<string | null>(null);
  const [bioError, setBioError] = useState<string | null>(null);
  const [skillError, setSkillError] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [feedbackNote, setFeedbackNote] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const data = await loadProfile();
    setHeadline(data.headline);
    setShortBio(data.shortBio);
    setPrimarySkill(data.primarySkill);
    setAvailabilityStatus(data.availabilityStatus);
    setImageUri(data.imageUri);
  };

  // Validation Rules:
  // Rule 1: Headline must be between 5 and 70 characters
  // Rule 2: Short bio must be between 25 and 300 characters
  // Rule 3: Primary skill must be between 2 and 40 characters
  const validateHeadline = (val: string): boolean => {
    if (!val.trim()) {
      setHeadlineError('Headline cannot be left empty.');
      return false;
    }
    if (val.trim().length < 5) {
      setHeadlineError('Headline must be at least 5 characters.');
      return false;
    }
    if (val.trim().length > 70) {
      setHeadlineError('Headline exceeds maximum limit of 70 characters.');
      return false;
    }
    setHeadlineError(null);
    return true;
  };

  const validateBio = (val: string): boolean => {
    if (!val.trim()) {
      setBioError('Biography cannot be left empty.');
      return false;
    }
    if (val.trim().length < 25) {
      setBioError(`Bio is too brief (${val.trim().length}/25 characters minimum).`);
      return false;
    }
    if (val.trim().length > 300) {
      setBioError('Bio exceeds maximum limit of 300 characters.');
      return false;
    }
    setBioError(null);
    return true;
  };

  const validateSkill = (val: string): boolean => {
    if (!val.trim()) {
      setSkillError('Primary skill cannot be empty.');
      return false;
    }
    if (val.trim().length < 2) {
      setSkillError('Skill title must be at least 2 characters.');
      return false;
    }
    if (val.trim().length > 40) {
      setSkillError('Skill title cannot exceed 40 characters.');
      return false;
    }
    setSkillError(null);
    return true;
  };

  const isFormValid = (): boolean => {
    const h = headline.trim().length >= 5 && headline.trim().length <= 70;
    const b = shortBio.trim().length >= 25 && shortBio.trim().length <= 300;
    const s = primarySkill.trim().length >= 2 && primarySkill.trim().length <= 40;
    return h && b && s;
  };

  const handleSaveChanges = async () => {
    const okH = validateHeadline(headline);
    const okB = validateBio(shortBio);
    const okS = validateSkill(primarySkill);

    if (!okH || !okB || !okS) {
      Alert.alert(
        'Validation Warning',
        'Please address the highlighted field validation errors before saving.',
        [{ text: 'Dismiss' }]
      );
      return;
    }

    setIsSaving(true);
    const current = await loadProfile();
    const updated: StudentProfile = {
      ...current,
      headline: headline.trim(),
      shortBio: shortBio.trim(),
      primarySkill: primarySkill.trim(),
      availabilityStatus,
      imageUri,
    };

    const ok = await persistProfile(updated);
    setIsSaving(false);

    if (ok) {
      setFeedbackNote('Profile updates saved to AsyncStorage.');
      Alert.alert(
        'Profile Saved',
        'Your profile changes have been persisted locally and will survive application restarts.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('Storage Error', 'Failed to write profile to local storage.');
    }
  };

  const handleResetDefaults = () => {
    Alert.alert(
      'Reset Profile Confirmation',
      'Are you sure you want to reset all profile fields back to the initial default data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            const defaults = await resetProfile();
            setHeadline(defaults.headline);
            setShortBio(defaults.shortBio);
            setPrimarySkill(defaults.primarySkill);
            setAvailabilityStatus(defaults.availabilityStatus);
            setImageUri(defaults.imageUri);
            setHeadlineError(null);
            setBioError(null);
            setSkillError(null);
            setFeedbackNote('Profile reverted to default values.');
            Alert.alert('Reset Complete', 'Default student profile restored.');
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardFlex}
    >
      <ScrollView style={styles.scrollScreen} contentContainerStyle={styles.scrollBody}>
        <Text style={styles.screenHeading}>Profile Editor</Text>
        <Text style={styles.screenSubheading}>
          Customize your professional headline, bio, core competency, and profile photograph. Inputs are validated in real time and persisted using AsyncStorage.
        </Text>

        {feedbackNote && (
          <View style={styles.statusToast}>
            <Text style={styles.statusToastText}>{feedbackNote}</Text>
          </View>
        )}

        {/* Media Workflow Component */}
        <AvatarPicker
          photoUri={imageUri}
          onPhotoChanged={(uri) => setImageUri(uri)}
          onStatusMessage={(msg) => setFeedbackNote(msg)}
        />

        {/* Controlled Input Fields */}
        <CustomInput
          label="Professional Headline"
          value={headline}
          requiredField
          onChangeText={(txt) => {
            setHeadline(txt);
            validateHeadline(txt);
          }}
          errorMessage={headlineError}
          helper="Between 5 and 70 characters (e.g. 'Software Engineering Student & Cloud-Native Mobile Developer')"
          placeholder="Enter headline..."
          onClearText={() => {
            setHeadline('');
            validateHeadline('');
          }}
        />

        <CustomInput
          label="Primary Technical Skill"
          value={primarySkill}
          requiredField
          onChangeText={(txt) => {
            setPrimarySkill(txt);
            validateSkill(txt);
          }}
          errorMessage={skillError}
          helper="Core proficiency (2-40 characters, e.g. 'React Native & Mobile Database Architecture')"
          placeholder="e.g. React Native & Mobile Database Architecture"
          onClearText={() => {
            setPrimarySkill('');
            validateSkill('');
          }}
        />

        <CustomInput
          label="Short Biography"
          value={shortBio}
          requiredField
          multiline
          numberOfLines={4}
          onChangeText={(txt) => {
            setShortBio(txt);
            validateBio(txt);
          }}
          errorMessage={bioError}
          helper={`Minimum 25 characters. Current count: ${shortBio.trim().length} chars`}
          placeholder="Write a concise overview of your background, academic focus, and goals..."
          onClearText={() => {
            setShortBio('');
            validateBio('');
          }}
        />

        {/* Action Buttons */}
        <View style={styles.actionsCluster}>
          <CustomButton
            title={isSaving ? 'Persisting...' : 'Save Profile Changes'}
            onPress={handleSaveChanges}
            type="primary"
            isLoading={isSaving}
            disabled={!isFormValid() || isSaving}
            accessibilityLabel="Save profile updates to local storage"
          />

          <View style={{ height: theme.spacing.sm }} />

          <CustomButton
            title="Reset to Default Profile"
            onPress={handleResetDefaults}
            type="secondary"
            accessibilityLabel="Reset profile to initial default values"
          />
        </View>

        {/* Validation Criteria Status */}
        <View style={styles.ruleStatusCard}>
          <Text style={styles.ruleStatusHeader}>Validation Criteria Checklist:</Text>
          <Text style={[styles.ruleLine, headline.trim().length >= 5 && headline.trim().length <= 70 ? styles.ruleSuccess : styles.ruleFailed]}>
            {headline.trim().length >= 5 && headline.trim().length <= 70 ? '✔' : '✖'} Rule 1: Headline length (5-70 characters)
          </Text>
          <Text style={[styles.ruleLine, shortBio.trim().length >= 25 && shortBio.trim().length <= 300 ? styles.ruleSuccess : styles.ruleFailed]}>
            {shortBio.trim().length >= 25 && shortBio.trim().length <= 300 ? '✔' : '✖'} Rule 2: Bio length (25-300 characters)
          </Text>
          <Text style={[styles.ruleLine, primarySkill.trim().length >= 2 && primarySkill.trim().length <= 40 ? styles.ruleSuccess : styles.ruleFailed]}>
            {primarySkill.trim().length >= 2 && primarySkill.trim().length <= 40 ? '✔' : '✖'} Rule 3: Primary skill (2-40 characters, non-empty)
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardFlex: {
    flex: 1,
  },
  scrollScreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollBody: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  screenHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  screenSubheading: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 19,
    marginBottom: theme.spacing.lg,
  },
  statusToast: {
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  statusToastText: {
    fontSize: 13,
    color: theme.colors.primaryDark,
    fontWeight: '700',
    textAlign: 'center',
  },
  actionsCluster: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  ruleStatusCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  ruleStatusHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  ruleLine: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 2,
  },
  ruleSuccess: {
    color: theme.colors.secondary,
    fontWeight: '700',
  },
  ruleFailed: {
    color: theme.colors.danger,
    fontWeight: '600',
  },
});
