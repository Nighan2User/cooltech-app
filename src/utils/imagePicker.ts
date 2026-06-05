import * as ImagePickerLib from "expo-image-picker";
import { Alert } from "react-native";

const MAX_SIZE_MB = 1;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export interface PickedImage {
  uri: string;
  name: string;
  size?: number;
}

export const pickImage = async (): Promise<PickedImage | null> => {
  try {
    const permission = await ImagePickerLib.requestMediaLibraryPermissionsAsync();
    
    if (!permission.granted) {
      Alert.alert("Permission Denied", "We need permission to access your gallery.");
      return null;
    }

    const result = await ImagePickerLib.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
      return null;
    }

    const image = result.assets[0];
    if (!image) return null;

    // For native platforms, the size might not be available
    // We'll attempt to validate size if available
    if (image.fileSize && image.fileSize > MAX_SIZE_BYTES) {
      Alert.alert(
        "File Too Large",
        `Image must be less than ${MAX_SIZE_MB}MB. Your file is ${(image.fileSize / 1024 / 1024).toFixed(2)}MB.`
      );
      return null;
    }

    return {
      uri: image.uri,
      name: image.filename || `photo_${Date.now()}.jpg`,
      size: image.fileSize,
    };
  } catch (error) {
    console.error("Image picker error:", error);
    Alert.alert("Error", "Failed to pick image. Please try again.");
    return null;
  }
};

/**
 * Validate image size by checking file at URI
 * This is a fallback for when fileSize is not available
 */
export const validateImageSize = async (uri: string): Promise<boolean> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    if (blob.size > MAX_SIZE_BYTES) {
      Alert.alert(
        "File Too Large",
        `Image must be less than ${MAX_SIZE_MB}MB. Your file is ${(blob.size / 1024 / 1024).toFixed(2)}MB.`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Size validation error:", error);
    return true; // Allow if validation fails
  }
};
