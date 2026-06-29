import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
];

export default function LanguageSettings() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center border-b border-slate-200 bg-white px-5 py-4">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text className="flex-1 text-xl font-bold text-slate-900">Language</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-5">
          <Text className="mb-4 text-sm text-slate-600">
            Select your preferred language. The app will restart to apply changes.
          </Text>

          <View className="rounded-2xl bg-white shadow-sm">
            {languages.map((lang, index) => (
              <Pressable
                key={lang.code}
                onPress={() => setSelectedLanguage(lang.code)}
                className={`flex-row items-center justify-between px-5 py-4 ${
                  index < languages.length - 1 ? "border-b border-slate-100" : ""
                }`}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? "#F8FAFC" : "transparent",
                })}
              >
                <View>
                  <Text className="text-base font-medium text-slate-900">{lang.name}</Text>
                  <Text className="mt-0.5 text-sm text-slate-500">{lang.nativeName}</Text>
                </View>
                {selectedLanguage === lang.code && (
                  <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      {selectedLanguage !== "en" && (
        <View className="border-t border-slate-200 bg-white p-5">
          <Pressable className="items-center rounded-full bg-primary py-4 shadow-sm">
            <Text className="text-base font-bold text-white">Save & Restart</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
