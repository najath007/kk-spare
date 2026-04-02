# KK Spare Parts — Backend API

Node.js + Express + MySQL backend for the KK Spare Parts React/Vite frontend.

---

## 📁 Project Structure

```
kk-backend/
├── database/
│   └── schema.sql          ← Run this first in MySQL
├── src/
│   ├── config/
│   │   └── db.js           ← MySQL connection pool
│   ├── middleware/
│   │   └── auth.js         ← JWT auth + admin guard
│   ├── routes/
│   │   ├── auth.js         ← Register / Login / Me
│   │   ├── products.js     ← Product CRUD + filters
│   │   ├── cart.js         ← Cart management
│   │   ├── orders.js       ← Order placement & history
│   │   ├── brands.js       ← Brands + models lookup
│   │   └── categories.js   ← Category list
│   └── index.js            ← Express app entry point
├── .env.example
└── package.json
```

---

## 🚀 Setup Instructions

### Step 1 — Install MySQL
Download and install MySQL Community Server from https://dev.mysql.com/downloads/

### Step 2 — Create the database
Open MySQL Workbench or terminal and run:
```bash
mysql -u root -p < database/schema.sql
```
This creates the database, all tables, and seeds your products from data.js.

### Step 3 — Install Node.js dependencies
```bash
cd kk-backend
npm install
```

### Step 4 — Configure environment
```bash
cp .env.example .env
```
Then open `.env` and fill in your MySQL password:
```
DB_PASSWORD=your_actual_mysql_password
JWT_SECRET=any_long_random_string_you_choose
```

### Step 5 — Start the server
```bash
# Development (auto-restarts on changes)
npm run dev

# Production
npm start
```

The API will run at: **http://localhost:5000**

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint            | Description            | Auth Required |
|--------|---------------------|------------------------|---------------|
| POST   | /api/auth/register  | Register new user      | No            |
| POST   | /api/auth/login     | Login, get JWT token   | No            |
| GET    | /api/auth/me        | Get logged-in profile  | Yes           |

### Products
| Method | Endpoint            | Description                        | Auth Required |
|--------|---------------------|------------------------------------|---------------|
| GET    | /api/products       | List all (supports filters)        | No            |
| GET    | /api/products/:id   | Single product + compatibility     | No            |
| POST   | /api/products       | Add new product                    | Admin only    |
| PUT    | /api/products/:id   | Update product                     | Admin only    |
| DELETE | /api/products/:id   | Delete product                     | Admin only    |

**Product filter query params:**
```
GET /api/products?brand=Honda&model=Shine&year=2022&category=Brakes&type=OEM&search=brake
```

### Cart
| Method | Endpoint               | Description         | Auth Required |
|--------|------------------------|---------------------|---------------|
| GET    | /api/cart              | Get cart items      | Yes           |
| POST   | /api/cart              | Add item to cart    | Yes           |
| PUT    | /api/cart/:product_id  | Update quantity     | Yes           |
| DELETE | /api/cart/:product_id  | Remove item         | Yes           |
| DELETE | /api/cart              | Clear entire cart   | Yes           |

### Orders
| Method | Endpoint                   | Description           | Auth Required |
|--------|----------------------------|-----------------------|---------------|
| POST   | /api/orders                | Place order from cart | Yes           |
| GET    | /api/orders                | My order history      | Yes           |
| GET    | /api/orders/:id            | Single order detail   | Yes           |
| PATCH  | /api/orders/:id/cancel     | Cancel order          | Yes           |
| PATCH  | /api/orders/:id/status     | Update status         | Admin only    |

### Lookup
| Method | Endpoint                        | Description          |
|--------|---------------------------------|----------------------|
| GET    | /api/brands                     | All brands           |
| GET    | /api/brands/:brandName/models   | Models for a brand   |
| GET    | /api/categories                 | All categories       |

---

## 🔄 Connecting to Your React Frontend (data.js → API)

Replace your static imports in React like this:

**Before (data.js):**
```js
import { PRODUCTS } from './data';
const products = PRODUCTS;
```

**After (API call):**
```js
const [products, setProducts] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/api/products')
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);
```

**With filters (brand/model/year selector):**
```js
const params = new URLSearchParams({ brand: 'Honda', model: 'Shine', year: '2022' });
fetch(`http://localhost:5000/api/products?${params}`)
  .then(res => res.json())
  .then(data => setProducts(data));
```

**Sending auth token:**
```js
fetch('http://localhost:5000/api/cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  body: JSON.stringify({ product_id: 1, quantity: 2 })
});
```

---

## 🛡️ Security Notes
- Change `JWT_SECRET` in `.env` to a long random string before going live
- Never commit your `.env` file to Git (it's in `.gitignore`)
- Use HTTPS in production
