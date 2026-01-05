import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Plus, 
  HelpCircle, 
  X, 
  Lock,
  MoreVertical,
  Trash2,
  Copy,
  CreditCard,
  Eye
} from 'lucide-react';

const PaymentPages = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('Payment Pages');
  const [pageType, setPageType] = useState('Payment Pages'); // Payment Pages, UpyoguPay Webstore
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  // Data State
  const [pages, setPages] = useState([]); // Start empty to match initial view
  const [newPageData, setNewPageData] = useState({ title: '', description: '', amount: '' });

  // Filter State
  const [filters, setFilters] = useState({
    title: '',
    status: 'All',
    count: '25'
  });

  // --- DERIVED STATE (Filtering) ---
  const filteredPages = pages.filter(page => {
    const matchesTitle = page.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchesStatus = filters.status === 'All' || page.status === filters.status;
    const matchesType = page.type === pageType; // Filter by Payment Page vs Webstore
    return matchesTitle && matchesStatus && matchesType;
  });

  // --- HANDLERS ---
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newPage = {
      id: `pp_${Math.random().toString(36).substr(2, 9)}`,
      title: newPageData.title,
      description: newPageData.description || 'No description provided',
      url: `https://pages.UpyoguPay.com/${newPageData.title.replace(/\s+/g, '-').toLowerCase()}`,
      created: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      amount: newPageData.amount ? `₹ ${parseFloat(newPageData.amount).toFixed(2)}` : 'Flexible',
      status: 'Active',
      type: pageType // Assign current view type to the new page
    };
    
    setPages([newPage, ...pages]);
    setCreateModalOpen(false);
    setNewPageData({ title: '', description: '', amount: '' });
    // Optional: Hide Get Started if first item created
    // if (showGetStarted) setShowGetStarted(false); 
  };

  const handleClear = () => {
    setFilters({ title: '', status: 'All', count: '25' });
  };

  const handleStatusToggle = (id) => {
    setPages(pages.map(p => 
      p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
    ));
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Payment Page URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Get Started Section (Shows only if no pages created yet) */}
      {showGetStarted && pages.length === 0 && (
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
                    <h4 className="text-sm font-bold text-slate-800">1. Create Payment Page</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Create your own custom pages by adding fields to collect relevant customer information.</p>
                 </div>

                 {/* Connector Line */}
                 <div className="flex-1 border-t-2 border-dotted border-slate-200 h-0 -mt-16 mx-4"></div>

                 {/* Step 2 */}
                 <div className="flex-1 flex flex-col items-center text-center relative z-10 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                       <Lock size={14} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">2. Receive Payments</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Publish your page to receive payments from your customers.</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 2. Main Content Area */}
      <div className="px-8 py-6">
         
         {/* Tabs Header */}
         <div className="flex justify-between items-end border-b border-gray-200 mb-6">
            <div className="flex gap-8">
               {['Payment Pages', 'Products'].map((tab) => (
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
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded shadow-sm transition-colors flex items-center gap-2"
               >
                  <Plus size={16} /> Create Payment Page
               </button>
            </div>
         </div>

         {/* Page Type Toggle & Test Mode Banner */}
         <div className="space-y-4 mb-6">
            {/* Type Toggle Buttons */}
            <div className="flex gap-4">
               <button 
                  onClick={() => setPageType('Payment Pages')}
                  className={`flex items-center gap-2 px-6 py-3 border rounded transition-all ${
                     pageType === 'Payment Pages' 
                     ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm relative' 
                     : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'
                  }`}
               >
                  {pageType === 'Payment Pages' && (
                     <div className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-600"></div>
                  )}
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${pageType === 'Payment Pages' ? 'border-blue-600' : 'border-slate-400'}`}>
                     {pageType === 'Payment Pages' && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </div>
                  <span className="text-sm font-medium">Payment Pages</span>
               </button>

               <button 
                  onClick={() => setPageType('UpyoguPay Webstore')}
                  className={`flex items-center gap-2 px-6 py-3 border rounded transition-all ${
                     pageType === 'UpyoguPay Webstore' 
                     ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm relative' 
                     : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'
                  }`}
               >
                  {pageType === 'UpyoguPay Webstore' && (
                     <div className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-600"></div>
                  )}
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${pageType === 'UpyoguPay Webstore' ? 'border-blue-600' : 'border-slate-400'}`}>
                     {pageType === 'UpyoguPay Webstore' && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </div>
                  <span className="text-sm font-medium">UpyoguPay Webstore</span>
               </button>
            </div>

            {/* Test Mode Warning Banner */}
            <div className="bg-[#FFF8E1] border border-[#FFECB3] text-[#F57F17] px-4 py-3 rounded-sm text-xs flex items-center gap-2">
               <span>You are in <b>Test Mode</b>, so only test data is shown. Switch to <a href="#" className="underline font-bold">Live mode</a> to see real transaction data.</span>
            </div>
         </div>

         {/* Filters Panel */}
         <div className="bg-white p-5 border-x border-t border-gray-200 rounded-t-sm">
            <div className="grid grid-cols-6 gap-4 items-end">
               <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Title</label>
                  <input 
                    type="text" 
                    value={filters.title}
                    onChange={(e) => handleFilterChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" 
                  />
               </div>
               <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Status</label>
                  <select 
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-slate-600 focus:outline-none focus:border-blue-500 bg-white"
                  >
                     <option value="All">All</option>
                     <option value="Active">Active</option>
                     <option value="Inactive">Inactive</option>
                  </select>
               </div>
               <div className="col-span-1">
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Count</label>
                  <input 
                    type="number" 
                    value={filters.count}
                    onChange={(e) => handleFilterChange('count', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" 
                  />
               </div>
               <div className="col-span-1 flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded transition-colors flex-1 h-[34px]">
                     Search
                  </button>
                  <button 
                     onClick={handleClear}
                     className="bg-[#F3F4F6] hover:bg-gray-200 text-slate-600 text-xs font-bold px-3 py-2 rounded border border-transparent transition-colors h-[34px]"
                  >
                     Clear
                  </button>
               </div>
            </div>
         </div>

         {/* Data Table */}
         <div className="bg-white border border-gray-200 border-t-0 rounded-b-sm overflow-hidden min-h-[400px] flex flex-col">
            <div className="bg-[#FAFAFA] border-b border-gray-200 grid grid-cols-7 text-xs font-bold text-slate-500 uppercase tracking-wide px-6 py-4">
               <div className="col-span-2">Page Title</div>
               <div className="col-span-2">Page URL</div>
               <div>Amount</div>
               <div>Created At</div>
               <div className="text-center">Status</div>
            </div>

            {filteredPages.length > 0 ? (
               <div className="divide-y divide-gray-100">
                  {filteredPages.map((page) => (
                     <div key={page.id} className="grid grid-cols-7 px-6 py-4 text-xs items-center hover:bg-slate-50 transition-colors group relative">
                        <div className="col-span-2">
                           <div className="font-bold text-slate-700 text-sm">{page.title}</div>
                           <div className="text-slate-500 truncate mt-0.5">{page.id}</div>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                           <a href="#" className="text-blue-600 hover:underline truncate max-w-[200px]">{page.url}</a>
                           <button onClick={() => handleCopyLink(page.url)} className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Copy size={12} />
                           </button>
                        </div>
                        <div className="font-medium text-slate-700">{page.amount}</div>
                        <div className="text-slate-500">{page.created}</div>
                        <div className="text-center relative">
                           <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                              page.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                           }`}>
                              {page.status}
                           </span>
                           
                           {/* Hover Actions Menu */}
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                              <button onClick={() => handleStatusToggle(page.id)} title={page.status === 'Active' ? 'Deactivate' : 'Activate'} className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 text-slate-500">
                                 {page.status === 'Active' ? <Lock size={14} /> : <Eye size={14} />}
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               /* Empty State */
               <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#FCFCFC]">
                  {pages.length === 0 ? (
                     <>
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                           <CreditCard size={24} className="text-slate-300" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-600 mb-1">No Payment Pages created yet</h3>
                        <p className="text-xs text-slate-500 mb-4">Create a page to start accepting payments.</p>
                        <button 
                           onClick={() => setCreateModalOpen(true)}
                           className="text-blue-600 text-xs font-bold hover:underline"
                        >
                           Create your first Payment Page
                        </button>
                     </>
                  ) : (
                     <div className="text-slate-500 text-sm">No pages found matching your filters.</div>
                  )}
               </div>
            )}
         </div>

      </div>

      {/* --- CREATE PAYMENT PAGE MODAL --- */}
      {isCreateModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-sm font-bold text-slate-800">Create Payment Page</h3>
                  <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                     <X size={20} />
                  </button>
               </div>
               <form onSubmit={handleCreate} className="p-6 space-y-4">
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Page Title <span className="text-red-500">*</span></label>
                     <input 
                        type="text" 
                        required
                        placeholder="e.g. Workshop Registration"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                        value={newPageData.title}
                        onChange={(e) => setNewPageData({...newPageData, title: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Description</label>
                     <textarea 
                        rows="3"
                        placeholder="Briefly describe what this payment is for..."
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
                        value={newPageData.description}
                        onChange={(e) => setNewPageData({...newPageData, description: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Fixed Amount (Optional)</label>
                     <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                        <input 
                           type="number" 
                           placeholder="0.00"
                           className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                           value={newPageData.amount}
                           onChange={(e) => setNewPageData({...newPageData, amount: e.target.value})}
                        />
                     </div>
                     <p className="text-[10px] text-slate-400 mt-1">Leave blank if you want customers to enter the amount.</p>
                  </div>
                  
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
                        Create
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

export default PaymentPages;