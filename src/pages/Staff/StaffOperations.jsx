import React, { useState } from 'react';
import { 
  Bell, FileText, Download, Search, Filter, MessageSquare, 
  Send, CheckCircle, AlertTriangle, Clock, FileSpreadsheet, 
  Database, Calendar, RefreshCw, ChevronRight, X, Shield, Users, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const SYSTEM_LOGS = [
  { id: 'LOG_8001', module: 'KYC', action: 'Doc Verification', user: 'System', details: 'Auto-verified PAN for Merch_992', time: '10:30 AM', status: 'success', comments: [] },
  { id: 'LOG_8002', module: 'Payouts', action: 'Batch Process', user: 'CronJob', details: 'Processed 45 settlements', time: '09:00 AM', status: 'neutral', comments: [{ user: 'Mike R.', text: 'Verified batch total matches bank statement.', time: '09:15 AM' }] },
  { id: 'LOG_8003', module: 'Security', action: 'Failed Login', user: 'Merch_105', details: '3 failed attempts from IP 192.168.x.x', time: 'Yesterday', status: 'danger', comments: [] },
];

const NOTIFICATIONS = [
  { id: 1, type: 'Alert', title: 'High Failure Rate Detected', message: 'UPI success rate dropped below 80% in the last hour.', time: '10m ago', read: false },
  { id: 2, type: 'Info', title: 'New Merchant Signup', message: 'TechSolutions Ltd has completed onboarding.', time: '1h ago', read: false },
  { id: 3, type: 'Success', title: 'Daily Backup Completed', message: 'Database backup stored successfully.', time: '5h ago', read: true },
];

const SETTLEMENT_HISTORY = [
  { id: 1, filename: 'settlement_batch_20231024.csv', createdBy: 'Sarah J.', date: 'Oct 24, 2023', status: 'Generated', size: '45 KB' },
  { id: 2, filename: 'settlement_batch_20231023.csv', createdBy: 'System', date: 'Oct 23, 2023', status: 'Generated', size: '42 KB' },
];

// --- COMPONENTS ---

// 1. Badge Component for Modules
const ModuleBadge = ({ module }) => {
  const styles = {
    'KYC': 'bg-blue-100 text-blue-700 border-blue-200',
    'Payouts': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Security': 'bg-rose-100 text-rose-700 border-rose-200',
  };
  
  const icons = {
    'KYC': <Users size={10} />,
    'Payouts': <CreditCard size={10} />,
    'Security': <Shield size={10} />,
  };

  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles[module] || 'bg-slate-100 text-slate-600'}`}>
      {icons[module]} {module}
    </span>
  );
};

const StaffOperations = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [logs, setLogs] = useState(SYSTEM_LOGS);
  const [expandedLog, setExpandedLog] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // --- HANDLERS ---
  const handleAddComment = (logId) => {
    if (!commentText.trim()) return;
    const newComment = { user: 'You', text: commentText, time: 'Just now' };
    setLogs(prev => prev.map(log => 
      log.id === logId ? { ...log, comments: [...log.comments, newComment] } : log
    ));
    setCommentText('');
  };

  const handleGenerateSettlement = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Optional: Add toast logic here
    }, 2000);
  };

  // --- TABS ---
  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 2 },
    { id: 'logs', label: 'System Logs', icon: FileText },
    { id: 'settlements', label: 'Settlement Tools', icon: FileSpreadsheet },
  ];

  return (
    <div className="h-full flex flex-col gap-6 bg-slate-50/50 p-2 md:p-6 font-sans text-slate-800">
      
      {/* 1. Modern Pill Navigation */}
      <div className="flex justify-center mb-2">
        <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm inline-flex relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-colors z-10 flex items-center gap-2 ${
                activeTab === tab.id ? 'text-slate-800' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-slate-100 border border-slate-200/50 rounded-xl shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon size={16} /> 
                {tab.label}
                {tab.badge && (
                  <span className="bg-rose-500 text-white text-[10px] px-1.5 rounded-full h-4 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 max-w-5xl mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* --- NOTIFICATIONS TAB --- */}
          {activeTab === 'notifications' && (
            <motion.div 
              key="notifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
               <div className="flex justify-between items-center px-2">
                  <h3 className="font-bold text-slate-700 text-lg">Alerts & Updates</h3>
                  <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1 rounded-full transition-colors">
                    Mark all read
                  </button>
               </div>
               <div className="grid gap-3">
                 {NOTIFICATIONS.map((notif, idx) => (
                    <motion.div 
                      key={notif.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-5 rounded-2xl border flex gap-4 transition-all relative overflow-hidden group ${
                        notif.read 
                          ? 'bg-white border-slate-200' 
                          : 'bg-white border-indigo-100 shadow-[0_4px_20px_-10px_rgba(99,102,241,0.15)]'
                      }`}
                    >
                       {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>}
                       
                       <div className={`mt-1 p-2.5 rounded-xl h-fit shrink-0 ${
                         notif.type === 'Alert' ? 'bg-rose-50 text-rose-600' :
                         notif.type === 'Success' ? 'bg-emerald-50 text-emerald-600' :
                         'bg-blue-50 text-blue-600'
                       }`}>
                          {notif.type === 'Alert' ? <AlertTriangle size={20} /> : 
                           notif.type === 'Success' ? <CheckCircle size={20} /> : 
                           <Bell size={20} />}
                       </div>
                       
                       <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className={`font-bold text-sm ${notif.read ? 'text-slate-600' : 'text-slate-900'}`}>
                               {notif.title}
                             </h4>
                             <span className="text-xs font-medium text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full">
                               <Clock size={10} /> {notif.time}
                             </span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed">{notif.message}</p>
                       </div>
                    </motion.div>
                 ))}
               </div>
            </motion.div>
          )}

          {/* --- LOGS TAB --- */}
          {activeTab === 'logs' && (
            <motion.div 
              key="logs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
               {/* Search Bar */}
               <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex gap-2 sticky top-0 z-10">
                  <div className="relative flex-1">
                     <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                     <input 
                       type="text" 
                       placeholder="Search by ID, Module, or User..." 
                       className="w-full pl-10 pr-4 py-2 bg-transparent text-sm outline-none placeholder:text-slate-400" 
                     />
                  </div>
                  <div className="w-px bg-slate-200 my-1"></div>
                  <button className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
                     <Filter size={18} />
                  </button>
               </div>

               {/* Logs List */}
               <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  {logs.map((log) => (
                     <div key={log.id} className="border-b border-slate-50 last:border-0">
                        <div 
                          onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                          className={`p-4 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors ${
                             expandedLog === log.id ? 'bg-slate-50/80' : 'hover:bg-slate-50'
                          }`}
                        >
                           <div className="flex items-start gap-4">
                              <div className={`mt-1 md:mt-0 p-2 rounded-lg ${
                                log.status === 'danger' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-500'
                              }`}>
                                <Database size={18} />
                              </div>
                              <div>
                                 <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                      {log.id}
                                    </span>
                                    <ModuleBadge module={log.module} />
                                    <span className="text-sm font-bold text-slate-800">{log.action}</span>
                                 </div>
                                 <p className="text-sm text-slate-500">{log.details}</p>
                              </div>
                           </div>
                           
                           <div className="flex items-center gap-6 mt-3 md:mt-0 pl-12 md:pl-0">
                              <div className="text-right">
                                 <div className="text-xs font-semibold text-slate-700">{log.user}</div>
                                 <div className="text-[10px] text-slate-400">{log.time}</div>
                              </div>
                              <motion.div 
                                animate={{ rotate: expandedLog === log.id ? 90 : 0 }}
                                className="text-slate-300"
                              >
                                 <ChevronRight size={18} />
                              </motion.div>
                           </div>
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {expandedLog === log.id && (
                             <motion.div 
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: 'auto', opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               className="overflow-hidden bg-slate-50/50"
                             >
                                <div className="p-4 pl-14 md:pl-16 pr-4 md:pr-10 border-t border-slate-100/50">
                                   <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <MessageSquare size={12} /> Internal Notes
                                      </h5>
                                      
                                      <div className="space-y-3 mb-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                         {log.comments.length > 0 ? log.comments.map((c, i) => (
                                            <div key={i} className="flex gap-3 text-sm group">
                                               <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                                  {c.user.charAt(0)}
                                               </div>
                                               <div className="bg-slate-50 p-2.5 rounded-r-xl rounded-bl-xl text-slate-600 border border-slate-100 w-full">
                                                  <div className="flex justify-between mb-1">
                                                     <span className="font-semibold text-slate-800 text-xs">{c.user}</span>
                                                     <span className="text-[10px] text-slate-400">{c.time}</span>
                                                  </div>
                                                  <p>{c.text}</p>
                                               </div>
                                            </div>
                                         )) : (
                                            <div className="text-center py-4 text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-lg">
                                               No notes yet. Start the discussion.
                                            </div>
                                         )}
                                      </div>
                                      
                                      <div className="flex gap-2">
                                         <input 
                                           type="text" 
                                           placeholder="Add a comment..." 
                                           className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                           value={commentText}
                                           onChange={(e) => setCommentText(e.target.value)}
                                         />
                                         <button 
                                           onClick={() => handleAddComment(log.id)}
                                           disabled={!commentText.trim()}
                                           className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200 transition-all active:scale-95"
                                         >
                                            <Send size={16} />
                                         </button>
                                      </div>
                                   </div>
                                </div>
                             </motion.div>
                          )}
                        </AnimatePresence>
                     </div>
                  ))}
               </div>
            </motion.div>
          )}

          {/* --- SETTLEMENTS TAB --- */}
          {activeTab === 'settlements' && (
            <motion.div 
              key="settlements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
               {/* Tool Card */}
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full opacity-50 blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h3 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2">
                       <FileSpreadsheet className="text-indigo-600" size={20} /> 
                       Payout Generator
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">Create standardized settlement files compatible with banking partners.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                       <div className="md:col-span-3 space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Select Merchant</label>
                          <div className="relative">
                             <select className="w-full appearance-none p-2.5 pl-3 pr-8 border border-slate-200 rounded-lg bg-white outline-none text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer">
                                <option>All Merchants</option>
                                <option>TechRetail Pvt Ltd</option>
                                <option>Fresh Foods</option>
                             </select>
                             <ChevronRight className="absolute right-3 top-3 text-slate-400 rotate-90 pointer-events-none" size={14} />
                          </div>
                       </div>
                       
                       <div className="md:col-span-2 space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Date Range</label>
                          <button className="w-full flex items-center justify-between p-2.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-700 hover:border-slate-300 transition-colors">
                             <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-slate-400" />
                                <span>Today</span>
                             </div>
                             <ChevronRight size={14} className="text-slate-400 rotate-90" />
                          </button>
                       </div>
                       
                       <div className="md:col-span-2">
                          <button 
                             onClick={handleGenerateSettlement}
                             disabled={isGenerating}
                             className="w-full p-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-all shadow-lg shadow-indigo-200 active:scale-95 flex justify-center items-center gap-2"
                          >
                             {isGenerating ? (
                               <RefreshCw className="animate-spin" size={18} />
                             ) : (
                               <CheckCircle size={18} />
                             )}
                             <span>{isGenerating ? 'Processing...' : 'Generate File'}</span>
                          </button>
                       </div>
                    </div>
                  </div>
               </div>

               {/* Recent Files Table */}
               <div>
                  <div className="flex justify-between items-end mb-3 px-1">
                     <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Recent Settlement Files</h4>
                     <button className="text-xs text-indigo-600 font-medium hover:underline">View All History</button>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                     {SETTLEMENT_HISTORY.map((file) => (
                        <div key={file.id} className="p-4 border-b border-slate-50 last:border-0 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center border border-emerald-100">
                                 <FileSpreadsheet size={20} />
                              </div>
                              <div>
                                 <p className="font-bold text-slate-700 text-sm group-hover:text-indigo-700 transition-colors">{file.filename}</p>
                                 <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">{file.size}</span>
                                    <span className="text-xs text-slate-400">• {file.date} • {file.createdBy}</span>
                                 </div>
                              </div>
                           </div>
                           <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                              <Download size={20} />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StaffOperations;