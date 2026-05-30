import { Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  onPress?: () => void;
  editable?: boolean;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search rentals...",
  onPress,
  editable = true,
  autoFocus = false,
}: Props) {
  const content = (
    <View className="flex-row items-center rounded-xl bg-white px-3.5 py-3 shadow-sm" style={{ elevation: 1 }}>
      <Ionicons name="search" size={20} color="#64748B" />
      <TextInput
        className="ml-2 flex-1 text-base text-secondary"
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        autoFocus={autoFocus}
        pointerEvents={editable ? "auto" : "none"}
      />
    </View>
  );

  if (!editable && onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }
  return content;
}
