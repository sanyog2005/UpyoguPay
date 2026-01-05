import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Plus, 
  HelpCircle, 
  CheckCircle2, 
  X,
  CreditCard,
  Filter,
  Download,
  Copy,
  Calendar,
  Settings
} from 'lucide-react';

const PaymentLinks = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('Payment Links');
  const [showGetStarted, setShowGetStarted] = useState(true);
  
  // Filter State
  const [filters, setFilters] = useState({
    status: 'All',
    type: 'All Types',
    linkId: '',
    batchId: '',
    refId: '',
    contact: '',
    email: '',
    notes: '',
    count: '25',
    duration: 'Past 7 Days'
  });

  // Mock Data (Empty for now as per screenshot 'There are no payment links yet!!')
  const paymentLinks = []; 

  // --- HANDLERS ---
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleClear = () => {
    setFilters({
      status: 'All', type: 'All Types', linkId: '', batchId: '', refId: '', 
      contact: '', email: '', notes: '', count: '25', duration: 'Past 7 Days'
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Get Started Section */}
      {showGetStarted && (
        <div className="mx-8 mt-6 bg-white border border-gray-200 rounded-sm shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowGetStarted(false)}>
              <X size={16} className="text-slate-400 hover:text-slate-600" />
           </div>
           
           <div className="p-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-8 flex items-center gap-2">
                 <span className="w-4 h-0.5 bg-green-500 block"></span> GET STARTED
              </h3>

              <div className="flex justify-center items-center gap-4 max-w-4xl mx-auto py-8">
                 {/* Step 1 */}
                 <div className="flex-1 flex flex-col items-center text-center relative z-10">
                    <div className="w-8 h-8 rounded-full border-4 border-blue-100 bg-blue-600 flex items-center justify-center text-white mb-4 shadow-sm relative">
                       <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">1. Create Payment Link</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Create a payment link instantly and notify your customer via sms or email.</p>
                 </div>

                 {/* Connector Line (Dotted) */}
                 <div className="flex-1 border-t-2 border-dotted border-slate-200 h-0 -mt-12 mx-4"></div>

                 {/* Step 2 (Inactive/Future) */}
                 <div className="flex-1 flex flex-col items-center text-center relative z-10 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                       <CreditCard size={14} fill="currentColor" className="text-white" /> {/* Using generic icon for 'Locked' step */}
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">2. Receive Payments</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Your customers can make domestic and international payments directly on the payment link.</p>
                 </div>
              </div>
              
              {/* Decorative Background Image (Left) */}
              <div className="absolute left-0 bottom-0 opacity-20 pointer-events-none w-64">
                 <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 200L100 150L200 200V100L100 50L0 100V200Z" fill="#3B82F6"/>
                 </svg>
              </div>
           </div>
        </div>
      )}

      {/* 2. Main Content Area */}
      <div className="px-8 py-6">
         
         {/* Tabs & Header Actions */}
         <div className="flex justify-between items-end border-b border-gray-200 mb-6">
            <div className="flex gap-8">
               <button 
                 className={`py-4 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === 'Payment Links' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                 }`}
               >
                  Payment Links
               </button>
            </div>
            
            <div className="flex items-center gap-6 pb-3">
               <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  <span className="bg-[#00A651] text-white px-1.5 py-0.5 rounded text-[10px] font-bold mr-1">NEW</span>
                  Reminder Settings
               </button>
               <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                  <HelpCircle size={14} /> Need help? Take a tour
               </button>
               <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                  Documentation <span className="bg-[#00A651] text-white px-1.5 py-0.5 rounded text-[10px] font-bold ml-1">NEW</span> <ExternalLink size={12} />
               </button>
            </div>
         </div>

         {/* Filters Panel */}
         <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-6 gap-4 items-end mb-4">
               <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Payment Link Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-slate-600 focus:outline-none focus:border-blue-500 bg-white">
                     <option>All</option>
                     <option>Active</option>
                     <option>Paid</option>
                     <option>Expired</option>
                  </select>
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Payment Link Id</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Batch Id</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Reference Id</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Customer Contact</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Customer Email</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
               </div>
            </div>
            
            <div className="grid grid-cols-6 gap-4 items-end">
               <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Payment Link Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-slate-600 focus:outline-none focus:border-blue-500 bg-white">
                     <option>All Types</option>
                     <option>Standard</option>
                     <option>UPI</option>
                  </select>
               </div>
               <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Duration</label>
                  <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded text-xs bg-white text-slate-600">
                     <Calendar size={14} className="mr-2 text-slate-400" />
                     <span className="flex-1">Past 7 Days</span>
                     <span className="mx-2 text-slate-300">|</span>
                     <span className="font-bold text-slate-800">29 Dec 2025</span>
                     <span className="mx-1">to</span>
                     <span className="font-bold text-slate-800">05 Jan 2026</span>
                  </div>
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Notes</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Count</label>
                  <input type="number" defaultValue="25" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
               </div>
               <div className="flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded transition-colors w-full">
                     Search
                  </button>
                  <button className="bg-[#F3F4F6] hover:bg-gray-200 text-slate-600 text-xs font-bold px-4 py-2 rounded border border-transparent transition-colors w-full">
                     Clear
                  </button>
               </div>
            </div>
         </div>

         {/* Data Table */}
         <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden min-h-[400px] flex flex-col">
            <div className="bg-[#FAFAFA] border-b border-gray-200 grid grid-cols-7 text-xs font-bold text-slate-500 uppercase tracking-wide px-6 py-4">
               <div>Payment Link Id</div>
               <div>Created At</div>
               <div>Amount</div>
               <div>Reference Id</div>
               <div>Customer</div>
               <div>Payment Link</div>
               <div className="text-right">Status</div>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
               <h3 className="text-sm font-bold text-slate-600 mb-1">There are no payment links yet!!</h3>
               <p className="text-xs text-slate-500">Start creating new links now.</p>
               <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded shadow-sm transition-colors flex items-center gap-2">
                  <Plus size={16} /> Create Payment Link
               </button>
            </div>
         </div>

      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#022D45] hover:bg-[#0a2544] text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-sm font-medium transition-transform hover:scale-105 z-50">
        <div className="grid place-items-center"><HelpCircle size={18} /></div>
        Help & Support
      </button>

    </div>
  );
};

export default PaymentLinks;