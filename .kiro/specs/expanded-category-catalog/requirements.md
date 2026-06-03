# Requirements Document: Expanded Category Catalog

## 1. Functional Requirements

### 1.1 Category Data Expansion

**Priority:** High  
**Status:** Required

The system SHALL expand the category catalog from 20 to 28 categories by adding 8 new category domains:
- Home Appliances
- Office Equipment & Furniture
- Hospital & Medical Equipment
- Industrial Heavy Equipment
- Heavy Construction Equipment
- Music Instruments & Audio
- Photography & Videography
- Defence / DRDO / PSU Premium

**Acceptance Criteria:**
- CATEGORIES array in `src/data/categories.ts` contains exactly 28 entries
- Each new category has: unique id, descriptive name, valid Ionicons icon, hex color code
- All existing 20 categories remain unchanged

---

### 1.2 Product Taxonomy Extension

**Priority:** High  
**Status:** Required

The system SHALL extend the TAXONOMY mapping with 8 new category-to-products mappings containing 115+ new product types.

**Acceptance Criteria:**
- TAXONOMY object in `src/data/products.ts` contains 28 category mappings
- home-appliances category contains 15 product types (Mixer Grinder, Wet Grinder, Microwave Oven, Refrigerator, Air Cooler, Air Conditioner, Washing Machine, Vacuum Cleaner, Steam Iron, Water Purifier, UPS/Inverter, Generator, Sofa Set, Dining Table, Drilling Machine)
- office-equipment category contains 16 product types (Office Table, Executive Desk, Meeting Table, Conference Chair, Coffee Machine, Printer, Xerox Machine, Scanner, Projector, LED TV, Interactive Display, Speaker System, Lighting Equipment, Laptop, Desktop Computer, Office UPS System)
- medical-equipment category contains 15 product types (Hospital Bed, ICU Bed, Patient Stretcher, Examination Table, Wheelchair, Oxygen Concentrator, Oxygen Cylinder, Nebulizer, Patient Monitor, ECG Machine, Infusion Pump, Suction Machine, CPAP Machine, BiPAP Machine, Medical Trolley)
- industrial-heavy category contains 15 product types (Diesel Generator, Portable Generator, Industrial UPS System, Online UPS, Servo Stabilizer, Air Compressor, Water Chiller, Industrial Chiller, Industrial Blower, Welding Machine, Forklift, Pallet Truck, Hydraulic Jack, Material Handling Equipment, Industrial Vacuum Cleaner)
- construction-heavy category contains 15 product types (Mobile Crane, Tower Crane, Hydra Crane, Crane with Operator, Excavator, Backhoe Loader, Concrete Mixer, Transit Mixer, Scaffolding, Earth Compactor, Road Roller, Bulldozer, Jack Hammer, Boom Lift, Scissor Lift)
- music-instruments category contains 15 product types (Acoustic Guitar, Electric Guitar, Keyboard, Piano, Drum Set, Tabla, Dhol, Harmonium, Violin, Flute, Saxophone, DJ Controller, PA System, Microphone, Stage Lighting)
- photography category contains 14 product types (DSLR Camera, Mirrorless Camera, Cinema Camera, Drone Camera, Camera Lens Wide Angle, Camera Lens Telephoto, Camera Lens Macro, Tripod, Gimbal Stabilizer, Studio Light, Ring Light, Softbox, Green Screen, Live Streaming Kit)
- defence-psu category contains 6 product types (High Capacity Industrial Chiller, Military Grade Diesel Generator, Industrial Online UPS 100kVA+, Servo Voltage Stabilizer Industrial, Environmental Test Chamber, Data Center Cooling System)
- All existing TAXONOMY mappings remain unchanged

---

### 1.3 Category Image Assignment

**Priority:** High  
**Status:** Required

The system SHALL assign representative Unsplash image URLs to all 8 new categories.

**Acceptance Criteria:**
- CATEGORY_IMAGE object in `src/data/products.ts` contains 28 mappings
- Each new category has a valid Unsplash URL with w=800 parameter
- Images are thematically appropriate for their category
- All existing category images remain unchanged

---

### 1.4 Category Base Price Definition

**Priority:** High  
**Status:** Required

The system SHALL define base daily rental prices for all 8 new categories using realistic pricing tiers.

**Acceptance Criteria:**
- CATEGORY_BASE_PRICE object in `src/data/products.ts` contains 28 mappings
- home-appliances base price is $25/day
- office-equipment base price is $45/day
- medical-equipment base price is $120/day
- industrial-heavy base price is $180/day
- construction-heavy base price is $280/day
- music-instruments base price is $35/day
- photography base price is $65/day
- defence-psu base price is $450/day
- All existing base prices remain unchanged

---

### 1.5 Automatic Product Generation

**Priority:** High  
**Status:** Required

The system SHALL automatically generate Product objects for all new taxonomy items using the existing buildProducts() function.

**Acceptance Criteria:**
- PRODUCTS array contains approximately 315 total products (200 existing + 115 new)
- Each generated product has: unique sequential ID, assigned vendorId, title from TAXONOMY, auto-generated description, jittered price (0.85x - 1.25x base), category image, deterministic availability (~82%), assigned location, rating (3.8-5.0), review count, featured/popular flags, creation date
- Product IDs remain sequential and deterministic
- No modifications to buildProducts() function are required

---

### 1.6 Category Filtering and Discovery

**Priority:** High  
**Status:** Required

The system SHALL support filtering and discovery of products in all 28 categories through existing interfaces.

**Acceptance Criteria:**
- getProductsByCategory() function returns products for all new category IDs
- Category screen displays all 28 categories
- Search functionality works with new categories
- Category navigation works for all new categories

---

## 2. Non-Functional Requirements

### 2.1 Backward Compatibility

**Priority:** Critical  
**Status:** Required

The system SHALL maintain 100% backward compatibility with existing categories and products.

**Acceptance Criteria:**
- All 20 existing categories remain unchanged (same ID, name, icon, color)
- All existing TAXONOMY mappings remain unchanged
- All existing category images remain unchanged
- All existing base prices remain unchanged
- Existing product IDs and generation remain deterministic
- No breaking changes to Category or Product interfaces

---

### 2.2 Data Consistency

**Priority:** High  
**Status:** Required

The system SHALL maintain data consistency across all category-related data structures.

**Acceptance Criteria:**
- Every category ID in TAXONOMY has a corresponding entry in CATEGORIES array
- Every category ID in TAXONOMY has a corresponding image URL in CATEGORY_IMAGE
- Every category ID in TAXONOMY has a corresponding base price in CATEGORY_BASE_PRICE
- All category IDs are unique (no duplicates)
- All categories conform to Category interface type definition

---

### 2.3 Maintainability

**Priority:** Medium  
**Status:** Required

The system SHALL maintain the existing data-driven architecture for easy catalog management.

**Acceptance Criteria:**
- All category data remains in centralized files (categories.ts, products.ts)
- TAXONOMY structure remains simple (Record<string, string[]>)
- Product generation remains deterministic and predictable
- No complex database migrations required
- Documentation clearly explains data structures

---

### 2.4 Performance

**Priority:** Medium  
**Status:** Required

The system SHALL maintain acceptable performance with expanded catalog.

**Acceptance Criteria:**
- Product generation completes in under 100ms
- Category list rendering has no perceptible lag
- Product filtering by category completes in under 50ms
- No memory issues with ~315 products in memory

---

### 2.5 Type Safety

**Priority:** Medium  
**Status:** Required

The system SHALL maintain TypeScript type safety for all data structures.

**Acceptance Criteria:**
- All category objects conform to Category interface
- All product objects conform to Product interface
- TypeScript compiler shows no type errors
- All color codes are valid hex format (#RRGGBB)
- All icon names are valid Ionicons identifiers

---

## 3. Data Requirements

### 3.1 Category Icon Mapping

**Priority:** High  
**Status:** Required

Each new category SHALL use an appropriate Ionicons icon:

| Category ID | Icon Name | Context |
|-------------|-----------|---------|
| home-appliances | home | Household items |
| office-equipment | briefcase | Business/professional |
| medical-equipment | medical | Healthcare |
| industrial-heavy | settings | Industrial systems |
| construction-heavy | construct-outline | Heavy machinery |
| music-instruments | musical-notes | Music/audio |
| photography | camera | Photography gear |
| defence-psu | shield | Security/defence |

---

### 3.2 Category Color Scheme

**Priority:** Medium  
**Status:** Required

Each new category SHALL use a visually distinct color:

| Category ID | Color Code | Color Name |
|-------------|-----------|------------|
| home-appliances | #10B981 | Emerald |
| office-equipment | #3B82F6 | Blue |
| medical-equipment | #EF4444 | Red |
| industrial-heavy | #6366F1 | Indigo |
| construction-heavy | #F59E0B | Amber |
| music-instruments | #8B5CF6 | Violet |
| photography | #EC4899 | Pink |
| defence-psu | #14532D | Dark Green |

---

### 3.3 Image URL Requirements

**Priority:** High  
**Status:** Required

All category images SHALL:
- Use Unsplash as the image source
- Include w=800 query parameter for consistent sizing
- Be thematically relevant to the category
- Be high-quality professional photographs
- Load reliably over HTTPS

---

## 4. Constraints

### 4.1 Technical Constraints

- No modifications to `src/types/index.ts` are allowed
- No modifications to buildProducts() algorithm are allowed
- No modifications to UI components are required
- Must use existing deterministic seeded() function for product generation
- Must maintain existing vendor and location arrays

---

### 4.2 Business Constraints

- All new categories must represent real rental equipment markets
- Pricing must be realistic for daily rental rates in USD
- Product types must be commonly available rental items
- Defence/PSU category must represent premium industrial-grade equipment

---

## 5. Dependencies

### 5.1 External Dependencies

- Ionicons icon library (must support all specified icon names)
- Unsplash image service (must serve all specified image URLs)

---

### 5.2 Internal Dependencies

- Existing Category interface in `src/types/index.ts`
- Existing Product interface in `src/types/index.ts`
- Existing buildProducts() function in `src/data/products.ts`
- Existing seeded() helper function in `src/data/products.ts`
- Existing VENDOR_IDS and LOCATIONS arrays in `src/data/products.ts`

---

## 6. Acceptance Criteria Summary

The feature is complete when:

1. ✓ CATEGORIES array contains 28 entries (20 existing + 8 new)
2. ✓ TAXONOMY object contains 28 mappings with 115+ new products
3. ✓ CATEGORY_IMAGE object contains 28 mappings
4. ✓ CATEGORY_BASE_PRICE object contains 28 mappings
5. ✓ PRODUCTS array contains ~315 products
6. ✓ All new categories appear in category list UI
7. ✓ All new products are searchable and filterable
8. ✓ All existing categories and products remain unchanged
9. ✓ TypeScript compilation succeeds with no errors
10. ✓ All data structures maintain type safety

---

## 7. Out of Scope

The following are explicitly OUT OF SCOPE for this feature:

- Modifications to Product or Category type definitions
- Changes to booking, payment, or vendor management
- UI component redesigns or new components
- Database schema changes
- API endpoint modifications
- Admin approval workflows for new categories
- Vendor onboarding for new categories
- Image upload or management features
- Dynamic category creation by users
- Category analytics or reporting
