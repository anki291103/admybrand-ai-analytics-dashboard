🚀 AI-Powered Analytics Dashboard (ADmyBRAND Insights)

✨ Live Demo: https://ai-analytics-dashboard-iz2u.vercel.app/

📁 Repository: (add your GitHub repo link)

📌 Overview

ADmyBRAND Insights is a modern AI-powered analytics dashboard designed for a digital marketing and e-commerce use case.
The platform transforms raw sales and user data into actionable insights using analytics, predictive logic, anomaly detection, and natural-language querying.

This project was built to demonstrate end-to-end full-stack thinking, strong frontend engineering, and applied AI concepts aligned with real-world analytics platforms.

🎯 Key Objectives

Build a production-like analytics dashboard

Demonstrate AI-assisted decision making

Enable natural language interaction with data

Showcase clean UI/UX and scalable architecture

Align with modern full-stack + AI internship/job requirements

✨ Core Features
📊 Analytics & Visualization

KPI Cards

Total Sales

Active Users

Overall Growth %

Interactive Charts

📈 Sales Over Time + AI Prediction (Line Chart)

📊 Users by Category (Bar Chart)

🥧 Sales by Category (Pie Chart)

Drill-Down Interactions

Click on charts to view detailed breakdowns

Modal-based contextual insights

Advanced Filters

Date ranges (Last 7 / 30 days, monthly, all-time)

Category filtering

🤖 AI-Powered Capabilities
🔹 Natural Language Querying (NLP)

Users can interact with the dashboard using plain English:

“Show sales last 30 days”
“Any anomalies?”
“Users in electronics”
“Top performing category”


The system:

Parses intent using a rule-based NLP engine

Automatically applies filters or

Generates contextual AI insights

🔹 Sales Prediction

Uses linear regression to forecast future sales

Predictions are visualized directly on charts

🔹 Anomaly Detection

Detects unusual sales spikes/drops using statistical Z-score logic

Flags anomalies visually and in AI insights

🔹 AI-Generated Insights

Automatically summarizes trends

Highlights risks and opportunities

Suggests actionable recommendations

Flash sales

Inventory review

Campaign optimization

🔄 Real-Time Data Simulation

Live data generation at fixed intervals

Pause / Resume real-time updates

Mimics real analytics pipelines

🔐 Authentication & Access Control

NextAuth.js (Credentials Provider)

Role-based access:

Admin → dashboard settings access

Viewer → read-only analytics

🎨 UI / UX Excellence

Fully responsive layout

Collapsible sidebar for mobile

Dark / Light mode toggle

Skeleton loaders for better perceived performance

Clean SaaS-style design system

Micro-interactions & smooth transitions

🛠 Tech Stack
Frontend

Next.js (App Router)

React + TypeScript

Tailwind CSS

Recharts (data visualization)

Framer Motion (animations)

React Icons

Backend / Logic

Next.js API Routes

NextAuth.js (authentication)

Rule-based NLP engine

Custom AI utilities

Prediction

Anomaly detection

Mock + simulated real-time data

Tooling & Deployment

Vercel

GitHub

ESLint

Modern folder-based architecture

🧠 Architecture Highlights
src/
├── app/
│   ├── dashboard/
│   └── api/
├── components/
│   ├── charts/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── aiUtils.ts
│   ├── nlpUtils.ts
│   ├── dataGenerators.ts
│   └── constants.ts
├── styles/
└── types/


Modular & reusable components

Clear separation of concerns

Optimized rendering using useMemo

Strong TypeScript typing throughout

🧪 AI Usage Disclosure

AI tools were used responsibly and transparently as development accelerators.

Tools Used

Google Gemini

GitHub Copilot

ChatGPT-4

How AI Was Used

Boilerplate & scaffolding

Algorithm ideation (prediction, anomaly detection)

Debugging TypeScript & chart interactions

Tailwind UI refinements

Approximate contribution:

40% AI-assisted generation

30% manual implementation

30% AI-assisted debugging & optimization

All architectural decisions, integrations, and final implementations were fully understood and manually validated.

🚀 How to Run Locally
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run dev


Visit:
👉 http://localhost:3000

🔮 Future Enhancements

Real backend + database (PostgreSQL / MongoDB)

Advanced ML models (Prophet / LSTM)

Export reports (CSV / PDF)

Drag-and-drop dashboard widgets

Multi-tenant organizations

Automated testing (Jest / Playwright)

🏁 Final Notes

This project demonstrates:

Strong frontend engineering

Practical AI integration

Real-world analytics problem solving

Clean architecture & UX thinking

It was built to reflect industry-ready skills, not just academic concepts.

👤 Author

Ankita Jha
B.Tech IT | Full-Stack & AI-Driven Analytics
https://www.linkedin.com/in/ankita-jha-4a364724b/
