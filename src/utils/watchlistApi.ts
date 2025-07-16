// src/utils/watchlistApi.ts
import axios from 'axios';

// Helper to get auth token (customize as per your auth flow)
function getAuthToken() {
  // Read token from cookie named 'auth-token'
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const authCookie = cookies.find(cookie => cookie.startsWith('auth-token='));
    if (authCookie) {
      return authCookie.split('=')[1];
    }
  }
  return null;
}

function authHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const API_BASE = 'http://13.202.238.76:3000/api/v1/watchlist';

// Watchlist APIs
export const createWatchlist = async (name: string) => {
  console.log('[API] createWatchlist payload:', { name });
  try {
    const res = await axios.post(`${API_BASE}/`, { name }, { headers: authHeaders() });
    console.log('[API] createWatchlist response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] createWatchlist error:', err);
    throw err;
  }
};

export const getAllWatchlists = async () => {
  console.log('[API] getAllWatchlists');
  try {
    const res = await axios.get(`${API_BASE}`, { headers: authHeaders() });
    console.log('[API] getAllWatchlists response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] getAllWatchlists error:', err);
    throw err;
  }
};

export const updateWatchlistPosition = async (watchlistId: string, newPosition: number) => {
  console.log('[API] updateWatchlistPosition', { watchlistId, newPosition });
  try {
    const res = await axios.put(`${API_BASE}/${watchlistId}/position`, { newPosition }, { headers: authHeaders() });
    console.log('[API] updateWatchlistPosition response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] updateWatchlistPosition error:', err);
    throw err;
  }
};

export const updateWatchlistName = async (watchlistId: string, name: string) => {
  console.log('[API] updateWatchlistName', { watchlistId, name });
  try {
    const res = await axios.put(`${API_BASE}/${watchlistId}/name`, { name }, { headers: authHeaders() });
    console.log('[API] updateWatchlistName response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] updateWatchlistName error:', err);
    throw err;
  }
};

export const deleteWatchlist = async (watchlistId: string) => {
  console.log('[API] deleteWatchlist', { watchlistId });
  try {
    const res = await axios.delete(`${API_BASE}/${watchlistId}`, { headers: authHeaders() });
    console.log('[API] deleteWatchlist response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] deleteWatchlist error:', err);
    throw err;
  }
};

// Category APIs
export const createCategory = async (watchlistId: number, name: string) => {
  console.log('[API] createCategory', { watchlistId, name });
  try {
    const res = await axios.post(`${API_BASE}/${watchlistId}/categories`, { name }, { headers: authHeaders() });
    console.log('[API] createCategory response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] createCategory error:', err);
    throw err;
  }
};

export const getAllCategories = async (watchlistId: number) => {
  console.log('[API] getAllCategories', { watchlistId });
  try {
    const res = await axios.get(`${API_BASE}/${watchlistId}/categories`, { headers: authHeaders() });
    console.log('[API] getAllCategories response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] getAllCategories error:', err);
    throw err;
  }
};

export const updateCategoryPosition = async (watchlistId: number, categoryId: string, newPosition: number) => {
  console.log('[API] updateCategoryPosition', { watchlistId, categoryId, newPosition });
  try {
    const res = await axios.put(`${API_BASE}/${watchlistId}/categories/${categoryId}/position`, { newPosition }, { headers: authHeaders() });
    console.log('[API] updateCategoryPosition response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] updateCategoryPosition error:', err);
    throw err;
  }
};

export const updateCategoryName = async (watchlistId: number, categoryId: string, name: string) => {
  console.log('[API] updateCategoryName', { watchlistId, categoryId, name });
  try {
    const res = await axios.put(`${API_BASE}/${watchlistId}/categories/${categoryId}/name`, { name }, { headers: authHeaders() });
    console.log('[API] updateCategoryName response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] updateCategoryName error:', err);
    throw err;
  }
};

export const deleteCategory = async (watchlistId: number, categoryId: string, moveElementsToUncategorized = true) => {
  console.log('[API] deleteCategory', { watchlistId, categoryId, moveElementsToUncategorized });
  try {
    const res = await axios.delete(`${API_BASE}/${watchlistId}/categories/${categoryId}?moveElementsToUncategorized=${moveElementsToUncategorized}`, { headers: authHeaders() });
    console.log('[API] deleteCategory response:', res.data);
    return res.data;
  } catch (err) {
    console.error('[API] deleteCategory error:', err);
    throw err;
  }
};
