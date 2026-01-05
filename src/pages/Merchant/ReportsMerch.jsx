import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Plus, 
  ChevronDown, 
  X, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink,
  QrCode,
  RotateCcw,
  Calendar as CalendarIcon,
  CalendarOff // Imported for the empty schedule state
} from 'lucide-react';

// --- MOCK DATA ---
const REPORT_CATEGORIES = [
  {
    title: 'SETTLEMENTS',
    cards: [
      {
        title: 'Settlements',
        description: 'This report provides a list of the settlement(s) in selected time range. It does not include details of the transactions that were settled. Details include settlement ID, date, UTR, and others.',
        icon: CheckCircle2,
        type: 'check'
      },
      {
        title: 'Settlement Recon',
        description: 'This report provides a detailed list of all transactions (payments, refunds, and adjustments) against every settlement in selected time range. Details include transaction type, ID, method, settlement ID, etc.',
        icon: CheckCircle2,
        type: 'check'
      }
    ]
  },
  {
    title: 'PAYMENTS',
    cards: [
      {
        title: 'Payments',
        description: 'This report provides details of all payments that were created in the selected time range. Details include payment ID, status, method, date, amount, and others.',
        icon: FileText,
        type: 'file'
      },
      {
        title: 'QR Code Report with Pay_Id',
        description: 'QR Code Report details regarding specific Pay IDs and their transaction statuses.',
        icon: QrCode,
        type: 'file'
      },
      {
        title: 'Payments Report With Offers',
        description: 'This report provides details of all payments that were created in the selected time range. Details include payment ID, status, method, issuer name, date, amount, and others.',
        icon: FileText,
        type: 'file'
      },
      {
        title: 'Turbo UPI Payments',
        description: 'This report provides details of all Upi Turbo payments that were created in the selected time range. Details include payment ID, status, method, issuer name, date, amount, and others.',
        icon: FileText,
        type: 'file'
      },
      {
        title: 'Emandate_Failed_Transaction_Summary',
        description: 'This report provides failure reasons and corresponding details for e-mandate payments, failing due to customer decline.',
        icon: FileText,
        type: 'file'
      }
    ]
  },
  {
    title: 'TRANSACTIONS',
    cards: [
      {
        title: 'Combined Report',
        description: 'This report provides all transactions (payments, refunds, adjustments, and transfers) and settlements that were made in the selected time range.',
        icon: RotateCcw,
        type: 'refresh'
      },
      {
        title: 'Credit Usage Report',
        description: 'This report provides all transactions (payments, refunds, adjustments, and transfers) and settlements that were made in the selected time range related to credit usage.',
        icon: RotateCcw,
        type: 'refresh'
      }
    ]
  }
];

const ReportsMerch = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview'); // Default tab

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Purple Banner */}
      {showBanner && (
        <div className="bg-[#525CE5] text-white px-6 py-3 flex items-center justify-between relative overflow-hidden">
          {/* Decorative slant (CSS simulation) */}
          <div className="absolute left-0 top-0 h-full w-[300px] bg-[#4249B6] -skew-x-[20deg] -translate-x-10 z-0"></div>
          
          <div className="flex items-center gap-2 z-10 text-sm pl-2">
            <span className="font-bold">Schedule Reports</span>
            <span className="opacity-90 hidden md:inline">You can now effortlessly setup email schedules for your reports within a few clicks. • </span>
            <a href="#" className="underline opacity-90 hover:opacity-100 ml-1">Know more</a>
          </div>

          <div className="flex items-center gap-4 z-10">
            <button className="bg-blue-500 hover:bg-blue-400 text-white text-xs font-medium px-4 py-1.5 rounded transition-colors shadow-sm">
              Schedules
            </button>
            <button onClick={() => setShowBanner(false)} className="text-white/70 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Page Content Container */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Tabs */}
          <div className="flex items-center justify-between px-8 border-b border-gray-100">
            <div className="flex gap-8">
              {['Overview', 'Downloads', 'Schedules'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === tab 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <a href="#" className="text-sm text-blue-600 flex items-center gap-1 hover:underline font-medium">
              Documentation <ExternalLink size={14} />
            </a>
          </div>

          {/* Hero Section - Only show on 'Overview' tab */}
          {activeTab === 'Overview' && (
            <div className="px-8 py-10 flex flex-col md:flex-row items-center justify-between bg-white relative overflow-hidden">
              <div className="max-w-2xl z-10">
                <h1 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                  Generate & schedule reports for all your business transactions, settlements & subscription
                </h1>
                <p className="text-slate-500 text-sm mb-8">
                  All your products reports in one place, now with new and better interface.
                </p>
                
                <div className="flex gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors shadow-sm shadow-blue-200">
                    <CalendarIcon size={16} /> Schedule Report
                  </button>
                  <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors">
                    <Download size={16} /> Download Report
                  </button>
                </div>
              </div>

              {/* Illustration Placeholder (Right Side) */}
              <div className="hidden lg:block w-96 h-56 relative">
                 {/* Simplified Abstract Laptop Graphic */}
                 <div className="absolute right-0 bottom-4 w-72 h-40 bg-white rounded-lg transform skew-x-[-10deg] shadow-2xl border border-slate-100 flex items-end justify-center z-10">
                    <div className="w-full h-full p-4 flex flex-col gap-2">
                       <div className="w-full h-4 bg-slate-100 rounded"></div>
                       <div className="flex gap-2 h-full">
                          <div className="w-1/3 bg-blue-50 rounded flex items-end p-1"><div className="w-full h-1/2 bg-blue-500 rounded-sm"></div></div>
                          <div className="w-1/3 bg-blue-50 rounded flex items-end p-1"><div className="w-full h-3/4 bg-blue-400 rounded-sm"></div></div>
                          <div className="w-1/3 bg-blue-50 rounded flex items-end p-1"><div className="w-full h-2/3 bg-emerald-400 rounded-sm"></div></div>
                       </div>
                    </div>
                 </div>
                 {/* Background Glow */}
                 <div className="absolute top-10 right-20 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-10"></div>
                 {/* Decorative lines */}
                 <div className="absolute top-0 right-0 w-full h-full border-b border-l border-slate-100 transform skew-y-12 opacity-50"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Content based on Active Tab */}
      <div className="max-w-[1400px] mx-auto px-8 py-6">
        
        {/* --- OVERVIEW TAB CONTENT --- */}
        {activeTab === 'Overview' && (
          <>
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-sm text-slate-500 font-medium">Filter:</span>
                <button className="flex items-center justify-between w-48 px-3 py-2 bg-white border border-gray-300 rounded text-sm text-slate-600 hover:border-gray-400 transition-colors shadow-sm">
                   Standard Reports <ChevronDown size={14} />
                </button>
              </div>
              <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                <Plus size={16} /> Create Custom Report
              </button>
            </div>

            {/* Report Categories */}
            <div className="space-y-8">
              {REPORT_CATEGORIES.map((category) => (
                <div key={category.title}>
                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-4 border-l-[3px] border-blue-600 pl-3">
                    <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      {category.title}
                    </h3>
                  </div>
                  
                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.cards.map((card, index) => (
                      <div key={index} className="bg-white p-6 rounded-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group flex flex-col h-full cursor-pointer">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`mt-0.5 p-1 rounded-full bg-blue-50 text-blue-600`}>
                            <card.icon size={18} />
                          </div>
                          <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{card.title}</h4>
                        </div>
                        
                        <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">
                          {card.description}
                        </p>

                        <div className="mt-auto">
                          <button className="text-blue-600 text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200">
                            Download Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* --- SCHEDULES TAB CONTENT (New Section) --- */}
        {activeTab === 'Schedules' && (
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm min-h-[500px]">
             
             {/* Header Section */}
             <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div></div> {/* Empty div for alignment */}
                <div className="flex items-center gap-3">
                   <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors">
                     <FileText size={16} /> Create Schedule
                   </button>
                   <button className="flex items-center justify-between w-40 px-3 py-2 bg-white border border-gray-300 rounded text-sm text-slate-600 hover:border-gray-400 transition-colors">
                      Date - Newest <ChevronDown size={14} />
                   </button>
                </div>
             </div>

             {/* Table Header */}
             <div className="bg-[#FAFAFA] border-b border-gray-200 px-6 py-3 grid grid-cols-7 text-xs font-bold text-slate-500 uppercase tracking-wide">
                <div className="col-span-2">Schedule & Report Name</div>
                <div>Format</div>
                <div>Email</div>
                <div>Status</div>
                <div>Repeat On</div>
                <div className="text-center">Modify / Pause / Delete</div>
                <div className="text-right">View Activity</div>
             </div>

             {/* Empty State */}
             <div className="flex flex-col items-center justify-center py-20">
                <div className="bg-slate-50 p-8 rounded-full mb-6">
                   <CalendarOff size={64} className="text-slate-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-slate-800 font-bold text-lg mb-2">No Schedules Found :(</h3>
                <p className="text-slate-500 text-sm">Create report schedule to receive reports automatically to your email.</p>
             </div>

          </div>
        )}

        {/* --- DOWNLOADS TAB CONTENT (Placeholder) --- */}
        {activeTab === 'Downloads' && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-sm shadow-sm">
            <h3 className="text-slate-800 font-bold text-lg mb-2">No Downloads Yet</h3>
            <p className="text-slate-500 text-sm">Your generated reports will appear here.</p>
          </div>
        )}

      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#022D45] hover:bg-[#0a2544] text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-sm font-medium transition-transform hover:scale-105 z-50">
        <div className="grid place-items-center"><HelpCircle size={18} /></div>
        Help & Support
      </button>

    </div>
  );
};

export default ReportsMerch;