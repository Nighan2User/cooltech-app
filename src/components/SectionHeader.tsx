import { Pressable, Text, View } from "react-native";

interface Props {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function SectionHeader({ title, actionLabel, onAction }: Props) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-lg font-bold text-secondary">{title}</Text>
      {actionLabel && (
        <Pressable onPress={onAction}>
          <Text className="text-sm font-medium text-primary">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
