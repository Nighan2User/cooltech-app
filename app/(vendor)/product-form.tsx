import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductForm, productSchema } from "@/utils/validation";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import { TAXONOMY } from "@/data/products";
import { DEMO_VENDOR_ID } from "@/constants/session";
import { pickImage } from "@/utils/imagePicker";
import Input from "@/components/Input";
import Button from "@/components/Button";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800";

// ─── reusable dropdown component ────────────────────────────────────────────
interface DropdownProps {
  label: string;
  placeholder: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  error?: string;
}

function Dropdown({ label, placeholder, value, options, onChange, error }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-medium text-secondary">{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        className={`flex-row items-center rounded-xl border bg-white px-4 py-3.5 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        <Text className={`flex-1 text-sm ${selected ? "text-secondary" : "text-muted"}`}>
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#94A3B8" />
      </Pressable>
      {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/40"
          onPress={() => setOpen(false)}
        >
          <View className="mx-4 mt-auto mb-8 max-h-96 overflow-hidden rounded-2xl bg-white">
            <View className="flex-row items-center justify-between border-b border-slate-100 px-4 py-3">
              <Text className="text-base font-semibold text-secondary">{label}</Text>
              <Pressable onPress={() => setOpen(false)}>
                <Ionicons name="close" size={22} color="#64748B" />
              </Pressable>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
              {options.map((opt) => {
                const active = opt.value === value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`flex-row items-center px-4 py-3.5 border-b border-slate-50 ${
                      active ? "bg-primary/5" : ""
                    }`}
                  >
                    <Text
                      className={`flex-1 text-sm ${
                        active ? "font-semibold text-primary" : "text-secondary"
                      }`}
                    >
                      {opt.label}
                    </Text>
                    {active && (
                      <Ionicons name="checkmark" size={18} color="#2563EB" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
// ────────────────────────────────────────────────────────────────────────────

export default function ProductFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { products, addProduct, updateProduct } = useProductStore();
  const existing = id ? products.find((p) => p.id === id) : undefined;
  const isEdit = !!existing;
  const [selectedImage, setSelectedImage] = useState<string>(
    existing?.images[0] || ""
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: existing?.title ?? "",
      description: existing?.description ?? "",
      price: existing?.price ?? 0,
      category: existing?.category ?? "",
      location: existing?.location ?? "",
      image: existing?.images[0] ?? "",
    },
  });

  const selectedCat = watch("category");
  const selectedTitle = watch("title");
  const categories = useCategoryStore((s) => s.categories);

  // Build category options from the category store
  const categoryOptions = categories.map((c) => ({ label: c.name, value: c.id }));

  // Build item options for selected category
  const itemOptions = selectedCat && TAXONOMY[selectedCat]
    ? TAXONOMY[selectedCat].map((item) => ({ label: item, value: item }))
    : [];

  const handleImagePick = async () => {
    const image = await pickImage();
    if (image) {
      setSelectedImage(image.uri);
      setValue("image", image.uri, { shouldValidate: true });
    }
  };

  const clearImage = () => {
    setSelectedImage("");
    setValue("image", "", { shouldValidate: true });
  };

  const onSubmit = (data: ProductForm) => {
    const image = data.image || PLACEHOLDER;
    // Auto-generate description if blank
    const description =
      data.description ||
      `${data.title} available for daily, weekly and monthly rental. Well maintained and inspected before every hire.`;

    if (isEdit && existing) {
      updateProduct(existing.id, {
        title: data.title,
        description,
        price: Number(data.price),
        category: data.category,
        location: data.location,
        images: [image, ...existing.images.slice(1)],
      });
    } else {
      addProduct({
        vendorId: DEMO_VENDOR_ID,
        title: data.title,
        description,
        price: Number(data.price),
        category: data.category,
        location: data.location,
        images: [image],
        availability: true,
        featured: false,
        popular: false,
      });
    }
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-2 text-xl font-bold text-secondary">
          {isEdit ? "Edit Product" : "Add Product"}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Category Dropdown */}
        <Controller
          control={control}
          name="category"
          render={({ field: { value } }) => (
            <Dropdown
              label="Category"
              placeholder="Select a category"
              value={value}
              options={categoryOptions}
              onChange={(val) => {
                setValue("category", val, { shouldValidate: true });
                // Reset item selection when category changes
                setValue("title", "", { shouldValidate: false });
              }}
              error={errors.category?.message}
            />
          )}
        />

        {/* Item Dropdown — only shown when a category with items is selected */}
        {selectedCat && itemOptions.length > 0 && (
          <Controller
            control={control}
            name="title"
            render={({ field: { value } }) => (
              <Dropdown
                label="Product Type"
                placeholder="Select an item"
                value={value}
                options={itemOptions}
                onChange={(val) =>
                  setValue("title", val, { shouldValidate: true })
                }
                error={errors.title?.message}
              />
            )}
          />
        )}

        {/* Price */}
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Price per day (₹)"
              icon="cash-outline"
              keyboardType="numeric"
              placeholder="0"
              value={value ? String(value) : ""}
              onChangeText={onChange}
              error={errors.price?.message}
            />
          )}
        />

        {/* Location */}
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Location"
              icon="location-outline"
              placeholder="City, State"
              value={value}
              onChangeText={onChange}
              error={errors.location?.message}
            />
          )}
        />

        {/* Image Picker */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-secondary">
            Product Image
          </Text>
          {selectedImage ? (
            <View className="mb-3 overflow-hidden rounded-2xl bg-slate-100">
              <Image
                source={{ uri: selectedImage }}
                style={{ width: "100%", height: 200 }}
                contentFit="cover"
              />
              <View className="absolute right-2 top-2">
                <Pressable
                  onPress={clearImage}
                  className="h-8 w-8 items-center justify-center rounded-full bg-red-500"
                >
                  <Ionicons name="close" size={16} color="#fff" />
                </Pressable>
              </View>
            </View>
          ) : null}
          <Pressable
            onPress={handleImagePick}
            className="flex-row items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-6"
          >
            <Ionicons name="image-outline" size={24} color="#94A3B8" />
            <Text className="ml-2 font-medium text-slate-600">
              {selectedImage ? "Change Image" : "Pick Image from Gallery"}
            </Text>
          </Pressable>
          <Text className="mt-1 text-xs text-muted">Max 1MB</Text>
        </View>

        <View className="mt-2">
          <Button
            label={isEdit ? "Save Changes" : "Add Product"}
            icon="checkmark"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
