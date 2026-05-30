import { Text, View } from "react-native";
import { STATUS_COLORS } from "@/constants/theme";
import { titleCase } from "@/utils/format";

export default function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? "#64748B";
  return (
    <View
      className="self-start rounded-full px-2.5 py-1"
      style={{ backgroundColor: `${color}1A` }}
    >
      <Text className="text-xs font-semibold" style={{ color }}>
        {titleCase(status)}
      </Text>
    </View>
  );
}
