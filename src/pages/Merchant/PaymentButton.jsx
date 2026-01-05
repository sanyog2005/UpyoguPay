import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Plus, 
  HelpCircle, 
  X, 
  Lock, 
  Code, 
  MousePointerClick,
  Copy,
  Trash2,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';

const PaymentButton = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('Payment Buttons'); // Payment Buttons, Subscription Buttons
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  // Data State
  const [buttons, setButtons] = useState([]); 
  const [newButtonData, setNewButtonData] = useState({ title: '', label: 'Pay Now', amount: '' });

  // Filter State
  const [filters, setFilters] = useState({
    title: '',
    status: 'All',
    count: '25'
  });

  // --- DERIVED STATE ---
  const filteredButtons = buttons.filter(btn => {
    const matchesTitle = btn.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchesStatus = filters.status === 'All' || btn.status === filters.status;
    return matchesTitle && matchesStatus;
  });

  // --- HANDLERS ---
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newBtn = {
      id: `btn_${Math.random().toString(36).substr(2, 9)}`,
      title: newButtonData.title,
      itemName: newButtonData.title, // Simplified mapping
      totalSales: '₹ 0.00',
      unitsSold: 0,
      created: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Active'
    };
    
    setButtons([newBtn, ...buttons]);
    setCreateModalOpen(false);
    setNewButtonData({ title: '', label: 'Pay Now', amount: '' });
    
    // Optional: Auto-hide get started if first item created
    // if (showGetStarted) setShowGetStarted(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this button?")) {
      setButtons(buttons.filter(b => b.id !== id));
    }
  };

  const handleCopyCode = () => {
    alert("HTML Code copied to clipboard! Paste this in your website.");
  };

  const handleClear = () => {
    setFilters({ title: '', status: 'All', count: '25' });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Get Started Wizard (Visible only if no buttons exist yet) */}
      {showGetStarted && buttons.length === 0 && (
        <div className="mx-8 mt-6 bg-white border border-gray-200 rounded-sm shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowGetStarted(false)}>
              <X size={16} className="text-slate-400 hover:text-slate-600" />
           </div>
           
           <div className="p-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-8 flex items-center gap-2">
                 <span className="w-4 h-0.5 bg-green-500 block"></span> GET STARTED
              </h3>

              <div className="flex justify-center items-center gap-4 max-w-5xl mx-auto py-8">
                 {/* Step 1 */}
                 <div className="flex-1 flex flex-col items-center text-center relative z-10">
                    <div className="w-8 h-8 rounded-full border-4 border-blue-100 bg-blue-600 flex items-center justify-center text-white mb-4 shadow-sm relative">
                       <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">1. Create a Button</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Start by creating a Payment Button to collect online payments or donations.</p>
                 </div>

                 <div className="flex-1 border-t-2 border-dotted border-slate-200 h-0 -mt-16 mx-4"></div>

                 {/* Step 2 */}
                 <div className="flex-1 flex flex-col items-center text-center relative z-10 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                       <Lock size={14} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">2. Copy and Paste the Code</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Get a single line code that you put on your website or blog to enable online payments.</p>
                 </div>

                 <div className="flex-1 border-t-2 border-dotted border-slate-200 h-0 -mt-16 mx-4"></div>

                 {/* Step 3 */}
                 <div className="flex-1 flex flex-col items-center text-center relative z-10 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                       <Lock size={14} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">3. Receive Payments</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Customers and supports will use this button to make payments on your website or blog.</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 2. Main Content */}
      <div className="px-8 py-6">
         
         {/* Tabs & Actions */}
         <div className="flex justify-between items-end border-b border-gray-200 mb-6">
            <div className="flex gap-8">
               {['Payment Buttons', 'Subscription Buttons'].map((tab) => (
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
                  <Plus size={16} /> Create Payment Button
               </button>
            </div>
         </div>

         {/* Test Mode Warning Banner */}
         <div className="bg-[#FFF8E1] border border-[#FFECB3] text-[#F57F17] px-4 py-3 rounded-sm text-xs flex items-center gap-2 mb-6">
            <span>You are in <b>Test Mode</b>, so only test data is shown. Switch to <a href="#" className="underline font-bold">Live mode</a> to see real transaction data.</span>
         </div>

         {activeTab === 'Payment Buttons' ? (
           <>
             {/* Filters */}
             <div className="bg-white p-5 border-x border-t border-gray-200 rounded-t-sm">
                <div className="grid grid-cols-6 gap-4 items-end">
                   <div className="col-span-2">
                      <label className="text-xs font-bold text-slate-500 mb-1.5 block">Title</label>
                      <input 
                         type="text" 
                         className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" 
                         value={filters.title}
                         onChange={(e) => handleFilterChange('title', e.target.value)}
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
                      <input type="number" defaultValue="25" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
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
                   <div>Title</div>
                   <div>Total Sales</div>
                   <div>Item Name</div>
                   <div>Units Sold</div>
                   <div>Created At</div>
                   <div>Status</div>
                   <div className="text-right">Actions</div>
                </div>

                {filteredButtons.length > 0 ? (
                   <div className="divide-y divide-gray-100">
                      {filteredButtons.map((btn) => (
                         <div key={btn.id} className="grid grid-cols-7 px-6 py-4 text-xs items-center hover:bg-slate-50 transition-colors group">
                            <div className="font-bold text-slate-700">{btn.title}</div>
                            <div className="text-slate-600">{btn.totalSales}</div>
                            <div className="text-slate-600">{btn.itemName}</div>
                            <div className="text-slate-600">{btn.unitsSold}</div>
                            <div className="text-slate-500">{btn.created}</div>
                            <div>
                               <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                  btn.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                               }`}>
                                  {btn.status}
                               </span>
                            </div>
                            <div className="text-right flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={handleCopyCode} title="Copy Code" className="p-1.5 hover:bg-blue-50 text-blue-600 rounded">
                                  <Code size={14} />
                               </button>
                               <button onClick={() => handleDelete(btn.id)} title="Delete" className="p-1.5 hover:bg-red-50 text-red-600 rounded">
                                  <Trash2 size={14} />
                               </button>
                            </div>
                         </div>
                      ))}
                   </div>
                ) : (
                   /* Empty State */
                   <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white relative">
                      {buttons.length === 0 ? (
                        <>
                          {/* Isometric Placeholder Construction */}
                          <div className="mb-6 relative w-48 h-32 opacity-80">
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-50 rounded-xl rotate-45 border-4 border-blue-100 flex items-center justify-center shadow-lg">
                                <MousePointerClick size={40} className="text-blue-400 -rotate-45" />
                             </div>
                             <div className="absolute top-10 right-4 w-12 h-16 bg-white border border-gray-100 shadow-md rounded flex flex-col p-1 gap-1">
                                <div className="h-2 bg-blue-100 rounded w-full"></div>
                                <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                             </div>
                             <div className="absolute bottom-4 left-6 w-16 h-10 bg-white border border-gray-100 shadow-md rounded flex items-center justify-center">
                                <span className="text-[10px] font-bold text-green-500">₹</span>
                             </div>
                          </div>

                          <h3 className="text-base font-bold text-slate-700 mb-1">It's Lonely Here!</h3>
                          <p className="text-sm text-slate-500 mb-4">Create a Payment Button to get Started</p>
                          
                          <div className="text-xs text-slate-400">
                             Not sure where to start? See our getting <a href="#" className="text-blue-600 hover:underline">started guide <ExternalLink size={10} className="inline" /></a>
                          </div>
                        </>
                      ) : (
                        <div className="text-slate-500 text-sm">No buttons found matching your filters.</div>
                      )}
                   </div>
                )}
             </div>
           </>
         ) : (
           /* Placeholder for Subscription Buttons */
           <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center">
              <h3 className="text-lg font-bold text-slate-700 mb-2">Subscription Buttons</h3>
              <p className="text-sm text-slate-500 mb-6">Create buttons for recurring payments here.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold">Create Subscription Button</button>
           </div>
         )}

      </div>

      {/* --- CREATE BUTTON MODAL --- */}
      {isCreateModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-sm font-bold text-slate-800">Create Payment Button</h3>
                  <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                     <X size={20} />
                  </button>
               </div>
               <form onSubmit={handleCreate} className="p-6 space-y-4">
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Button Title <span className="text-red-500">*</span></label>
                     <input 
                        type="text" 
                        required
                        placeholder="e.g. Donate Now"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                        value={newButtonData.title}
                        onChange={(e) => setNewButtonData({...newButtonData, title: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Button Label</label>
                     <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white"
                        value={newButtonData.label}
                        onChange={(e) => setNewButtonData({...newButtonData, label: e.target.value})}
                     >
                        <option>Pay Now</option>
                        <option>Donate</option>
                        <option>Buy Now</option>
                        <option>Support</option>
                     </select>
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Fixed Amount (Optional)</label>
                     <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                        <input 
                           type="number" 
                           placeholder="0.00"
                           className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                           value={newButtonData.amount}
                           onChange={(e) => setNewButtonData({...newButtonData, amount: e.target.value})}
                        />
                     </div>
                  </div>
                  <div className="pt-4 flex justify-end gap-3">
                     <button type="button" onClick={() => setCreateModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
                     <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm">Create</button>
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

export default PaymentButton;