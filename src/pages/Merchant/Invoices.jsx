import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Plus, 
  HelpCircle, 
  X, 
  Lock, 
  FileText, // Icon for Invoice
  MoreVertical,
  Download,
  Send,
  CheckCircle2
} from 'lucide-react';

const Invoices = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('Invoices'); // Invoices, Items
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  // Data State
  const [invoices, setInvoices] = useState([]); // Start empty to match screenshot
  const [newInvoiceData, setNewInvoiceData] = useState({ customer: '', amount: '', dueDate: '' });

  // Filter State
  const [filters, setFilters] = useState({
    id: '',
    status: 'All'
  });

  // --- DERIVED STATE ---
  const filteredInvoices = invoices.filter(inv => {
    const matchesId = inv.id.toLowerCase().includes(filters.id.toLowerCase());
    const matchesStatus = filters.status === 'All' || inv.status === filters.status;
    return matchesId && matchesStatus;
  });

  // --- HANDLERS ---
  const handleCreate = (e) => {
    e.preventDefault();
    const newInv = {
      id: `inv_${Math.random().toString(36).substr(2, 9)}`,
      customer: newInvoiceData.customer,
      amount: `₹ ${parseFloat(newInvoiceData.amount).toFixed(2)}`,
      status: 'Issued',
      issuedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      dueDate: newInvoiceData.dueDate ? new Date(newInvoiceData.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'
    };
    
    setInvoices([newInv, ...invoices]);
    setCreateModalOpen(false);
    setNewInvoiceData({ customer: '', amount: '', dueDate: '' });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Get Started Wizard (Visible only if no invoices exist yet) */}
      {showGetStarted && invoices.length === 0 && (
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
                    <h4 className="text-sm font-bold text-slate-800">1. Create Invoice</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Create GST based invoices instantly and notify your customer via sms or email.</p>
                 </div>

                 {/* Connector */}
                 <div className="flex-1 border-t-2 border-dotted border-slate-200 h-0 -mt-16 mx-4"></div>

                 {/* Step 2 */}
                 <div className="flex-1 flex flex-col items-center text-center relative z-10 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                       <Lock size={14} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">2. Receive Payments</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Your customers can make payments directly via the invoice link.</p>
                 </div>
              </div>
              
              {/* Decorative Background Left */}
              <div className="absolute left-0 bottom-0 opacity-20 pointer-events-none w-64">
                 <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 200L100 150L200 200V100L100 50L0 100V200Z" fill="#3B82F6"/>
                 </svg>
              </div>
           </div>
        </div>
      )}

      {/* 2. Main Content */}
      <div className="px-8 py-6">
         
         {/* Tabs & Actions */}
         <div className="flex justify-between items-end border-b border-gray-200 mb-6">
            <div className="flex gap-8">
               {['Invoices', 'Items'].map((tab) => (
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
               {/* Only show Create button here if table has data, otherwise empty state shows it */}
               {invoices.length > 0 && (
                  <button 
                     onClick={() => setCreateModalOpen(true)}
                     className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded shadow-sm transition-colors flex items-center gap-2"
                  >
                     <Plus size={16} /> Create Invoice
                  </button>
               )}
            </div>
         </div>

         {activeTab === 'Invoices' ? (
           <>
             {/* Data Table */}
             <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                {invoices.length > 0 ? (
                   <>
                      {/* Table Header */}
                      <div className="bg-[#FAFAFA] border-b border-gray-200 grid grid-cols-6 text-xs font-bold text-slate-500 uppercase tracking-wide px-6 py-4">
                         <div>Invoice ID</div>
                         <div>Customer</div>
                         <div>Amount</div>
                         <div>Issued At</div>
                         <div>Due Date</div>
                         <div className="text-right">Status</div>
                      </div>
                      
                      {/* Table Body */}
                      <div className="divide-y divide-gray-100">
                         {filteredInvoices.map((inv) => (
                            <div key={inv.id} className="grid grid-cols-6 px-6 py-4 text-xs items-center hover:bg-slate-50 transition-colors group">
                               <div className="font-bold text-blue-600 hover:underline cursor-pointer">{inv.id}</div>
                               <div className="text-slate-700 font-medium">{inv.customer}</div>
                               <div className="text-slate-700">{inv.amount}</div>
                               <div className="text-slate-500">{inv.issuedAt}</div>
                               <div className="text-slate-500">{inv.dueDate}</div>
                               <div className="text-right flex items-center justify-end gap-3">
                                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-[10px] font-bold uppercase border border-blue-100">
                                     {inv.status}
                                  </span>
                                  <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <MoreVertical size={14} />
                                  </button>
                               </div>
                            </div>
                         ))}
                      </div>
                   </>
                ) : (
                   /* Empty State */
                   <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white">
                      <h3 className="text-sm font-bold text-slate-600 mb-1">There are no invoices yet!!</h3>
                      <p className="text-xs text-slate-500 mb-6">Start creating new invoices now.</p>
                      
                      <button 
                         onClick={() => setCreateModalOpen(true)}
                         className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded shadow-sm transition-colors flex items-center gap-2"
                      >
                         <Plus size={16} /> Create Invoice
                      </button>
                   </div>
                )}
             </div>
           </>
         ) : (
           /* Placeholder for Items Tab */
           <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center">
              <h3 className="text-lg font-bold text-slate-700 mb-2">Items Library</h3>
              <p className="text-sm text-slate-500 mb-6">Manage your products and services to add them quickly to invoices.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold">Add Item</button>
           </div>
         )}

      </div>

      {/* --- CREATE INVOICE MODAL --- */}
      {isCreateModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-sm font-bold text-slate-800">Create New Invoice</h3>
                  <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                     <X size={20} />
                  </button>
               </div>
               <form onSubmit={handleCreate} className="p-6 space-y-4">
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Customer Name</label>
                     <input 
                        type="text" 
                        required
                        placeholder="e.g. Acme Corp"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                        value={newInvoiceData.customer}
                        onChange={(e) => setNewInvoiceData({...newInvoiceData, customer: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Amount</label>
                     <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                        <input 
                           type="number" 
                           required
                           placeholder="0.00"
                           className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                           value={newInvoiceData.amount}
                           onChange={(e) => setNewInvoiceData({...newInvoiceData, amount: e.target.value})}
                        />
                     </div>
                  </div>
                  <div>
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">Due Date (Optional)</label>
                     <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-slate-600"
                        value={newInvoiceData.dueDate}
                        onChange={(e) => setNewInvoiceData({...newInvoiceData, dueDate: e.target.value})}
                     />
                  </div>
                  <div className="pt-4 flex justify-end gap-3">
                     <button type="button" onClick={() => setCreateModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
                     <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm">Create Invoice</button>
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

export default Invoices;