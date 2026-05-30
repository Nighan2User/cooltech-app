import { create } from "zustand";
import { Vendor } from "@/types";
import { VENDORS } from "@/data/vendors";

interface VendorState {
  vendors: Vendor[];
  setVerified: (id: string, verified: boolean) => void;
}

export const useVendorStore = create<VendorState>((set) => ({
  vendors: VENDORS,
  setVerified: (id, verified) =>
    set((state) => ({
      vendors: state.vendors.map((v) =>
        v.id === id ? { ...v, verified } : v
      ),
    })),
}));
