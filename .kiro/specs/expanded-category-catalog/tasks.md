# Implementation Tasks: Expanded Category Catalog

## 1. Data Structure Extensions

### 1.1 Extend CATEGORIES Array
**Status:** [ ]  
**File:** `src/data/categories.ts`  
**Estimated Time:** 15 minutes

Add 8 new Category objects to the CATEGORIES array:

```typescript
{ id: "home-appliances", name: "Home Appliances", icon: "home", color: "#10B981" },
{ id: "office-equipment", name: "Office Equipment & Furniture", icon: "briefcase", color: "#3B82F6" },
{ id: "medical-equipment", name: "Hospital & Medical Equipment", icon: "medical", color: "#EF4444" },
{ id: "industrial-heavy", name: "Industrial Heavy Equipment", icon: "settings", color: "#6366F1" },
{ id: "construction-heavy", name: "Heavy Construction Equipment", icon: "construct-outline", color: "#F59E0B" },
{ id: "music-instruments", name: "Music Instruments & Audio", icon: "musical-notes", color: "#8B5CF6" },
{ id: "photography", name: "Photography & Videography", icon: "camera", color: "#EC4899" },
{ id: "defence-psu", name: "Defence / DRDO / PSU Premium", icon: "shield", color: "#14532D" },
```

**Acceptance Criteria:**
- CATEGORIES.length === 28
- All new entries have unique IDs
- All icons are valid Ionicons names
- All colors are valid hex codes

---

### 1.2 Extend TAXONOMY Object
**Status:** [ ]  
**File:** `src/data/products.ts`  
**Estimated Time:** 20 minutes

Add 8 new category mappings to TAXONOMY object with complete product lists:

**home-appliances:** 15 items (Mixer Grinder, Wet Grinder, Microwave Oven, Refrigerator, Air Cooler, Air Conditioner, Washing Machine, Vacuum Cleaner, Steam Iron, Water Purifier, UPS/Inverter, Generator, Sofa Set, Dining Table, Drilling Machine)

**office-equipment:** 16 items (Office Table, Executive Desk, Meeting Table, Conference Chair, Coffee Machine, Printer, Xerox Machine, Scanner, Projector, LED TV, Interactive Display, Speaker System, Lighting Equipment, Laptop, Desktop Computer, Office UPS System)

**medical-equipment:** 15 items (Hospital Bed, ICU Bed, Patient Stretcher, Examination Table, Wheelchair, Oxygen Concentrator, Oxygen Cylinder, Nebulizer, Patient Monitor, ECG Machine, Infusion Pump, Suction Machine, CPAP Machine, BiPAP Machine, Medical Trolley)

**industrial-heavy:** 15 items (Diesel Generator (DG Set), Portable Generator, Industrial UPS System, Online UPS, Servo Stabilizer, Air Compressor, Water Chiller, Industrial Chiller, Industrial Blower, Welding Machine, Forklift, Pallet Truck, Hydraulic Jack, Material Handling Equipment, Industrial Vacuum Cleaner)

**construction-heavy:** 15 items (Mobile Crane, Tower Crane, Hydra Crane, Crane with Operator, Excavator, Backhoe Loader (JCB), Concrete Mixer, Transit Mixer, Scaffolding, Earth Compactor, Road Roller, Bulldozer, Jack Hammer, Boom Lift, Scissor Lift)

**music-instruments:** 15 items (Acoustic Guitar, Electric Guitar, Keyboard, Piano, Drum Set, Tabla, Dhol, Harmonium, Violin, Flute, Saxophone, DJ Controller, PA System, Microphone, Stage Lighting)

**photography:** 14 items (DSLR Camera, Mirrorless Camera, Cinema Camera, Drone Camera, Camera Lens (Wide Angle), Camera Lens (Telephoto), Camera Lens (Macro), Tripod, Gimbal Stabilizer, Studio Light, Ring Light, Softbox, Green Screen, Live Streaming Kit)

**defence-psu:** 6 items (High Capacity Industrial Chiller, Military Grade Diesel Generator, Industrial Online UPS (100kVA+), Servo Voltage Stabilizer (Industrial), Environmental Test Chamber, Data Center Cooling System)

**Acceptance Criteria:**
- Object.keys(TAXONOMY).length === 28
- All 8 new categories have product arrays
- Total new products === 111 items

---

### 1.3 Extend CATEGORY_IMAGE Object
**Status:** [ ]  
**File:** `src/data/products.ts`  
**Estimated Time:** 10 minutes

Add 8 new image URL mappings to CATEGORY_IMAGE object:

```typescript
"home-appliances": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
"office-equipment": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
"medical-equipment": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
"industrial-heavy": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
"construction-heavy": "https://images.unsplash.com/photo-1590496793907-4d7b7b2b3d41?w=800",
"music-instruments": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
"photography": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
"defence-psu": "https://images.unsplash.com/photo-1581092918484-8313e1f151db?w=800",
```

**Acceptance Criteria:**
- Object.keys(CATEGORY_IMAGE).length === 28
- All URLs are valid Unsplash URLs with w=800
- All URLs use HTTPS protocol

---

### 1.4 Extend CATEGORY_BASE_PRICE Object
**Status:** [ ]  
**File:** `src/data/products.ts`  
**Estimated Time:** 5 minutes

Add 8 new base price mappings to CATEGORY_BASE_PRICE object:

```typescript
"home-appliances": 25,
"office-equipment": 45,
"medical-equipment": 120,
"industrial-heavy": 180,
"construction-heavy": 280,
"music-instruments": 35,
"photography": 65,
"defence-psu": 450,
```

**Acceptance Criteria:**
- Object.keys(CATEGORY_BASE_PRICE).length === 28
- All prices are positive integers
- Prices reflect realistic daily rental rates

---

## 2. Verification and Testing

### 2.1 Verify Data Consistency
**Status:** [ ]  
**Estimated Time:** 10 minutes

Verify all data structures are consistent and aligned.

**Steps:**
1. Check that all category IDs in TAXONOMY exist in CATEGORIES array
2. Check that all category IDs in TAXONOMY have entries in CATEGORY_IMAGE
3. Check that all category IDs in TAXONOMY have entries in CATEGORY_BASE_PRICE
4. Verify no duplicate category IDs exist

**Acceptance Criteria:**
- All 28 categories are present in all 4 data structures
- No data inconsistencies found
- TypeScript compilation succeeds

---

### 2.2 Verify Product Generation
**Status:** [ ]  
**Estimated Time:** 10 minutes

Verify that buildProducts() correctly generates products for all new categories.

**Steps:**
1. Import PRODUCTS array
2. Check total product count is approximately 311-315
3. Verify products exist for all 8 new categories
4. Check that product IDs are sequential and unique
5. Verify product prices are within expected range (base × 0.85 to base × 1.25)

**Acceptance Criteria:**
- PRODUCTS.length is between 311-315
- getProductsByCategory() returns products for all new category IDs
- All products have valid data (no null fields)
- Product generation is deterministic (same output on reload)

---

### 2.3 Test Category Filtering
**Status:** [ ]  
**Estimated Time:** 10 minutes

Test that category filtering works correctly for new categories.

**Steps:**
1. Call getProductsByCategory() for each new category ID
2. Verify returned products match expected counts
3. Test that category screen displays all 28 categories
4. Verify category colors and icons render correctly

**Acceptance Criteria:**
- getProductsByCategory("home-appliances") returns 15 products
- getProductsByCategory("office-equipment") returns 16 products
- getProductsByCategory("medical-equipment") returns 15 products
- getProductsByCategory("industrial-heavy") returns 15 products
- getProductsByCategory("construction-heavy") returns 15 products
- getProductsByCategory("music-instruments") returns 15 products
- getProductsByCategory("photography") returns 14 products
- getProductsByCategory("defence-psu") returns 6 products

---

### 2.4 Verify Backward Compatibility
**Status:** [ ]  
**Estimated Time:** 10 minutes

Verify that existing categories and products remain unchanged.

**Steps:**
1. Check that all 20 original category definitions are unchanged
2. Verify original TAXONOMY mappings are unchanged
3. Check that original product IDs are unchanged
4. Verify existing product data (prices, ratings, etc.) is unchanged

**Acceptance Criteria:**
- First 20 categories in CATEGORIES array match original definitions
- Original TAXONOMY entries match original product lists
- Product IDs p1 through p200 (approximately) remain consistent
- No breaking changes to existing data

---

### 2.5 Run TypeScript Type Checking
**Status:** [ ]  
**Estimated Time:** 5 minutes

Ensure all code passes TypeScript type checking.

**Steps:**
1. Run `npx tsc --noEmit` to check for type errors
2. Verify no type errors in categories.ts
3. Verify no type errors in products.ts
4. Check that all Category objects conform to interface
5. Check that all Product objects conform to interface

**Acceptance Criteria:**
- TypeScript compilation succeeds with zero errors
- No type warnings related to new data
- All objects conform to their respective interfaces

---

## 3. Documentation

### 3.1 Update README (Optional)
**Status:** [ ]  
**Estimated Time:** 10 minutes

Update project documentation to reflect expanded catalog.

**Steps:**
1. Update feature list to mention 28 categories
2. List all 8 new category domains
3. Update product count to ~315 products

**Acceptance Criteria:**
- README accurately reflects new category count
- New category domains are documented

---

## 4. Summary

**Total Estimated Time:** 1.5 - 2 hours

**Task Breakdown:**
- Data structure extensions: 50 minutes
- Verification and testing: 45 minutes
- Documentation: 10 minutes (optional)

**Critical Path:**
1. Extend CATEGORIES array (1.1)
2. Extend TAXONOMY object (1.2)
3. Extend CATEGORY_IMAGE object (1.3)
4. Extend CATEGORY_BASE_PRICE object (1.4)
5. Verify data consistency (2.1)
6. Verify product generation (2.2)
7. Test category filtering (2.3)

**Dependencies:**
- Tasks 1.2, 1.3, 1.4 depend on task 1.1 (category IDs must exist first)
- All verification tasks (2.x) depend on completion of data extensions (1.x)

**Risk Areas:**
- Typos in category IDs could cause data inconsistencies
- Invalid Ionicons icon names could cause rendering issues
- Incorrect product counts in TAXONOMY arrays
