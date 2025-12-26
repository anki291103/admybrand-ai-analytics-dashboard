// src/utils/aiUtils.ts
"use client";
import { type SalesDataItem } from "@/lib/data/dashboardData";;

interface PredictionDataPoint {
  date: string;
  sales: number | null; // Null for actual data points, value for predictions
  isPrediction: boolean; // Changed from optional to required boolean
    isAnomaly?: boolean; // Add a property to mark anomalies

}

/**
 * Generates future sales predictions based on historical data using a simple linear regression.
 * This is a highly simplified model for demonstration purposes.
 * It predicts the next `numPredictions` data points based on the trend of the last `trendWindowSize` points.
 */
export const predictSalesTrend = (
  historicalData: SalesDataItem[],
  numPredictions: number = 3,
  trendWindowSize: number = 5 // Number of last data points to consider for trend
): PredictionDataPoint[] => {
  if (historicalData.length < trendWindowSize) {
    return historicalData.map(d => ({ date: d.date, sales: d.sales as number | null, isPrediction: false }));
  }

  const sortedData = [...historicalData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const trendData = sortedData.slice(-trendWindowSize);

  const x: number[] = trendData.map(d => d.date ? new Date(d.date).getTime() : 0);
  const y: number[] = trendData.map(d => d.sales);

  const n = trendData.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i];
  }

  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY / n) - (m * sumX / n);

  const predictions: PredictionDataPoint[] = [];
  const lastDate = new Date(sortedData[sortedData.length - 1].date);

  for (let i = 1; i <= numPredictions; i++) {
    const nextDate = new Date(lastDate.getTime() + (i * 30 * 24 * 60 * 60 * 1000));
    const predictedSales = m * nextDate.getTime() + b;

    predictions.push({
      date: nextDate.toISOString().split('T')[0],
      sales: Math.max(0, Math.round(predictedSales)),
      isPrediction: true,
    });
  }

  const combinedData: PredictionDataPoint[] = sortedData.map(d => ({ date: d.date, sales: d.sales as number | null, isPrediction: false }))
                                                 .concat(predictions);

  return combinedData;
};


/**
 * Detects anomalies in historical sales data using a simple Z-score approach with a rolling window.
 * Points are marked as anomalous if their sales value is outside `thresholdStdDevs`
 * standard deviations from the mean of the rolling window.
 */
export const detectSalesAnomalies = (
  data: SalesDataItem[],
  windowSize: number = 5, // Number of data points for rolling window
  thresholdStdDevs: number = 2 // How many standard deviations away to consider an anomaly
): SalesDataItem[] => {
  if (data.length < windowSize) {
    return data; // Not enough data for meaningful anomaly detection
  }

  const anomalousData = data.map(item => ({ ...item, isAnomaly: false })); // Initialize all as not anomalous

  for (let i = 0; i < anomalousData.length; i++) {
    // Determine the window for calculation (previous 'windowSize' points)
    const startIndex = Math.max(0, i - windowSize + 1);
    const window = anomalousData.slice(startIndex, i + 1); // Inclusive of current point

    const salesValues = window.map(d => d.sales);

    // Calculate mean
    const mean = salesValues.reduce((sum, val) => sum + val, 0) / salesValues.length;

    // Calculate standard deviation
    const variance = salesValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / salesValues.length;
    const stdDev = Math.sqrt(variance);

    // Check if the current point is an anomaly
    if (stdDev > 0) { // Avoid division by zero
      const zScore = Math.abs((anomalousData[i].sales - mean) / stdDev);
      if (zScore > thresholdStdDevs) {
        anomalousData[i].isAnomaly = true;
      }
    }
  }

  return anomalousData;
};
