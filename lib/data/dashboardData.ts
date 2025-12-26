// src/data/dashboardData.ts

export interface SalesDataItem {
  date: string;
  sales: number;
  users: number;
  category: string;
  platform: string;
  isAnomaly?: boolean; // Add optional anomaly flag here too, for consistency if you pass raw data
}

export const salesData: SalesDataItem[] = [
  {
    "date": "2025-05-01",
    "sales": 99,
    "users": 19,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-02",
    "sales": 101,
    "users": 18,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-02",
    "sales": 101,
    "users": 18,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-03",
    "sales": 91,
    "users": 18,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-03",
    "sales": 95,
    "users": 19,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-04",
    "sales": 94,
    "users": 20,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-05",
    "sales": 92,
    "users": 20,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-06",
    "sales": 93,
    "users": 21,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-07",
    "sales": 98,
    "users": 18,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-07",
    "sales": 104,
    "users": 21,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-08",
    "sales": 94,
    "users": 19,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-09",
    "sales": 92,
    "users": 19,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-09",
    "sales": 106,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-10",
    "sales": 100,
    "users": 21,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-11",
    "sales": 216,
    "users": 39,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-11",
    "sales": 98,
    "users": 18,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-11",
    "sales": 102,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-12",
    "sales": 109,
    "users": 20,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-12",
    "sales": 110,
    "users": 19,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-12",
    "sales": 92,
    "users": 19,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-13",
    "sales": 107,
    "users": 21,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-13",
    "sales": 91,
    "users": 22,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-13",
    "sales": 92,
    "users": 21,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-14",
    "sales": 101,
    "users": 20,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-14",
    "sales": 102,
    "users": 21,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-15",
    "sales": 98,
    "users": 18,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-16",
    "sales": 93,
    "users": 18,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-16",
    "sales": 106,
    "users": 21,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-17",
    "sales": 108,
    "users": 18,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-18",
    "sales": 96,
    "users": 18,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-18",
    "sales": 95,
    "users": 18,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-18",
    "sales": 98,
    "users": 20,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-19",
    "sales": 105,
    "users": 19,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-19",
    "sales": 103,
    "users": 18,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-20",
    "sales": 104,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-21",
    "sales": 108,
    "users": 20,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-21",
    "sales": 105,
    "users": 21,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-21",
    "sales": 109,
    "users": 18,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-22",
    "sales": 109,
    "users": 22,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-22",
    "sales": 109,
    "users": 20,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-23",
    "sales": 104,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-24",
    "sales": 105,
    "users": 19,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-25",
    "sales": 96,
    "users": 19,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-26",
    "sales": 103,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-27",
    "sales": 93,
    "users": 20,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-27",
    "sales": 107,
    "users": 21,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-28",
    "sales": 98,
    "users": 19,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-05-29",
    "sales": 96,
    "users": 20,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-29",
    "sales": 100,
    "users": 19,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-05-30",
    "sales": 102,
    "users": 22,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-31",
    "sales": 109,
    "users": 22,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-05-31",
    "sales": 102,
    "users": 21,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-01",
    "sales": 112,
    "users": 21,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-01",
    "sales": 105,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-01",
    "sales": 104,
    "users": 21,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-02",
    "sales": 111,
    "users": 18,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-06-02",
    "sales": 107,
    "users": 19,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-02",
    "sales": 104,
    "users": 20,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-06-03",
    "sales": 93,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-04",
    "sales": 108,
    "users": 18,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-04",
    "sales": 107,
    "users": 21,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-04",
    "sales": 111,
    "users": 18,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-05",
    "sales": 104,
    "users": 18,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-05",
    "sales": 104,
    "users": 20,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-05",
    "sales": 105,
    "users": 20,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-06",
    "sales": 110,
    "users": 18,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-06",
    "sales": 101,
    "users": 19,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-06",
    "sales": 35,
    "users": 5,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-07",
    "sales": 104,
    "users": 19,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-07",
    "sales": 99,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-08",
    "sales": 106,
    "users": 21,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-06-08",
    "sales": 98,
    "users": 22,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-09",
    "sales": 112,
    "users": 20,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-06-09",
    "sales": 386,
    "users": 52,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-09",
    "sales": 96,
    "users": 19,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-06-10",
    "sales": 204,
    "users": 46,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-06-10",
    "sales": 94,
    "users": 21,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-11",
    "sales": 98,
    "users": 19,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-12",
    "sales": 99,
    "users": 21,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-12",
    "sales": 104,
    "users": 19,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-12",
    "sales": 111,
    "users": 20,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-13",
    "sales": 107,
    "users": 21,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-14",
    "sales": 98,
    "users": 21,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-15",
    "sales": 230,
    "users": 48,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-15",
    "sales": 106,
    "users": 19,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-15",
    "sales": 101,
    "users": 20,
    "category": "Clothing",
    "platform": "Web"
  },
  {
    "date": "2025-06-16",
    "sales": 99,
    "users": 21,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-16",
    "sales": 104,
    "users": 20,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-16",
    "sales": 103,
    "users": 22,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-17",
    "sales": 108,
    "users": 22,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-18",
    "sales": 103,
    "users": 21,
    "category": "Electronics",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-18",
    "sales": 102,
    "users": 18,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-19",
    "sales": 114,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-19",
    "sales": 113,
    "users": 19,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-20",
    "sales": 105,
    "users": 20,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-21",
    "sales": 284,
    "users": 36,
    "category": "Electronics",
    "platform": "Web"
  },
  {
    "date": "2025-06-21",
    "sales": 108,
    "users": 19,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-21",
    "sales": 112,
    "users": 18,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-22",
    "sales": 111,
    "users": 20,
    "category": "Clothing",
    "platform": "Mobile"
  },
  {
    "date": "2025-06-23",
    "sales": 115,
    "users": 18,
    "category": "Electronics",
    "platform": "Web"
  }
];