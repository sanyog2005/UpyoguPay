import React, { useState } from 'react';
import { 
  Download, Calendar, Filter, TrendingUp, DollarSign, 
  CreditCard, UserCheck, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, Search, ChevronDown, CheckCircle2, XCircle, Clock, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const REPORT_DATA = {
  transactions: [
    { id: 'TXN_8821', merchant: 'TechRetail Pvt Ltd', amount: '12,400', fee: '248', net: '12,152', method: 'UPI', status: 'Success', date: 'Oct 25, 10:30 AM' },
    { id: 'TXN_8822', merchant: 'Fresh Foods', amount: '4,500', fee: '90', net: '4,410', method: 'Credit Card', status: 'Pending', date: 'Oct 25, 09:15 AM' },
    { id: 'TXN_8823', merchant: 'Urban Textiles', amount: '22,000', fee: '440', net: '21,560', method: 'Net Banking', status: 'Success', date: 'Oct 24, 04:20 PM' },
    { id: 'TXN_8824', merchant: 'TechRetail Pvt Ltd', amount: '1,200', fee: '0', net: '1,200', method: 'UPI', status: 'Failed', date: 'Oct 24, 02:10 PM' },
    { id: 'TXN_8825', merchant: 'Alpha Graphics', amount: '8,900', fee: '178', net: '8,722', method: 'Wallet', status: 'Refunded', date: 'Oct 23, 11:00 AM' },
  ],
  settlements: [
    { id: 'SET_101', merchant: 'TechRetail Pvt Ltd', amount: '1,45,000', utr: 'SBIN00018271', status: 'Success', date: '2023-10-24' },
    { id: 'SET_102', merchant: 'Urban Textiles', amount: '82,400', utr: 'HDFC00029182', status: 'Success', date: '2023-10-24' },
    { id: 'SET_103', merchant: 'Fresh Foods', amount: '12,100', utr: '-', status: 'Pending', date: '2023-10-25' },
  ],
  staff: [
    { id: 'LOG_901', staff: 'Sarah J.', action: 'Approved Merchant #102', role: 'Admin', date: 'Today, 10:30 AM' },
    { id: 'LOG_902', staff: 'Mike R.', action: 'Processed Refund #TXN_8825', role: 'Finance', date: 'Today, 11:15 AM' },
    { id: 'LOG_903', staff: 'Sarah J.', action: 'Generated Monthly Report', role: 'Admin', date: 'Today, 09:00 AM' },
  ]
};

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    Success: 'bg-emerald-50 text-emerald-700 border-emerald-200 icon-emerald-600',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200 icon-amber-600',
    Failed: 'bg-rose-50 text-rose-700 border-rose-200 icon-rose-600',
    Refunded: 'bg-slate-100 text-slate-600 border-slate-200 icon-slate-500',
  };

  const icons = {
    Success: <CheckCircle2 size={12} />,
    Pending: <Clock size={12} />,
    Failed: <XCircle size={12} />,
    Refunded: <AlertCircle size={12} />,
  };

  const currentStyle = styles[status] || styles.Refunded;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${currentStyle}`}>
      {icons[status]}
      {status}
    </span>
  );
};

const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-slate-50 rounded-lg text-slate-600">
        <Icon size={20} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      <p className="text-xs text-slate-400 mt-1">{subtext}</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const StaffReports = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [dateRange, setDateRange] = useState('This Week');

  const tabs = [
    { id: 'transactions', label: 'Transactions' },
    { id: 'settlements', label: 'Settlements' },
    { id: 'staff', label: 'Staff Logs' }
  ];

  return (
    <div className="space-y-6 font-sans text-slate-800 bg-slate-50/50 min-h-screen p-4 md:p-6">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Track payments, settlements and team activity.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Custom Date Picker Look */}
          <div className="relative group flex-1 lg:flex-none">
            <Calendar className="absolute left-3 top-2.5 text-slate-400 group-hover:text-indigo-600 transition-colors" size={16} />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full lg:w-48 pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer hover:border-slate-300"
            >
              <option>Today</option>
              <option>Yesterday</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={14} />
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow active:scale-95">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Stats Section (Contextual) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'transactions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard title="Total Volume" value="₹48,900" subtext="In selected range" icon={TrendingUp} trend={12.5} />
              <StatCard title="Net Revenue" value="₹956" subtext="Platform Fees" icon={DollarSign} trend={8.2} />
              <StatCard title="Success Rate" value="94.2%" subtext="Transaction health" icon={UserCheck} trend={-1.2} />
              <StatCard title="Avg Ticket" value="₹2,400" subtext="Per transaction" icon={CreditCard} trend={0} />
            </div>
          )}
          
          {activeTab === 'settlements' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <p className="text-indigo-100 text-sm font-medium mb-1">Processed Today</p>
                <h3 className="text-3xl font-bold">₹2,27,400</h3>
                <div className="mt-4 flex items-center gap-2 text-xs bg-white/20 w-fit px-2 py-1 rounded-lg backdrop-blur-sm">
                   <CheckCircle2 size={14} /> All batches cleared
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-sm font-medium mb-1">Pending Amount</p>
                <h3 className="text-3xl font-bold text-slate-800">₹12,100</h3>
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 w-fit px-2 py-1 rounded-lg">
                   <Clock size={14} /> 3 merchants waiting
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 4. Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search ID, Merchant..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <tr>
                {activeTab === 'transactions' && (
                  <>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Merchant</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Fee</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </>
                )}
                {activeTab === 'settlements' && (
                  <>
                    <th className="px-6 py-4">Settlement ID</th>
                    <th className="px-6 py-4">Merchant</th>
                    <th className="px-6 py-4">Total Amount</th>
                    <th className="px-6 py-4">UTR Reference</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Processed Date</th>
                  </>
                )}
                 {activeTab === 'staff' && (
                  <>
                    <th className="px-6 py-4">Log ID</th>
                    <th className="px-6 py-4">Staff Member</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4 text-right">Timestamp</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {activeTab === 'transactions' && REPORT_DATA.transactions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 group-hover:text-indigo-600 transition-colors">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{item.merchant}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">₹{item.amount}</td>
                  <td className="px-6 py-4 text-slate-500">₹{item.fee}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{item.method}</span>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                  <td className="px-6 py-4 text-right text-slate-500">{item.date}</td>
                </tr>
              ))}
              
              {activeTab === 'settlements' && REPORT_DATA.settlements.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                   <td className="px-6 py-4 font-mono text-xs text-slate-500 group-hover:text-indigo-600">{item.id}</td>
                   <td className="px-6 py-4 font-medium text-slate-900">{item.merchant}</td>
                   <td className="px-6 py-4 font-bold text-slate-900">₹{item.amount}</td>
                   <td className="px-6 py-4 font-mono text-xs text-slate-500">{item.utr}</td>
                   <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                   <td className="px-6 py-4 text-right text-slate-500">{item.date}</td>
                </tr>
              ))}

              {activeTab === 'staff' && REPORT_DATA.staff.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                   <td className="px-6 py-4 font-mono text-xs text-slate-500 group-hover:text-indigo-600">{item.id}</td>
                   <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                        {item.staff.charAt(0)}
                      </div>
                      {item.staff}
                   </td>
                   <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                        {item.role}
                      </span>
                   </td>
                   <td className="px-6 py-4 text-slate-600">{item.action}</td>
                   <td className="px-6 py-4 text-right text-slate-500">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
           <span>Showing 1-5 of 124 results</span>
           <div className="flex gap-2">
             <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors" disabled>Previous</button>
             <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StaffReports;