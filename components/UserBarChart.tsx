// src/components/UserBarChart.tsx
"use client";

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'; // Added Cell

interface SalesDataItem {
  date: string;
  sales: number;
  users: number;
  category: string;
  platform: string;
}

interface GroupedData {
  category: string;
  users: number;
}

interface UserBarChartProps {
  data: SalesDataItem[];
  onBarClick: (categoryData: GroupedData) => void; // New prop for click handler
}

const UserBarChart: React.FC<UserBarChartProps> = ({ data, onBarClick }) => {
  const groupedData: GroupedData[] = useMemo(() => {
    return data.reduce((acc: GroupedData[], item) => {
      const existing = acc.find(d => d.category === item.category);
      if (existing) {
        existing.users += item.users;
      } else {
        acc.push({ category: item.category, users: item.users });
      }
      return acc;
    }, []);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={groupedData}
        // Removed onClick from BarChart here, as we'll handle clicks on individual Bars/Cells
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
        <XAxis dataKey="category" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
        <Bar dataKey="users" fill="#8884d8" radius={[10, 10, 0, 0]}>
          {
            // Map over the groupedData to render a Cell for each bar
            groupedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // Attach the onClick handler to each individual Cell
                onClick={() => onBarClick(entry)} // Pass the specific entry (GroupedData) on click
                cursor="pointer" // Indicate that the bar is clickable
              />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserBarChart;