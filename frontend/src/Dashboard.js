import React, { useState } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Download, TrendingUp, Activity, Award, Star, List, Flame, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/analyze?q=${query}`);
      setData(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter">PRICER <span className="text-purple-500">PRO</span></h1>
        <div className="flex bg-[#16161a] p-2 rounded-xl border border-white/10">
          <input 
            className="bg-transparent px-4 outline-none w-64"
            placeholder="Search Myntra..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleAnalyze} className="bg-purple-600 px-6 py-2 rounded-lg font-bold">
            {loading ? <Loader2 className="animate-spin" /> : "Analyze"}
          </button>
        </div>
      </div>

      {data && (
        <div className="grid grid-cols-12 gap-6">
          {/* Main Price & Growth Simulator (Option 3) */}
          <div className="col-span-4 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 p-6 rounded-2xl">
            <p className="text-gray-400 text-xs uppercase font-bold mb-2">Recommended Price</p>
            <h2 className="text-5xl font-black mb-4">₹{data.recommended_price}</h2>
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
              <p className="text-green-400 text-xs font-bold flex items-center gap-2">
                <TrendingUp size={14} /> QUALITY GROWTH POTENTIAL
              </p>
              <p className="text-sm text-gray-300 mt-1">If you reach 5.0★ rating, you can charge <span className="text-white font-bold">+₹{data.growth_potential}</span> more per unit.</p>
            </div>
            <button onClick={() => window.open("http://localhost:8000/api/download")} className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all font-bold">
              <Download size={16} /> DOWNLOAD PDF
            </button>
          </div>

          {/* Trend Keywords (Option 4) */}
          <div className="col-span-4 bg-[#16161a] border border-white/10 p-6 rounded-2xl">
            <p className="text-orange-400 text-xs uppercase font-bold mb-4 flex items-center gap-2">
              <Flame size={14} /> High-Value Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {data.keywords.map(word => (
                <span key={word} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:border-orange-500/50 transition-all cursor-default">
                  #{word}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-[10px] mt-6 italic">Include these in your product titles to increase visibility and perceived value.</p>
          </div>

          {/* Sentiment */}
          <div className="col-span-4 bg-[#16161a] border border-white/10 p-6 rounded-2xl">
            <p className="text-pink-400 text-xs uppercase font-bold mb-2 flex items-center gap-2">
              <Activity size={14} /> Market Sentiment
            </p>
            <h2 className="text-5xl font-black">{Math.round(data.sentiment_avg)}%</h2>
            <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-pink-500" style={{width: `${data.sentiment_avg}%`}}></div>
            </div>
          </div>

          {/* Competitor Ranking Table (Option 2) */}
          <div className="col-span-5 bg-[#16161a] border border-white/10 p-6 rounded-2xl">
            <p className="text-blue-400 text-xs uppercase font-bold mb-4 flex items-center gap-2">
              <List size={14} /> Competitor Leaderboard
            </p>
            <div className="space-y-4">
              {data.leaderboard.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-bold">{index + 1}</span>
                    <p className="text-sm font-medium">{item.brand}</p>
                  </div>
                  <p className="text-sm font-black text-white">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-7 bg-[#16161a] border border-white/10 p-6 rounded-2xl h-[350px]">
             <p className="text-gray-400 text-xs uppercase font-bold mb-4">Price Distribution Graph</p>
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data.chart_data}>
                 <XAxis dataKey="name" hide />
                 <Tooltip contentStyle={{backgroundColor: '#111', border: 'none', borderRadius: '8px'}} />
                 <Area type="monotone" dataKey="price" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={3} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;