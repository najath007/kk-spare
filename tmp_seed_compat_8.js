const baseUrlLocal = 'http://localhost:5000/api';
const baseUrlRender = 'https://kk-spare.onrender.com/api';

const apis = [baseUrlLocal, baseUrlRender];

async function seed() {
  const universalCompat = [];
  for (let b = 1; b <= 8; b++) {
    let startM, endM;
    if (b===1) { startM=1; endM=4; }
    else if (b===2) { startM=5; endM=8; }
    else if (b===3) { startM=9; endM=12; }
    else if (b===4) { startM=13; endM=16; }
    else if (b===5) { startM=17; endM=20; }
    else if (b===6) { startM=21; endM=24; }
    else if (b===7) { startM=25; endM=28; }
    else if (b===8) { startM=29; endM=31; }
    
    for (let m = startM; m <= endM; m++) {
      universalCompat.push({ brand_id: b, model_id: m });
    }
  }

  const pMaps = {
    1: universalCompat, // High-Performance Brake Pads
    2: universalCompat, // NGK Iridium Spark Plug 
    3: universalCompat, // Motul Engine Oil
    4: [{ brand_id: 3, model_id: 9 }, { brand_id: 4, model_id: 13 }, { brand_id: 6, model_id: 21 }, { brand_id: 7, model_id: 25 }], // Front Disc Master Cylinder
    5: [{ brand_id: 5, model_id: 17 }, { brand_id: 5, model_id: 18 }], // Endurance Rear Shock Absorber Pair
    6: universalCompat, // LED Headlight Bulb 40W
    7: universalCompat, // Brake Fluid DOT 4
    8: [{ brand_id: 1, model_id: 1 }, { brand_id: 1, model_id: 2 }, { brand_id: 1, model_id: 3 }] // Premium Oil Filter
  };

  for (const baseUrl of apis) {
    try {
      console.log("Starting " + baseUrl);
      const loginRes = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'nj@gmail.com', password: '123' })
      });
      if (!loginRes.ok) continue;
      const { token } = await loginRes.json();
      
      const reqOpts = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

      for (let p_id = 1; p_id <= 8; p_id++) {
        if (!pMaps[p_id]) continue;
        for (const rule of pMaps[p_id]) {
          for (let year_id = 1; year_id <= 10; year_id++) {
             await fetch(`${baseUrl}/products/${p_id}/compatibility`, {
               method: 'POST',
               ...reqOpts,
               body: JSON.stringify({ brand_id: rule.brand_id, model_id: rule.model_id, year_id })
             });
          }
        }
        console.log(`Added compat for product ID ${p_id} in ${baseUrl}`);
      }
    } catch(e) {
      console.error(e);
    }
  }
}
seed();
