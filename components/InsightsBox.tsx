"use client";
import React from "react";
import {
  FaLightbulb,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

interface InsightItem {
  type: "info" | "recommendation" | "alert";
  text: string;
  action?: string;
  onActionClick?: () => void;
}

interface InsightProps {
  insights: InsightItem[];
}

const InsightsBox: React.FC<InsightProps> = ({ insights }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
        <FaLightbulb className="text-indigo-500" />
        AI-Generated Insights & Recommendations
      </h2>

      <ul className="space-y-3">
        {insights.map((item, index) => {
          const base =
            "flex items-start gap-3 p-4 rounded-lg border text-sm";

          const styles =
            item.type === "info"
              ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 text-blue-900 dark:text-blue-100"
              : item.type === "recommendation"
              ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30 text-green-900 dark:text-green-100"
              : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-900 dark:text-red-100";

          return (
            <li key={index} className={`${base} ${styles}`}>
              {item.type === "info" && (
                <FaLightbulb className="mt-1 text-blue-500" />
              )}
              {item.type === "recommendation" && (
                <FaCheckCircle className="mt-1 text-green-500" />
              )}
              {item.type === "alert" && (
                <FaExclamationCircle className="mt-1 text-red-500" />
              )}

              <div className="flex-1">
                <p className="leading-relaxed">{item.text}</p>

                {item.action && item.onActionClick && (
                  <button
                    onClick={item.onActionClick}
                    className="mt-3 inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md
                      bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900
                      hover:opacity-90 transition"
                  >
                    {item.action}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InsightsBox;
