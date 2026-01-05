import React, { useState } from 'react';
import { 
  RefreshCw, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  Download,
  DollarSign
} from 'lucide-react';
import Button from '../../components/common/Button';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';

// --- MOCK DATA ---
const REFUND_HISTORY = [
  { id: 'REF_9001', orderId: 'ORD_1024', amount: '₹1,200', type: 'Full', reason: 'Customer Request', status: 'Success', date: '2023-10-25' },
  { id: 'REF_9002', orderId: 'ORD_1028', amount: '₹450', type: 'Partial', reason: 'Defective Item', status: 'Pending', date: '2023-10-24' },
  { id: 'REF_9003', orderId: 'ORD_1033', amount: '₹2,100', type: 'Full', reason: 'Fraud Suspicion', status: 'Success', date: '2023-10-23' },
  { id: 'REF_9004', orderId: 'ORD_1045', amount: '₹800', type: 'Full', reason: 'Duplicate Payment', status: 'Failed', date: '2023-10-22' },
];

const RefundManagement = () => {
  const [activeTab, setActiveTab] = useState('history'); // history | initiate
  const [searchTerm, setSearchTerm] = useState('');
  const [refundType, setRefundType] = useState('full'); // full | partial
  
  // Form State for Initiating Refund
  const [refundForm, setRefundForm] = useState({
    transactionId: '',
    amount: '',
    reason: ''
  });

  const handleInitiateRefund = (e) => {
    e.preventDefault();
    alert(`Refund initiated for ${refundForm.transactionId} (${refundType} - ₹${refundForm.amount || 'Full'})`);
    // Reset form logic here
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Refunded" value="₹4,550" subtext="This Month" icon={RefreshCw} color="bg-orange-500" />
        <StatCard title="Pending Process" value="3" subtext="Requests in queue" icon={Clock} color="bg-blue-500" />
        <StatCard title="Refund Rate" value="1.2%" subtext="Of total transactions" icon={AlertCircle} color="bg-purple-500" />
      </div>

      {/* 2. Main Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-slate-100">
           <button 
             onClick={() => setActiveTab('history')}
             className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
               activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
             }`}
           >
             Refund History
           </button>
           {/* <button 
             onClick={() => setActiveTab('initiate')}
             className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
               activeTab === 'initiate' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
             }`}
           >
             Initiate New Refund
           </button> */}
        </div>

        {/* Tab Content: History */}
        {activeTab === 'history' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-full max-w-sm">
                  <Search size={18} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by Order ID or Refund ID..." 
                    className="bg-transparent outline-none text-sm w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <Button variant="outline" icon={Download}>Export CSV</Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                    <th className="px-6 py-4 font-medium">Refund ID</th>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Reason</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {REFUND_HISTORY.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-slate-600">{item.id}</td>
                      <td className="px-6 py-4 text-slate-800 font-medium">{item.orderId}</td>
                      <td className="px-6 py-4 font-bold text-slate-700">{item.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded border ${item.type === 'Full' ? 'bg-slate-100 border-slate-200' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{item.reason}</td>
                      <td className="px-6 py-4 text-slate-500">{item.date}</td>
                      <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Initiate */}
        {activeTab === 'initiate' && (
          <div className="p-6 max-w-2xl mx-auto">
             <div className="text-center mb-8">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                 <RefreshCw size={24} />
               </div>
               <h3 className="text-xl font-bold text-slate-800">Process a Refund</h3>
               <p className="text-sm text-slate-500">Refunds are processed back to the original payment source.</p>
             </div>

             <form onSubmit={handleInitiateRefund} className="space-y-6">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Transaction / Order ID</label>
                 <div className="relative">
                   <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                   <input 
                     type="text" 
                     placeholder="Enter Order ID (e.g. ORD_12345)" 
                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                     value={refundForm.transactionId}
                     onChange={(e) => setRefundForm({...refundForm, transactionId: e.target.value})}
                     required
                   />
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <button 
                   type="button"
                   onClick={() => setRefundType('full')}
                   className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                     refundType === 'full' 
                       ? 'border-blue-600 bg-blue-50 text-blue-700' 
                       : 'border-slate-200 hover:border-slate-300 text-slate-600'
                   }`}
                 >
                   <CheckCircle size={20} className={refundType === 'full' ? 'opacity-100' : 'opacity-0'} />
                   <span className="font-bold">Full Refund</span>
                 </button>
                 
                 <button 
                   type="button"
                   onClick={() => setRefundType('partial')}
                   className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                     refundType === 'partial' 
                       ? 'border-blue-600 bg-blue-50 text-blue-700' 
                       : 'border-slate-200 hover:border-slate-300 text-slate-600'
                   }`}
                 >
                   <DollarSign size={20} className={refundType === 'partial' ? 'opacity-100' : 'opacity-0'} />
                   <span className="font-bold">Partial Refund</span>
                 </button>
               </div>

               {refundType === 'partial' && (
                 <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                   <label className="text-sm font-medium text-slate-700">Refund Amount</label>
                   <div className="relative">
                     <span className="absolute left-3 top-3 text-slate-500 font-bold">₹</span>
                     <input 
                       type="number" 
                       placeholder="0.00" 
                       className="w-full pl-8 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                       value={refundForm.amount}
                       onChange={(e) => setRefundForm({...refundForm, amount: e.target.value})}
                       required
                     />
                   </div>
                 </div>
               )}

               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Reason for Refund</label>
                 <select 
                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                   value={refundForm.reason}
                   onChange={(e) => setRefundForm({...refundForm, reason: e.target.value})}
                 >
                   <option value="">Select a reason...</option>
                   <option>Customer Request</option>
                   <option>Duplicate Payment</option>
                   <option>Fraudulent Transaction</option>
                   <option>Service Not Delivered</option>
                   <option>Other</option>
                 </select>
               </div>

               <div className="pt-4">
                 <Button className="w-full py-3" icon={ArrowUpRight}>Initiate Refund</Button>
                 <p className="text-xs text-center text-slate-400 mt-3">
                   By initiating this refund, you agree to the platform's refund policy. 
                   Process usually takes 5-7 business days.
                 </p>
               </div>
             </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundManagement;