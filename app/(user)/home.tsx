import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { CATEGORIES } from "@/data/categories";
import CategoryPill from "@/components/CategoryPill";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import SearchBar from "@/components/SearchBar";

const BANNERS = [
  {
    id: "1",
    title: "Summer Cooling Sale",
    subtitle: "Up to 20% off AC & fans",
    image: "https://images.unsplash.com/photo-1631545806609-c2b999c8f6a6?w=800",
  },
  {
    id: "2",
    title: "Pro Tools, Pro Prices",
    subtitle: "Rent equipment for less",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800",
  },
];

export default function Home() {
  const router = useRouter();
  const products = useProductStore((s) => s.products);
  const user = useAuthStore((s) => s.user);
  const unread = useNotificationStore((s) => s.unreadCount());

  const featured = products.filter((p) => p.featured);
  const popular = products.filter((p) => p.popular);
  const nearby = products.filter((p) => p.availability).slice(0, 4);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-2">
          <View>
            <Text className="text-sm text-muted">Hello 👋</Text>
            <Text className="text-xl font-bold text-secondary">
              {user?.name?.split(" ")[0] ?? "there"}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/(user)/notifications")}
            className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
            style={{ elevation: 1 }}
          >
            <Ionicons name="notifications-outline" size={22} color="#0F172A" />
            {unread > 0 && (
              <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
            )}
          </Pressable>
        </View>

        {/* Search */}
        <View className="px-5 pt-4">
          <SearchBar editable={false} onPress={() => router.push("/search")} />
        </View>

        {/* Banners */}
        <FlatList
          horizontal
          data={BANNERS}
          keyExtractor={(b) => b.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16 }}
          renderItem={({ item }) => (
            <View className="mr-3 overflow-hidden rounded-2xl" style={{ width: 300, height: 140 }}>
              <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
              <View className="absolute inset-0 bg-black/35" />
              <View className="absolute bottom-0 left-0 p-4">
                <Text className="text-lg font-bold text-white">{item.title}</Text>
                <Text className="text-sm text-white/85">{item.subtitle}</Text>
              </View>
            </View>
          )}
        />

        {/* Categories */}
        <View className="px-5 pt-6">
          <SectionHeader
            title="Categories"
            actionLabel="See all"
            onAction={() => router.push("/(user)/categories")}
          />
        </View>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(c) => c.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <CategoryPill
              category={item}
              onPress={() => router.push(`/category/${item.id}`)}
            />
          )}
        />

        {/* Featured */}
        <View className="px-5 pt-6">
          <SectionHeader title="Featured Rentals" />
        </View>
        <FlatList
          horizontal
          data={featured}
          keyExtractor={(p) => p.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <View className="mr-3">
              <ProductCard product={item} variant="wide" />
            </View>
          )}
        />

        {/* Nearby */}
        <View className="px-5 pt-4">
          <SectionHeader title="Nearby You" />
          <View className="flex-row flex-wrap justify-between">
            {nearby.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </View>
        </View>

        {/* Popular */}
        <View className="px-5 pt-2">
          <SectionHeader title="Popular Right Now" />
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} variant="list" />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
