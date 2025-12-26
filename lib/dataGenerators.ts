// src/utils/dataGenerators.ts
import {type SalesDataItem } from '../data/dashboardData';

/**
 * Generates a new SalesDataItem for a given date, simulating growth and randomness.
 * @param lastItem The last SalesDataItem in the dataset to base new data on.
 * @param date The date for the new data item.
 * @returns A new SalesDataItem.
 */
export const generateNewSalesDataItem = (
  lastItem: SalesDataItem,
  date: Date
): SalesDataItem => {
  const newSales = Math.max(
    10, // Ensure minimum sales
    Math.round(lastItem.sales * (1 + (Math.random() - 0.5) * 0.2 + 0.01)) // Slight growth with randomness
  );
  const newUsers = Math.max(
    5, // Ensure minimum users
    Math.round(lastItem.users * (1 + (Math.random() - 0.5) * 0.15 + 0.005)) // Slight growth with randomness
  );

  const categories = ["Clothing", "Electronics"];
  const platforms = ["Web", "Mobile"];

  return {
    date: date.toISOString().split('T')[0],
    sales: newSales,
    users: newUsers,
    category: categories[Math.floor(Math.random() * categories.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
  };
};