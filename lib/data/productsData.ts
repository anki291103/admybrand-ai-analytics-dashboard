// src/data/productsData.ts

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unitsSold: number;
  revenue: number;
  lastUpdated: string; // YYYY-MM-DD
  status: 'available' | 'out_of_stock' | 'discontinued';
}

export const productsData: Product[] = [
  { id: "PROD001", name: "Smartphone X", category: "Electronics", price: 79999, stock: 150, unitsSold: 500, revenue: 39999500, lastUpdated: "2025-07-20", status: "available" },
  { id: "PROD002", name: "Summer Dress", category: "Clothing", price: 1299, stock: 300, unitsSold: 800, revenue: 1039200, lastUpdated: "2025-07-25", status: "available" },
  { id: "PROD003", name: "Wireless Headphones", category: "Electronics", price: 8999, stock: 50, unitsSold: 120, revenue: 1079880, lastUpdated: "2025-07-28", status: "available" },
  { id: "PROD004", name: "Casual T-Shirt", category: "Clothing", price: 499, stock: 500, unitsSold: 1500, revenue: 748500, lastUpdated: "2025-07-21", status: "available" },
  { id: "PROD005", name: "Gaming Laptop Pro", category: "Electronics", price: 120000, stock: 10, unitsSold: 30, revenue: 3600000, lastUpdated: "2025-07-26", status: "out_of_stock" },
  { id: "PROD006", name: "Jeans Slim Fit", category: "Clothing", price: 1999, stock: 200, unitsSold: 400, revenue: 799600, lastUpdated: "2025-07-18", status: "available" },
  { id: "PROD007", name: "Smartwatch Z", category: "Electronics", price: 25000, stock: 0, unitsSold: 100, revenue: 2500000, lastUpdated: "2025-07-29", status: "out_of_stock" },
  { id: "PROD008", name: "Formal Shirt", category: "Clothing", price: 899, stock: 100, unitsSold: 250, revenue: 224750, lastUpdated: "2025-07-23", status: "available" },
  { id: "PROD009", name: "Bluetooth Speaker", category: "Electronics", price: 3500, stock: 75, unitsSold: 180, revenue: 630000, lastUpdated: "2025-07-27", status: "available" },
  { id: "PROD010", name: "Winter Jacket", category: "Clothing", price: 4500, stock: 0, unitsSold: 10, revenue: 45000, lastUpdated: "2025-07-19", status: "discontinued" },
];