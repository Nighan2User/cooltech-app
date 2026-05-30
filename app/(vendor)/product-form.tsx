import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductForm, productSchema } from "@/utils/validation";
import { useProductStore } from "@/store/productStore";
import { CATEGORIES } from "@/data/categories";
import { DEMO_VENDOR_ID } from "@/constants/session";
import Input from "@/components/Input";
import Button from "@/components/Button";

const PLACEHOLDER = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800";

export default function ProductFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { products, addProduct, updateProduct } = useProductStore();
  const existing = id ? products.find((p) => p.id === id) : undefined;
  const isEdit = !!existing;

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

  const onSubmit = (data: ProductForm) => {
    const image = data.image || PLACEHOLDER;
    if (isEdit && existing) {
      updateProduct(existing.id, {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        category: data.category,
        location: data.location,
        images: [image, ...existing.images.slice(1)],
      });
    } else {
      addProduct({
        vendorId: DEMO_VENDOR_ID,
        title: data.title,
        description: data.description,
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
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-2 text-xl font-bold text-secondary">{isEdit ? "Edit Product" : "Add Product"}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input label="Product Title" icon="pricetag-outline" placeholder="e.g. Power Drill" value={value} onChangeText={onChange} error={errors.title?.message} />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input label="Description" icon="document-text-outline" placeholder="Describe your product" multiline value={value} onChangeText={onChange} error={errors.description?.message} />
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Price per day ($)"
              icon="cash-outline"
              keyboardType="numeric"
              placeholder="0"
              value={value ? String(value) : ""}
              onChangeText={onChange}
              error={errors.price?.message}
            />
          )}
        />

        {/* Category selector */}
        <Text className="mb-1.5 text-sm font-medium text-secondary">Category</Text>
        <View className="mb-4 flex-row flex-wrap">
          {CATEGORIES.map((c) => {
            const active = selectedCat === c.id;
            return (
              <Pressable
                key={c.id}
                onPress={() => setValue("category", c.id, { shouldValidate: true })}
                className={`mb-2 mr-2 rounded-full border px-3 py-2 ${active ? "border-primary bg-primary/10" : "border-slate-200 bg-white"}`}
              >
                <Text className={`text-xs font-medium ${active ? "text-primary" : "text-muted"}`}>{c.name}</Text>
              </Pressable>
            );
          })}
        </View>
        {errors.category && <Text className="-mt-2 mb-3 text-xs text-red-500">{errors.category.message}</Text>}

        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <Input label="Location" icon="location-outline" placeholder="City, State" value={value} onChangeText={onChange} error={errors.location?.message} />
          )}
        />

        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => (
            <Input label="Image URL (optional)" icon="image-outline" placeholder="https://..." autoCapitalize="none" value={value} onChangeText={onChange} error={errors.image?.message} />
          )}
        />

        <View className="mt-2">
          <Button label={isEdit ? "Save Changes" : "Add Product"} icon="checkmark" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
