import React, { useState } from 'react';
import { 
  Search, Download, ChevronDown, ExternalLink, 
  AlertCircle, XCircle, RotateCcw, HelpCircle,
  ChevronLeft, ChevronRight, Activity, Zap
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_DATA = [
  { 
    id: 'pay_M12345ABC', 
    rrn: '330128381921',
    date: '25 Oct 2023, 02:30 PM', 
    amount: '₹1,200.00', 
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    status: 'Captured',
    method: 'UPI'
  },
  { 
    id: 'pay_M12345ABD', 
    rrn: '-',
    date: '25 Oct 2023, 12:15 PM', 
    amount: '₹4,500.00', 
    email: 'alice@corp.com',
    phone: '+91 99887 76655',
    status: 'Failed',
    method: 'Card'
  },
  { 
    id: 'pay_M12345ABE', 
    rrn: 'ICIC12837192',
    date: '24 Oct 2023, 09:30 AM', 
    amount: '₹12,000.00', 
    email: 'agency@design.co',
    phone: '+91 88776 65544',
    status: 'Captured',
    method: 'Netbanking'
  },
  { 
    id: 'pay_M12345ABF', 
    rrn: '330128385555',
    date: '23 Oct 2023, 04:20 PM', 
    amount: '₹2,300.00', 
    email: 'user99@mail.com',
    phone: '+91 77665 54433',
    status: 'Refunded',
    method: 'UPI'
  },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }) => {
  const styles = {
    Captured: 'bg-green-100 text-green-700',
    Success: 'bg-green-100 text-green-700',
    Failed: 'bg-red-50 text-red-600',
    Refunded: 'bg-purple-50 text-purple-600',
    Created: 'bg-amber-50 text-amber-600'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-2 px-3 py-2 bg-[#F5F7F9] hover:bg-gray-200 text-slate-600 text-sm font-medium rounded border border-transparent transition-colors">
    {label}
    <ChevronDown size={14} className="text-slate-400" />
  </button>
);

const StatCard = ({ title, value, subtext, icon: Icon, colorClass, linkText }) => (
  <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow cursor-pointer group">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
        {Icon && <Icon size={16} className={colorClass} />}
        {title}
        <AlertCircle size={12} className="text-slate-300" />
      </div>
      {linkText && (
        <span className="text-blue-600 text-xs font-bold flex items-center gap-1 group-hover:underline">
          {linkText} <ChevronRight size={12} />
        </span>
      )}
      {!linkText && <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />}
    </div>
    <div>
      <div className="text-xl font-bold text-slate-800">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{subtext}</div>
    </div>
  </div>
);

// --- MAIN APP ---

const App = () => {
  const [activeTab, setActiveTab] = useState('payments');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* Top Header / Breadcrumb area */}
      <div className="px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">Overview</h1>
            <button className="flex items-center text-blue-600 text-sm font-medium hover:bg-blue-50 px-2 py-1 rounded">
              Today <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
          <a href="#" className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline">
            Documentation <ExternalLink size={14} />
          </a>
        </div>

        {/* --- STATS SECTION --- */}
        <div className="space-y-4 mb-8">
          
          {/* Main Collection Card */}
          <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4">
              Collected Amount <AlertCircle size={14} className="text-slate-300" />
            </div>
            <div className="text-[32px] font-bold text-slate-800 leading-none">
              ₹1,34,500.00
            </div>
            <div className="text-sm text-slate-400 mt-2">
              from 12 captured payments
            </div>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              title="Refunds" 
              value="₹2,300.00" 
              subtext="1 processed" 
              icon={RotateCcw}
              colorClass="text-blue-500"
            />
            <StatCard 
              title="Disputes" 
              value="₹0.00" 
              subtext="0 open • 0 under-review" 
              linkText="View All"
              icon={AlertCircle}
              colorClass="text-orange-500"
            />
            <StatCard 
              title="Failed" 
              value="1" 
              subtext="payments" 
              icon={XCircle}
              colorClass="text-red-500"
            />
          </div>
        </div>

        {/* --- TRANSACTIONS SECTION --- */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm">
          
          {/* Tabs */}
          {/* Tabs Container */}
<div className="flex w-full border-b border-gray-200">
  
  <button 
    onClick={() => setActiveTab('payments')}
    className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors text-center ${
      activeTab === 'payments' 
      ? 'border-blue-600 text-blue-600 bg-blue-50/10' 
      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-gray-50'
    }`}
  >
    Payments
  </button>

  <button 
    onClick={() => setActiveTab('orders')}
    className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors text-center ${
      activeTab === 'orders' 
      ? 'border-blue-600 text-blue-600 bg-blue-50/10' 
      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-gray-50'
    }`}
  >
    Orders
  </button>

</div>

          {/* Filters Bar */}
          <div className="p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            
            {/* Left Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <FilterDropdown label="Last 7 days" />
              <FilterDropdown label="Status: All" />
              <FilterDropdown label="Payment method: All" />
            </div>

            {/* Right Search */}
            <div className="flex w-full lg:w-auto">
              <div className="relative group flex w-full lg:w-96">
                <button className="flex items-center gap-2 px-3 bg-white border border-r-0 border-gray-300 rounded-l text-slate-500 text-sm hover:bg-gray-50">
                  Payment ID <ChevronDown size={14} />
                </button>
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Search..."
                    className="w-full h-9 pl-3 pr-10 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r flex items-center justify-center transition-colors">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F7F9] border-y border-gray-200 text-slate-500 text-xs uppercase">
                  <th className="px-6 py-3 font-bold w-48">Payment ID</th>
                  <th className="px-6 py-3 font-bold">Bank RRN</th>
                  <th className="px-6 py-3 font-bold">Customer detail</th>
                  <th className="px-6 py-3 font-bold">Created on</th>
                  <th className="px-6 py-3 font-bold text-right">Amount</th>
                  <th className="px-6 py-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {INITIAL_DATA.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 group cursor-pointer transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-blue-600 font-medium text-sm group-hover:text-blue-700">{row.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                      {row.rrn}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-700">{row.email}</div>
                      <div className="text-xs text-slate-400">{row.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {row.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800 text-right">
                      {row.amount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (Visual Only) */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
            <button className="p-1 border border-gray-300 rounded hover:bg-gray-50 text-slate-500 disabled:opacity-50">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 border border-gray-300 rounded hover:bg-gray-50 text-slate-500">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#0D2F54] hover:bg-[#0a2544] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium transition-transform hover:scale-105 z-50">
        <HelpCircle size={18} />
        Help & Support
      </button>

    </div>
  );
};

export default App;