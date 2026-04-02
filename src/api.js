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

// Admin Endpoints
export const getProducts = () => fetch(`${BASE}/products`).then(r => r.json());
export const getAllOrders = () => fetch(`${BASE}/orders/all`, { headers: authHeaders() }).then(r => r.json());
export const getAllUsers = () => fetch(`${BASE}/auth/users`, { headers: authHeaders() }).then(r => r.json());
export const addProduct = (data) => fetch(`${BASE}/products`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(data) }).then(r => r.json());
export const updateProduct = (id, data) => fetch(`${BASE}/products/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(data) }).then(r => r.json());
export const deleteProduct = (id) => fetch(`${BASE}/products/${id}`, { method: 'DELETE', headers: authHeaders() }).then(r => r.json());
export const updateOrderStatus = (id, status) => fetch(`${BASE}/orders/${id}/status`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status }) }).then(r => r.json());
export const getCategories = () => fetch(`${BASE}/categories`).then(r => r.json());
