async function seed() {
  const baseUrl = 'https://kk-spare.onrender.com/api';

  const universalCompat = [];
  for (let b = 1; b <= 8; b++) {
    let startM, endM;
    if (b===1) { startM=1; endM=4; } else if (b===2) { startM=5; endM=8; } else if (b===3) { startM=9; endM=12; } else if (b===4) { startM=13; endM=16; } else if (b===5) { startM=17; endM=20; } else if (b===6) { startM=21; endM=24; } else if (b===7) { startM=25; endM=28; } else if (b===8) { startM=29; endM=31; }
    for (let m = startM; m <= endM; m++) {
      universalCompat.push({ brand_id: b, model_id: m });
    }
  }

  const products = [
    { name: "Yamaha FZS Front Fork Assembly", price: 3500, category_id: 4, type: "OEM", stock: 15, badge: "HOT", warranty: "2 Years", image: "/images/yamaha_fzs_fork.png", compat: [{ brand_id: 6, model_id: 23 }] },
    { name: "TVS Apache Rear Disc Brake Rotor", price: 1800, category_id: 2, type: "OEM", stock: 35, badge: "", warranty: "1 Year", image: "/images/tvs_apache_rotor.png", compat: [{ brand_id: 4, model_id: 13 }] },
    { name: "Bajaj Dominar Battery 12V 9Ah", price: 1350, category_id: 3, type: "OEM", stock: 45, badge: "NEW", warranty: "1 Year", image: "/images/bajaj_dominar_battery.png", compat: [{ brand_id: 3, model_id: 11 }] },
    { name: "Honda Activa Body Panel Set", price: 2200, category_id: 5, type: "OEM", stock: 25, badge: "", warranty: "6 Months", image: "/images/honda_activa_panels.png", compat: [{ brand_id: 2, model_id: 8 }] },
    { name: "MRF Nylogrip Zapper Tyre 100/90-17", price: 1950, category_id: 6, type: "OEM", stock: 40, badge: "HOT", warranty: "2 Years", image: "/images/mrf_zapper_tyre.png", compat: [{ brand_id: 3, model_id: 9 }, { brand_id: 4, model_id: 13 }, { brand_id: 6, model_id: 21 }] },
    { name: "Suzuki Gixxer Fuel Tank Cap", price: 380, category_id: 5, type: "OEM", stock: 55, badge: "", warranty: "6 Months", image: "/images/suzuki_gixxer_cap.png", compat: [{ brand_id: 7, model_id: 25 }] },
    { name: "Universal LED Turn Signal Indicators", price: 299, category_id: 8, type: "Aftermarket", stock: 180, badge: "NEW", warranty: "6 Months", image: "/images/led_turn_signals.png", compat: universalCompat },
    { name: "Royal Enfield Classic 350 Seat Cover", price: 750, category_id: 5, type: "Aftermarket", stock: 70, badge: "", warranty: "3 Months", image: "/images/classic_350_seat.png", compat: [{ brand_id: 5, model_id: 17 }] },
    { name: "Hero Honda CD100 Piston Kit", price: 890, category_id: 1, type: "OEM", stock: 30, badge: "", warranty: "1 Year", image: "/images/hero_cd100_piston.png", compat: [{ brand_id: 1, model_id: 1 }, { brand_id: 1, model_id: 2 }] },
    { name: "Yamaha R15 V3 Windshield Visor", price: 1100, category_id: 5, type: "Aftermarket", stock: 50, badge: "NEW", warranty: "3 Months", image: "/images/r15_visor.png", compat: [{ brand_id: 6, model_id: 21 }] },
    { name: "TVS Jupiter Scooter CVT Belt", price: 480, category_id: 10, type: "OEM", stock: 90, badge: "", warranty: "6 Months", image: "/images/jupiter_cvt_belt.png", compat: [{ brand_id: 4, model_id: 14 }] },
    { name: "Bosch Automotive Relay 12V 40A", price: 220, category_id: 3, type: "Aftermarket", stock: 250, badge: "", warranty: "1 Year", image: "/images/bosch_relay.png", compat: universalCompat },
    { name: "Honda CBR 150R Full Fairing Kit", price: 4500, category_id: 5, type: "Aftermarket", stock: 12, badge: "HOT", warranty: "6 Months", image: "/images/honda_activa_panels.png", compat: [{ brand_id: 2, model_id: 7 }] },
    { name: "Bajaj Platina Headlight Assembly", price: 950, category_id: 8, type: "OEM", stock: 40, badge: "", warranty: "1 Year", image: "/images/led_turn_signals.png", compat: [{ brand_id: 3, model_id: 12 }] },
    { name: "Universal Engine Guard Crash Bar", price: 1600, category_id: 5, type: "Aftermarket", stock: 30, badge: "NEW", warranty: "6 Months", image: "/images/yamaha_fzs_fork.png", compat: universalCompat }
  ];

  try {
    console.log("Seeding against", baseUrl);
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nj@gmail.com', password: '123' })
    });
    if (!loginRes.ok) throw new Error("Login failed");
    const { token } = await loginRes.json();
    const reqOpts = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
    
    const existingRes = await fetch(`${baseUrl}/products`);
    const existingProds = await existingRes.json();
    const existingNames = new Set(existingProds.map(p => p.name));

    for (const prod of products) {
      let pid;
      if (!existingNames.has(prod.name)) {
        const pBody = { ...prod };
        delete pBody.compat;
        const createRes = await fetch(`${baseUrl}/products`, {
          method: 'POST',
          ...reqOpts,
          body: JSON.stringify(pBody)
        });
        const txt = await createRes.text();
        if (!createRes.ok) {
          console.error(`Failed to insert ${prod.name}: ${txt}`);
          continue;
        }
        const createData = JSON.parse(txt);
        pid = createData.id;
        console.log(`Inserted ${prod.name} at ID ${pid}`);
      } else {
        pid = existingProds.find(p => p.name === prod.name).id;
        console.log(`Already found ${prod.name} at ID ${pid}`);
      }

      for (const rule of prod.compat) {
        for (let year_id = 1; year_id <= 10; year_id++) {
            await fetch(`${baseUrl}/products/${pid}/compatibility`, {
              method: 'POST',
              ...reqOpts,
              body: JSON.stringify({ brand_id: rule.brand_id, model_id: rule.model_id, year_id })
            });
        }
      }
    }
    console.log("ALL DONE!");
  } catch(e) {
    console.error("FATAL ERROR", e);
  }
}
seed();
