import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useCategoryStore } from "@/store/categoryStore";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

const BANNERS = [
  {
    id: "1",
    title: "Summer Bonanza",
    subtitle: "Up to 30% OFF on select equipment",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800",
  },
];

const TOP_CATEGORY_IDS = [
  "home-appliances",
  "construction",
  "office-equipment",
  "industrial",
];

const BENEFITS = [
  { id: "best", icon: "pricetag", label: "Best Prices" },
  { id: "verified", icon: "shield-checkmark", label: "Verified Vendors" },
  { id: "secure", icon: "lock-closed", label: "Secure Payments" },
  { id: "fast", icon: "rocket", label: "Fast Delivery" },
];

export default function Home() {
  const router = useRouter();
  const products = useProductStore((s) => s.products);
  const user = useAuthStore((s) => s.user);
  const unread = useNotificationStore((s) => s.unreadCount());
  const categories = useCategoryStore((s) => s.categories);

  const topCategories = categories.filter((category) => TOP_CATEGORY_IDS.includes(category.id));
  const featured = products.filter((p) => p.featured);
  const popular = products.filter((p) => p.popular);
  const nearby = products.filter((p) => p.availability).slice(0, 4);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-5 pt-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-medium text-muted">Hello, {user?.name?.split(" ")[0] ?? "there"} 👋</Text>
              <View className="mt-3 flex-row items-center">
                <Ionicons name="location-outline" size={16} color="#334155" />
                <Text className="ml-2 text-sm font-medium text-secondary">Mumbai, Maharashtra</Text>
                <Ionicons name="chevron-down" size={18} color="#334155" className="ml-1" />
              </View>
            </View>
            <Pressable
              onPress={() => router.push("/(user)/notifications")}
              className="h-12 w-12 items-center justify-center rounded-3xl bg-white shadow-sm"
              style={{ elevation: 1 }}
            >
              <Ionicons name="notifications-outline" size={22} color="#0F172A" />
              {unread > 0 && (
                <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
              )}
            </Pressable>
          </View>

          <View className="mt-5 flex-row items-center justify-between">
            <View className="flex-1">
              <SearchBar editable={false} onPress={() => router.push("/search")} placeholder="Search for equipment, tools..." />
            </View>
            <Pressable
              onPress={() => router.push("/search")}
              className="ml-3 h-12 w-12 items-center justify-center rounded-3xl bg-white shadow-sm"
              style={{ elevation: 1 }}
            >
              <Ionicons name="mic-outline" size={22} color="#0F172A" />
            </Pressable>
          </View>

          <View className="mt-5 rounded-[32px] bg-blue-600 px-5 py-6 shadow-sm" style={{ elevation: 1 }}>
            <Text className="text-xl font-bold text-white">Summer Bonanza</Text>
            <Text className="mt-1 text-sm text-blue-100">Up to 30% OFF on select equipment</Text>
            <Pressable
              onPress={() => router.push("/search")}
              className="mt-4 inline-flex items-center rounded-2xl bg-white px-4 py-3"
            >
              <Text className="font-semibold text-blue-600">Book Now</Text>
            </Pressable>
          </View>

          <View className="mt-6 flex-row flex-wrap justify-between gap-3">
            {BENEFITS.map((item) => (
              <View
                key={item.id}
                className="flex-1 rounded-3xl bg-white px-3 py-4 shadow-sm"
                style={{ minWidth: 80, elevation: 1 }}
              >
                <View className="mb-3 h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                  <Ionicons name={item.icon as any} size={18} color="#2563EB" />
                </View>
                <Text className="text-xs font-medium text-secondary">{item.label}</Text>
              </View>
            ))}
          </View>

          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-secondary">Top Categories</Text>
            <Pressable onPress={() => router.push("/(user)/categories")}> 
              <Text className="text-sm font-medium text-blue-600">View all</Text>
            </Pressable>
          </View>

          <View className="mt-4 flex-row flex-wrap justify-between">
            {topCategories.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => router.push(`/category/${item.id}`)}
                className="mb-4 rounded-3xl bg-white p-4 shadow-sm"
                style={{ width: "48%", elevation: 1 }}
              >
                <View
                  className="mb-4 h-14 w-14 items-center justify-center rounded-3xl"
                  style={{ backgroundColor: `${item.color}1A` }}
                >
                  <Ionicons name={item.icon as any} size={24} color={item.color} />
                </View>
                <Text className="text-sm font-semibold text-secondary" numberOfLines={2}>
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="px-5 pt-2">
          <Text className="mb-4 text-lg font-bold text-secondary">Featured Rentals</Text>
          <FlatList
            horizontal
            data={featured}
            keyExtractor={(p) => p.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 6 }}
            renderItem={({ item }) => (
              <View className="mr-3">
                <ProductCard product={item} variant="wide" />
              </View>
            )}
          />
        </View>

        <View className="px-5 pt-4">
          <Text className="mb-4 text-lg font-bold text-secondary">Popular Right Now</Text>
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} variant="list" />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
