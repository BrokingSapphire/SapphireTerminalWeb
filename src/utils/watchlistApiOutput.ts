// watchlistApiOutput.ts
// This file demonstrates the output of all watchlist/category API calls for reference.
// Run these functions in a test or dev environment to see the structure of the returned data.

import {
  createWatchlist,
  getAllWatchlists,
  updateWatchlistPosition,
  updateWatchlistName,
  deleteWatchlist,
  createCategory,
  getAllCategories,
  updateCategoryPosition,
  updateCategoryName,
  deleteCategory
} from './watchlistApi';

async function demoApiCalls() {
  // 1. Create a new watchlist
  const watchlist = await createWatchlist('test');
  console.log('createWatchlist:', watchlist);

  // 2. Get all watchlists
  const allWatchlists = await getAllWatchlists();
  console.log('getAllWatchlists:', allWatchlists);

  // 3. Update watchlist position
  if (watchlist && watchlist.id) {
    const updatedPos = await updateWatchlistPosition(watchlist.id, 1);
    console.log('updateWatchlistPosition:', updatedPos);
  }

  // 4. Update watchlist name
  if (watchlist && watchlist.id) {
    const updatedName = await updateWatchlistName(watchlist.id, 'test2');
    console.log('updateWatchlistName:', updatedName);
  }

  // 5. Create a new category in the watchlist
  if (watchlist && watchlist.id) {
    const category = await createCategory(watchlist.id, 'test');
    console.log('createCategory:', category);

    // 6. Get all categories for the watchlist
    const allCategories = await getAllCategories(watchlist.id);
    console.log('getAllCategories:', allCategories);

    // 7. Update category position
    if (category && category.id) {
      const updatedCatPos = await updateCategoryPosition(watchlist.id, category.id, 1);
      console.log('updateCategoryPosition:', updatedCatPos);
    }

    // 8. Update category name
    if (category && category.id) {
      const updatedCatName = await updateCategoryName(watchlist.id, category.id, 'test2');
      console.log('updateCategoryName:', updatedCatName);
    }

    // 9. Delete category
    if (category && category.id) {
      const deletedCat = await deleteCategory(watchlist.id, category.id);
      console.log('deleteCategory:', deletedCat);
    }
  }

  // 10. Delete watchlist
  if (watchlist && watchlist.id) {
    const deletedWatchlist = await deleteWatchlist(watchlist.id);
    console.log('deleteWatchlist:', deletedWatchlist);
  }
}

// Uncomment to run demo
// demoApiCalls();
