import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  FileText, 
  Search, 
  Eye, 
  Filter, 
  Settings, 
  AlertTriangle, 
  DollarSign, 
  Lock, 
  Unlock,
  Save,
  X,
  Download
} from 'lucide-react';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';

// Extended Mock Data for approvals with management fields
const APPROVAL_QUEUE = [
  { 
    id: 1, 
    name: "TechRetail Pvt Ltd", 
    type: "Private Limited", 
    gst: "27AABCU9603R1ZN", 
    email: "contact@techretail.com", 
    date: "2023-10-24", 
    status: "Pending", 
    documents: ["Pan_Card.pdf", "GST_Cert.pdf"],
    commission: 2.0,
    payoutEnabled: false,
    dailyLimit: 100000
  },
  { 
    id: 2, 
    name: "Fresh Foods", 
    type: "Proprietorship", 
    gst: "22AAAAA0000A1Z5", 
    email: "billing@freshfoods.in", 
    date: "2023-10-23", 
    status: "Active", 
    documents: ["Pan_Card.pdf"],
    commission: 1.8,
    payoutEnabled: true,
    dailyLimit: 500000
  },
  { 
    id: 3, 
    name: "Alpha Graphics", 
    type: "Individual", 
    gst: "N/A", 
    email: "admin@alpha.com", 
    date: "2023-10-22", 
    status: "Suspended", 
    documents: ["Aadhar_Front.jpg", "Aadhar_Back.jpg"],
    commission: 2.5,
    payoutEnabled: false,
    dailyLimit: 50000
  },
  { 
    id: 4, 
    name: "Urban Textiles", 
    type: "Private Limited", 
    gst: "07AABCT1234Q1Z9", 
    email: "sales@urbantex.com", 
    date: "2023-10-21", 
    status: "Verified", 
    documents: ["Incorp_Cert.pdf", "Bank_Statement.pdf"],
    commission: 1.9,
    payoutEnabled: true,
    dailyLimit: 1000000
  },
];

const MerchantApprovals = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState(null); // For Management Modal
  const [viewingDocument, setViewingDocument] = useState(null); // For Document Viewer

  // Filter logic
  const filteredMerchants = APPROVAL_QUEUE.filter(merchant => {
    const matchesFilter = filter === 'All' || merchant.status === filter;
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (id, newStatus) => {
    console.log(`Changing status of merchant ${id} to ${newStatus}`);
    // API call logic here
    if (newStatus === 'Rejected' || newStatus === 'Suspended') {
        const reason = prompt(`Enter reason for ${newStatus}:`);
        if (!reason) return; 
    }
    alert(`Merchant status updated to ${newStatus}`);
    setSelectedMerchant(null);
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    alert("Configuration saved successfully!");
    setSelectedMerchant(null);
  };

  const handleViewDocument = (docName) => {
    setViewingDocument(docName);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 w-full md:w-auto bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search merchants..." 
            className="bg-transparent outline-none text-sm w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
           {['All', 'Pending', 'Verified', 'Active', 'Suspended', 'Rejected'].map(status => (
             <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === status 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
             >
               {status}
             </button>
           ))}
        </div>
      </div>

      {/* Approvals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-lg font-bold text-slate-800">Merchant Management</h3>
           <p className="text-sm text-slate-500">Verify KYC, approve accounts, and configure limits.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">Merchant Details</th>
                <th className="px-6 py-4 font-medium">Business Type</th>
                <th className="px-6 py-4 font-medium">Documents</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMerchants.length > 0 ? (
                filteredMerchants.map((merchant) => (
                  <tr key={merchant.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-800">{merchant.name}</p>
                        <p className="text-sm text-slate-500">{merchant.email}</p>
                        <div className="flex gap-2 mt-1">
                             <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">GST: {merchant.gst}</span>
                             {merchant.payoutEnabled ? (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1"><Unlock size={10} /> Payouts On</span>
                             ) : (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded flex items-center gap-1"><Lock size={10} /> Payouts Off</span>
                             )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {merchant.type}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {merchant.documents.map((doc, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => handleViewDocument(doc)}
                            className="flex items-center gap-1 text-xs text-blue-600 hover:underline text-left group"
                          >
                            <FileText size={12} className="group-hover:text-blue-800" /> {doc}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={merchant.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {merchant.status === 'Pending' && (
                           <>
                             <button onClick={() => handleStatusChange(merchant.id, 'Verified')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100" title="Approve">
                                <CheckCircle size={18} />
                             </button>
                             <button onClick={() => handleStatusChange(merchant.id, 'Rejected')} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Reject">
                                <XCircle size={18} />
                             </button>
                           </>
                        )}
                        <Button 
                            variant="secondary" 
                            className="text-xs" 
                            icon={Settings} 
                            onClick={() => setSelectedMerchant(merchant)}
                        >
                           Manage
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    <Filter className="mx-auto h-8 w-8 mb-2 opacity-50" />
                    <p>No merchants found matching your filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MANAGEMENT MODAL --- */}
      {selectedMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 rounded-t-xl">
               <div>
                  <h2 className="text-xl font-bold text-slate-800">Manage Merchant</h2>
                  <p className="text-sm text-slate-500">{selectedMerchant.name} ({selectedMerchant.id})</p>
               </div>
               <button onClick={() => setSelectedMerchant(null)} className="text-slate-400 hover:text-slate-600">
                 <X size={24} />
               </button>
            </div>

            <div className="p-6 space-y-8">
               
               {/* 1. Status Actions */}
               <section>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Account Actions</h3>
                  <div className="flex gap-3">
                     {selectedMerchant.status !== 'Verified' && selectedMerchant.status !== 'Active' && (
                        <button 
                            onClick={() => handleStatusChange(selectedMerchant.id, 'Verified')}
                            className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 flex justify-center items-center gap-2"
                        >
                            <CheckCircle size={18} /> Approve & Activate
                        </button>
                     )}
                     
                     {selectedMerchant.status !== 'Suspended' && (
                        <button 
                            onClick={() => handleStatusChange(selectedMerchant.id, 'Suspended')}
                            className="flex-1 bg-amber-100 text-amber-700 py-2.5 rounded-lg font-medium hover:bg-amber-200 flex justify-center items-center gap-2"
                        >
                            <AlertTriangle size={18} /> Suspend Account
                        </button>
                     )}

                     <button 
                        onClick={() => handleStatusChange(selectedMerchant.id, 'Rejected')}
                        className="flex-1 bg-red-50 text-red-600 border border-red-100 py-2.5 rounded-lg font-medium hover:bg-red-100 flex justify-center items-center gap-2"
                     >
                        <XCircle size={18} /> Reject / Ban
                     </button>
                  </div>
               </section>

               {/* 2. Configuration Form */}
               <form onSubmit={handleSaveConfig}>
                   <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Financial Configuration</h3>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                       {/* Commission Fee */}
                       <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                             Platform Commission (%)
                          </label>
                          <div className="relative">
                             <input 
                                type="number" 
                                step="0.01" 
                                defaultValue={selectedMerchant.commission} 
                                className="w-full p-2.5 border border-slate-300 rounded-lg pl-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                             />
                             <span className="absolute right-3 top-2.5 text-slate-400 font-medium">%</span>
                          </div>
                          <p className="text-xs text-slate-500">Standard rate is 2.0%</p>
                       </div>

                       {/* Transaction Limit */}
                       <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Daily Transaction Limit</label>
                          <div className="relative">
                             <span className="absolute left-3 top-2.5 text-slate-400 font-medium">₹</span>
                             <input 
                                type="number" 
                                defaultValue={selectedMerchant.dailyLimit} 
                                className="w-full p-2.5 border border-slate-300 rounded-lg pl-8 outline-none focus:ring-2 focus:ring-blue-500"
                             />
                          </div>
                       </div>
                   </div>

                   {/* Payout Toggle */}
                   <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                       <div>
                          <h4 className="font-bold text-slate-800 text-sm">Payout Access</h4>
                          <p className="text-xs text-slate-500 mt-1">Allow merchant to withdraw funds to bank</p>
                       </div>
                       <div className="flex items-center gap-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={selectedMerchant.payoutEnabled} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                       </div>
                   </div>

                   {/* Documents Section (Read Only) */}
                   <div className="mt-6">
                      <h4 className="font-bold text-slate-800 text-sm mb-3">Submitted Documents</h4>
                      <div className="flex flex-wrap gap-2">
                         {selectedMerchant.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-600">
                               <FileText size={16} className="text-blue-500" />
                               {doc}
                               <button 
                                 onClick={() => handleViewDocument(doc)} 
                                 className="ml-2 text-xs text-blue-600 font-medium hover:underline hover:text-blue-800"
                               >
                                 View
                               </button>
                            </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setSelectedMerchant(null)} type="button">Cancel</Button>
                      <Button variant="primary" icon={Save} type="submit">Save Changes</Button>
                   </div>
               </form>
            </div>
          </div>
        </div>
      )}

      {/* --- DOCUMENT VIEWER MODAL (Z-Index 60 to appear above Management Modal) --- */}
      {viewingDocument && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
                 <div className="flex items-center gap-2">
                    <FileText size={20} className="text-blue-600" />
                    <h3 className="font-bold text-slate-800">{viewingDocument}</h3>
                 </div>
                 <div className="flex gap-2">
                     <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors" title="Download">
                         <Download size={20} />
                     </button>
                     <button onClick={() => setViewingDocument(null)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                         <X size={20} />
                     </button>
                 </div>
              </div>
              <div className="flex-1 bg-slate-100 p-8 flex flex-col items-center justify-center">
                 {/* Placeholder for PDF/Image Viewer */}
                 <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-200 text-center max-w-lg">
                    <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                       <FileText size={48} className="text-slate-400" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Document Preview</h4>
                    <p className="text-slate-500 mb-6">
                       This is a mock preview for <span className="font-mono text-slate-700 font-medium">{viewingDocument}</span>. 
                       In a production environment, this area would render the actual PDF or Image file.
                    </p>
                    <Button onClick={() => setViewingDocument(null)} variant="outline">Close Preview</Button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MerchantApprovals;