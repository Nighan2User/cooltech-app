import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <View className="flex-1 items-center justify-center bg-bg p-5">
        <Text className="text-2xl font-bold text-secondary mb-2">404</Text>
        <Text className="text-base text-muted mb-4">This page could not be found.</Text>
        <Link href="/" className="text-primary font-semibold">
          Go back home
        </Link>
      </View>
    </>
  );
}
