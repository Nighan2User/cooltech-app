import { Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";

export default function Welcome() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 px-6">
        <View className="flex-1 items-center justify-center">
          <View className="h-24 w-24 items-center justify-center rounded-3xl bg-white/15">
            <Ionicons name="cube" size={56} color="#fff" />
          </View>
          <Text className="mt-6 text-3xl font-bold text-white">Cooltech</Text>
          <Text className="text-lg font-medium text-white/80">Rental Services</Text>
          <Text className="mt-4 text-center text-base text-white/70">
            Rent tools, machinery, cooling systems and event gear from trusted
            vendors near you.
          </Text>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
            }}
            style={{ width: "100%", height: 200, borderRadius: 20, marginTop: 32 }}
            contentFit="cover"
          />
        </View>

        <View className="pb-6">
          <Button
            label="Get Started"
            variant="secondary"
            icon="arrow-forward"
            onPress={() => router.push("/(auth)/login")}
          />
          <Text className="mt-4 text-center text-xs text-white/60">
            By continuing you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
