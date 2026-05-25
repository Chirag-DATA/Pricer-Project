# Pricer 🚀

Pricer.Pro is an AI-powered market intelligence engine built to help e-commerce sellers optimize product pricing in real-time. By analyzing live competitor data, consumer sentiment, and market trends, the platform replaces manual guesswork with automated, data-backed pricing strategies.

---

## 🌟 Core Features

* **Stealth Data Acquisition:** Uses advanced web automation with anti-detection measures (user-agent spoofing, human-like jitter scrolling) to safely extract real-time product listings from heavily protected retail platforms like AJIO.
* **AI-Driven Pricing Optimization:** Implements an **XGBoost Regressor** that performs multi-variate analysis on brand weightage, price distribution, and product features to pinpoint the ideal pricing "sweet spot" for maximum profitability.
* **Trend & Sentiment Intelligence:** Integrates Natural Language Processing (NLP) via **TextBlob** to analyze product metadata, scoring market sentiment and automatically isolating high-frequency keywords.
* **High-Availability Architecture:** Features a resilient backend hybrid logic. If live scraping is throttled or blocked, the system instantly switches to a simulated market archive, guaranteeing zero dashboard downtime.
* **Interactive Analytics UI:** A modern, responsive single-page dashboard built with React and Tailwind CSS, leveraging Recharts for dynamic price distribution curves and competitor leaderboards.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Recharts, Tailwind CSS, Lucide Icons
* **Backend Framework:** FastAPI (Python)
* **Data Automation:** Selenium (Undetected Chromedriver)
* **Machine Learning & NLP:** XGBoost, TextBlob

---

## ⚙️ Installation & Setup

### 1. Prerequisites
Make sure you have **Python 3.9+** and **Node.js** installed on your system.

### 2. Backend Setup (FastAPI)
Navigate to your backend directory and follow these steps:

### 3. Install required Python packages
pip install fastapi uvicorn undetected-chromedriver xgboost textblob

### 4. Start the FastAPI server
uvicorn main:app --reload

---

## 💡 How to Use

Follow these simple steps to run an analysis:

1. **Enter a Search Query:** Type a product category or specific item name (e.g., `Denim Jacket` or `Running Shoes`) into the dashboard search bar.
2. **Execute the Scan:** Click the **Scan** button. The engine will instantly initiate the stealth acquisition protocol.
3. **Analyze the Results:** The system will query live markets, process the fresh data through the XGBoost and NLP engines, and instantly render:
   * 🎯 **Optimal Selling Price:** The recommended sweet-spot price point.
   * 📈 **Price Distribution Curve:** An interactive visual graph mapping out competitor price clusters.
   * 🧠 **Market Sentiment & Trends:** Real-time consumer sentiment percentages and popular product keywords.
   * 🏆 **Competitor Leaderboard:** A breakdown of top ranking products in that category.
