import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Info, 
  AlertTriangle, 
  HelpCircle, 
  Calendar, 
  Download,
  ArrowUpRight
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_DATA = {
  overview: {
    balance: '₹ 4,25,900.50',
    due: '₹ 1,24,000.00',
    volume: '₹ 24,50,000',
    payments: '1,240',
    refunds: '12'
  },
  // Simple data for the bar chart (height as %)
  graph: [
    { label: '01 Dec', height: '40%' }, { label: '02 Dec', height: '65%' },
    { label: '03 Dec', height: '45%' }, { label: '04 Dec', height: '80%' },
    { label: '05 Dec', height: '30%' }, { label: '06 Dec', height: '55%' },
    { label: '07 Dec', height: '90%' }, { label: '08 Dec', height: '70%' },
    { label: '09 Dec', height: '50%' }, { label: '10 Dec', height: '60%' },
    { label: '11 Dec', height: '75%' }, { label: '12 Dec', height: '40%' },
    { label: '13 Dec', height: '85%' }, { label: '14 Dec', height: '95%' },
    { label: '15 Dec', height: '60%' },
  ],
  transactions: [
    { id: 'pay_L9340KAj23', date: '05 Jan, 10:23 AM', amount: '₹ 12,400.00', status: 'captured', method: 'UPI' },
    { id: 'pay_M8231LBk92', date: '05 Jan, 09:15 AM', amount: '₹ 4,500.00', status: 'failed', method: 'Card' },
    { id: 'pay_N7120MCj11', date: '04 Jan, 06:45 PM', amount: '₹ 22,000.00', status: 'captured', method: 'Netbanking' },
    { id: 'pay_O6010NDh55', date: '04 Jan, 02:30 PM', amount: '₹ 1,200.00', status: 'refunded', method: 'Wallet' },
    { id: 'pay_P5900OEg44', date: '03 Jan, 11:00 AM', amount: '₹ 8,900.00', status: 'captured', method: 'UPI' },
  ]
};

const MerchantDashboard = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [banners, setBanners] = useState({
    pos: true,
    rejected: true,
    capture: true,
    schedule: true,
    international: true
  });
  const [activeActivityTab, setActiveActivityTab] = useState('PAYMENTS');
  const [activeStatTab, setActiveStatTab] = useState('volume');
  const [graphDuration, setGraphDuration] = useState('Daily');
  const [dateRange, setDateRange] = useState('Past 30 Days');

  // --- HANDLERS ---
  const closeBanner = (key) => setBanners(prev => ({ ...prev, [key]: false }));
  
  const navigateTo = (path) => {
    navigate(path);
  };

  const handleDownload = (type) => {
    alert(`Downloading ${type} report...`);
  };

  // --- SUB-COMPONENTS ---

  // Helper for status badges
  const StatusBadge = ({ status }) => {
    const styles = {
      captured: 'bg-green-100 text-green-700',
      failed: 'bg-red-50 text-red-600',
      refunded: 'bg-purple-50 text-purple-600'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${styles[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  const AlertBanner = ({ id, type, title, desc, action, link, linkPath, actionPath }) => {
    if (!banners[id]) return null;
    const gradientClass = 
      type === 'rejected' ? 'from-[#FF8A65] to-[#FF7043]' : 
      type === 'success' ? 'from-[#66BB6A] to-[#43A047]' : 
      'from-[#7C4DFF] to-[#651FFF]'; 

    return (
      <div className="flex items-center bg-white border border-gray-200 mb-2 overflow-hidden shadow-sm min-h-[48px]">
        <div className={`w-40 h-12 bg-gradient-to-r ${gradientClass} flex items-center px-4 shrink-0 relative`}>
            <span className="text-white text-xs font-bold">{title}</span>
            <div className="absolute right-[-12px] top-0 border-l-[12px] border-l-transparent border-t-[48px] border-t-white h-full z-10 scale-x-[-1]"></div>
        </div>
        <div className="flex-1 flex items-center justify-between px-4 py-2">
            <p className="text-xs text-slate-600">
               {desc} {link && <button onClick={() => linkPath && navigateTo(linkPath)} className="text-blue-600 hover:underline inline-block">{link}</button>}
            </p>
            <div className="flex items-center gap-4">
               {action && <button onClick={() => actionPath && navigateTo(actionPath)} className="bg-blue-600 text-white text-xs px-3 py-1 rounded shadow-sm hover:bg-blue-700">{action}</button>}
               <button onClick={() => closeBanner(id)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
            </div>
        </div>
      </div>
    );
  };

  const InternationalCard = () => {
    if (!banners.international) return null;
    return (
        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm mb-8 relative overflow-hidden animate-in fade-in duration-500">
        <button onClick={() => closeBanner('international')} className="absolute top-4 right-4 text-slate-300 hover:text-slate-500"><X size={16} /></button>
        <div className="flex flex-col md:flex-row items-start gap-4 z-10 relative">
            <p className="text-sm font-medium text-slate-700 mb-2 w-full md:w-auto">Looking to accept international payments from your <span className="text-orange-500 font-bold">customers</span> ?</p>
            <div className="w-full bg-slate-50 border border-slate-100 p-4 rounded flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0 text-xl">💰</div>
                <div>
                    <h3 className="text-sm font-bold text-slate-800">Enable International Payments Today</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-2 leading-relaxed">Accept card payments from international customers with a nominal fee.</p>
                    <button onClick={() => navigateTo('/merchant/international')} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">View International Methods <ChevronRight size={12} /></button>
                </div>
            </div>
        </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* POS Banner */}
      {banners.pos && (
        <div className="bg-white border-b border-gray-200 flex items-center justify-between pl-0 pr-4 h-12 overflow-hidden mb-4">
            <div className="flex items-center h-full">
                <div className="bg-blue-600 h-full flex items-center px-6 relative z-10">
                    <span className="text-white font-bold text-sm">India's Leading POS Solution</span>
                    <div className="absolute right-[-20px] top-0 border-l-[20px] border-l-blue-600 border-b-[48px] border-b-transparent h-full"></div>
                </div>
                <div className="ml-8 text-sm text-slate-600 truncate">
                    UpyugoPay POS delivers reliability, speed, and scale for seamless in-store payments.
                </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
                <button onClick={() => window.open('https://UpyugoPay.com/pos', '_blank')} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-1.5 rounded transition-colors">Talk to our experts today</button>
                <button onClick={() => closeBanner('pos')} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
        </div>
      )}

      <div className="px-8 pt-6">
        <AlertBanner id="rejected" type="rejected" title="Account Rejected" desc="We can't support your business because it doesn't meet our compliance requirements." action="Contact Support" actionPath="/merchant/merchantSupport" />
        <AlertBanner id="capture" type="success" title="Capture Settings" desc="Currently all payments with order id are being captured by default, click" link="here" linkPath="/merchant/settings" />
        <AlertBanner id="schedule" type="info" title="Schedule Reports" desc="You can now effortlessly setup email schedules for your reports." action="Schedules" actionPath="/merchant/reportsMerch" />

        <InternationalCard />
        
        <div className="bg-white border border-gray-200 p-3 text-xs text-slate-500 mb-6 flex items-center gap-1 shadow-sm rounded-sm">
           You can personalize your account to add your logo, add brand colour and do lots more ● <button onClick={() => navigateTo('/merchant/profile')} className="text-blue-600 hover:underline">Personalize account</button>
        </div>

        {/* --- OVERVIEW HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
           <div className="flex items-center bg-white border border-gray-300 rounded overflow-hidden shadow-sm h-9">
              <button className="flex items-center gap-2 px-3 h-full border-r border-gray-200 text-sm text-slate-600 hover:bg-gray-50 transition-colors">
                 <Calendar size={14} className="text-slate-400" />
                 {dateRange} <ChevronDown size={14} className="ml-1 text-slate-400" />
              </button>
              <div className="px-3 text-sm font-bold text-slate-700">06 Dec 2025 <span className="text-slate-400 font-normal mx-1">to</span> 05 Jan 2026</div>
           </div>
           <div className="text-right">
              <div className="text-xs text-slate-500">Current Balance: <span className="font-bold text-slate-800">{MOCK_DATA.overview.balance}</span></div>
              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-end gap-1">Settlements under review. <Info size={10} /> <button className="text-blue-600 hover:underline">Know More</button></div>
              <div className="mt-1"><button onClick={() => navigateTo('/merchant/settlement')} className="text-blue-600 text-xs hover:underline">View Settlements</button></div>
           </div>
        </div>

        {/* --- STATS & GRAPH SECTION --- */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm mb-8">
           <div className="flex border-b border-gray-200 overflow-x-auto">
              {/* Stat Cards with Real Data */}
              <div onClick={() => setActiveStatTab('volume')} className={`flex-1 min-w-[200px] p-5 border-r border-gray-200 cursor-pointer relative transition-colors ${activeStatTab === 'volume' ? 'bg-white' : 'bg-gray-50/50 hover:bg-gray-50'}`}>
                 <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">Payment Volume <Info size={12} className="text-slate-400" /></div>
                 <div className="text-3xl text-slate-800 font-medium">{MOCK_DATA.overview.volume}</div>
                 {activeStatTab === 'volume' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-500"></div>}
              </div>
              <div onClick={() => setActiveStatTab('payments')} className={`flex-1 min-w-[200px] p-5 border-r border-gray-200 cursor-pointer relative transition-colors ${activeStatTab === 'payments' ? 'bg-white' : 'bg-gray-50/50 hover:bg-gray-50'}`}>
                 <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">Number of Payments <Info size={12} className="text-slate-400" /></div>
                 <div className="text-3xl text-slate-800 font-medium">{MOCK_DATA.overview.payments}</div>
                 {activeStatTab === 'payments' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-500"></div>}
              </div>
              <div onClick={() => setActiveStatTab('refunds')} className={`flex-1 min-w-[200px] p-5 cursor-pointer relative transition-colors ${activeStatTab === 'refunds' ? 'bg-white' : 'bg-gray-50/50 hover:bg-gray-50'}`}>
                 <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">Number of Refunds <Info size={12} className="text-slate-400" /></div>
                 <div className="text-3xl text-slate-800 font-medium">{MOCK_DATA.overview.refunds}</div>
                 {activeStatTab === 'refunds' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-500"></div>}
              </div>
           </div>

           <div className="p-6">
              <div className="flex justify-end items-center gap-3 mb-10 flex-wrap">
                 <div className="flex border border-gray-300 rounded overflow-hidden">
                    {['Hourly', 'Daily', 'Weekly', 'Monthly'].map((period) => (
                       <button key={period} onClick={() => setGraphDuration(period)} className={`px-3 py-1.5 text-xs font-medium border-r border-gray-300 last:border-r-0 transition-colors ${graphDuration === period ? 'bg-blue-50 text-blue-600' : 'bg-white text-slate-600 hover:bg-gray-50'}`}>{period}</button>
                    ))}
                 </div>
                 <button onClick={() => handleDownload('graph')} className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 text-slate-500"><Download size={14} /></button>
              </div>

              {/* CSS Bar Chart using Mock Data */}
              <div className="h-64 border-b border-gray-100 mb-4 flex items-end justify-between px-2 gap-2 relative">
                 <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                    <div className="border-t border-gray-100 w-full h-0"></div>
                    <div className="border-t border-gray-100 w-full h-0"></div>
                    <div className="border-t border-gray-100 w-full h-0"></div>
                    <div className="border-t border-gray-100 w-full h-0"></div>
                 </div>
                 {MOCK_DATA.graph.map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative z-10 h-full justify-end">
                       <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                          {item.label}: {item.height} Vol
                       </div>
                       <div className="w-full max-w-[24px] bg-[#3395FF] rounded-t-sm hover:bg-[#2879d6] transition-all duration-300" style={{ height: item.height }}></div>
                    </div>
                 ))}
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400">
                 <div className="flex items-center gap-1"><Info size={12} /> Graph last updated 5 mins ago</div>
                 <button onClick={() => navigateTo('/merchant/transactions')} className="text-blue-600 hover:underline">View all payments from this date range</button>
              </div>
           </div>
        </div>

        {/* --- PAYMENT INSIGHTS SECTION --- */}
        <div className="mb-10">
           <div className="flex items-center gap-2 mb-4">
              <h3 className="text-base font-bold text-slate-700">Payment Insights</h3>
              <Info size={14} className="text-slate-400" />
           </div>
           <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                 <div className="text-sm text-slate-600"><span className="text-slate-500 mr-2">Showing:</span> All Methods</div>
                 <button onClick={() => handleDownload('insights')} className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 text-slate-500"><Download size={14} /></button>
              </div>
              <div className="h-64 flex flex-col items-center justify-center border-b border-gray-100 mb-4 p-6">
                 <AlertTriangle size={24} className="text-orange-400 mb-2" />
                 <h3 className="text-slate-600 font-medium mb-1">No data available.</h3>
                 <p className="text-xs text-slate-400">Tip: You could try again by selecting a different filter or date range.</p>
              </div>
           </div>
        </div>

        {/* --- RECENT ACTIVITY SECTION WITH MOCK TABLE --- */}
        <div className="mb-10">
           <h3 className="text-base font-bold text-slate-700 mb-4">Recent Activity</h3>
           <div className="bg-white border border-gray-200 rounded-sm shadow-sm min-h-[300px]">
              <div className="flex border-b border-gray-200">
                 {['PAYMENTS', 'SETTLEMENTS', 'REFUNDS'].map((tab) => (
                    <button key={tab} onClick={() => setActiveActivityTab(tab)} className={`flex-1 py-4 text-xs font-bold transition-colors text-center uppercase relative ${activeActivityTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700 hover:bg-gray-50'}`}>
                       {tab}
                       {activeActivityTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600"></div>}
                    </button>
                 ))}
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-[#FAFAFA] border-b border-gray-200 text-xs font-bold text-slate-500 uppercase tracking-wide">
                          <th className="px-6 py-3 font-bold">Date</th>
                          <th className="px-6 py-3 font-bold">Payment ID</th>
                          <th className="px-6 py-3 font-bold">Amount</th>
                          <th className="px-6 py-3 font-bold">Method</th>
                          <th className="px-6 py-3 font-bold text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {MOCK_DATA.transactions.map((txn, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                             <td className="px-6 py-4 text-sm text-slate-500">{txn.date}</td>
                             <td className="px-6 py-4 text-sm font-medium text-blue-600 group-hover:underline">{txn.id}</td>
                             <td className="px-6 py-4 text-sm text-slate-800 font-bold">{txn.amount}</td>
                             <td className="px-6 py-4 text-sm text-slate-600">{txn.method}</td>
                             <td className="px-6 py-4 text-right"><StatusBadge status={txn.status} /></td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-center">
                 <button onClick={() => navigateTo('/merchant/transactions')} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded transition-colors flex items-center gap-1">
                    View All {activeActivityTab} <ArrowUpRight size={14} />
                 </button>
              </div>
           </div>
        </div>

      </div>

      {/* Floating Help Button */}
      <button onClick={() => navigateTo('/merchant/merchantSupport')} className="fixed bottom-6 right-6 bg-[#022D45] hover:bg-[#0a2544] text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-sm font-medium transition-transform hover:scale-105 z-50 cursor-pointer">
        <div className="grid place-items-center"><HelpCircle size={18} /></div>
        Help & Support
      </button>

    </div>
  );
};

export default MerchantDashboard;