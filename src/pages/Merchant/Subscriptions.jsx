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
  Lock,
  Megaphone,
  MoreVertical
} from 'lucide-react';

const Subscriptions = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('Subscriptions'); // Subscriptions, Plans, Settings
  const [showPosBanner, setShowPosBanner] = useState(true);
  const [showUpdateBanner, setShowUpdateBanner] = useState(true);
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  // Data State
  const [subscriptions, setSubscriptions] = useState([]); // Start empty to match screenshot
  const [newSubData, setNewSubData] = useState({ email: '', plan: 'Standard Plan', start_at: 'Immediate' });

  // Filter State
  const [filters, setFilters] = useState({
    email: '',
    status: 'All',
    count: '25'
  });

  // --- DERIVED STATE ---
  const activeCount = subscriptions.filter(s => s.status === 'Active').length;
  const haltedCount = subscriptions.filter(s => s.status === 'Halted').length;
  // Just mocking these two for visual consistency
  const completingCount = 0;
  const expiringCount = 0;

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesEmail = sub.email.toLowerCase().includes(filters.email.toLowerCase());
    const matchesStatus = filters.status === 'All' || sub.status === filters.status;
    return matchesEmail && matchesStatus;
  });

  // --- HANDLERS ---
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newSub = {
      id: `sub_${Math.random().toString(36).substr(2, 9)}`,
      planId: `plan_${Math.random().toString(36).substr(2, 6)}`,
      link: 'https://rzp.io/i/X9s...',
      customerId: `cust_${Math.random().toString(36).substr(2, 6)}`,
      email: newSubData.email,
      nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'), // +30 days
      created: new Date().toLocaleDateString('en-GB'),
      status: 'Active'
    };
    setSubscriptions([newSub, ...subscriptions]);
    setCreateModalOpen(false);
    setNewSubData({ email: '', plan: 'Standard Plan', start_at: 'Immediate' });
    // If getting started banner is open, we can close it or advance steps (optional UX choice)
  };

  const handleClear = () => {
    setFilters({ email: '', status: 'All', count: '25' });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Top POS Banner */}
      {showPosBanner && (
        <div className="bg-white border-b border-gray-200 flex items-center justify-between pl-0 pr-4 h-12 overflow-hidden sticky top-0 z-20">
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

      {/* 2. Important Update Banner */}
      {showUpdateBanner && (
        <div className="bg-white border-b border-gray-200 flex items-center justify-between pl-0 pr-4 h-12 overflow-hidden z-10 relative">
            <div className="flex items-center h-full">
                <div className="bg-[#FFC107] h-full flex items-center px-6 relative z-10">
                    <span className="text-white font-bold text-sm uppercase">Important Update</span>
                    <div className="absolute right-[-20px] top-0 border-l-[20px] border-l-[#FFC107] border-b-[48px] border-b-transparent h-full"></div>
                </div>
                <div className="ml-8 text-sm text-slate-600 truncate">
                    Activate your 'pending' and 'halted' subscriptions by updating payment methods! <a href="#" className="text-blue-600 hover:underline font-medium">Click here to know more</a>
                </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
                <button onClick={() => setShowUpdateBanner(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                </button>
            </div>
        </div>
      )}

      {/* 3. Get Started Section (Only shows if list is empty or explicitly kept open) */}
      {showGetStarted && subscriptions.length === 0 && (
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
                    <h4 className="text-sm font-bold text-slate-800">1. Create Plan</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Create your custom plans with different billing cycles and prices for your business.</p>
                 </div>
                 <div className="flex-1 border-t-2 border-dotted border-slate-200 h-0 -mt-16 mx-4"></div>
                 {/* Step 2 */}
                 <div className="flex-1 flex flex-col items-center text-center relative z-10 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-white mb-4 shadow-sm">
                       <Lock size={14} className="text-slate-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">2. Create Subscription</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Create subscriptions for your customers to receive recurring payments</p>
                 </div>
                 <div className="flex-1 border-t-2 border-dotted border-slate-200 h-0 -mt-16 mx-4"></div>
                 {/* Step 3 */}
                 <div className="flex-1 flex flex-col items-center text-center relative z-10 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-white mb-4 shadow-sm">
                       <Lock size={14} className="text-slate-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">3. Receive Payments</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Share subscription link with your customers to receive recurring payments.</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 4. Main Content Area */}
      <div className="px-8 py-6">
         
         {/* Tabs & Header Actions */}
         <div className="flex justify-between items-end border-b border-gray-200 mb-6">
            <div className="flex gap-8">
               {['Subscriptions', 'Plans', 'Settings'].map((tab) => (
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
                  <Plus size={16} /> Create New Subscription
               </button>
            </div>
         </div>

         {activeTab === 'Subscriptions' && (
           <>
             {/* Stats Cards */}
             <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 border border-gray-200 rounded-sm flex items-center gap-4 border-l-4 border-l-blue-500 shadow-sm">
                   <div className="text-2xl font-medium text-slate-800">{activeCount}</div>
                   <div className="text-xs text-slate-500 leading-tight">Active <br/> subscriptions</div>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-sm flex items-center gap-4 border-l-4 border-l-red-500 shadow-sm">
                   <div className="text-2xl font-medium text-slate-800">{haltedCount}</div>
                   <div className="text-xs text-slate-500 leading-tight">Halted <br/> Subscriptions</div>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-sm flex items-center gap-4 border-l-4 border-l-green-500 shadow-sm">
                   <div className="text-2xl font-medium text-slate-800">{completingCount}</div>
                   <div className="text-xs text-slate-500 leading-tight">Subscriptions <br/> completing in 7 days</div>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-sm flex items-center gap-4 border-l-4 border-l-orange-400 shadow-sm">
                   <div className="text-2xl font-medium text-slate-800">{expiringCount}</div>
                   <div className="text-xs text-slate-500 leading-tight">Subscriptions with <br/> Cards Expiring in 7 days</div>
                </div>
             </div>

             {/* Filters Panel */}
             <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm mb-6">
                <div className="grid grid-cols-7 gap-4 items-end">
                   <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 mb-1.5 block">Customer Email</label>
                      <input 
                        type="text" 
                        value={filters.email}
                        onChange={(e) => handleFilterChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" 
                      />
                   </div>
                   <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 mb-1.5 block">Cards Expiring In</label>
                      <select disabled className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-slate-400 bg-gray-50 cursor-not-allowed">
                         <option>Select</option>
                      </select>
                   </div>
                   <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 mb-1.5 block">Subscriptions Completing In</label>
                      <select disabled className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-slate-400 bg-gray-50 cursor-not-allowed">
                         <option>Select</option>
                      </select>
                   </div>
                   <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 mb-1.5 block">Subscription Id</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
                   </div>
                   <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 mb-1.5 block">Plan ID</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
                   </div>
                   <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 mb-1.5 block">Status</label>
                      <select 
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-slate-600 focus:outline-none focus:border-blue-500 bg-white"
                      >
                         <option value="All">All</option>
                         <option value="Active">Active</option>
                         <option value="Halted">Halted</option>
                         <option value="Completed">Completed</option>
                      </select>
                   </div>
                   <div className="col-span-1 flex gap-2">
                      <div className="w-16">
                         <label className="text-xs font-bold text-slate-500 mb-1.5 block">Count</label>
                         <input type="number" defaultValue="25" className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500" />
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded transition-colors flex-1 mt-auto h-[34px]">
                         Search
                      </button>
                      <button onClick={handleClear} className="bg-[#F3F4F6] hover:bg-gray-200 text-slate-600 text-xs font-bold px-3 py-2 rounded border border-transparent transition-colors mt-auto h-[34px]">
                         Clear
                      </button>
                   </div>
                </div>
             </div>

             {/* Data Table */}
             <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                <div className="bg-[#FAFAFA] border-b border-gray-200 grid grid-cols-7 text-xs font-bold text-slate-500 uppercase tracking-wide px-6 py-4">
                   <div>Subscription Id</div>
                   <div>Plan Id</div>
                   <div>Subscription Link</div>
                   <div>Customer Email</div>
                   <div>Next Due on</div>
                   <div className="text-right">Created At</div>
                   <div className="text-center">Status</div>
                </div>

                {/* Content Logic */}
                {filteredSubscriptions.length > 0 ? (
                   <div className="divide-y divide-gray-100">
                      {filteredSubscriptions.map((sub) => (
                         <div key={sub.id} className="grid grid-cols-7 px-6 py-4 text-xs items-center hover:bg-slate-50 transition-colors">
                            <div className="font-medium text-blue-600 hover:underline cursor-pointer">{sub.id}</div>
                            <div className="text-slate-500">{sub.planId}</div>
                            <div className="text-blue-600 hover:underline cursor-pointer truncate pr-2">{sub.link}</div>
                            <div className="text-slate-700 font-medium truncate">{sub.email}</div>
                            <div className="text-slate-500">{sub.nextDue}</div>
                            <div className="text-right text-slate-500">{sub.created}</div>
                            <div className="text-center">
                               <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                  sub.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                               }`}>
                                  {sub.status}
                               </span>
                            </div>
                         </div>
                      ))}
                   </div>
                ) : (
                   /* Empty State */
                   <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                      <h3 className="text-sm font-bold text-slate-600 mb-1">There are no subscriptions yet!!</h3>
                      <p className="text-xs text-slate-500">Create a plan first to create a subscription.</p>
                   </div>
                )}
             </div>
           </>
         )}

         {/* Placeholder for Plans Tab */}
         {activeTab === 'Plans' && (
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center">
               <h3 className="text-lg font-bold text-slate-700 mb-2">Plans Management</h3>
               <p className="text-sm text-slate-500 mb-6">Manage your billing cycles and pricing tiers here.</p>
               <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold">Create New Plan</button>
            </div>
         )}

         {/* Placeholder for Settings Tab */}
         {activeTab === 'Settings' && (
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center">
               <h3 className="text-lg font-bold text-slate-700 mb-2">Subscription Settings</h3>
               <p className="text-sm text-slate-500">Configure webhooks, retries, and email notifications.</p>
            </div>
         )}

      </div>

      {/* --- CREATE SUBSCRIPTION MODAL --- */}
      {isCreateModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-sm font-bold text-slate-800">Create Subscription</h3>
                  <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                     <X size={20} />
                  </button>
               </div>
               <form onSubmit={handleCreate} className="p-6 space-y-4">
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Select Plan</label>
                     <select 
                       className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white"
                       value={newSubData.plan}
                       onChange={(e) => setNewSubData({...newSubData, plan: e.target.value})}
                     >
                        <option>Standard Plan - Monthly</option>
                        <option>Premium Plan - Yearly</option>
                     </select>
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Customer Email</label>
                     <input 
                        type="email" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                        placeholder="customer@example.com"
                        value={newSubData.email}
                        onChange={(e) => setNewSubData({...newSubData, email: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Start At</label>
                     <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white">
                        <option>Immediate</option>
                        <option>Scheduled</option>
                     </select>
                  </div>
                  <div className="pt-4 flex justify-end gap-3">
                     <button type="button" onClick={() => setCreateModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
                     <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm">Create Subscription</button>
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

export default Subscriptions;