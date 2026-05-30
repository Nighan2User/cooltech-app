# Cooltech Rental Services

A rental marketplace mobile app built with Expo (React Native). It covers three
roles — **Renter**, **Vendor**, and **Admin** — and runs entirely on **dummy
data** held in Zustand stores. No database or backend is connected yet, so every
action (login, booking, approvals) is simulated in-memory.

## Tech Stack

- **Expo + React Native** (Expo Router for file-based navigation)
- **NativeWind** (Tailwind CSS for RN) for styling
- **Zustand** for state management
- **React Hook Form + Zod** for forms and validation
- **@expo/vector-icons** (Ionicons) for icons

## Getting Started

```bash
npm install
npm start
```

Then press `i` for iOS, `a` for Android, or `w` for web. You can also scan the
QR code with the Expo Go app.

> If the asset images are missing, regenerate placeholders with:
> `python3 scripts/gen_assets.py`

## Demo Login

Authentication is mocked. On the login screen:

1. Pick a role: **Renter**, **Vendor**, or **Admin**.
2. Enter any phone number.
3. Use OTP **`1234`** to verify.

You'll be routed to the matching experience for that role.

## Features by Role

### Renter (`app/(user)`)
- Home with banners, categories, featured / nearby / popular rentals
- Explore categories, category listing with sort + availability filters
- Full-text search with category, price-range and rating filters
- Product details with image carousel, vendor info, reviews, availability
- Booking flow: date + duration + quantity → simulated Razorpay payment
- Bookings list with status tracking, booking detail, cancellation, invoice (mock)
- Saved/favorites, profile, edit profile, notifications, support (call/WhatsApp/email + FAQ)

### Vendor (`app/(vendor)`)
- Dashboard: earnings, bookings, active rentals, pending requests
- Product management: add / edit / delete, toggle availability
- Booking requests: approve / reject, mark active, mark completed
- Vendor account + verification status

### Admin (`app/(admin)`)
- Overview: users, vendors, products, bookings, platform revenue
- Vendor verification (verify / revoke)
- Product moderation (feature / unfeature / remove)
- User directory with per-user booking counts
- Broadcast a promotional push (simulated)

## Project Structure

```
app/                       # Expo Router routes
  (auth)/                  # welcome, login, otp
  (user)/                  # renter tabs + sub screens
  (vendor)/                # vendor tabs + product form
  (admin)/                 # admin tabs
  product/[id].tsx         # product details
  category/[id].tsx        # category listing
  booking/new.tsx          # checkout
  booking/[id].tsx         # booking details
  search.tsx               # search + filters
src/
  components/               # reusable UI (Button, Input, ProductCard, ...)
  store/                    # Zustand stores (auth, product, booking, ...)
  data/                     # dummy data (products, vendors, bookings, ...)
  types/                    # shared TypeScript types
  utils/                    # formatting, ids, Zod schemas
  constants/                # theme colors, support info, demo session ids
```

## Connecting a Real Backend Later

The schema in `src/types` mirrors the planned Firestore collections (users,
vendors, products, bookings, reviews, notifications, favorites). To go live,
swap the in-memory reads/writes inside `src/store/*` and `src/data/*` for
Firebase Auth, Firestore, Storage, and FCM calls — the UI layer won't need to
change.

## Notes

- This is an MVP scaffold focused on UX and flows. Payments, OTP, invoices and
  push notifications are simulated.
- State resets on reload since there's no persistence layer yet.
