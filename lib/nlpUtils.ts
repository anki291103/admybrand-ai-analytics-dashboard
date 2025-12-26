"use client";

export interface ParsedQuery {
  metric?: "sales" | "users" | "growth" | "anomalies" | "top_category" | "prediction";
  timeframe?: string;
  category?: string;
  originalQuery: string;
  responseInsight?: string;
  action: "filter" | "display_insight";
}

export const parseNaturalLanguageQuery = (query: string): ParsedQuery => {
  const lowerQuery = query.toLowerCase();

  const parsed: ParsedQuery = {
    originalQuery: query,
    action: "display_insight",
  };

  /* --------------------
     TIMEFRAME DETECTION
  -------------------- */
  if (lowerQuery.includes("last 7 days") || lowerQuery.includes("past week")) {
    parsed.timeframe = "last7";
    parsed.action = "filter";
  }

  if (lowerQuery.includes("last 30 days") || lowerQuery.includes("past month")) {
    parsed.timeframe = "last30";
    parsed.action = "filter";
  }

  if (lowerQuery.includes("june")) {
    parsed.timeframe = "2025-06"; // ✅ FIXED
    parsed.action = "filter";
  }

  if (lowerQuery.includes("all time") || lowerQuery.includes("all data")) {
    parsed.timeframe = "all";
    parsed.action = "filter";
  }

  if (
    lowerQuery.includes("next quarter") ||
    lowerQuery.includes("forecast") ||
    lowerQuery.includes("future")
  ) {
    parsed.metric = "prediction";
    parsed.action = "display_insight";
  }

  /* --------------------
     CATEGORY DETECTION
  -------------------- */
  if (lowerQuery.includes("fashion") || lowerQuery.includes("clothing")) {
    parsed.category = "Clothing";
    parsed.action = "filter";
  }

  if (lowerQuery.includes("electronics")) {
    parsed.category = "Electronics";
    parsed.action = "filter";
  }

  if (lowerQuery.includes("home")) {
    parsed.category = "Home";
    parsed.action = "filter";
  }

  if (lowerQuery.includes("all categories")) {
    parsed.category = "all";
    parsed.action = "filter";
  }

  /* --------------------
     METRIC DETECTION
  -------------------- */
  if (lowerQuery.includes("sales")) {
    parsed.metric = "sales";
    if (!parsed.timeframe && !parsed.category) {
      parsed.action = "filter";
    }
  }

  if (lowerQuery.includes("users") || lowerQuery.includes("engagement")) {
    parsed.metric = "users";
    if (!parsed.timeframe && !parsed.category) {
      parsed.action = "filter";
    }
  }

  if (lowerQuery.includes("growth")) {
    parsed.metric = "growth";
    parsed.action = "filter";
  }

  if (lowerQuery.includes("anomalies") || lowerQuery.includes("unusual")) {
    parsed.metric = "anomalies";
    parsed.action = "display_insight";
  }

  if (lowerQuery.includes("top performing") || lowerQuery.includes("best category")) {
    parsed.metric = "top_category";
    parsed.action = "display_insight";
  }

  /* --------------------
     RESPONSE INSIGHTS
  -------------------- */
  if (parsed.action === "display_insight") {
    switch (parsed.metric) {
      case "anomalies":
        parsed.responseInsight =
          "🚨 Sales anomalies detected. Check highlighted points in the sales chart and the AI insights panel.";
        break;

      case "top_category":
        parsed.responseInsight =
          "🏆 Identifying the top-performing category based on sales volume and user engagement.";
        break;

      case "prediction":
        parsed.responseInsight =
          "🔮 Forecasting future sales trends. See the prediction curve in the sales chart.";
        break;

      default:
        parsed.responseInsight =
          "📊 Analyzing your data. Apply filters or explore insights for deeper understanding.";
    }
  }

  return parsed;
};
