export async function getAllCategories(watchlistId: string) {
  const res = await fetch(`http://13.202.238.76:3000/api/v1/watchlist/${watchlistId}/categories`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createCategory(watchlistId: string, name: string) {
  const res = await fetch(`http://13.202.238.76:3000/api/v1/watchlist/${watchlistId}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function updateCategoryName(watchlistId: string, categoryId: string, name: string) {
  const res = await fetch(`http://13.202.238.76:3000/api/v1/watchlist/${watchlistId}/categories/${categoryId}/name`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to update category name');
  return res.json();
}

export async function updateCategoryPosition(watchlistId: string, categoryId: string, newPosition: number) {
  const res = await fetch(`http://13.202.238.76:3000/api/v1/watchlist/${watchlistId}/categories/${categoryId}/position`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ newPosition }),
  });
  if (!res.ok) throw new Error('Failed to update category position');
  return res.json();
}

export async function deleteCategory(watchlistId: string, categoryId: string, moveElementsToUncategorized = true) {
  const res = await fetch(`http://13.202.238.76:3000/api/v1/watchlist/${watchlistId}/categories/${categoryId}?moveElementsToUncategorized=${moveElementsToUncategorized}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to delete category');
  return res.json();
}

export async function getAllWatchlists() {
  const res = await fetch('http://13.202.238.76:3000/api/v1/watchlist', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch watchlists');
  return res.json();
}

export async function createWatchlist(name: string) {
  const res = await fetch('http://13.202.238.76:3000/api/v1/watchlist/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create watchlist');
  return res.json();
}

export async function updateWatchlistName(watchlistId: string, name: string) {
  const res = await fetch(`http://13.202.238.76:3000/api/v1/watchlist/${watchlistId}/name`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to update watchlist name');
  return res.json();
}

export async function updateWatchlistPosition(watchlistId: string, newPosition: number) {
  const res = await fetch(`http://13.202.238.76:3000/api/v1/watchlist/${watchlistId}/position`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ newPosition }),
  });
  if (!res.ok) throw new Error('Failed to update watchlist position');
  return res.json();
}

export async function deleteWatchlist(watchlistId: string) {
  const res = await fetch(`http://13.202.238.76:3000/api/v1/watchlist/${watchlistId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to delete watchlist');
  return res.json();
} 