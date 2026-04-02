export const BRANDS = ['Hero', 'Honda', 'Bajaj', 'TVS', 'Royal Enfield', 'Yamaha', 'Suzuki', 'Scooters'];

// Models mapped to Brands
export const MODELS_BY_BRAND = {
  'Hero': ['Splendor', 'Passion', 'CBZ', 'Xpulse'],
  'Honda': ['Shine', 'Unicorn', 'CBR', 'Activa'],
  'Bajaj': ['Pulsar', 'Discover', 'Dominar', 'Platina'],
  'TVS': ['Apache', 'Jupiter', 'NTORQ', 'Star City'],
  'Royal Enfield': ['Classic 350', 'Bullet 350', 'Himalayan', 'Meteor'],
  'Yamaha': ['R15', 'MT-15', 'FZS', 'Fascino'],
  'Suzuki': ['Gixxer', 'Access', 'Burgman', 'Intruder'],
  'Scooters': ['Generic 110cc', 'Generic 125cc', 'Electric Scooty'],
};

// Years mapping (Mock list)
export const YEARS = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export const CATEGORIES = [
  { name: 'Engine', count: 12540 },
  { name: 'Brakes', count: 8320 },
  { name: 'Electrical', count: 6410 },
  { name: 'Suspension', count: 4215 },
  { name: 'Body', count: 9102 },
  { name: 'Tyres', count: 3200 },
  { name: 'Filters', count: 5420 },
  { name: 'Lights', count: 7100 },
  { name: 'Exhaust', count: 2150 },
  { name: 'Transmission', count: 3890 }
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'High-Performance Brake Pads (Ceramic)',
    price: 1200,
    category: 'Brakes',
    badge: 'HOT',
    image: '/images/brake_pads.png',
    type: 'Aftermarket',
    stock: 45,
    warranty: '1 Year',
    compatibility: [
      { brand: 'Honda', models: ['Shine', 'CBR'], years: ['2020', '2021', '2022'] },
      { brand: 'Yamaha', models: ['R15', 'MT-15'], years: ['2021', '2022', '2023', '2024'] }
    ],
    boughtTogether: [4, 7]
  },
  {
    id: 2,
    name: 'NGK Iridium Spark Plug',
    price: 450,
    category: 'Electrical',
    badge: 'NEW',
    image: '/images/spark_plug.png',
    type: 'OEM',
    stock: 210,
    warranty: '6 Months',
    compatibility: [
      { brand: 'Royal Enfield', models: ['Classic 350', 'Meteor'], years: ['2018', '2019', '2020', '2021', '2022'] },
      { brand: 'Bajaj', models: ['Pulsar', 'Dominar'], years: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'] }
    ],
    boughtTogether: [6]
  },
  {
    id: 3,
    name: 'Motul 7100 4T 20W-50 Synthetic Engine Oil',
    price: 1100,
    category: 'Engine',
    badge: 'SALE',
    image: '/images/engine_oil.png',
    type: 'Aftermarket',
    stock: 15,
    warranty: 'N/A',
    compatibility: [
      { brand: 'Royal Enfield', models: ['Classic 350', 'Bullet 350', 'Himalayan'], years: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'] },
      { brand: 'Bajaj', models: ['Dominar'], years: ['2018', '2019', '2020', '2021', '2022'] }
    ],
    boughtTogether: [8]
  },
  {
    id: 4,
    name: 'Front Disc Brake Master Cylinder Assembly',
    price: 2450,
    category: 'Brakes',
    badge: '',
    image: '/images/brake_pads.png',
    type: 'OEM',
    stock: 8,
    warranty: '1 Year',
    compatibility: [
      { brand: 'Honda', models: ['CBR'], years: ['2019', '2020', '2021', '2022'] },
      { brand: 'Yamaha', models: ['R15'], years: ['2018', '2019', '2020'] }
    ],
    boughtTogether: [1]
  },
  {
    id: 5,
    name: 'Endurance Rear Shock Absorber Pair',
    price: 3200,
    category: 'Suspension',
    badge: 'HOT',
    image: '/images/shock_absorber.png',
    type: 'OEM',
    stock: 32,
    warranty: '2 Years',
    compatibility: [
      { brand: 'Hero', models: ['Splendor', 'Passion'], years: ['2015', '2016', '2017', '2018', '2019'] },
      { brand: 'TVS', models: ['Star City'], years: ['2016', '2017', '2018'] }
    ],
    boughtTogether: []
  },
  {
    id: 6,
    name: 'LED Headlight Bulb 40W (White)',
    price: 850,
    category: 'Lights',
    badge: 'NEW',
    image: '/images/headlight_bulb.png',
    type: 'Aftermarket',
    stock: 120,
    warranty: '1 Year',
    compatibility: [
      { brand: 'Royal Enfield', models: ['Classic 350'], years: ['2020', '2021', '2022', '2023'] },
      { brand: 'Yamaha', models: ['MT-15'], years: ['2020', '2021', '2022', '2023'] },
      { brand: 'Honda', models: ['Shine'], years: ['2021', '2022', '2023'] }
    ],
    boughtTogether: [2]
  },
  {
    id: 7,
    name: 'Brake Fluid DOT 4 (250ml)',
    price: 250,
    category: 'Brakes',
    badge: '',
    image: '/images/engine_oil.png',
    type: 'Aftermarket',
    stock: 300,
    warranty: 'N/A',
    compatibility: [
      // Fits all basically, we'll just mock a few
      { brand: 'Honda', models: ['Shine', 'CBR'], years: ['2021', '2022'] },
      { brand: 'Yamaha', models: ['R15', 'MT-15'], years: ['2021', '2022', '2023'] }
    ],
    boughtTogether: [1, 4]
  },
  {
    id: 8,
    name: 'Premium Oil Filter',
    price: 150,
    category: 'Filters',
    badge: '',
    image: '/images/oil_filter.png',
    type: 'OEM',
    stock: 500,
    warranty: 'N/A',
    compatibility: [
      { brand: 'Royal Enfield', models: ['Classic 350', 'Bullet 350'], years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'] }
    ],
    boughtTogether: [3]
  }
];

// Helper to check compatibility
export const isCompatible = (product, selectedBike) => {
  if (!selectedBike.brand) return true; // None selected means show all or don't filter out 
  
  for (const comp of product.compatibility) {
    if (comp.brand === selectedBike.brand) {
      // If model is selected, enforce it, otherwise true
      if (!selectedBike.model || comp.models.includes(selectedBike.model)) {
        // If year is selected, enforce it, otherwise true
        if (!selectedBike.year || comp.years.includes(selectedBike.year)) {
          return true;
        }
      }
    }
  }
  return false;
};
