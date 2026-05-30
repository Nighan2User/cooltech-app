import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Category } from "@/types";

interface Props {
  category: Category;
  onPress?: () => void;
  active?: boolean;
}

export default function CategoryPill({ category, onPress, active }: Props) {
  return (
    <Pressable onPress={onPress} className="mr-4 items-center" style={{ width: 76 }}>
      <View
        className="h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: active ? category.color : `${category.color}1A`,
        }}
      >
        <Ionicons
          name={category.icon as any}
          size={26}
          color={active ? "#fff" : category.color}
        />
      </View>
      <Text className="mt-1.5 text-center text-xs font-medium text-secondary" numberOfLines={2}>
        {category.name}
      </Text>
    </Pressable>
  );
}
