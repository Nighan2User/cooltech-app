import { Product } from "@/types";

/**
 * Products are generated from the equipment taxonomy below so the catalog stays
 * easy to maintain. Each category has a representative image and a base daily
 * price; individual items vary deterministically around those values.
 */

const LOCATIONS = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Dallas, TX",
];

const VENDOR_IDS = ["v1", "v2", "v3", "v4"];

// One representative image per category (Unsplash).
const CATEGORY_IMAGE: Record<string, string> = {
  construction: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800",
  earthmoving: "https://images.unsplash.com/photo-1579532536935-619928decd08?w=800",
  lifting: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
  aerial: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800",
  "power-tools": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800",
  "hand-tools": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800",
  concrete: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
  welding: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800",
  electrical: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
  generators: "https://images.unsplash.com/photo-1592833167665-ebf9d00a4799?w=800",
  "air-compressors": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800",
  cleaning: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?w=800",
  gardening: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
  agriculture: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
  survey: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
  pumps: "https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=800",
  industrial: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800",
  safety: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
  event: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
  vehicles: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800",
  "home-appliances": "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
  "office-equipment": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  "medical-equipment": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
  "industrial-heavy": "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
  "construction-heavy": "https://images.unsplash.com/photo-1590496793907-4d7b7b2b3d41?w=800",
  "music-instruments": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
  "photography": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
  "defence-psu": "https://images.unsplash.com/photo-1581092918484-8313e1f151db?w=800",
};

// Base daily price (USD) per category.
const CATEGORY_BASE_PRICE: Record<string, number> = {
  construction: 220,
  earthmoving: 190,
  lifting: 150,
  aerial: 130,
  "power-tools": 22,
  "hand-tools": 9,
  concrete: 60,
  welding: 48,
  electrical: 55,
  generators: 95,
  "air-compressors": 42,
  cleaning: 38,
  gardening: 28,
  agriculture: 160,
  survey: 75,
  pumps: 58,
  industrial: 85,
  safety: 32,
  event: 68,
  vehicles: 115,
  "home-appliances": 25,
  "office-equipment": 45,
  "medical-equipment": 120,
  "industrial-heavy": 180,
  "construction-heavy": 280,
  "music-instruments": 35,
  "photography": 65,
  "defence-psu": 450,
};

// Equipment taxonomy: category id -> list of product titles.
const TAXONOMY: Record<string, string[]> = {
  construction: [
    "Excavator",
    "Mini Excavator",
    "Backhoe Loader",
    "Skid Steer Loader",
    "Wheel Loader",
    "Bulldozer",
    "Motor Grader",
    "Road Roller",
    "Concrete Mixer",
    "Concrete Pump",
    "Rebar Cutter & Bender",
  ],
  earthmoving: [
    "Excavator",
    "Trencher",
    "Compactor",
    "Soil Stabilizer",
    "Dumper",
    "Tipper",
  ],
  lifting: [
    "Mobile Crane",
    "Tower Crane",
    "Forklift",
    "Telehandler",
    "Chain Pulley Block",
    "Hoist",
    "Hydraulic Jack",
    "Pallet Truck",
  ],
  aerial: [
    "Scissor Lift",
    "Boom Lift",
    "Spider Lift",
    "Man Lift",
    "Cherry Picker",
  ],
  "power-tools": [
    "Rotary Hammer",
    "Demolition Hammer",
    "Angle Grinder",
    "Circular Saw",
    "Impact Wrench",
    "Drill Machine",
    "Heat Gun",
    "Electric Planer",
  ],
  "hand-tools": [
    "Spanner Set",
    "Socket Set",
    "Pipe Wrench",
    "Torque Wrench",
    "Screwdriver Set",
    "Cutting Pliers",
    "Measuring Tools",
  ],
  concrete: [
    "Core Cutting Machine",
    "Wall Cutter",
    "Floor Cutter",
    "Concrete Vibrator",
    "Power Trowel",
    "Concrete Mixer",
    "Tile Cutter",
  ],
  welding: [
    "Arc Welding Machine",
    "MIG Welder",
    "TIG Welder",
    "Plasma Cutter",
    "Gas Cutting Set",
    "Welding Generator",
  ],
  electrical: [
    "Cable Pulling Machine",
    "Insulation Tester",
    "Earth Tester",
    "Cable Locator",
    "Transformer",
    "Distribution Box",
  ],
  generators: [
    "Portable Generator",
    "Diesel Generator",
    "Silent Generator",
    "Lighting Tower",
    "UPS System",
  ],
  "air-compressors": [
    "Portable Compressor",
    "Jack Hammer",
    "Rock Drill",
    "Pneumatic Grinder",
    "Pneumatic Impact Wrench",
  ],
  cleaning: [
    "Pressure Washer",
    "Industrial Vacuum Cleaner",
    "Floor Scrubber",
    "Road Sweeper",
    "Steam Cleaner",
  ],
  gardening: [
    "Lawn Mower",
    "Brush Cutter",
    "Hedge Trimmer",
    "Earth Auger",
    "Chainsaw",
    "Leaf Blower",
  ],
  agriculture: [
    "Tractor",
    "Rotavator",
    "Seed Drill",
    "Power Tiller",
    "Sprayer",
    "Harvester",
  ],
  survey: [
    "Total Station",
    "Auto Level",
    "GPS Survey Equipment",
    "Laser Level",
    "Measuring Wheel",
  ],
  pumps: [
    "Submersible Pump",
    "Dewatering Pump",
    "Sludge Pump",
    "High-Pressure Pump",
    "Water Transfer Pump",
  ],
  industrial: [
    "Hydraulic Power Pack",
    "Material Handling Trolley",
    "Industrial Fan",
    "Industrial Heater",
    "Dust Collector",
  ],
  safety: [
    "Scaffolding",
    "Mobile Tower",
    "Safety Harness",
    "Barricade",
    "Gas Detector",
  ],
  event: [
    "Portable Toilet",
    "Temporary Fencing",
    "Lighting Tower",
    "Portable Generator",
    "Event Stage",
  ],
  vehicles: [
    "Pickup Truck",
    "Mini Truck",
    "Tipper",
    "Water Tanker",
    "Fuel Bowser",
  ],
  "home-appliances": [
    "Mixer Grinder",
    "Wet Grinder",
    "Microwave Oven",
    "Refrigerator",
    "Air Cooler",
    "Air Conditioner",
    "Washing Machine",
    "Vacuum Cleaner",
    "Steam Iron",
    "Water Purifier",
    "UPS/Inverter",
    "Generator",
    "Sofa Set",
    "Dining Table",
    "Drilling Machine",
  ],
  "office-equipment": [
    "Office Table",
    "Executive Desk",
    "Meeting Table",
    "Conference Chair",
    "Coffee Machine",
    "Printer",
    "Xerox Machine",
    "Scanner",
    "Projector",
    "LED TV",
    "Interactive Display",
    "Speaker System",
    "Lighting Equipment",
    "Laptop",
    "Desktop Computer",
    "Office UPS System",
  ],
  "medical-equipment": [
    "Hospital Bed",
    "ICU Bed",
    "Patient Stretcher",
    "Examination Table",
    "Wheelchair",
    "Oxygen Concentrator",
    "Oxygen Cylinder",
    "Nebulizer",
    "Patient Monitor",
    "ECG Machine",
    "Infusion Pump",
    "Suction Machine",
    "CPAP Machine",
    "BiPAP Machine",
    "Medical Trolley",
  ],
  "industrial-heavy": [
    "Diesel Generator (DG Set)",
    "Portable Generator",
    "Industrial UPS System",
    "Online UPS",
    "Servo Stabilizer",
    "Air Compressor",
    "Water Chiller",
    "Industrial Chiller",
    "Industrial Blower",
    "Welding Machine",
    "Forklift",
    "Pallet Truck",
    "Hydraulic Jack",
    "Material Handling Equipment",
    "Industrial Vacuum Cleaner",
  ],
  "construction-heavy": [
    "Mobile Crane",
    "Tower Crane",
    "Hydra Crane",
    "Crane with Operator",
    "Excavator",
    "Backhoe Loader (JCB)",
    "Concrete Mixer",
    "Transit Mixer",
    "Scaffolding",
    "Earth Compactor",
    "Road Roller",
    "Bulldozer",
    "Jack Hammer",
    "Boom Lift",
    "Scissor Lift",
  ],
  "music-instruments": [
    "Acoustic Guitar",
    "Electric Guitar",
    "Keyboard",
    "Piano",
    "Drum Set",
    "Tabla",
    "Dhol",
    "Harmonium",
    "Violin",
    "Flute",
    "Saxophone",
    "DJ Controller",
    "PA System",
    "Microphone",
    "Stage Lighting",
  ],
  "photography": [
    "DSLR Camera",
    "Mirrorless Camera",
    "Cinema Camera",
    "Drone Camera",
    "Camera Lens (Wide Angle)",
    "Camera Lens (Telephoto)",
    "Camera Lens (Macro)",
    "Tripod",
    "Gimbal Stabilizer",
    "Studio Light",
    "Ring Light",
    "Softbox",
    "Green Screen",
    "Live Streaming Kit",
  ],
  "defence-psu": [
    "High Capacity Industrial Chiller",
    "Military Grade Diesel Generator",
    "Industrial Online UPS (100kVA+)",
    "Servo Voltage Stabilizer (Industrial)",
    "Environmental Test Chamber",
    "Data Center Cooling System",
  ],
};

// Small deterministic pseudo-random helper so data is stable across reloads.
const seeded = (n: number) => {
  const x = Math.sin(n * 9973) * 10000;
  return x - Math.floor(x);
};

const buildProducts = (): Product[] => {
  const products: Product[] = [];
  let i = 0;

  for (const [category, items] of Object.entries(TAXONOMY)) {
    const base = CATEGORY_BASE_PRICE[category] ?? 50;
    const image = CATEGORY_IMAGE[category];

    items.forEach((title) => {
      i += 1;
      const r = seeded(i);
      const priceJitter = 0.85 + seeded(i + 1) * 0.4; // 0.85x - 1.25x
      const price = Math.max(5, Math.round((base * priceJitter) / 5) * 5);
      const rating = Math.round((3.8 + seeded(i + 2) * 1.2) * 10) / 10; // 3.8 - 5.0
      const reviewsCount = Math.floor(seeded(i + 3) * 60) + 3;

      products.push({
        id: `p${i}`,
        vendorId: VENDOR_IDS[i % VENDOR_IDS.length],
        title,
        description: `${title} available for daily, weekly and monthly rental. Well maintained and inspected before every hire. Delivery and operator support available on request.`,
        price,
        images: [image],
        category,
        availability: r > 0.18, // ~82% available
        location: LOCATIONS[i % LOCATIONS.length],
        rating,
        reviewsCount,
        featured: seeded(i + 4) > 0.82,
        popular: seeded(i + 5) > 0.7,
        createdAt: "2026-05-01",
      });
    });
  }

  return products;
};

export const PRODUCTS: Product[] = buildProducts();

// Export TAXONOMY for use in product forms
export { TAXONOMY };

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getProductsByVendor = (vendorId: string) =>
  PRODUCTS.filter((p) => p.vendorId === vendorId);
export const getProductsByCategory = (categoryId: string) =>
  PRODUCTS.filter((p) => p.category === categoryId);
