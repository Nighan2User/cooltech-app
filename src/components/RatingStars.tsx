import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

interface Props {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
}

export default function RatingStars({ rating, size = 14, showValue = true, count }: Props) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <View className="flex-row items-center">
      {[0, 1, 2, 3, 4].map((i) => {
        const name =
          i < full ? "star" : i === full && half ? "star-half" : "star-outline";
        return <Ionicons key={i} name={name} size={size} color={COLORS.star} />;
      })}
      {showValue && (
        <Text className="ml-1.5 text-xs font-medium text-muted">
          {rating.toFixed(1)}
          {count !== undefined ? ` (${count})` : ""}
        </Text>
      )}
    </View>
  );
}
