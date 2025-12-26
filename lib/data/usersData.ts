// src/data/usersData.ts

export interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string; // YYYY-MM-DD
  lastLogin: string;      // YYYY-MM-DD
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'suspended';
  country: string;
}

export const usersData: User[] = [
  { id: "USR001", name: "Alice Wonderland", email: "alice@example.com", registrationDate: "2024-01-15", lastLogin: "2025-07-28", totalOrders: 12, totalSpent: 15000, status: "active", country: "India" },
  { id: "USR002", name: "Bob The Builder", email: "bob@example.com", registrationDate: "2023-11-20", lastLogin: "2025-07-20", totalOrders: 8, totalSpent: 8500, status: "active", country: "USA" },
  { id: "USR003", name: "Charlie Chaplin", email: "charlie@example.com", registrationDate: "2024-03-01", lastLogin: "2025-07-25", totalOrders: 5, totalSpent: 22000, status: "active", country: "UK" },
  { id: "USR004", name: "Diana Prince", email: "diana@example.com", registrationDate: "2025-02-10", lastLogin: "2025-07-27", totalOrders: 3, totalSpent: 3000, status: "inactive", country: "India" },
  { id: "USR005", name: "Eve Harrington", email: "eve@example.com", registrationDate: "2023-09-05", lastLogin: "2025-07-10", totalOrders: 15, totalSpent: 50000, status: "active", country: "Germany" },
  { id: "USR006", name: "Frank Sinatra", email: "frank@example.com", registrationDate: "2024-06-22", lastLogin: "2025-06-01", totalOrders: 2, totalSpent: 1200, status: "inactive", country: "Canada" },
  { id: "USR007", name: "Grace Hopper", email: "grace@example.com", registrationDate: "2025-01-01", lastLogin: "2025-07-29", totalOrders: 7, totalSpent: 9800, status: "active", country: "India" },
  { id: "USR008", name: "Harry Potter", email: "harry@example.com", registrationDate: "2024-04-03", lastLogin: "2025-07-15", totalOrders: 10, totalSpent: 18000, status: "active", country: "UK" },
  { id: "USR009", name: "Ivy Vine", email: "ivy@example.com", registrationDate: "2024-07-07", lastLogin: "2025-05-05", totalOrders: 1, totalSpent: 500, status: "suspended", country: "Australia" },
  { id: "USR010", name: "Jack Sparrow", email: "jack@example.com", registrationDate: "2023-10-12", lastLogin: "2025-07-26", totalOrders: 9, totalSpent: 11000, status: "active", country: "India" },
];