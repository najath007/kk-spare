const baseUrl = 'http://localhost:5000/api';

async function seed() {
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'nj@gmail.com', password: '123' })
  });
  if (!loginRes.ok) throw new Error('Login failed');
  const { token } = await loginRes.json();
  console.log('Login successful! Got token.');

  const products = [
    { name: "Hero Splendor Air Filter", price: 180, category_id: 7, type: "OEM", stock: 150, badge: "", warranty: "6 Months", image: "/images/air_filter.png", compat: [{ brand_id: 1, model_id: 1 }] },
    { name: "Bajaj Pulsar Chain Sprocket Kit", price: 650, category_id: 10, type: "OEM", stock: 80, badge: "NEW", warranty: "1 Year", image: "/images/chain_sprocket.png", compat: [{ brand_id: 3, model_id: 9 }] },
    { name: "Honda Shine Clutch Plate Set", price: 420, category_id: 1, type: "OEM", stock: 60, badge: "", warranty: "6 Months", image: "/images/clutch_plate.png", compat: [{ brand_id: 2, model_id: 5 }] },
    { name: "Universal Bike Horn 12V", price: 199, category_id: 3, type: "Aftermarket", stock: 200, badge: "HOT", warranty: "3 Months", image: "/images/bike_horn.png", compat: [{ brand_id: 1, model_id: 1 }, { brand_id: 5, model_id: 18 }] },
    { name: "Royal Enfield Bullet Exhaust Pipe", price: 2800, category_id: 9, type: "OEM", stock: 20, badge: "", warranty: "1 Year", image: "/images/exhaust_pipe.png", compat: [{ brand_id: 5, model_id: 18 }] }
  ];

  for (const product of products) {
    // 1. Insert product
    const pBody = { ...product };
    delete pBody.compat;
    const res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(pBody)
    });
    
    if (!res.ok) {
        console.error(`Failed to add ${product.name}`);
        continue;
    }
    const data = await res.json();
    const pid = data.id;
    console.log(`Added ${product.name} (ID: ${pid})`);

    // 2. Add compatibility
    for (const rule of product.compat) {
      for (let year_id = 1; year_id <= 10; year_id++) {
        await fetch(`${baseUrl}/products/${pid}/compatibility`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ brand_id: rule.brand_id, model_id: rule.model_id, year_id })
        });
      }
    }
    console.log(`Added compatibility for ${product.name}`);
  }
}

seed().catch(console.error);
