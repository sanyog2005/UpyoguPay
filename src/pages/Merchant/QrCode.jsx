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
  Copy
} from 'lucide-react';

const QRCodes = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('QR Codes');
  const [showPosBanner, setShowPosBanner] = useState(true);
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  // Mock Data State
  const [qrCodes, setQrCodes] = useState([
    { id: 'qr_S0ASlqetBNvruS', desc: 'Store Front Display', usage: 'Multiple Use', amount: '₹ 0.00', created: '05 Jan 2026, 04:11:14 pm', status: 'Active' },
    { id: 'qr_OTkRQJcMAjDySi', desc: 'Summer Sale', usage: 'Single Use', amount: '₹ 1,200.00', created: '02 Jul 2024, 05:01:32 pm', status: 'Closed' },
    { id: 'qr_ORPZ17UYfmTI5y', desc: '-', usage: 'Multiple Use', amount: '₹ 0.00', created: '26 Jun 2024, 07:18:09 pm', status: 'Active' },
  ]);

  // Filter State
  const [filters, setFilters] = useState({
    status: 'All',
    id: '',
    name: '',
    customer: ''
  });

  // Derived State for Filtered Data
  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesStatus = filters.status === 'All' || qr.status === filters.status;
    const matchesId = qr.id.toLowerCase().includes(filters.id.toLowerCase());
    const matchesDesc = qr.desc.toLowerCase().includes(filters.name.toLowerCase());
    return matchesStatus && matchesId && matchesDesc;
  });

  // New QR Form State
  const [newQrData, setNewQrData] = useState({ usage: 'Multiple Use', amount: '', description: '' });

  // --- HANDLERS ---

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // In a real app, this would trigger an API call. 
    // Here, the filtering happens automatically via the derived state `filteredQRCodes`, 
    // but we can add a visual feedback or "loading" state here if desired.
    console.log("Searching with filters:", filters);
  };

  const handleClear = () => {
    setFilters({ status: 'All', id: '', name: '', customer: '' });
  };

  const handleCreateQR = (e) => {
    e.preventDefault();
    const newQR = {
      id: `qr_${Math.random().toString(36).substr(2, 14)}`, // Generate random ID
      desc: newQrData.description || '-',
      usage: newQrData.usage,
      amount: newQrData.amount ? `₹ ${parseFloat(newQrData.amount).toFixed(2)}` : '₹ 0.00',
      created: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', ''),
      status: 'Active'
    };
    
    setQrCodes([newQR, ...qrCodes]); // Add to top of list
    setCreateModalOpen(false); // Close modal
    setNewQrData({ usage: 'Multiple Use', amount: '', description: '' }); // Reset form
    alert("QR Code Created Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Top POS Banner */}
      {showPosBanner && (
        <div className="bg-white border-b border-gray-200 flex items-center justify-between pl-0 pr-4 h-12 overflow-hidden sticky top-0 z-10">
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
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded transition-colors">
                    Talk to our experts today
                </button>
                <button onClick={() => setShowPosBanner(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                </button>
            </div>
        </div>
      )}

      {/* 2. Get Started Section */}
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
                 <div className="flex-1 flex flex-col items-center text-center relative z-10">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mb-4 shadow-sm">
                       <CheckCircle2 size={18} strokeWidth={3} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">1. QR Code Created</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Create as many QR codes as required, and print them or share with others.</p>
                 </div>
                 <div className="flex-1 border-t-2 border-dotted border-blue-200 h-0 -mt-12 mx-4"></div>
                 <div className="flex-1 flex flex-col items-center text-center relative z-10">
                    <div className="w-8 h-8 rounded-full border-4 border-blue-100 bg-blue-600 flex items-center justify-center text-white mb-4 shadow-sm relative">
                       <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">2. Receive Payments</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Customers can pay by scanning your QR codes using supported apps.</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 3. Main Content Area */}
      <div className="px-8 py-6">
         
         {/* Tabs & Actions Header */}
         <div className="flex justify-between items-end border-b border-gray-200 mb-6">
            <div className="flex gap-8">
               {['QR Codes', 'Payments'].map((tab) => (
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
            
            <div className="flex items-center gap-4 pb-3">
               <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                  <HelpCircle size={14} /> Need help? Take a tour
               </button>
               <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                  Documentation <ExternalLink size={12} />
               </button>
               <button 
                  onClick={() => setCreateModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-2 shadow-sm transition-colors"
               >
                  <Plus size={16} /> Create QR Codes
               </button>
            </div>
         </div>

         {/* --- QR CODES TAB CONTENT --- */}
         {activeTab === 'QR Codes' && (
           <>
             {/* Filters Row */}
             <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm mb-6 grid grid-cols-6 gap-4 items-end animate-in fade-in slide-in-from-bottom-2">
                <div>
                   <label className="text-xs font-bold text-slate-500 mb-1.5 block">QR Code Status</label>
                   <select 
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-slate-600 focus:outline-none focus:border-blue-500 bg-white"
                   >
                      <option value="All">All</option>
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                   </select>
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-500 mb-1.5 block">QR Code ID</label>
                   <input 
                      type="text" 
                      value={filters.id}
                      onChange={(e) => handleFilterChange('id', e.target.value)}
                      placeholder="e.g. qr_..."
                      className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" 
                   />
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-500 mb-1.5 block">Description</label>
                   <input 
                      type="text" 
                      value={filters.name}
                      onChange={(e) => handleFilterChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" 
                   />
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-500 mb-1.5 block">Customer Name</label>
                   <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" disabled />
                </div>
                
                <div className="flex gap-2 col-span-2">
                   <button 
                      onClick={handleSearch}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded transition-colors"
                   >
                      Search
                   </button>
                   <button 
                      onClick={handleClear}
                      className="bg-[#F3F4F6] hover:bg-gray-200 text-slate-600 text-xs font-bold px-4 py-2 rounded border border-transparent transition-colors"
                   >
                      Clear
                   </button>
                </div>
             </div>

             {/* Data Table */}
             <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-[#FAFAFA] border-b border-gray-200 text-xs font-bold text-slate-500 uppercase tracking-wide">
                         <th className="px-6 py-4">QR Code ID</th>
                         <th className="px-6 py-4">Description</th>
                         <th className="px-6 py-4">QR Usage</th>
                         <th className="px-6 py-4">Amount Received</th>
                         <th className="px-6 py-4 text-right">Created At</th>
                         <th className="px-6 py-4 text-center">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 text-sm text-slate-600">
                      {filteredQRCodes.length > 0 ? (
                        filteredQRCodes.map((qr) => (
                           <tr key={qr.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                              <td className="px-6 py-4 font-medium text-blue-600 hover:underline">
                                 {qr.id}
                              </td>
                              <td className="px-6 py-4">{qr.desc}</td>
                              <td className="px-6 py-4">{qr.usage}</td>
                              <td className="px-6 py-4 text-slate-800 font-medium">{qr.amount}</td>
                              <td className="px-6 py-4 text-right text-slate-500">{qr.created}</td>
                              <td className="px-6 py-4 text-center">
                                 <span className={`text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase ${qr.status === 'Active' ? 'bg-[#40C4AA]' : 'bg-slate-400'}`}>
                                    {qr.status}
                                 </span>
                              </td>
                           </tr>
                        ))
                      ) : (
                        <tr>
                           <td colSpan="6" className="text-center py-12 text-slate-400">
                              No QR codes found matching your filters.
                           </td>
                        </tr>
                      )}
                   </tbody>
                </table>
                
                {/* Pagination Footer */}
                {filteredQRCodes.length > 0 && (
                   <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-center text-xs text-slate-400">
                      Showing 1 - {filteredQRCodes.length}
                   </div>
                )}
             </div>
           </>
         )}

         {/* --- PAYMENTS TAB CONTENT (Placeholder) --- */}
         {activeTab === 'Payments' && (
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={32} className="text-slate-400" />
               </div>
               <h3 className="text-lg font-bold text-slate-700 mb-2">No Payments Yet</h3>
               <p className="text-sm text-slate-500 mb-6">Share your QR codes to start receiving payments.</p>
               <button 
                  onClick={() => { setActiveTab('QR Codes'); setCreateModalOpen(true); }}
                  className="text-blue-600 hover:underline text-sm font-medium"
               >
                  Create your first QR Code
               </button>
            </div>
         )}

      </div>

      {/* --- CREATE QR CODE MODAL --- */}
      {isCreateModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               {/* Modal Header */}
               <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-sm font-bold text-slate-800">Create QR Code</h3>
                  <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                     <X size={20} />
                  </button>
               </div>

               {/* Modal Body */}
               <form onSubmit={handleCreateQR} className="p-6 space-y-4">
                  
                  {/* Usage Type */}
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-2 block">QR Usage</label>
                     <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-md w-full hover:bg-slate-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                           <input 
                              type="radio" 
                              name="usage" 
                              value="Multiple Use" 
                              checked={newQrData.usage === 'Multiple Use'}
                              onChange={(e) => setNewQrData({...newQrData, usage: e.target.value})}
                              className="accent-blue-600"
                           />
                           <div className="text-xs">
                              <div className="font-bold text-slate-700">Multiple Use</div>
                              <div className="text-slate-500 scale-90 origin-left">Accept multiple payments</div>
                           </div>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-md w-full hover:bg-slate-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                           <input 
                              type="radio" 
                              name="usage" 
                              value="Single Use" 
                              checked={newQrData.usage === 'Single Use'}
                              onChange={(e) => setNewQrData({...newQrData, usage: e.target.value})}
                              className="accent-blue-600"
                           />
                           <div className="text-xs">
                              <div className="font-bold text-slate-700">Single Use</div>
                              <div className="text-slate-500 scale-90 origin-left">Accept one payment</div>
                           </div>
                        </label>
                     </div>
                  </div>

                  {/* Description */}
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Description (Optional)</label>
                     <input 
                        type="text" 
                        placeholder="e.g. Summer Sale Store 1" 
                        value={newQrData.description}
                        onChange={(e) => setNewQrData({...newQrData, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                     />
                  </div>

                  {/* Amount (Optional for Multiple Use) */}
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">
                        Fixed Amount (Optional)
                     </label>
                     <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                        <input 
                           type="number" 
                           placeholder="0.00" 
                           value={newQrData.amount}
                           onChange={(e) => setNewQrData({...newQrData, amount: e.target.value})}
                           className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                        />
                     </div>
                     <p className="text-[10px] text-slate-400 mt-1">Leave empty for customers to enter any amount.</p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex justify-end gap-3">
                     <button 
                        type="button" 
                        onClick={() => setCreateModalOpen(false)}
                        className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded transition-colors"
                     >
                        Cancel
                     </button>
                     <button 
                        type="submit" 
                        className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm transition-colors"
                     >
                        Create QR Code
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )}

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#022D45] hover:bg-[#0a2544] text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-sm font-medium transition-transform hover:scale-105 z-50">
        <div className="grid place-items-center"><HelpCircle size={18} /></div>
        Help & Support
      </button>

    </div>
  );
};

export default QRCodes;