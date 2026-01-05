import React, { useState } from 'react';
import { 
  Info, 
  RotateCw, 
  Clock, 
  ExternalLink, 
  X, 
  AlertCircle,
  HelpCircle,
  Calendar,
  Search,
  ChevronDown
} from 'lucide-react';

const Settlement = () => {
  // --- STATE ---
  const [showPosBanner, setShowPosBanner] = useState(true);

  // --- SUB-COMPONENTS ---
  
  const StatBox = ({ title, value, isBlocked = false, isNA = false }) => (
    <div className="flex-1 px-6 py-4 first:pl-0 last:pr-0 border-r border-gray-200 last:border-r-0">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-sm text-slate-600 font-normal">{title}</span>
        <Info size={14} className="text-slate-400 cursor-pointer hover:text-slate-600" />
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-2xl ${isNA ? 'text-slate-400 font-medium' : 'text-slate-800 font-bold'}`}>
          {value}
        </span>
        {isBlocked && (
          <span className="flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded border border-red-100 uppercase tracking-wide">
             <AlertCircle size={10} /> Blocked
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 relative pb-20">
      
      {/* 1. POS PROMO BANNER */}
      {showPosBanner && (
        <div className="bg-white border-b border-gray-200 flex items-center justify-between pl-0 pr-4 h-12 overflow-hidden">
           <div className="flex items-center h-full">
              {/* Blue slanted part */}
              <div className="bg-blue-600 h-full flex items-center px-6 relative z-10">
                 <span className="text-white font-bold text-sm">India's Leading POS Solution</span>
                 {/* CSS Triangle hack for slant */}
                 <div className="absolute right-[-20px] top-0 border-l-[20px] border-l-blue-600 border-b-[48px] border-b-transparent h-full"></div>
              </div>
              <div className="ml-8 text-sm text-slate-600">
                UpyoguPay POS delivers reliability, speed, and scale for seamless in-store payments.
              </div>
           </div>
           <div className="flex items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-1.5 rounded transition-colors">
                Talk to our experts today
              </button>
              <button onClick={() => setShowPosBanner(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
           </div>
        </div>
      )}

      {/* 2. ALERT BANNER */}
      <div className="m-6 mb-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-sm p-4 flex items-start justify-between">
         <div className="flex gap-3">
            <AlertCircle className="text-[#DC2626] mt-0.5 shrink-0" size={18} />
            <div>
               <h3 className="text-[#991B1B] font-bold text-sm">Contact support to resume settlements for your account</h3>
               <p className="text-[#7F1D1D] text-sm mt-0.5">Your settlements are on-hold as we've noticed unusual activity in your account</p>
            </div>
         </div>
         <button className="border border-[#FCA5A5] text-[#991B1B] hover:bg-[#FEE2E2] text-sm font-medium px-3 py-1.5 rounded transition-colors">
            Contact Support
         </button>
      </div>

      <div className="px-6">
        
        {/* 3. OVERVIEW SECTION */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm mb-6">
          
          {/* Header Row */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
               <h2 className="text-base font-bold text-slate-800">Overview</h2>
               <div className="flex items-center gap-2 text-xs text-slate-400 ml-2">
                 <Clock size={12} /> 0 mins ago
                 <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 ml-1 font-medium">
                   <RotateCw size={12} /> Refresh
                 </button>
               </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
               <button className="flex items-center gap-1.5 text-blue-600 font-medium hover:underline">
                 <Clock size={16} /> My Settlement Cycle
               </button>
               <button className="flex items-center gap-1.5 text-blue-600 font-medium hover:underline">
                 Documentation <ExternalLink size={14} />
               </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6 flex flex-col md:flex-row">
             <StatBox title="Current balance" value="₹ 0.00" />
             <StatBox title="Settlement due today" value="₹ 0.00" />
             <StatBox title="Previous settlement" value="NA" isNA={true} />
             <StatBox title="Upcoming settlement" value="NA" isNA={true} isBlocked={true} />
          </div>
        </div>

        {/* 4. SETTLEMENTS TABLE SECTION */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm min-h-[400px]">
           
           {/* Tabs */}
           <div className="border-b border-gray-200 px-6">
              <button className="py-4 text-sm font-bold text-blue-600 border-b-2 border-blue-600">
                Settlements
              </button>
           </div>

           {/* Filters Bar */}
           <div className="p-5 border-b border-gray-100 flex flex-wrap items-end gap-4">
              
              {/* Duration Filter */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500">Duration</label>
                 <button className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded hover:border-gray-400 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                       <Calendar size={14} className="text-slate-400" /> All Time
                    </div>
                    <ChevronDown size={14} className="text-slate-400" />
                 </button>
              </div>

              {/* UTR Number Input */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500">UTR number</label>
                 <input 
                   type="text" 
                   className="w-48 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                 />
              </div>

              {/* Settlement ID Input */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500">Settlement ID</label>
                 <input 
                   type="text" 
                   className="w-48 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                 />
              </div>

              {/* Status Dropdown */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500">Status</label>
                 <button className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded hover:border-gray-400 text-sm text-slate-600">
                    All
                    <ChevronDown size={14} className="text-slate-400" />
                 </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm font-medium">
                    Search
                 </button>
                 <button className="bg-[#F3F4F6] hover:bg-gray-200 text-slate-600 px-4 py-2 rounded text-sm font-medium border border-transparent">
                    Clear
                 </button>
              </div>
           </div>

           {/* Table Header */}
           <div className="bg-[#FAFAFA] border-b border-gray-200 px-6 py-3 flex text-xs font-bold text-slate-500 uppercase tracking-wide">
              <div className="w-1/5">Created on</div>
              <div className="w-1/4">Settlement ID</div>
              <div className="w-1/4 flex items-center gap-1">UTR number <Info size={12} className="text-slate-400" /></div>
              <div className="w-1/6 text-right">Net settlement</div>
              <div className="w-1/6 pl-4">Status</div>
           </div>

           {/* Empty State */}
           <div className="flex flex-col items-center justify-center py-20">
              <h3 className="text-slate-800 font-bold text-sm">No Settlements found!</h3>
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

export default Settlement;