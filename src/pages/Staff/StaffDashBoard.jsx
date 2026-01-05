import React, { useState } from 'react';
import { 
  ListTodo, CheckCircle2, Clock, MoreHorizontal, 
  ArrowUpRight, ArrowDownRight, Briefcase, 
  MessageSquare, FileText, Calendar, Bell, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- MOCK DATA ---
const STAFF_TASKS = [
  { id: 1, type: 'KYC Verification', subject: 'Alpha Graphics Ltd', priority: 'High', due: '2 hrs', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 2, type: 'Support Ticket', subject: 'Refund #9921 issue', priority: 'Medium', due: '4 hrs', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 3, type: 'Settlement Check', subject: 'Manual Payout Request', priority: 'Low', due: 'Tomorrow', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 4, type: 'KYC Verification', subject: 'TechSolutions Inc', priority: 'High', due: '5 hrs', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const RECENT_ACTIVITY = [
  { id: 1, text: "You approved merchant #MER_992", time: "10 mins ago" },
  { id: 2, text: "System generated daily report", time: "1 hour ago" },
  { id: 3, text: "Ticket #TKT_202 escalated", time: "2 hours ago" },
];

// --- COMPONENTS ---

const StatCard = ({ title, value, subtext, trend, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between"
  >
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{subtext}</span>
      </div>
    </div>
    <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
  </motion.div>
);

const StaffDashboard = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 space-y-8 font-sans">
      
      {/* 1. Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Good Morning, Sarah</h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <Calendar size={14} /> Tuesday, Oct 24, 2025
          </p>
        </div>
        <div className="flex gap-3">
           <button className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
             <Bell size={20} />
           </button>
           <button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
             + New Entry
           </button>
        </div>
      </div>

      {/* 2. Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Assigned Tasks" 
          value="14" 
          subtext="3 High Priority" 
          trend="up"
          icon={ListTodo} 
          color="bg-blue-600 text-blue-600" 
        />
        <StatCard 
          title="Completed Today" 
          value="8" 
          subtext="12% vs yesterday" 
          trend="up"
          icon={CheckCircle2} 
          color="bg-emerald-600 text-emerald-600" 
        />
        <StatCard 
          title="Avg Resolution" 
          value="2.4h" 
          subtext="Slower than usual" 
          trend="down"
          icon={Clock} 
          color="bg-amber-500 text-amber-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Main Task Queue (Left 2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-lg">Work Queue</h3>
            
            {/* Filter Tabs */}
            <div className="bg-white p-1 rounded-lg border border-slate-200 flex text-xs font-medium">
              {['All', 'High Priority', 'Due Soon'].map((f) => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    filter === f 
                      ? 'bg-slate-100 text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {STAFF_TASKS.map((task, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={task.id} 
                className="group p-4 flex items-center gap-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                {/* Icon Box */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${task.bg} ${task.color}`}>
                  <task.icon size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-slate-800 text-sm truncate">{task.subject}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                      task.priority === 'High' ? 'bg-rose-50 text-rose-600' : 
                      task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                     <span className="text-xs text-slate-500 font-medium">{task.type}</span>
                     <span className="text-slate-300">•</span>
                     <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> Due in {task.due}
                     </span>
                  </div>
                </div>

                {/* Action */}
                <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Activity Sidebar (Right 1/3) */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Recent Activity</h3>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-slate-100"></div>

            <div className="space-y-6">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="relative flex gap-4 items-start">
                  <div className="relative z-10 w-6 h-6 rounded-full bg-slate-50 border-2 border-white ring-1 ring-slate-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 font-medium leading-tight">{activity.text}</p>
                    <span className="text-xs text-slate-400 mt-1 block">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 text-xs font-semibold text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors border border-dashed border-slate-200">
              View Full History
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffDashboard;