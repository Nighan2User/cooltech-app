import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CATEGORIES } from "@/data/categories";
import { TAXONOMY } from "@/data/products";

export default function TestDropdownScreen() {
  const [selectedCat, setSelectedCat] = useState<string>("");
  const availableItems = selectedCat && TAXONOMY[selectedCat] ? TAXONOMY[selectedCat] : [];

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-4">Dropdown Test</Text>
      
      <Text className="mb-2 text-sm font-medium text-gray-700">Select Category:</Text>
      <ScrollView className="mb-4" style={{ maxHeight: 300 }}>
        {CATEGORIES.map((c) => {
          const active = selectedCat === c.id;
          return (
            <Pressable
              key={c.id}
              onPress={() => setSelectedCat(c.id)}
              className={`mb-2 p-3 rounded-lg border ${active ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
            >
              <Text className={`text-sm ${active ? "text-blue-700 font-bold" : "text-gray-700"}`}>{c.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {selectedCat && (
        <View className="mb-4 bg-yellow-100 p-3 rounded">
          <Text className="text-sm font-bold">Selected: {selectedCat}</Text>
          <Text className="text-sm">Items: {availableItems.length}</Text>
        </View>
      )}

      {selectedCat && availableItems.length > 0 && (
        <>
          <Text className="mb-2 text-sm font-medium text-gray-700">Select Item:</Text>
          <ScrollView style={{ maxHeight: 300 }}>
            {availableItems.map((item, idx) => (
              <Pressable
                key={idx}
                className="mb-2 p-3 rounded-lg border border-gray-300 bg-gray-50"
              >
                <Text className="text-sm text-gray-700">{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}

      {!selectedCat && (
        <Text className="text-gray-500 text-center mt-8">Select a category to see items</Text>
      )}
    </SafeAreaView>
  );
}
