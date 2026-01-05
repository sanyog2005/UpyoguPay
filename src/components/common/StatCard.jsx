import React from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  
  // Color mapping for dynamic styles
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    purple: "bg-purple-50 text-purple-600 ring-purple-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    orange: "bg-orange-50 text-orange-600 ring-orange-100",
  };

  const selectedColor = colorStyles[color] || colorStyles.blue;
  const isPositive = trend?.direction === 'up';

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group"
    >
      {/* Top Row: Icon and Options */}
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ring-1 ${selectedColor} transition-colors`}>
          <Icon className="w-6 h-6" />
        </div>
        
        {/* Optional: Menu dot for actions */}
        <button className="text-slate-300 hover:text-slate-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Middle Row: Value and Title */}
      <div className="mb-4">
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{value}</h3>
        <p className="text-slate-500 font-medium text-sm">{title}</p>
      </div>

      {/* Bottom Row: Trend Indicator */}
      {trend && (
        <div className="flex items-center gap-2">
          <div className={`
            flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold
            ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}
          `}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend.value}
          </div>
          <span className="text-xs text-slate-400">vs last month</span>
        </div>
      )}

      {/* Decorative Gradient Blob on Hover */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl ${selectedColor.split(' ')[0].replace('bg-', 'bg-')}`} />
    </motion.div>
  );
};

export default StatCard;