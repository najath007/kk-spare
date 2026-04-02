const BASE = 'http://localhost:5000/api';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const getCart = () => fetch(`${BASE}/cart`, { headers: authHeaders() }).then(r => r.json());
export const addToCart = (product_id, quantity = 1) => fetch(`${BASE}/cart`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ product_id, quantity }) }).then(r => r.json());
export const updateCart = (product_id, quantity) => fetch(`${BASE}/cart/${product_id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ quantity }) }).then(r => r.json());
export const removeFromCart = (product_id) => fetch(`${BASE}/cart/${product_id}`, { method: 'DELETE', headers: authHeaders() }).then(r => r.json());
export const clearCart = () => fetch(`${BASE}/cart`, { method: 'DELETE', headers: authHeaders() }).then(r => r.json());
export const placeOrder = (payment_method = 'COD') => fetch(`${BASE}/orders`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ payment_method }) }).then(r => r.json());
export const getOrders = () => fetch(`${BASE}/orders`, { headers: authHeaders() }).then(r => r.json());
