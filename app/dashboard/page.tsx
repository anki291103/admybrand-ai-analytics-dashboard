"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react'; // Added useRef
import { useSession } from "next-auth/react";
import Sidebar, { type DashboardView } from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/Card';
import ChartContainer from '../../components/ChartContainer';
import SalesLineChart from '../../components/SalesLineChart';
import UserBarChart from '../../components/UserBarChart';
import InsightsBox from '../../components/InsightsBox';
import FilterBar from '../../components/FilterBar';
import DetailModal from '../../components/DetailModal';
import DashboardSettings from '../../components/DashboardSettings';
import UsersView from "@/app/dashboard/views/UsersView";
import ProductsView from "@/app/dashboard/views/ProductsView";
import CategoryPieChart from '../../components/CategoryPieChart';
import SkeletonLoader from '../../components/SkeletonLoader';
import { ITEMS_PER_PAGE } from '@/lib/constants';

import { FaUsers, FaShoppingCart, FaChartLine, FaPlay, FaPause } from 'react-icons/fa'; // Added Play/Pause icons
import { salesData as initialSalesData, type SalesDataItem } from  "@/lib/data/dashboardData";; // Renamed initial import
import { predictSalesTrend, detectSalesAnomalies } from '@/lib/aiUtils';
import { parseNaturalLanguageQuery } from '@/lib/nlpUtils';
import { generateNewSalesDataItem } from '@/lib/dataGenerators'; // NEW: Import data generator

// Helper Functions (filterDataByDateRange, filterDataByCategory, generateInsightsAndRecommendations remain unchanged)
const filterDataByDateRange = (data: SalesDataItem[], range: string): SalesDataItem[] => {
  if (data.length === 0) {
    return [];
  }

  const sortedDataByDate = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const latestDataDate = new Date(sortedDataByDate[sortedDataByDate.length - 1].date);

  let startDate = new Date(latestDataDate);
  let endDate = new Date(latestDataDate);

  switch (range) {
    case 'all':
      return data;
    case 'last7':
      startDate.setDate(latestDataDate.getDate() - 7);
      break;
    case 'last30':
      startDate.setDate(latestDataDate.getDate() - 30);
      break;
    case 'last3months':
      startDate.setMonth(latestDataDate.getMonth() - 3);
      if (startDate.getDate() > latestDataDate.getDate()) {
        startDate.setDate(1);
      }
      break;
    case '2025-05':
      startDate = new Date(2025, 4, 1);
      endDate = new Date(2025, 4, 31);
      break;
    case '2025-06':
      startDate = new Date(2025, 5, 1);
      endDate = new Date(2025, 5, 30);
      break;
    default:
      console.warn(`Unrecognized date range: ${range}. Returning all data.`);
      return data;
  }

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
};

const filterDataByCategory = (data: SalesDataItem[], category: string): SalesDataItem[] => {
  if (category === 'all') {
    return data;
  }
  return data.filter(item => item.category === category);
};

const generateInsightsAndRecommendations = (
  data: SalesDataItem[],
  totalSales: number,
  salesChange: number,
  activeUsers: number,
  usersChange: number,
  anomalies: SalesDataItem[],
  nlpResponseInsight?: string,
  selectedDetail?: { type: 'date' | 'category'; data: any }
): { type: 'info' | 'recommendation' | 'alert'; text: string; action?: string; onActionClick?: () => void; }[] => {

  const insights: { type: 'info' | 'recommendation' | 'alert'; text: string; action?: string; onActionClick?: () => void; }[] = [];

  if (nlpResponseInsight) {
    insights.push({ type: 'info', text: nlpResponseInsight });
  }

  if (selectedDetail) {
    if (selectedDetail.type === 'date') {
      const date = new Date(selectedDetail.data.date).toLocaleDateString();
      const sales = selectedDetail.data.sales;
      const users = selectedDetail.data.users;
      insights.push({ type: 'info', text: `🔍 Details for ${date}: Sales were ₹${sales?.toLocaleString()}, Users: ${users?.toLocaleString()}.` });
      if (selectedDetail.data.isAnomaly) {
        insights.push({ type: 'alert', text: `❗️ This date marked as an anomaly! Investigate logs or external events.` });
      }
    } else if (selectedDetail.type === 'category') {
      const category = selectedDetail.data.category;
      const users = selectedDetail.data.users;
      const categorySpecificData = data.filter(item => item.category === category);
      const totalCategorySales = categorySpecificData.reduce((sum, item) => sum + item.sales, 0);

      insights.push({ type: 'info', text: `🔍 Details for ${category}: Total Users: ${users.toLocaleString()}, Total Sales: ₹${(totalCategorySales / 1000).toFixed(2)}K.` });

      if (totalCategorySales > 800) {
          insights.push({
              type: 'recommendation',
              text: `🚀 ${category} is a strong performer! Consider increasing ad spend for this category.`,
              action: 'Launch Ad Campaign',
              onActionClick: () => alert(`Simulating: Launching ad campaign for ${category}!`)
          });
      }
    }
  }


  if (data.length === 0) {
    insights.push({ type: 'info', text: "No data available to generate insights for the selected period." });
    return insights;
  }

  if (salesChange > 5) {
    insights.push({ type: 'info', text: `📈 Sales surged by ${salesChange.toFixed(1)}%, indicating strong market demand.` });
    insights.push({
      type: 'recommendation',
      text: `Leverage this momentum! Consider a limited-time flash sale to capture more customers.`,
      action: 'Plan Flash Sale',
      onActionClick: () => alert('Simulating: Planning a flash sale!')
    });
  } else if (salesChange < -5) {
    insights.push({ type: 'alert', text: `📉 Sales dropped by ${Math.abs(salesChange).toFixed(1)}%, suggesting areas for improvement.` });
    insights.push({
      type: 'recommendation',
      text: `Analyze recent marketing campaigns or competitor activities to understand the dip.`,
      action: 'Start Root Cause Analysis',
      onActionClick: () => alert('Simulating: Initiating root cause analysis...')
    });
  } else {
    insights.push({ type: 'info', text: `📊 Total sales of ₹${(totalSales / 1000).toFixed(2)}K show stable performance.` });
  }

  if (usersChange > 0) {
    insights.push({ type: 'info', text: `👥 Active users increased by ${usersChange.toFixed(1)}%, boosting engagement.` });
    insights.push({
        type: 'recommendation',
        text: `Encourage sharing! Implement a referral program to further expand your user base.`,
        action: 'Setup Referral Program',
        onActionClick: () => alert('Simulating: Setting up referral program!')
    });
  } else if (usersChange < 0) {
    insights.push({ type: 'alert', text: `⚠️ User activity declined by ${Math.abs(usersChange).toFixed(1)}%, review engagement strategies.` });
    insights.push({
        type: 'recommendation',
        text: `Re-engage inactive users with targeted email campaigns or push notifications.`,
        action: 'Launch Re-engagement Campaign',
        onActionClick: () => alert('Simulating: Launching re-engagement campaign!')
    });
  } else {
    insights.push({ type: 'info', text: `👤 User count is stable at ${activeUsers.toLocaleString()}.` });
  }

  const categorySales = data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.sales;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categorySales).sort(([, a], [, b]) => b - a);
  if (sortedCategories.length > 0) {
    insights.push({ type: 'info', text: `🏆 ${sortedCategories[0][0]} is the top-performing category with ₹${(sortedCategories[0][1] / 1000).toFixed(2)}K in sales.` });
  }

  const predictionResult = predictSalesTrend(data, 1);
  if (predictionResult.length > data.length && predictionResult[predictionResult.length - 1].sales !== null) {
      const lastActualSales = data[data.length - 1].sales;
      const predictedNextSales = predictionResult[predictionResult.length - 1].sales!;
      const predictionGrowth = ((predictedNextSales - lastActualSales) / lastActualSales) * 100;
      if (predictionGrowth > 10) {
          insights.push({ type: 'info', text: `🔮 Future outlook: Sales are predicted to grow significantly by ${predictionGrowth.toFixed(1)}% next month!` });
          insights.push({
            type: 'recommendation',
            text: `Prepare inventory and marketing for the anticipated sales increase.`,
            action: 'Review Inventory',
            onActionClick: () => alert('Simulating: Inventory review initiated!')
          });
      }
  }

  if (anomalies.length > 0) {
    anomalies.forEach(anomaly => {
      const actualSalesAtAnomaly = data.find(d => d.date === anomaly.date && d.category === anomaly.category)?.sales || 0;
      const anomalyType = anomaly.sales > actualSalesAtAnomaly ? 'spike' : 'drop';
      insights.push({ type: 'alert', text: `🚨 Anomaly detected! Significant sales ${anomalyType} on ${new Date(anomaly.date).toLocaleDateString()} for ${anomaly.category}.` });
      insights.push({
        type: 'recommendation',
        text: `Immediate investigation required for sales ${anomalyType} on ${new Date(anomaly.date).toLocaleDateString()}.`,
        action: 'Investigate Anomaly',
        onActionClick: () => alert(`Simulating: Investigating anomaly on ${new Date(anomaly.date).toLocaleDateString()}`)
      });
    });
  }

  if (insights.length === 0 && !nlpResponseInsight && !selectedDetail) {
    insights.push({ type: 'info', text: "No specific trends or insights detected based on current data." });
  }

  return insights;
};


const Dashboard: React.FC = () => {
  const { data: session } = useSession();
const isAdmin = session?.user?.role === "admin";

  const [dateRange, setDateRange] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [nlpGeneratedInsight, setNlpGeneratedInsight] = useState<string | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(false);
const [loading, setLoading] = useState(true);
  // NEW: State for real-time sales data
const [liveSalesData, setLiveSalesData] = useState<SalesDataItem[]>([]);

  const [isRealTimePaused, setIsRealTimePaused] = useState(false);
  const intervalRef = useRef<number | null>(null); // To store interval ID

  useEffect(() => {
  setLoading(true);

  fetch("/api/analytics")
    .then(res => res.json())
    .then(res => {
      setLiveSalesData(res.data || []);
      setLoading(false); // ✅ UNBLOCKS DASHBOARD
    })
    .catch(() => setLoading(false));
}, []);


  // State for Dashboard Customization
  const [showSalesChart, setShowSalesChart] = useState(true);
  const [showUsersChart, setShowUsersChart] = useState(true);
  const [showCategoryPieChart, setShowCategoryPieChart] = useState(true);

  // State for mobile sidebar open/close
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);


  // State for Drill-down Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDetails, setModalDetails] = useState<{ label: string; value: string | number }[]>([]);
  const [selectedDrillDownData, setSelectedDrillDownData] = useState<{ type: 'date' | 'category'; data: any } | undefined>(undefined);

  // State for active sidebar view
  const [activeView, setActiveView] = useState<DashboardView>('overview');

// Inside your Dashboard component...

// 1. Correct Initialization Effect
useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
    setIsDarkMode(true);
  } else {
    document.documentElement.classList.remove("dark");
    setIsDarkMode(false);
  }
}, []);

// 2. THE MISSING FUNCTION:
const toggleDarkMode = () => {
  setIsDarkMode((prev) => {
    const next = !prev;
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    return next;
  });
};  // NEW: Real-time data generation effect
  useEffect(() => {
    if (isRealTimePaused) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Clear any existing interval before setting a new one
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setLiveSalesData(prevData => {
        const sortedPrevData = [...prevData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const lastItem = sortedPrevData[sortedPrevData.length - 1];

        // Generate data for the next day after the last existing data point
        const nextDate = new Date(new Date(lastItem.date).getTime() + (24 * 60 * 60 * 1000));
        
        // Generate a random number of entries for the next day (1 to 3)
        const numEntriesForNextDay = Math.floor(Math.random() * 3) + 1;
        let newEntries: SalesDataItem[] = [];
        let currentBaseItem = lastItem;

        for (let i = 0; i < numEntriesForNextDay; i++) {
          const newItem = generateNewSalesDataItem(currentBaseItem, nextDate);
          newEntries.push(newItem);
          currentBaseItem = newItem; // Base next item on the newly generated one for a smoother local sequence
        }
        
        // Append new entries. You might want to cap the total data size if it grows too large
        return [...prevData, ...newEntries];
      });
    }, 5000); // Add new data every 5 seconds (adjust as needed)

    // Cleanup interval on component unmount or pause
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRealTimePaused]); // Re-run effect only when pause state changes

  // Toggle handlers for dashboard sections
  const toggleSalesChart = () => setShowSalesChart(prev => !prev);
  const toggleUsersChart = () => setShowUsersChart(prev => !prev);
  const toggleCategoryPieChart = () => setShowCategoryPieChart(prev => !prev);

  // Toggle handler for real-time updates
  const toggleRealTimeUpdates = () => {
    setIsRealTimePaused(prev => !prev);
  };


  // Toggle handler for mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };


  // Handler for sidebar navigation
  const handleSidebarNavigate = (view: DashboardView) => {
    setActiveView(view);
    setIsModalOpen(false);
    setNlpGeneratedInsight(undefined);
    setSelectedDrillDownData(undefined);
    setIsMobileSidebarOpen(false); // Close sidebar on navigation for mobile
  };

const handleNaturalLanguageSearch = (query: string) => {
  const parsed = parseNaturalLanguageQuery(query);

  // RESET previous state
  setSelectedDrillDownData(undefined);
  setIsModalOpen(false);

  // APPLY FILTERS
  if (parsed.action === "filter") {
    if (parsed.timeframe) setDateRange(parsed.timeframe);
    if (parsed.category) setCategory(parsed.category);

    setNlpGeneratedInsight(parsed.responseInsight);
  }

  // ONLY SHOW INSIGHT (no filter)
  if (parsed.action === "display_insight") {
    setNlpGeneratedInsight(parsed.responseInsight);
  }
};

  // --- Drill-Down Handlers ---
  const handleSalesDataPointClick = (dataPoint: any) => {
    setModalTitle(`Sales Details: ${new Date(dataPoint.date).toLocaleDateString()}`);
    setModalDetails([
      { label: 'Date', value: new Date(dataPoint.date).toLocaleDateString() },
      { label: 'Sales', value: `₹${(dataPoint.sales || 0).toLocaleString()}` },
      { label: 'Users', value: (dataPoint.users || 'N/A').toLocaleString() },
      { label: 'Prediction', value: dataPoint.isPrediction ? 'Yes' : 'No' },
      { label: 'Anomaly', value: dataPoint.isAnomaly ? 'Yes 🚨' : 'No' },
      { label: 'Platform Sales (Web)', value: `₹${(liveSalesData.filter(d => d.date === dataPoint.date && d.platform === 'Web').reduce((sum, item) => sum + item.sales, 0)).toLocaleString()}`}, // Use liveSalesData here
      { label: 'Platform Sales (Mobile)', value: `₹${(liveSalesData.filter(d => d.date === dataPoint.date && d.platform === 'Mobile').reduce((sum, item) => sum + item.sales, 0)).toLocaleString()}`}, // Use liveSalesData here
    ]);
    setSelectedDrillDownData({ type: 'date', data: dataPoint });
    setIsModalOpen(true);
  };

  const handleUserBarClick = (categoryData: any) => {
    setModalTitle(`Category Details: ${categoryData.category}`);
    const categorySpecificData = liveSalesData.filter(item => item.category === categoryData.category); // Use liveSalesData here
    const totalCategorySales = categorySpecificData.reduce((sum, item) => sum + item.sales, 0);

    setModalDetails([
      { label: 'Category', value: categoryData.category },
      { label: 'Total Users', value: categoryData.users.toLocaleString() },
      { label: 'Total Sales', value: `₹${totalCategorySales.toLocaleString()}` },
      { label: 'Platforms', value: [...new Set(categorySpecificData.map(d => d.platform))].join(', ') || 'N/A' },
    ]);
    setSelectedDrillDownData({ type: 'category', data: categoryData });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDrillDownData(undefined);
  };


  // Filtered data based on selected filters (now from liveSalesData)
  const filteredData = useMemo(() => {
    if (loading) return [];
    let data = liveSalesData; // Use liveSalesData here
    data = filterDataByDateRange(data, dateRange);
    data = filterDataByCategory(data, category);
    return data;
  }, [dateRange, category, loading, liveSalesData]); // Add liveSalesData to dependencies

  // Apply Anomaly Detection to the filtered historical data
  const dataWithAnomalies = useMemo(() => {
    if (loading) return [];
    return detectSalesAnomalies(filteredData, 5, 2);
  }, [filteredData, loading]);

  // Generate prediction data for the chart from the data WITH anomalies
  const predictionData = useMemo(() => {
    if (loading) return [];
    return predictSalesTrend(dataWithAnomalies, 3);
  }, [dataWithAnomalies, loading]);


  // Calculate metrics based on filtered data (from dataWithAnomalies)
  const totalSales = useMemo(() => {
    if (loading) return 0;
    return dataWithAnomalies.reduce((sum, item) => sum + item.sales, 0);
  }, [dataWithAnomalies, loading]);

  const activeUsers = useMemo(() => {
    if (loading) return 0;
    return dataWithAnomalies.reduce((sum, item) => sum + item.users, 0);
  }, [dataWithAnomalies, loading]);

  const salesChange = useMemo(() => {
    if (loading || dataWithAnomalies.length < 2) return 0;
    const midPoint = Math.floor(dataWithAnomalies.length / 2);
    const firstHalfSales = dataWithAnomalies.slice(0, midPoint).reduce((sum, item) => sum + item.sales, 0);
    const secondHalfSales = dataWithAnomalies.slice(midPoint).reduce((sum, item) => sum + item.sales, 0);
    return firstHalfSales === 0 ? 0 : ((secondHalfSales - firstHalfSales) / firstHalfSales) * 100;
  }, [dataWithAnomalies, loading]);

  const usersChange = useMemo(() => {
    if (loading || dataWithAnomalies.length < 2) return 0;
    const midPoint = Math.floor(dataWithAnomalies.length / 2);
    const firstHalfUsers = dataWithAnomalies.slice(0, midPoint).reduce((sum, item) => sum + item.users, 0);
    const secondHalfUsers = dataWithAnomalies.slice(midPoint).reduce((sum, item) => sum + item.users, 0);
    return firstHalfUsers === 0 ? 0 : ((secondHalfUsers - firstHalfUsers) / firstHalfUsers) * 100;
  }, [dataWithAnomalies, loading]);

  const growthChange = useMemo(() => {
    if (loading || dataWithAnomalies.length < 2) return 0;
    const combinedChange = (salesChange + usersChange) / 2;
    return combinedChange;
  }, [salesChange, usersChange, loading]);


  const detectedAnomalies = useMemo(() => {
    if (loading) return [];
    return dataWithAnomalies.filter(item => item.isAnomaly);
  }, [dataWithAnomalies, loading]);

  // AI Insights - now passing NLP-specific insight AND selected drill-down data
  const aiInsights = useMemo(() => {
    if (loading) return [{ type: 'info' as const, text: 'Loading insights...' }];
    return generateInsightsAndRecommendations(filteredData, totalSales, salesChange, activeUsers, usersChange, detectedAnomalies, nlpGeneratedInsight, selectedDrillDownData);
  }, [filteredData, totalSales, salesChange, activeUsers, usersChange, detectedAnomalies, nlpGeneratedInsight, selectedDrillDownData, loading]);


  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 font-sans text-gray-800 dark:text-gray-100">
      <Sidebar activeView={activeView} onNavigate={handleSidebarNavigate} isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
       <Header
  onSearch={handleNaturalLanguageSearch}
  onToggleDarkMode={toggleDarkMode}
  isDarkMode={isDarkMode}
  onToggleSidebar={toggleMobileSidebar}
/>


        <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
          {/* Real-time Update Controls */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleRealTimeUpdates}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md
                ${isRealTimePaused ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
              aria-label={isRealTimePaused ? 'Resume real-time updates' : 'Pause real-time updates'}
            >
              {isRealTimePaused ? <><FaPlay className="mr-2" /> Resume Live</> : <><FaPause className="mr-2" /> Pause Live</>}
            </button>
          </div>

          {/* Conditional rendering based on activeView */}
          {activeView === 'overview' && (
            <>
              {/* FilterBar Section */}
              <FilterBar
                dateRange={dateRange}
                setDateRange={setDateRange}
                category={category}
                setCategory={setCategory}
              />

              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                  <SkeletonLoader type="card" count={3} className="h-32" />
                ) : (
                  <>
                    <Card
                      title="Total Sales"
                      icon={<FaShoppingCart />}
                      value={`₹${(totalSales / 1000).toFixed(1)}K`}
                      change={parseFloat(salesChange.toFixed(1))}
                    />
                    <Card
                      title="Active Users"
                      icon={<FaUsers />}
                      value={activeUsers.toLocaleString()}
                      change={parseFloat(usersChange.toFixed(1))}
                    />
                    <Card
                      title="Overall Growth"
                      icon={<FaChartLine />}
                      value={`${growthChange.toFixed(1)}%`}
                      change={parseFloat(growthChange.toFixed(1))}
                    />
                  </>
                )}
              </div>

              {/* Charts Section - Conditional Rendering */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {showSalesChart && (
                  <ChartContainer title="Sales Over Time & Prediction">
                    {loading ? (
                      <SkeletonLoader type="chart" className="h-full" />
                    ) : (
                      <SalesLineChart
                        data={dataWithAnomalies}
                        predictionData={predictionData}
                        onDataPointClick={handleSalesDataPointClick}
                      />
                    )}
                  </ChartContainer>
                )}
                {showUsersChart && (
                  <ChartContainer title="Users by Category">
                    {loading ? (
                      <SkeletonLoader type="chart" className="h-full" />
                    ) : (
                      <UserBarChart
                        data={filteredData}
                        onBarClick={handleUserBarClick}
                      />
                    )}
                  </ChartContainer>
                )}
                {showCategoryPieChart && (
                  <ChartContainer title="Sales by Category">
                    {loading ? (
                      <SkeletonLoader type="chart" className="h-full" />
                    ) : (
                      <CategoryPieChart
                        data={filteredData}
                      />
                    )}
                  </ChartContainer>
                )}
                {!showSalesChart && !showUsersChart && !showCategoryPieChart && (
                  <div className="col-span-full bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                    No charts are currently visible. Adjust settings to display charts.
                  </div>
                )}
              </div>

              {/* AI Insights */}
              <InsightsBox insights={aiInsights} />
            </>
          )}

          {/* New Views (Users, Products, Settings) - Add loading skeletons here as well */}
          {activeView === 'users' && (
            loading ? (
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
                <SkeletonLoader type="text" className="h-8 w-1/3 mb-6" />
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <SkeletonLoader type="card" count={3} className="h-24" />
                </div>
                <div className="overflow-x-auto flex-grow">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        {Array(8).fill(0).map((_, i) => <th key={i} className="px-5 py-3"><SkeletonLoader type="text" className="w-full h-4" /></th>)}
                      </tr>
                    </thead>
                    <tbody>
                      <SkeletonLoader type="table-row" count={ITEMS_PER_PAGE} />
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <UsersView />
            )
          )}
          {activeView === 'products' && (
            loading ? (
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
                <SkeletonLoader type="text" className="h-8 w-1/3 mb-6" />
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <SkeletonLoader type="card" count={3} className="h-24" />
                </div>
                <div className="overflow-x-auto flex-grow">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        {Array(8).fill(0).map((_, i) => <th key={i} className="px-5 py-3"><SkeletonLoader type="text" className="w-full h-4" /></th>)}
                      </tr>
                    </thead>
                    <tbody>
                      <SkeletonLoader type="table-row" count={ITEMS_PER_PAGE} />
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <ProductsView />
            )
          )}

{activeView === "settings" && isAdmin && (
            loading ? (
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-gray-700 h-64 flex flex-col justify-around">
                  <SkeletonLoader type="text" className="h-6 w-1/2 mb-4" />
                  <SkeletonLoader type="text" className="h-4 w-full mb-2" count={3} />
                </div>
              ) : (
            <DashboardSettings
              showSalesChart={showSalesChart}
              toggleSalesChart={toggleSalesChart}
              showUsersChart={showUsersChart}
              toggleUsersChart={toggleUsersChart}
              toggleCategoryPieChart={toggleCategoryPieChart}
              showCategoryPieChart={showCategoryPieChart}
            />
            )
          )}

        </main>
      </div>
      {/* Drill-down Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        details={modalDetails}
      />
    </div>
  );
};

export default Dashboard;