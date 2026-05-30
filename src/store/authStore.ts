import { create } from "zustand";
import { Role, User } from "@/types";
import { genId } from "@/utils/id";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  pendingPhone: string | null;
  // demo OTP that the app "sends"
  generatedOtp: string | null;

  requestOtp: (phone: string) => string;
  verifyOtp: (otp: string, role: Role) => boolean;
  updateProfile: (data: Partial<User>) => void;
  logout: () => void;
}

const DEMO_OTP = "1234";

const buildUser = (phone: string, role: Role): User => ({
  id: genId("u"),
  name: role === "vendor" ? "Vendor Account" : role === "admin" ? "Admin" : "Alex Rivera",
  phone,
  role,
  address: role === "user" ? "221B Baker Street, New York, NY" : "",
  avatar:
    role === "user"
      ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
      : undefined,
  createdAt: new Date().toISOString(),
});

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  pendingPhone: null,
  generatedOtp: null,

  requestOtp: (phone: string) => {
    // In a real app this would call Firebase Auth. Here we use a demo OTP.
    set({ pendingPhone: phone, generatedOtp: DEMO_OTP });
    return DEMO_OTP;
  },

  verifyOtp: (otp: string, role: Role) => {
    const { pendingPhone, generatedOtp } = get();
    if (!pendingPhone) return false;
    if (otp !== generatedOtp) return false;
    set({
      user: buildUser(pendingPhone, role),
      isAuthenticated: true,
      pendingPhone: null,
      generatedOtp: null,
    });
    return true;
  },

  updateProfile: (data) =>
    set((state) =>
      state.user ? { user: { ...state.user, ...data } } : state
    ),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      pendingPhone: null,
      generatedOtp: null,
    }),
}));
