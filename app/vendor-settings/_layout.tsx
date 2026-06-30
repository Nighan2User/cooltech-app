import { Stack } from "expo-router";

export default function VendorSettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#F8FAFC" },
      }}
    >
      <Stack.Screen name="store" />
      <Stack.Screen name="payout" />
      <Stack.Screen name="earnings" />
      <Stack.Screen name="support" />
    </Stack>
  );
}
