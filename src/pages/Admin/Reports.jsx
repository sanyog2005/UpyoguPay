import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  UserCheck, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Button from '../../components/common/Button';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';

// --- MOCK DATA FOR REPORTS ---

const REPORT_DATA = {
  transactions: [
    { id: 'TXN_8821', merchant: 'TechRetail Pvt Ltd', amount: '₹12,400', fee: '₹248', net: '₹12,152', method: 'UPI', status: 'Success', date: '2023-10-25' },
    { id: 'TXN_8822', merchant: 'Fresh Foods', amount: '₹4,500', fee: '₹90', net: '₹4,410', method: 'Credit Card', status: 'Pending', date: '2023-10-25' },
    { id: 'TXN_8823', merchant: 'Urban Textiles', amount: '₹22,000', fee: '₹440', net: '₹21,560', method: 'Net Banking', status: 'Success', date: '2023-10-24' },
    { id: 'TXN_8824', merchant: 'TechRetail Pvt Ltd', amount: '₹1,200', fee: '₹0', net: '₹1,200', method: 'UPI', status: 'Failed', date: '2023-10-24' },
    { id: 'TXN_8825', merchant: 'Alpha Graphics', amount: '₹8,900', fee: '₹178', net: '₹8,722', method: 'Wallet', status: 'Refunded', date: '2023-10-23' },
  ],
  settlements: [
    { id: 'SET_101', merchant: 'TechRetail Pvt Ltd', amount: '₹1,45,000', utr: 'SBIN00018271', status: 'Success', date: '2023-10-24' },
    { id: 'SET_102', merchant: 'Urban Textiles', amount: '₹82,400', utr: 'HDFC00029182', status: 'Success', date: '2023-10-24' },
    { id: 'SET_103', merchant: 'Fresh Foods', amount: '₹12,100', utr: '-', status: 'Pending', date: '2023-10-25' },
  ],
  staff: [
    { id: 'LOG_901', staff: 'Sarah J.', action: 'Approved Merchant #102', role: 'Admin', date: '2023-10-25 10:30 AM' },
    { id: 'LOG_902', staff: 'Mike R.', action: 'Processed Refund #TXN_8825', role: 'Finance', date: '2023-10-25 11:15 AM' },
    { id: 'LOG_903', staff: 'Sarah J.', action: 'Generated Monthly Report', role: 'Admin', date: '2023-10-25 09:00 AM' },
  ]
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState('transactions'); // transactions | settlements | staff
  const [dateRange, setDateRange] = useState('This Week');

  const getTabClass = (tabName) => 
    `px-4 py-2 font-medium text-sm rounded-lg transition-all ${
      activeTab === tabName 
        ? 'bg-blue-600 text-white shadow-sm' 
        : 'text-slate-600 hover:bg-slate-100'
    }`;

  const renderTableContent = () => {
    switch(activeTab) {
      case 'settlements':
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-sm bg-slate-50">
                <th className="px-6 py-3 font-medium">Settlement ID</th>
                <th className="px-6 py-3 font-medium">Merchant</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">UTR / Ref</th>
                <th className="px-6 py-3 font-medium">Processed Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {REPORT_DATA.settlements.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono text-slate-600">{item.id}</td>
                  <td className="px-6 py-3 font-medium text-slate-800">{item.merchant}</td>
                  <td className="px-6 py-3 font-bold text-slate-700">{item.amount}</td>
                  <td className="px-6 py-3 text-slate-500">{item.utr}</td>
                  <td className="px-6 py-3 text-slate-500">{item.date}</td>
                  <td className="px-6 py-3"><StatusBadge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'staff':
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-sm bg-slate-50">
                <th className="px-6 py-3 font-medium">Log ID</th>
                <th className="px-6 py-3 font-medium">Staff Name</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Action Performed</th>
                <th className="px-6 py-3 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {REPORT_DATA.staff.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono text-slate-400">{item.id}</td>
                  <td className="px-6 py-3 font-bold text-slate-700">{item.staff}</td>
                  <td className="px-6 py-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold">{item.role}</span>
                  </td>
                  <td className="px-6 py-3 text-slate-700">{item.action}</td>
                  <td className="px-6 py-3 text-slate-500">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default: // Transactions
        return (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-sm bg-slate-50">
                <th className="px-6 py-3 font-medium">Txn ID</th>
                <th className="px-6 py-3 font-medium">Merchant</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Fee</th>
                <th className="px-6 py-3 font-medium">Method</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {REPORT_DATA.transactions.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono text-slate-600">{item.id}</td>
                  <td className="px-6 py-3 font-medium text-slate-800">{item.merchant}</td>
                  <td className="px-6 py-3 font-bold text-slate-700">{item.amount}</td>
                  <td className="px-6 py-3 text-red-500 text-xs">-{item.fee}</td>
                  <td className="px-6 py-3 text-slate-600">{item.method}</td>
                  <td className="px-6 py-3 text-slate-500">{item.date}</td>
                  <td className="px-6 py-3"><StatusBadge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button onClick={() => setActiveTab('transactions')} className={getTabClass('transactions')}>Transactions</button>
          <button onClick={() => setActiveTab('settlements')} className={getTabClass('settlements')}>Settlements</button>
          <button onClick={() => setActiveTab('staff')} className={getTabClass('staff')}>Staff Logs</button>
        </div>

        <div className="flex gap-3">
           <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
              <Calendar size={16} />
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent outline-none cursor-pointer"
              >
                <option>Today</option>
                <option>Yesterday</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
           </div>
           <Button variant="outline" icon={Download} onClick={() => alert('Downloading Report...')}>Export</Button>
        </div>
      </div>

      {/* 2. Analytical Summary (Contextual) */}
      {activeTab === 'transactions' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Volume" value="₹48,900" subtext="In selected range" icon={TrendingUp} color="bg-blue-600" />
          <StatCard title="Net Revenue" value="₹956" subtext="Platform Fees" icon={DollarSign} color="bg-green-600" />
          <StatCard title="Success Rate" value="94.2%" subtext="-1.2% from last week" icon={UserCheck} color="bg-purple-600" />
          <StatCard title="Avg Ticket Size" value="₹2,400" subtext="Per transaction" icon={CreditCard} color="bg-orange-500" />
        </div>
      )}

      {activeTab === 'settlements' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-sm font-medium">Pending Settlements</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">₹12,100</h3>
              <div className="mt-4 flex items-center gap-2 text-amber-600 text-xs font-medium bg-amber-50 w-fit px-2 py-1 rounded">
                 <ArrowDownRight size={14} /> 3 merchants waiting
              </div>
           </div>
           <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-sm font-medium">Processed Today</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">₹2,27,400</h3>
              <div className="mt-4 flex items-center gap-2 text-green-600 text-xs font-medium bg-green-50 w-fit px-2 py-1 rounded">
                 <ArrowUpRight size={14} /> 100% Success Rate
              </div>
           </div>
        </div>
      )}

      {/* 3. Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
           <div>
             <h3 className="text-lg font-bold text-slate-800 capitalize">{activeTab} Report</h3>
             <p className="text-sm text-slate-500">
               Showing data for <span className="font-semibold text-slate-700">{dateRange}</span>
             </p>
           </div>
           <Button variant="secondary" icon={Filter} className="hidden md:flex">Advanced Filter</Button>
        </div>
        
        <div className="overflow-x-auto">
          {renderTableContent()}
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
           <span>Displaying top 5 results</span>
           <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;