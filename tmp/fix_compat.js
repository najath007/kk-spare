const baseUrl = 'http://localhost:5000/api';

async function fixCompat() {
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'nj@gmail.com', password: '123' })
  });
  const { token } = await loginRes.json();
  
  const products = await (await fetch(`${baseUrl}/products`)).json();
  
  const rules = {
    "Hero Splendor Air Filter": [{ brand_id: 1, model_id: 1 }],
    "Bajaj Pulsar Chain Sprocket Kit": [{ brand_id: 3, model_id: 9 }],
    "Honda Shine Clutch Plate Set": [{ brand_id: 2, model_id: 5 }],
    "Universal Bike Horn 12V": [{ brand_id: 1, model_id: 1 }, { brand_id: 5, model_id: 18 }],
    "Royal Enfield Bullet Exhaust Pipe": [{ brand_id: 5, model_id: 18 }]
  };

  for (const p of products) {
    if (rules[p.name]) {
      for (const rule of rules[p.name]) {
        for (let year_id = 1; year_id <= 10; year_id++) {
          await fetch(`${baseUrl}/products/${p.id}/compatibility`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ brand_id: rule.brand_id, model_id: rule.model_id, year_id })
          });
        }
      }
      console.log(`Added compatibility for ${p.name}`);
    }
  }
}

fixCompat().catch(console.error);
