import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Platform } from "react-native";
import { COLORS } from "@/constants/theme";
import { useBookingStore } from "@/store/bookingStore";
import FloatingCompareBar from "@/components/FloatingCompareBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserTabsLayout() {
  const insets = useSafeAreaInsets();
  const activeBookings = useBookingStore(
    (s) => s.bookings.filter((b) => ["pending", "approved", "active"].includes(b.status)).length
  );

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.muted,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#E2E8F0",
            height: Platform.OS === "ios" ? 85 : 70,
            paddingBottom: Platform.OS === "ios" ? insets.bottom : 12,
            paddingTop: 12,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
          },
          tabBarLabelStyle: { 
            fontSize: 12, 
            fontWeight: "600",
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookings"
          options={{
            title: "Bookings",
            tabBarIcon: ({ color, size, focused }) => (
              <View>
                <Ionicons 
                  name={focused ? "calendar" : "calendar-outline"} 
                  size={24} 
                  color={color} 
                />
                {activeBookings > 0 && (
                  <View className="absolute -right-2 -top-1 h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 shadow-sm">
                    <Text className="text-[10px] font-bold text-white">{activeBookings > 9 ? '9+' : activeBookings}</Text>
                  </View>
                )}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Wishlist",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "heart" : "heart-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        {/* Hidden screens - not shown in tab bar */}
        <Tabs.Screen name="cart" options={{ href: null }} />
        <Tabs.Screen name="edit-profile" options={{ href: null }} />
        <Tabs.Screen name="notifications" options={{ href: null }} />
        <Tabs.Screen name="support" options={{ href: null }} />
        <Tabs.Screen name="wallet" options={{ href: null }} />
        <Tabs.Screen name="coupons" options={{ href: null }} />
        <Tabs.Screen name="messages" options={{ href: null }} />
        <Tabs.Screen name="settings" options={{ href: null }} />
        <Tabs.Screen name="compare" options={{ href: null }} />
        <Tabs.Screen name="products" options={{ href: null }} />
        <Tabs.Screen name="verify-identity" options={{ href: null }} />
        <Tabs.Screen name="loyalty" options={{ href: null }} />
        <Tabs.Screen name="language" options={{ href: null }} />
      </Tabs>
      <FloatingCompareBar />
    </>
  );
}
