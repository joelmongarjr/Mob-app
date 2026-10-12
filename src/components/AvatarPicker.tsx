import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../theme/theme';

interface AvatarPickerProps {
  photoUri: string | null;
  onPhotoChanged: (uri: string | null) => void;
  onStatusMessage?: (msg: string) => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  photoUri,
  onPhotoChanged,
  onStatusMessage,
}) => {
  const postMsg = (m: string) => {
    if (onStatusMessage) {
      onStatusMessage(m);
    }
  };

  const handleLaunchGallery = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!perm.granted) {
        Alert.alert(
          'Media Access Required',
          'Gallery access is necessary to choose a profile photo. Please enable it in Android system settings.',
          [{ text: 'OK' }]
        );
        postMsg('Gallery permission denied.');
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (res.canceled) {
        postMsg('Gallery selection cancelled.');
        return;
      }

      if (res.assets && res.assets.length > 0) {
        const selected = res.assets[0].uri;
        onPhotoChanged(selected);
        postMsg('Profile image updated from gallery.');
      }
    } catch (err) {
      console.error('Gallery launch failed:', err);
      Alert.alert('Error', 'Unable to open photo library.');
      postMsg('Failed to select gallery photo.');
    }
  };

  const handleLaunchCamera = async () => {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();

      if (!perm.granted) {
        Alert.alert(
          'Camera Access Required',
          'Camera access is required to take a profile picture. Please enable it in device settings.',
          [{ text: 'OK' }]
        );
        postMsg('Camera access denied.');
        return;
      }

      const res = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (res.canceled) {
        postMsg('Camera capture cancelled.');
        return;
      }

      if (res.assets && res.assets.length > 0) {
        const captured = res.assets[0].uri;
        onPhotoChanged(captured);
        postMsg('Photo captured and set as avatar.');
      }
    } catch (err) {
      console.error('Camera launch failed:', err);
      Alert.alert('Error', 'Unable to launch camera.');
      postMsg('Failed to capture photo.');
    }
  };

  const handleClearPhoto = () => {
    Alert.alert(
      'Remove Photo',
      'Revert back to the default student avatar?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            onPhotoChanged(null);
            postMsg('Custom photo removed. Default avatar active.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.cardContainer} accessible={true} accessibilityRole="summary">
      <View style={styles.avatarBorder}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.imageContent}
            accessibilityLabel="Current student photograph"
          />
        ) : (
          <Image
            source={require('../../assets/default-avatar.png')}
            style={styles.imageContent}
            accessibilityLabel="Default student avatar"
          />
        )}
      </View>

      <Text style={styles.statusCaption}>
        {photoUri ? 'Custom photo attached' : 'Default avatar active'}
      </Text>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, styles.primaryBtn]}
          onPress={handleLaunchGallery}
          accessibilityRole="button"
          accessibilityLabel="Select image from gallery"
        >
          <Text style={styles.primaryBtnText}>Choose from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.secondaryBtn]}
          onPress={handleLaunchCamera}
          accessibilityRole="button"
          accessibilityLabel="Take a photo with camera"
        >
          <Text style={styles.secondaryBtnText}>Take Photo</Text>
        </TouchableOpacity>

        {photoUri && (
          <TouchableOpacity
            style={[styles.btn, styles.removeBtn]}
            onPress={handleClearPhoto}
            accessibilityRole="button"
            accessibilityLabel="Remove photo"
          >
            <Text style={styles.removeBtnText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    paddingHorizontal: theme.spacing.md,
  },
  avatarBorder: {
    width: 105,
    height: 105,
    borderRadius: 52.5,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    width: '100%',
    height: '100%',
  },
  statusCaption: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
  },
  btnRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  btn: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    margin: 2,
  },
  primaryBtn: {
    backgroundColor: theme.colors.primaryLight,
  },
  primaryBtnText: {
    color: theme.colors.primaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryBtnText: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  removeBtn: {
    backgroundColor: theme.colors.dangerLight,
  },
  removeBtnText: {
    color: theme.colors.danger,
    fontSize: 13,
    fontWeight: '700',
  },
});
