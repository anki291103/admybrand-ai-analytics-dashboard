// src/components/SalesLineChart.tsx
"use client";
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, type DotProps
} from 'recharts';

// Interface for sales data, including the anomaly flag
interface SalesDataItem {
  date: string;
  sales: number;
  users: number;
  category: string;
  platform: string;
  isAnomaly?: boolean;
}

// Interface for prediction data points, which can also include anomaly info
interface PredictionDataPoint {
  date: string;
  sales: number | null;
  isPrediction: boolean;
  isAnomaly?: boolean;
}

// Extend DotProps to include payload which contains our data point.
// We also add a custom click handler specific to our data type.
interface CustomDotProps extends DotProps {
  payload?: PredictionDataPoint; // Make payload optional as per Recharts behavior, but define its type
  onDotClick?: (data: PredictionDataPoint) => void; // Our custom click handler
}

// Custom dot component to highlight anomalies and handle clicks
const CustomDot: React.FC<CustomDotProps> = (props) => {
  // Explicitly destructure ONLY the props you need for rendering the dot and handling the click.
  // Any other props that Recharts passes (like internal event handlers, or data props)
  // are deliberately NOT destructured or spread onto the native SVG element.
  const {
    cx, cy, stroke, fill, r, // Standard circle/dot rendering props
    payload, // Our custom data payload
    onDotClick, // Our custom click handler
    key, // React's key prop (needed for custom components in lists)
  } = props;


  if (cx === undefined || cy === undefined || !payload) {
    return null;
  }

  // Define our specific click handler for the DOM element
  const handleClick = (event: React.MouseEvent<SVGCircleElement | SVGSVGElement>) => {
    event.stopPropagation(); // Prevent any parent click handlers from firing
    if (onDotClick) {
      onDotClick(payload); // Call our custom handler with the data
    }
  };

  if (payload.isAnomaly) {
    return (
      <svg
        key={key} // Pass the key directly here
        x={cx - 8}
        y={cy - 8}
        width={16}
        height={16}
        fill="red"
        viewBox="0 0 1024 1024"
        onClick={handleClick} // Use our dedicated handleClick
        style={{ cursor: 'pointer' }} // Indicate clickable
        // Do NOT spread any other props here from Recharts' DotProps,
        // as they might contain incompatible event handler types.
      >
        <path d="M512 0c-282.77 0-512 229.23-512 512s229.23 512 512 512 512-229.23 512-512-229.23-512-512-512zm0 896c-212.04 0-384-171.96-384-384s171.96-384 384-384 384 171.96 384 384-171.96 384-384 384zM470.4 256h81.2v384h-81.2v-384zM470.4 704h81.2v81.2h-81.2v-81.2z" fill="#ff0000" />
      </svg>
    );
  }
  // Otherwise, render a standard circle dot
  return (
    <circle
      key={key} // Pass the key directly here
      cx={cx}
      cy={cy}
      r={r || 4} // Provide a default radius if 'r' is undefined
      fill={fill || stroke || "#8884d8"} // Provide fallback fill
      onClick={handleClick} // Use our dedicated handleClick
      style={{ cursor: 'pointer' }} // Indicate clickable
      // Do NOT spread any other props here from Recharts' DotProps.
    />
  );
};


interface SalesLineChartProps {
  data: SalesDataItem[];
  predictionData: PredictionDataPoint[];
  onDataPointClick: (data: PredictionDataPoint) => void;
}

const SalesLineChart: React.FC<SalesLineChartProps> = ({ data: _data, predictionData, onDataPointClick }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={predictionData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
        />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value, name) => [`₹${(value as number).toLocaleString()}`, name === 'sales' ? 'Sales' : 'Predicted Sales']}
          labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#4f46e5"
          strokeWidth={3}
          // The 'dot' prop render function receives Recharts' DotProps.
          // We'll pass specific props to CustomDot and explicitly handle the 'key'.
          dot={(dotPropsFromRecharts) => {
            const { key, ...rechartsSpecificDotProps } = dotPropsFromRecharts;
            // Pass only the relevant Recharts dot props and our custom handler.
            // Avoid passing all of 'rechartsSpecificDotProps' as some internal props might conflict.
            return (
              <CustomDot
                key={key} // Key passed directly
                cx={rechartsSpecificDotProps.cx}
                cy={rechartsSpecificDotProps.cy}
                r={rechartsSpecificDotProps.r}
                fill={rechartsSpecificDotProps.fill}
                stroke={rechartsSpecificDotProps.stroke}
                strokeWidth={rechartsSpecificDotProps.strokeWidth}
                payload={rechartsSpecificDotProps.payload}
                onDotClick={onDataPointClick} // Our custom handler
                // Do NOT spread 'rechartsSpecificDotProps' here.
                // If you need other standard HTML/SVG attributes (like 'className'),
                // you would need to explicitly pull them out of 'dotPropsFromRecharts'
                // and pass them. For example: `className={dotPropsFromRecharts.className}`
              />
            );
          }}
          activeDot={{ r: 8 }}
          name="Actual Sales"
          isAnimationActive={false}
          data={predictionData.filter(d => !d.isPrediction)}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#ef4444"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="Predicted Sales"
          data={predictionData.filter(d => d.isPrediction)}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesLineChart;