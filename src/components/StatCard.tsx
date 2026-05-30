import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
}

export default function StatCard({ label, value, icon, color = "#2563EB" }: Props) {
  return (
    <View
      className="mb-3 rounded-2xl bg-white p-4 shadow-sm"
      style={{ width: "48%", elevation: 1 }}
    >
      <View
        className="mb-2 h-9 w-9 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1A` }}
      >
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text className="text-xl font-bold text-secondary">{value}</Text>
      <Text className="text-xs text-muted">{label}</Text>
    </View>
  );
}
