import { Text, TextInput, TextInputProps, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function Input({ label, error, icon, ...rest }: Props) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-1.5 text-sm font-medium text-secondary">{label}</Text>
      )}
      <View
        className={`flex-row items-center rounded-xl border bg-white px-3.5 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        {icon && <Ionicons name={icon} size={18} color="#64748B" style={{ marginRight: 8 }} />}
        <TextInput
          className="flex-1 py-3.5 text-base text-secondary"
          placeholderTextColor="#94A3B8"
          {...rest}
        />
      </View>
      {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
    </View>
  );
}
