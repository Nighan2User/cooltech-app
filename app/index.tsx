import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Redirect href="/(auth)/welcome" />;
  }

  if (user.role === "vendor") return <Redirect href="/(vendor)/dashboard" />;
  if (user.role === "admin") return <Redirect href="/(admin)/dashboard" />;
  return <Redirect href="/(user)/home" />;
}
