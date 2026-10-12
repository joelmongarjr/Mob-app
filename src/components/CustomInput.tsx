import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme/theme';

interface CustomInputProps extends TextInputProps {
  label: string;
  errorMessage?: string | null;
  helper?: string;
  requiredField?: boolean;
  onClearText?: () => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  errorMessage,
  helper,
  requiredField = false,
  value,
  onClearText,
  style,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelHeader}>
        <Text style={styles.labelText} accessible={true} accessibilityRole="text">
          {label} {requiredField && <Text style={styles.requiredMark}>*</Text>}
        </Text>
        {value && onClearText && (
          <TouchableOpacity
            onPress={onClearText}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel={`Clear ${label}`}
            accessibilityRole="button"
          >
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={[
          styles.fieldInput,
          errorMessage ? styles.fieldInputError : null,
          props.multiline ? styles.multilineInput : null,
          style,
        ]}
        value={value}
        placeholderTextColor={theme.colors.textMuted}
        accessible={true}
        accessibilityLabel={label}
        accessibilityHint={errorMessage || helper}
        {...props}
      />

      {errorMessage ? (
        <Text style={styles.errorBanner} accessible={true} accessibilityRole="alert">
          {errorMessage}
        </Text>
      ) : helper ? (
        <Text style={styles.helperBanner}>{helper}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  labelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  requiredMark: {
    color: theme.colors.danger,
    fontWeight: '800',
  },
  clearBtnText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  fieldInput: {
    backgroundColor: theme.colors.card,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: 15,
    color: theme.colors.textPrimary,
    minHeight: 50,
  },
  multilineInput: {
    minHeight: 95,
    textAlignVertical: 'top',
  },
  fieldInputError: {
    borderColor: theme.colors.danger,
    backgroundColor: '#FEF2F2',
  },
  errorBanner: {
    fontSize: 12,
    color: theme.colors.danger,
    marginTop: 4,
    fontWeight: '600',
  },
  helperBanner: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
});
