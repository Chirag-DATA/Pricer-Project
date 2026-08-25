import React, { useState } from 'react';
import { 
  TrendingUp, Search, ShieldCheck, RefreshCw, AlertCircle, 
  Activity, Zap, Sparkles, BarChart3, Download, ChevronRight, 
  Cpu, CheckCircle2, ArrowRight, Layers, Database, Sliders, 
  ShoppingBag, Target, PieChart, LineChart, Globe, HelpCircle, Tag
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Analyzer Form State
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Advanced Simulator State
  const [marginTarget, setMarginTarget] = useState(25);
  const [shippingCost, setShippingCost] = useState(120);
  const [adSpend, setAdSpend] = useState(80);

  // Connected to FastAPI Backend Endpoint: /api/analyze
  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/analyze?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setData(result);
    } catch (err) {
      setError(err.message || "Failed to connect to FastAPI backend engine.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (sampleQuery) => {
    setQuery(sampleQuery);
    setCurrentPage('analyzer');
  };

  const handleDownloadPDF = () => {
    window.open('http://127.0.0.1:8000/api/download', '_blank');
  };

  const calculatedOptimal = data ? data.recommended_price : 0;
  const totalOverhead = Number(shippingCost) + Number(adSpend);
  const calculatedProfit = Math.round(calculatedOptimal * (marginTarget / 100));
  const simulatedFinalPrice = Math.round(calculatedOptimal + calculatedProfit + totalOverhead);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-violet-800 py-1.5 px-4 text-center text-[11px] font-medium text-indigo-100 border-b border-indigo-500/30 flex items-center justify-center space-x-2">
        <Sparkles size={13} className="text-amber-300 animate-pulse" />
        <span>v2.4 Stealth Engine Active — Open Access Price & Sentiment Analytics</span>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Pricer<span className="text-indigo-400">.Pro</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">E-Com Intelligence</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-400">
            <button onClick={() => setCurrentPage('landing')} className={`hover:text-white transition-all ${currentPage === 'landing' ? 'text-indigo-400' : ''}`}>Overview</button>
            <button onClick={() => setCurrentPage('analyzer')} className={`hover:text-white transition-all ${currentPage === 'analyzer' ? 'text-indigo-400' : ''}`}>Live Scanner</button>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCurrentPage('analyzer')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
            >
              <Zap size={14} />
              <span>Try Analyzer Now</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Detailed Home Page */}
      {currentPage === 'landing' && (
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-28">
          
          {/* Hero Section */}
          <section className="text-center pt-12 pb-6 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-medium">
              <Cpu size={14} />
              <span>No Registration Required • Free Instant Web Scraping</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
              Algorithmic E-Commerce <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
                Pricing Intelligence
              </span>
            </h1>
            
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Extract real-time market data across e-commerce platforms, evaluate customer sentiment, and calculate optimal price points with XGBoost machine learning.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button 
                onClick={() => setCurrentPage('analyzer')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl text-sm font-bold flex items-center justify-center space-x-2 shadow-xl shadow-indigo-600/30 transition-all active:scale-95"
              >
                <Zap size={18} />
                <span>Launch Live Analyzer</span>
              </button>
            </div>

            {/* Quick Demo Search Pills */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-medium text-slate-500 mr-2">Quick Test Queries:</span>
              {['Denim Jacket', 'Oversized T-Shirt', 'Running Shoes', 'Leather Wallet'].map((sample, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickDemo(sample)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1"
                >
                  <span>{sample}</span>
                  <ArrowRight size={12} className="text-indigo-400" />
                </button>
              ))}
            </div>
          </section>

          {/* Interactive Preview Mockup Card */}
          <section className="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Live Engine Capability</span>
                <h2 className="text-2xl font-bold text-white">Full-Stack Intelligence Pipeline</h2>
              </div>
              <button
                onClick={() => setCurrentPage('analyzer')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-all"
              >
                <span>Open Interface</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60 space-y-2">
                <div className="text-indigo-400 font-mono text-xs">01. Web Scraping</div>
                <h4 className="text-sm font-bold text-white">Stealth Crawling</h4>
                <p className="text-xs text-slate-400">Parses active market titles, prices, ratings, and listing attributes on demand.</p>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60 space-y-2">
                <div className="text-indigo-400 font-mono text-xs">02. Sentiment NLP</div>
                <h4 className="text-sm font-bold text-white">Polarity Scores</h4>
                <p className="text-xs text-slate-400">TextBlob algorithms compute buyer reception from scraped title metadata.</p>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60 space-y-2">
                <div className="text-indigo-400 font-mono text-xs">03. Machine Learning</div>
                <h4 className="text-sm font-bold text-white">XGBoost Target</h4>
                <p className="text-xs text-slate-400">Trains regression trees on real-time competitor structures to find price equilibrium.</p>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60 space-y-2">
                <div className="text-indigo-400 font-mono text-xs">04. ReportLab PDF</div>
                <h4 className="text-sm font-bold text-white">Instant Export</h4>
                <p className="text-xs text-slate-400">Generates downloadable executive PDF reports directly from memory buffers.</p>
              </div>
            </div>
          </section>

          {/* Deep-Dive Feature Showcase */}
          <section className="space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <h2 className="text-3xl font-extrabold text-white">Engineered For Sellers & Analysts</h2>
              <p className="text-xs text-slate-400">Everything needed to evaluate market viability in one unified dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl space-y-4 hover:border-slate-700 transition-all">
                <div className="bg-indigo-600/10 text-indigo-400 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">Competitor Benchmarking</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Extract top competitor pricing structures and view item distributions visually through responsive Recharts.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 pt-2 font-mono">
                  <li className="flex items-center space-x-2"><CheckCircle2 size={12} className="text-indigo-400" /><span>Distribution Charts</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 size={12} className="text-indigo-400" /><span>Leaderboard Tables</span></li>
                </ul>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl space-y-4 hover:border-slate-700 transition-all">
                <div className="bg-indigo-600/10 text-indigo-400 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <Sliders size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">Profit & Margin Simulator</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactively adjust profit margins, shipping overhead, and acquisition spend to compute final listing targets.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 pt-2 font-mono">
                  <li className="flex items-center space-x-2"><CheckCircle2 size={12} className="text-indigo-400" /><span>Dynamic Margin Sliders</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 size={12} className="text-indigo-400" /><span>Overhead Calculations</span></li>
                </ul>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl space-y-4 hover:border-slate-700 transition-all">
                <div className="bg-indigo-600/10 text-indigo-400 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <Tag size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">Keyword Extraction</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Uses Regex and frequency counter algorithms to extract trending fashion terms from competitor listings.
                </p>
                <ul className="text-xs text-slate-500 space-y-1.5 pt-2 font-mono">
                  <li className="flex items-center space-x-2"><CheckCircle2 size={12} className="text-indigo-400" /><span>Title Keyword Frequency</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 size={12} className="text-indigo-400" /><span>Automated Stop-word Filtering</span></li>
                </ul>
              </div>

            </div>
          </section>

          {/* Call to Action Bar */}
          <section className="bg-gradient-to-r from-indigo-900/60 to-violet-900/60 border border-indigo-500/30 p-10 rounded-3xl text-center space-y-6">
            <h2 className="text-3xl font-extrabold text-white">Ready To Analyze Live Products?</h2>
            <p className="text-xs text-indigo-200 max-w-lg mx-auto">
              No setup required. Launch the scanner, input any search term, and review machine learning price optimizations.
            </p>
            <button
              onClick={() => setCurrentPage('analyzer')}
              className="bg-white text-indigo-950 hover:bg-slate-100 px-8 py-3.5 rounded-2xl text-xs font-black shadow-xl transition-all active:scale-95"
            >
              Open Live Scanner Interface
            </button>
          </section>

        </main>
      )}

      {/* Main Market Analyzer Workspace */}
      {currentPage === 'analyzer' && (
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
          
          {/* Top Search Interface */}
          <section className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl space-y-6 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Active Workspace</span>
                <span className="text-[10px] text-slate-500 font-mono">Backend: FastAPI @ 127.0.0.1:8000</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">Market Keyword Scanner</h2>
              <p className="text-xs text-slate-400">Trigger backend real-time web scrapers and run ML XGBoost models dynamically.</p>
            </div>

            <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Input search query (e.g. denim jacket, running shoes, oversized tshirt)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-11 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-indigo-600/20"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Scraping Market...</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>Run Analysis</span>
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="flex items-center space-x-2 text-amber-400 text-xs bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </section>

          {/* Skeleton Loading State */}
          {loading && (
            <div className="space-y-6 animate-pulse">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-28 bg-slate-900/50 border border-slate-800 rounded-2xl" />
                ))}
              </div>
              <div className="h-80 bg-slate-900/50 border border-slate-800 rounded-3xl" />
            </div>
          )}

          {/* Render Dashboard Results */}
          {data && !loading && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/30 p-4 border border-slate-800/80 rounded-2xl">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>Market Intelligence: <span className="text-indigo-400 uppercase font-mono">"{query}"</span></span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Processed live listings and extracted fashion key-phrases.</p>
                </div>
                
                <button
                  onClick={handleDownloadPDF}
                  className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all active:scale-95"
                >
                  <Download size={14} />
                  <span>Download PDF Report</span>
                </button>
              </div>

              {/* Top 4 KPI Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl space-y-2 relative overflow-hidden">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Target Price</span>
                  <div className="text-3xl font-black text-white">₹{data.recommended_price}</div>
                  <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-medium">
                    <CheckCircle2 size={12} />
                    <span>XGBoost Machine Learning Sweet-Spot</span>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Buyer Sentiment</span>
                  <div className="text-3xl font-black text-white">{(data.sentiment_avg * 100).toFixed(0)}%</div>
                  <span className="text-[10px] text-slate-400">TextBlob Title & Review Polarity</span>
                </div>

                <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Scraped Items</span>
                  <div className="text-3xl font-black text-white">{data.scraped_count}</div>
                  <span className="text-[10px] text-slate-400">Active Listings Extracted</span>
                </div>

                <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Simulated Upside</span>
                  <div className="text-3xl font-black text-indigo-400">+₹{data.growth_potential}</div>
                  <span className="text-[10px] text-slate-400">Potential Revenue at 5.0 Star Rating</span>
                </div>
              </div>

              {/* Extracted Keyword Pills */}
              {data.keywords && data.keywords.length > 0 && (
                <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                    <Tag size={14} className="text-indigo-400" />
                    <span>Top Occurring Fashion Keywords:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {data.keywords.map((kw, i) => (
                      <span key={i} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono px-3 py-1 rounded-xl flex items-center space-x-1">
                        <span>#{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Chart & Interactive Profit Calculator */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Competitor Chart */}
                <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-white">Competitor Price Distribution</h3>
                      <p className="text-[11px] text-slate-400">Extracted listing prices across competitors</p>
                    </div>
                  </div>
                  <div className="h-72 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.chart_data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                        <Bar dataKey="price" fill="#6366f1" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Profit Simulator */}
                <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white">Advanced Profit Simulator</h3>
                    <p className="text-[11px] text-slate-400 mt-1">Adjust variables to project retail listing margins.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                        <span>Target Profit Margin</span>
                        <span className="text-indigo-400 font-bold">{marginTarget}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="60"
                        value={marginTarget}
                        onChange={(e) => setMarginTarget(e.target.value)}
                        className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                        <span>Logistics & Shipping (₹)</span>
                        <span className="text-indigo-400 font-bold">₹{shippingCost}</span>
                      </div>
                      <input
                        type="number"
                        value={shippingCost}
                        onChange={(e) => setShippingCost(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                        <span>Ad Spend / Acquisition (₹)</span>
                        <span className="text-indigo-400 font-bold">₹{adSpend}</span>
                      </div>
                      <input
                        type="number"
                        value={adSpend}
                        onChange={(e) => setAdSpend(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Base AI Target:</span>
                      <span>₹{calculatedOptimal}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Net Profit:</span>
                      <span className="text-emerald-400 font-bold">+₹{calculatedProfit}</span>
                    </div>
                    <div className="border-t border-indigo-500/20 pt-2 flex justify-between items-baseline">
                      <span className="text-xs font-bold text-white">Suggested Retail:</span>
                      <span className="text-2xl font-black text-indigo-300">₹{simulatedFinalPrice}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Leaderboard Table */}
              {data.leaderboard && data.leaderboard.length > 0 && (
                <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl space-y-4">
                  <h3 className="text-sm font-bold text-white">Top Competitor Listings Scraped</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="pb-3">Product Title / Brand</th>
                          <th className="pb-3">Listing Price</th>
                          <th className="pb-3">Sentiment Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {data.leaderboard.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition-all">
                            <td className="py-3.5 font-medium text-white">{item.title || item.brand}</td>
                            <td className="py-3.5 font-mono text-indigo-400 font-bold">₹{item.price}</td>
                            <td className="py-3.5">
                              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono text-[10px]">
                                {item.sentiment_score ? (item.sentiment_score * 100).toFixed(0) + '%' : 'N/A'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Pricer.Pro • Powered by FastAPI, React, ReportLab PDF & XGBoost ML</p>
      </footer>

    </div>
  );
}