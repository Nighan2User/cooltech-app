import { Alert, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useVendorStore } from "@/store/vendorStore";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useBookingStore } from "@/store/bookingStore";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { USERS } from "@/data/users";
import { formatCurrency } from "@/utils/format";
import { pickImage } from "@/utils/imagePicker";
import StatCard from "@/components/StatCard";
import BookingCard from "@/components/BookingCard";
import SectionHeader from "@/components/SectionHeader";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function AdminDashboard() {
  const router = useRouter();
  const vendors = useVendorStore((s) => s.vendors);
  const products = useProductStore((s) => s.products);
  const addProduct = useProductStore((s) => s.addProduct);
  const bookings = useBookingStore((s) => s.bookings);
  const categories = useCategoryStore((s) => s.categories);
  const addCategory = useCategoryStore((s) => s.addCategory);
  const logout = useAuthStore((s) => s.logout);
  const pushNotif = useNotificationStore((s) => s.push);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("construct");
  const [newCategoryColor, setNewCategoryColor] = useState("#2563EB");
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductLocation, setNewProductLocation] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [selectedProductImage, setSelectedProductImage] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [showProductCategorySelect, setShowProductCategorySelect] = useState(false);

  const CATEGORY_ICON_OPTIONS = [
    "construct",
    "home",
    "car",
    "musical-notes",
    "camera",
    "leaf",
    "flash",
    "shield",
  ] as const;

  const CATEGORY_COLOR_OPTIONS = [
    "#2563EB",
    "#16A34A",
    "#EC4899",
    "#F59E0B",
    "#0EA5E9",
    "#7C3AED",
  ];

  const createCategory = () => {
    if (!newCategoryName.trim()) {
      if (Platform.OS === "web") {
        window.alert("Category name is required.");
      } else {
        Alert.alert("Validation", "Category name is required.");
      }
      return;
    }
    addCategory({
      name: newCategoryName.trim(),
      icon: newCategoryIcon,
      color: newCategoryColor,
    });
    setNewCategoryName("");
    setNewCategoryIcon("construct");
    setNewCategoryColor("#2563EB");
    setShowCategoryModal(false);
  };

  const createProduct = () => {
    if (!newProductTitle.trim() || !newProductCategory || !newProductLocation.trim() || !newProductPrice.trim()) {
      if (Platform.OS === "web") {
        window.alert("Please complete all required product fields.");
      } else {
        Alert.alert("Validation", "Please complete all required product fields.");
      }
      return;
    }

    addProduct({
      vendorId: "v1",
      title: newProductTitle.trim(),
      description: newProductDescription.trim() || `${newProductTitle.trim()} available for daily, weekly and monthly rental. Well maintained and inspected before every hire.`,
      price: Number(newProductPrice),
      category: newProductCategory,
      location: newProductLocation.trim(),
      images: [selectedProductImage || "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800"],
      availability: true,
      featured: false,
      popular: false,
    });

    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductCategory("");
    setNewProductLocation("");
    setSelectedProductImage("");
    setNewProductDescription("");
    setShowProductModal(false);
  };

  const handleProductImagePick = async () => {
    const image = await pickImage();
    if (image) {
      setSelectedProductImage(image.uri);
    }
  };

  const clearProductImage = () => {
    setSelectedProductImage("");
  };

  const revenue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const recent = [...bookings].slice(0, 3);

  const sendPromo = () => {
    pushNotif({
      title: "Promotional Offer",
      body: "Admin broadcast: 15% off all rentals this weekend!",
      type: "promo",
    });
    if (Platform.OS === "web") {
      window.alert("Sent: Promotional push notification broadcast to all users.");
    } else {
      Alert.alert("Sent", "Promotional push notification broadcast to all users.");
    }
  };

  const confirmLogout = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Log out of admin panel?")) {
        logout();
        router.replace("/(auth)/welcome");
      }
      return;
    }
    Alert.alert("Log out", "Log out of admin panel?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => { logout(); router.replace("/(auth)/welcome"); } },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="flex-row items-center justify-between px-5 pt-2">
          <View>
            <Text className="text-sm text-muted">Admin Panel</Text>
            <Text className="text-2xl font-bold text-secondary">Overview</Text>
          </View>
          <Pressable onPress={confirmLogout} className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm" style={{ elevation: 1 }}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          </Pressable>
        </View>

        {/* Revenue hero */}
        <View className="mx-5 mt-4 rounded-2xl bg-secondary p-5" style={{ elevation: 2 }}>
          <Text className="text-sm text-white/70">Platform Revenue</Text>
          <Text className="mt-1 text-3xl font-bold text-white">{formatCurrency(revenue)}</Text>
          <Text className="mt-2 text-xs text-white/70">{bookings.length} total bookings processed</Text>
        </View>

        {/* Stats */}
        <View className="mt-4 flex-row flex-wrap justify-between px-5">
          <StatCard label="Total Users" value={`${USERS.length}`} icon="people" color="#2563EB" />
          <StatCard label="Total Vendors" value={`${vendors.length}`} icon="storefront" color="#8B5CF6" />
          <StatCard label="Total Products" value={`${products.length}`} icon="cube" color="#16A34A" />
          <StatCard label="Total Bookings" value={`${bookings.length}`} icon="receipt" color="#F59E0B" />
        </View>

        {/* Quick actions */}
        <View className="px-5 pt-2">
          <SectionHeader title="Quick Actions" />
          <View className="flex-row flex-wrap justify-between gap-3">
            <Pressable onPress={() => router.push("/(admin)/approvals")} className="flex-1 min-w-[140px] items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <Ionicons name="checkmark-done-circle" size={24} color="#2563EB" />
              <Text className="mt-1 text-xs font-medium text-secondary">Approvals</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/(admin)/vendors")} className="flex-1 min-w-[140px] items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <Ionicons name="shield-checkmark" size={24} color="#16A34A" />
              <Text className="mt-1 text-xs font-medium text-secondary">Verify</Text>
            </Pressable>
            <Pressable onPress={() => setShowCategoryModal(true)} className="flex-1 min-w-[140px] items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <Ionicons name="layers-outline" size={24} color="#0EA5E9" />
              <Text className="mt-1 text-xs font-medium text-secondary">Add Category</Text>
            </Pressable>
            <Pressable onPress={() => setShowProductModal(true)} className="flex-1 min-w-[140px] items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <Ionicons name="cube-outline" size={24} color="#8B5CF6" />
              <Text className="mt-1 text-xs font-medium text-secondary">Add Item</Text>
            </Pressable>
            <Pressable onPress={sendPromo} className="flex-1 min-w-[140px] items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <Ionicons name="megaphone" size={24} color="#EC4899" />
              <Text className="mt-1 text-xs font-medium text-secondary">Broadcast</Text>
            </Pressable>
          </View>
        </View>

        <Modal visible={showCategoryModal} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/40">
            <View className="rounded-t-3xl bg-white p-5">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-bold text-secondary">Add New Category</Text>
                  <Text className="text-sm text-muted">Create a category for admin-managed rentals.</Text>
                </View>
                <Pressable onPress={() => setShowCategoryModal(false)}>
                  <Ionicons name="close" size={22} color="#64748B" />
                </Pressable>
              </View>

              <View className="mt-5">
                <Input
                  label="Category name"
                  placeholder="Construction Equipment"
                  value={newCategoryName}
                  onChangeText={setNewCategoryName}
                />
                <Text className="mb-2 text-sm font-medium text-secondary">Icon</Text>
                <View className="flex-row flex-wrap gap-2">
                  {CATEGORY_ICON_OPTIONS.map((icon) => (
                    <Pressable
                      key={icon}
                      onPress={() => setNewCategoryIcon(icon)}
                      className={`rounded-2xl border px-3 py-2 ${newCategoryIcon === icon ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"}`}
                    >
                      <Ionicons name={icon as any} size={18} color={newCategoryIcon === icon ? "#2563EB" : "#475569"} />
                    </Pressable>
                  ))}
                </View>

                <Text className="mb-2 mt-4 text-sm font-medium text-secondary">Color</Text>
                <View className="flex-row flex-wrap gap-2">
                  {CATEGORY_COLOR_OPTIONS.map((color) => (
                    <Pressable
                      key={color}
                      onPress={() => setNewCategoryColor(color)}
                      className={`h-10 w-10 rounded-2xl border ${newCategoryColor === color ? "border-black" : "border-transparent"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </View>

                <View className="mt-6">
                  <Button label="Create Category" onPress={createCategory} />
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal visible={showProductModal} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/40">
            <View className="rounded-t-3xl bg-white p-5">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-lg font-bold text-secondary">Add New Item</Text>
                  <Text className="text-sm text-muted">Create a rental product for the catalog.</Text>
                </View>
                <Pressable onPress={() => setShowProductModal(false)}>
                  <Ionicons name="close" size={22} color="#64748B" />
                </Pressable>
              </View>

              <View className="mt-5">
                <Input
                  label="Product title"
                  placeholder="JCB 30X Xtra"
                  value={newProductTitle}
                  onChangeText={setNewProductTitle}
                />
                <Input
                  label="Price per day (₹)"
                  placeholder="2799"
                  keyboardType="numeric"
                  value={newProductPrice}
                  onChangeText={setNewProductPrice}
                />
                <Text className="mb-2 text-sm font-medium text-secondary">Category</Text>
                <View className="mb-4 rounded-xl border border-slate-200 bg-white">
                  <Pressable
                    onPress={() => setShowProductCategorySelect((prev) => !prev)}
                    className="flex-row items-center justify-between px-4 py-3"
                  >
                    <Text className={`${newProductCategory ? "text-secondary" : "text-muted"}`}>
                      {categories.find((c) => c.id === newProductCategory)?.name ?? "Select a category"}
                    </Text>
                    <Ionicons name="chevron-down" size={18} color="#94A3B8" />
                  </Pressable>
                  {showProductCategorySelect && (
                    <View className="max-h-60 border-t border-slate-200">
                      <ScrollView>
                        {categories.map((c) => (
                          <Pressable
                            key={c.id}
                            onPress={() => {
                              setNewProductCategory(c.id);
                              setShowProductCategorySelect(false);
                            }}
                            className="px-4 py-3"
                          >
                            <Text className="text-sm text-secondary">{c.name}</Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                <Input
                  label="Location"
                  placeholder="Mumbai, Maharashtra"
                  value={newProductLocation}
                  onChangeText={setNewProductLocation}
                />

                <View className="mb-4">
                  <Text className="mb-2 text-sm font-medium text-secondary">
                    Product Image
                  </Text>
                  {selectedProductImage ? (
                    <View className="mb-3 overflow-hidden rounded-2xl bg-slate-100">
                      <Image
                        source={{ uri: selectedProductImage }}
                        style={{ width: "100%", height: 200 }}
                        contentFit="cover"
                      />
                      <View className="absolute right-2 top-2">
                        <Pressable
                          onPress={clearProductImage}
                          className="h-8 w-8 items-center justify-center rounded-full bg-red-500"
                        >
                          <Ionicons name="close" size={16} color="#fff" />
                        </Pressable>
                      </View>
                    </View>
                  ) : null}
                  <Pressable
                    onPress={handleProductImagePick}
                    className="flex-row items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-6"
                  >
                    <Ionicons name="image-outline" size={24} color="#94A3B8" />
                    <Text className="ml-2 font-medium text-slate-600">
                      {selectedProductImage ? "Change Image" : "Pick Image from Gallery"}
                    </Text>
                  </Pressable>
                  <Text className="mt-1 text-xs text-muted">Max 1MB</Text>
                </View>
                <Input
                  label="Description (optional)"
                  placeholder="Short description"
                  value={newProductDescription}
                  onChangeText={setNewProductDescription}
                />

                <View className="mt-4">
                  <Button label="Create Item" onPress={createProduct} />
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* Recent bookings */}
        <View className="px-5 pt-4">
          <SectionHeader title="Recent Bookings" />
          {recent.map((b) => <BookingCard key={b.id} booking={b} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
