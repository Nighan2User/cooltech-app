import { create } from "zustand";
import { Booking, BookingStatus } from "@/types";
import { BOOKINGS } from "@/data/bookings";
import { genId } from "@/utils/id";

interface BookingState {
  bookings: Booking[];
  createBooking: (
    b: Omit<Booking, "id" | "createdAt" | "status" | "paymentStatus"> & {
      paymentStatus?: Booking["paymentStatus"];
    }
  ) => Booking;
  setStatus: (id: string, status: BookingStatus) => void;
  cancelBooking: (id: string) => void;
  markPaid: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: BOOKINGS,

  createBooking: (b) => {
    const booking: Booking = {
      ...b,
      id: genId("b"),
      status: "pending",
      paymentStatus: b.paymentStatus ?? "unpaid",
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ bookings: [booking, ...state.bookings] }));
    return booking;
  },

  setStatus: (id, status) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status } : b
      ),
    })),

  cancelBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status: "cancelled" } : b
      ),
    })),

  markPaid: (id) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, paymentStatus: "paid" } : b
      ),
    })),
}));
