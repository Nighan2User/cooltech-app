# Cooltech Rental Services

A comprehensive rental marketplace mobile app built with Expo (React Native). It covers three
roles — **Renter**, **Vendor**, and **Admin** — and runs entirely on **mock data** with a fully
interactive frontend prototype.

## 🎯 Project Status

**Frontend: ✅ COMPLETE** - Production-ready UI with 40+ components and 24+ pages
**Backend: ⏳ NOT IMPLEMENTED** - All features use mock data (Zustand stores)

## Tech Stack

- **Framework**: Expo + React Native (Expo Router for file-based navigation)
- **Styling**: NativeWind (Tailwind CSS for RN)
- **State Management**: Zustand
- **Forms & Validation**: React Hook Form + Zod
- **Icons**: @expo/vector-icons (Ionicons)
- **Charts**: React Native SVG (custom components)

## 🚀 Getting Started

```bash
npm install
npm start
```

Then press `w` for web, `i` for iOS, `a` for Android, or scan the QR code with Expo Go.

> **Quick Demo**: Use any phone number with OTP **`1234`** to login

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)** - Complete component & architecture docs

## ✨ What's Built

### 🎨 40+ UI Components
- **Core**: Button, Input, Card, Avatar, Badge, Chip, Divider
- **Forms**: Select, RadioGroup, Checkbox, Slider, Calendar
- **Layout**: Modal, BottomSheet, TabBar, Accordion
- **Display**: EmptyState, LoadingSpinner, StatusBadge, RatingStars, ProgressBar
- **Advanced**: ImageCarousel, Toast, PaymentSelector, ReviewForm, FilterSheet
- **Charts**: LineChart, BarChart, ProgressBar

### 📱 24+ Interactive Pages

#### Customer Module (12 pages)
- Home with banners, categories, featured rentals
- Search with filters (price, rating, availability)
- Product details with image carousel
- Cart with coupon application
- Bookings with status tracking
- **Wallet** with transactions
- **Coupons** & offers
- **Messages/Chat** interface
- Profile & Settings
- **Enhanced Support** with FAQ accordion

#### Vendor Module (7 pages)
- Dashboard with earnings & stats
- **Analytics** with charts & metrics
- Product management (CRUD)
- Booking requests handling
- **Reviews** with rating distribution
- Account & verification

#### Admin Module (5 pages)
- Platform overview dashboard
- User & vendor management
- Product moderation
- Vendor approvals

### 🔧 Key Features

✅ **Fully Interactive** - Every button, form, modal works
✅ **Toast Notifications** - Global notification system
✅ **Chat System** - Messages & conversations
✅ **Wallet** - Add money, view transactions
✅ **Coupons** - Discount codes with validation
✅ **Analytics** - Charts, graphs, metrics
✅ **Reviews** - Rating system with star distribution
✅ **Calendar** - Date picker for bookings
✅ **Image Carousel** - Swipeable product images
✅ **Filters** - Advanced search & sort
✅ **Empty States** - Beautiful placeholders everywhere
✅ **Loading States** - Skeleton loaders
✅ **Form Validation** - Real-time input validation
✅ **Responsive Design** - Mobile, tablet, web support

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
