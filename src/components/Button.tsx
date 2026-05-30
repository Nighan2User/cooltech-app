import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  fullWidth?: boolean;
}

const styles: Record<Variant, { bg: string; text: string; border?: string }> = {
  primary: { bg: "bg-primary", text: "text-white" },
  secondary: { bg: "bg-secondary", text: "text-white" },
  outline: { bg: "bg-white", text: "text-primary", border: "border border-primary" },
  danger: { bg: "bg-red-600", text: "text-white" },
  ghost: { bg: "bg-transparent", text: "text-secondary" },
};

export default function Button({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
}: Props) {
  const s = styles[variant];
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`flex-row items-center justify-center rounded-xl px-5 py-3.5 ${s.bg} ${
        s.border ?? ""
      } ${fullWidth ? "w-full" : ""} ${isDisabled ? "opacity-50" : "active:opacity-80"}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" || variant === "ghost" ? "#2563EB" : "#fff"} />
      ) : (
        <View className="flex-row items-center">
          {icon && (
            <Ionicons
              name={icon}
              size={18}
              color={variant === "outline" ? "#2563EB" : variant === "ghost" ? "#0F172A" : "#fff"}
              style={{ marginRight: 8 }}
            />
          )}
          <Text className={`text-base font-semibold ${s.text}`}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}
