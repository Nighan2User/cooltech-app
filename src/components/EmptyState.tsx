import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
}

export default function EmptyState({ icon = "file-tray-outline", title, subtitle }: Props) {
  return (
    <View className="items-center justify-center py-16 px-8">
      <View className="h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <Ionicons name={icon} size={38} color="#94A3B8" />
      </View>
      <Text className="mt-4 text-base font-semibold text-secondary">{title}</Text>
      {subtitle && (
        <Text className="mt-1 text-center text-sm text-muted">{subtitle}</Text>
      )}
    </View>
  );
}
