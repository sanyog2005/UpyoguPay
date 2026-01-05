import React, { useState } from 'react';
import { 
  Users, TrendingUp, AlertCircle, Zap,
  Search, Download, Plus,
  Activity, Calendar, BarChart3, FileText, RefreshCw, ChevronRight, CheckCircle, XCircle, MoreVertical, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const MOCK_MERCHANTS = [
  { id: "MER-1001", name: "Nexus Tech Solutions", email: "admin@nexustech.com", status: "Active", volume: "₹4.5L", date: "Oct 12" },
  { id: "MER-1002", name: "GreenLeaf Organics", email: "supply@greenleaf.io", status: "Pending", volume: "-", date: "Oct 14" },
  { id: "MER-1003", name: "Urban Threads Co.", email: "accounts@urbanthreads.com", status: "Active", volume: "₹12.2L", date: "Oct 15" },
  { id: "MER-1004", name: "Pixel Perfect Design", email: "hello@pixelperfect.net", status: "Rejected", volume: "-", date: "Oct 18" },
  { id: "MER-1005", name: "Rapid Logistics", email: "ops@rapidlogistics.in", status: "Active", volume: "₹8.1L", date: "Oct 20" },
  { id: "MER-1006", name: "Cafe De Paris", email: "manager@cafeparis.com", status: "Pending", volume: "-", date: "Oct 22" },
  { id: "MER-1007", name: "BlueSky Travels", email: "bookings@bluesky.com", status: "Active", volume: "₹2.4L", date: "Oct 25" },
  { id: "MER-1008", name: "Quantum Finances", email: "fin@quantum.io", status: "Failed", volume: "₹1.1L", date: "Oct 26" },
];

const CHART_DATA = [
  { label: 'Jan', val: 45 }, { label: 'Feb', val: 52 }, { label: 'Mar', val: 38 },
  { label: 'Apr', val: 65 }, { label: 'May', val: 48 }, { label: 'Jun', val: 72 },
  { label: 'Jul', val: 60 }, { label: 'Aug', val: 85 }, { label: 'Sep', val: 75 },
  { label: 'Oct', val: 92 }, { label: 'Nov', val: 68 }, { label: 'Dec', val: 78 }
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter Logic
  const filteredMerchants = MOCK_MERCHANTS.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' ? true : 
                       activeTab === 'pending' ? m.status === 'Pending' : 
                       m.status === 'Active';
    return matchesSearch && matchesTab;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      // CHANGED: Removed 'p-1' and ensured full width
      className="w-full min-h-screen bg-slate-50/50 font-sans text-slate-900"
    >
      {/* CHANGED: Removed 'max-w-7xl' and 'mx-auto' to fix the gap */}
      <div className="w-full space-y-6 md:space-y-8">
        
        {/* 1. Page Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-500 font-medium text-sm md:text-base mt-1">Real-time platform insights and management.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleRefresh}
              className={`p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95 ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium shadow-sm text-sm">
              <Calendar size={18} className="text-slate-400" />
              <span>Oct 24 - Nov 24</span>
            </div>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 transition-all active:scale-95 text-sm shadow-md">
              <Download size={18} />
              <span>Export Report</span>
            </button>
          </div>
        </motion.div>

        {/* 2. Stats Grid - Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
           <StatCard title="Total Merchants" value="482" sub="+12% this month" icon={Users} color="indigo" delay={0} />
           <StatCard title="Total Transaction" value="₹1.2Cr" sub="+8.4% vs last mo" icon={TrendingUp} color="emerald" delay={0.1} />
           <StatCard title="Payouts" value="12" sub="Requires attention" icon={AlertCircle} color="amber" delay={0.2} />
           <StatCard title="Refunds" value="1.2M" sub="99.9% Success" icon={Zap} color="blue" delay={0.3} />
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Chart Section */}
          <motion.div variants={itemVariants} className="xl:col-span-2 bg-white p-5 md:p-8 rounded-[0.5rem] shadow-sm border border-slate-100 relative overflow-hidden flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 z-10 relative">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">Transaction Volume</h3>
                <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">Daily processing overview (Last 12 Months)</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                <BarChart3 size={16} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">Yearly View</span>
              </div>
            </div>

            {/* Responsive Chart Container */}
            <div className="h-56 md:h-72 flex items-end gap-2 md:gap-4 relative z-10 w-full">
              {/* Background Lines */}
              <div className="absolute inset-0 flex flex-col justify-between -z-10 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-px bg-slate-100 dashed" />
                ))}
              </div>

              {CHART_DATA.map((item, index) => (
                <div key={index} className="flex-1 h-full flex flex-col justify-end group cursor-pointer">
                  <div className="relative w-full flex items-end h-full justify-center">
                     <motion.div 
                       initial={{ height: 0 }}
                       animate={{ height: `${item.val}%` }}
                       transition={{ duration: 1.2, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }} // smooth ease
                       className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-sm md:rounded-t-xl relative group-hover:from-blue-500 group-hover:to-indigo-300 transition-all duration-300"
                     >
                       {/* Floating Tooltip */}
                       <div className="opacity-0 group-hover:opacity-100 absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] md:text-xs font-bold py-1 px-2 md:px-3 rounded-lg shadow-xl transition-all duration-200 whitespace-nowrap z-20 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                         {item.val}%
                         <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                       </div>
                     </motion.div>
                  </div>
                  {/* Labels */}
                  <div className="text-center mt-3 h-4">
                    <span className="text-[10px] md:text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors block truncate">
                      <span className="md:hidden">{index % 2 === 0 ? item.label : ''}</span>
                      <span className="hidden md:inline">{item.label}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions & Feed */}
          <motion.div variants={itemVariants} className="space-y-6 flex flex-col h-full">
             {/* Actions Panel */}
             <div className="bg-white p-5 md:p-6 rounded-[0.5rem] shadow-sm border border-slate-100 flex-1">
               <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                 <ActionButton title="Add Merchant" icon={Plus} color="blue" />
                 <ActionButton title="Review KYC" icon={FileText} color="amber" />
                 <ActionButton title="System Health" icon={Activity} color="emerald" />
               </div>
             </div>

             {/* Live Feed */}
             <div className="bg-slate-900 p-5 md:p-6 rounded-[0.5rem] shadow-xl shadow-slate-900/10 relative overflow-hidden text-white min-h-[200px]">
               {/* Decorative background blur */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               
               <div className="flex items-center gap-3 mb-6 relative z-10">
                 <span className="relative flex h-2.5 w-2.5">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                 </span>
                 <h3 className="text-lg font-bold tracking-wide">System Live</h3>
               </div>
               
               <div className="space-y-5 relative z-10">
                 <LogItem msg="Payment Gateway v2.4 deployed" time="10m ago" />
                 <LogItem msg="New API Key generated" time="32m ago" />
                 <LogItem msg="Backup completed" time="1h ago" />
               </div>
             </div>
          </motion.div>
        </div>

        {/* 4. Table Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-[0.5rem] shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 justify-between md:justify-start w-full md:w-auto">
              <h3 className="text-lg md:text-xl font-bold text-slate-800">Merchants</h3>
              <div className="flex bg-slate-50 p-1 rounded-xl overflow-x-auto no-scrollbar border border-slate-100">
                {['all', 'active', 'pending'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 md:px-4 py-1.5 text-xs font-bold rounded-lg capitalize transition-all whitespace-nowrap ${
                      activeTab === tab 
                      ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative w-full md:w-72 group">
              <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search merchants..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" 
              />
            </div>
          </div>

          {/* Scrollable Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider font-bold bg-slate-50/30">
                  <th className="px-6 py-4">Merchant Name</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Volume</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                {filteredMerchants.length > 0 ? (
                  filteredMerchants.map((m, i) => (
                    <motion.tr 
                      key={m.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-blue-50/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
                            {m.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{m.name}</p>
                            <p className="text-xs text-slate-400 font-medium">#{String(m.id).substring(4)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600 font-medium">{m.email}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{m.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-slate-700 bg-slate-100 w-fit px-2 py-1 rounded-lg">{m.volume}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${
                          m.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 
                          m.status === 'Pending' ? 'bg-amber-50 text-amber-700 ring-amber-600/20' : 
                          'bg-rose-50 text-rose-700 ring-rose-600/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                             m.status === 'Active' ? 'bg-emerald-500' : 
                             m.status === 'Pending' ? 'bg-amber-500' : 
                             'bg-rose-500'
                          }`}></span>
                          {m.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end items-center gap-2">
                          <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><CheckCircle size={18} /></button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><XCircle size={18} /></button>
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><MoreVertical size={18} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                          <Search size={24} className="text-slate-300" />
                        </div>
                        <p className="font-medium">No merchants found.</p>
                      </div>
                    </td>
                  </tr>
                )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Helper Components ---

const StatCard = ({ title, value, sub, icon: Icon, color, delay }) => {
  const styles = {
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    blue: "text-blue-600 bg-blue-50 border-blue-100",
  }[color];

  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}
      transition={{ delay }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)" }}
      className="bg-white p-5 md:p-6 rounded-[0.5rem] shadow-sm border border-slate-100 relative overflow-hidden group cursor-default transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-2xl ${styles} ring-1 ring-inset ring-black/5`}>
          <Icon size={22} />
        </div>
        {sub.includes('+') && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full ring-1 ring-emerald-600/10">
            <TrendingUp size={12} /> {sub.split(' ')[0]}
          </div>
        )}
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-1">{value}</h3>
        <p className="text-xs md:text-sm text-slate-500 font-medium">{title}</p>
      </div>
      
      {/* Decorative Blob */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl ${styles.split(' ')[1]}`} />
    </motion.div>
  );
};

const ActionButton = ({ title, icon: Icon, color }) => {
    const theme = {
        blue: "hover:bg-blue-50 hover:border-blue-200 text-blue-600 group-hover:text-blue-700",
        amber: "hover:bg-amber-50 hover:border-amber-200 text-amber-600 group-hover:text-amber-700",
        emerald: "hover:bg-emerald-50 hover:border-emerald-200 text-emerald-600 group-hover:text-emerald-700"
    }[color];
    
    return (
        <button className={`w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group transition-all duration-300 ${theme}`}>
            <div className="flex items-center gap-3">
              <div className={`bg-white p-2 rounded-xl shadow-sm ${theme.split(' ')[2]} ring-1 ring-black/5`}>
                <Icon size={18} />
              </div>
              <span className={`font-semibold text-slate-700 text-sm md:text-base ${theme.split(' ')[3]}`}>{title}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 shadow-sm">
               <ChevronRight size={16} className="text-slate-400" />
            </div>
        </button>
    )
}

const LogItem = ({ msg, time }) => (
    <div className="flex gap-3 items-start group">
        <div className="relative mt-1.5">
           <div className="w-2 h-2 bg-indigo-400 rounded-full group-hover:bg-emerald-400 transition-colors" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-400/20 rounded-full group-hover:bg-emerald-400/20 transition-colors scale-0 group-hover:scale-100" />
        </div>
        <div>
            <p className="text-sm text-indigo-100 leading-snug group-hover:text-white transition-colors">{msg}</p>
            <span className="text-[10px] text-indigo-400 font-medium">{time}</span>
        </div>
    </div>
)

export default AdminDashboard;