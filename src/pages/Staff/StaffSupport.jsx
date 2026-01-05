import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Search, Filter, Paperclip, CheckCircle, 
  ChevronLeft, MoreHorizontal, Briefcase, Smile, Send,
  Clock, Shield, Zap, Check, Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const SUPPORT_QUEUE = [
  { 
    id: 'TKT_2001', 
    merchant: 'TechRetail Pvt',
    initials: 'TR',
    subject: 'Settlement delay for Oct 24', 
    category: 'Settlements', 
    priority: 'High', 
    status: 'Open', 
    date: '10:30 AM', 
    preview: 'Hi, my settlement for yesterday is still pending...',
    messages: [
      { id: 1, sender: 'TechRetail', text: 'Hi, my settlement for yesterday is still pending. Usually it arrives by 10 AM.', time: '09:30 AM' },
    ]
  },
  { 
    id: 'TKT_1050', 
    merchant: 'Fresh Foods',
    initials: 'FF',
    subject: 'Refund failed for #ORD_991', 
    category: 'Refunds', 
    priority: 'Critical', 
    status: 'In Progress', 
    date: 'Yesterday', 
    preview: 'Refund failed with error "Bank Declined".',
    messages: [
      { id: 1, sender: 'Fresh Foods', text: 'Refund failed with error "Bank Declined".', time: 'Yesterday 11:00 AM' },
      { id: 2, sender: 'You', text: 'I am checking with the gateway provider. Please hold.', time: 'Yesterday 11:15 AM' }
    ]
  },
  { 
    id: 'TKT_1092', 
    merchant: 'Alpha Graphics',
    initials: 'AG',
    subject: 'API Documentation query', 
    category: 'Integration', 
    priority: 'Low', 
    status: 'Resolved', 
    date: 'Oct 22', 
    preview: 'Where can I find the Python SDK?',
    messages: [
      { id: 1, sender: 'Alpha Graphics', text: 'Where can I find the Python SDK?', time: 'Oct 22, 02:15 PM' },
      { id: 2, sender: 'You', text: 'It is available in the Developer section under "Libraries".', time: 'Oct 22, 02:30 PM' }
    ]
  },
];

const StatusBadge = ({ status }) => {
  const styles = {
    'Open': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    'In Progress': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    'Resolved': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

const StaffSupport = () => {
  const [activeTicket, setActiveTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (activeTicket && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTicket?.messages]);

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    const msg = { 
      id: Date.now(), 
      sender: 'You', 
      text: replyText, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setActiveTicket(prev => ({ ...prev, messages: [...prev.messages, msg] }));
    setReplyText('');
  };

  const filteredQueue = SUPPORT_QUEUE.filter(t => 
    (filterStatus === 'All' || t.status === filterStatus) &&
    (t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || t.merchant.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-screen bg-[#F8F9FC] p-4 md:p-6 flex flex-col gap-5 font-sans text-slate-800 overflow-hidden">
      
      {/* --- HEADER STATS --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Queue', value: '12', icon: Inbox, color: 'text-indigo-600', bg: 'bg-white' },
          { label: 'Critical', value: '3', icon: Shield, color: 'text-rose-600', bg: 'bg-white' },
          { label: 'Response', value: '4m', icon: Zap, color: 'text-amber-600', bg: 'bg-white' },
          { label: 'Resolved', value: '8', icon: Check, color: 'text-emerald-600', bg: 'bg-white' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            className={`${stat.bg} p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between cursor-default`}
          >
             <div>
               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
               <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
             </div>
             <div className={`p-3 rounded-xl bg-slate-50 border border-slate-100`}>
               <stat.icon size={20} className={stat.color} />
             </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* --- LEFT SIDEBAR (QUEUE) --- */}
        <div className={`w-full md:w-[380px] border-r border-slate-100 flex flex-col bg-white z-20 ${activeTicket ? 'hidden md:flex' : 'flex'}`}>
           
           {/* Search Header */}
           <div className="p-5 border-b border-slate-50 space-y-4">
              <div className="relative group">
                 <Search className="absolute left-3 top-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                 <input 
                   type="text" 
                   placeholder="Search tickets..." 
                   className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-100 rounded-xl text-sm font-medium outline-none transition-all duration-200 shadow-sm focus:shadow-md"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide mask-fade-right">
                 {['All', 'Open', 'In Progress', 'Resolved'].map(status => (
                    <motion.button 
                      key={status}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                        filterStatus === status 
                          ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-500/20' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {status}
                    </motion.button>
                 ))}
              </div>
           </div>

           {/* Animated List */}
           <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <AnimatePresence>
              {filteredQueue.map((ticket) => (
                 <motion.div 
                   key={ticket.id}
                   layoutId={ticket.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   onClick={() => setActiveTicket(ticket)}
                   className="relative p-3 rounded-xl cursor-pointer group"
                 >
                    {/* Active State Background Animation */}
                    {activeTicket?.id === ticket.id && (
                      <motion.div 
                        layoutId="activeTicketBg"
                        className="absolute inset-0 bg-indigo-50 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <div className="relative z-10 flex gap-3">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm bg-gradient-to-br ${
                         ticket.id.length % 2 === 0 ? 'from-blue-500 to-indigo-600' : 'from-rose-400 to-orange-500'
                       }`}>
                          {ticket.initials}
                       </div>
                       <div className="min-w-0 flex-1">
                          <div className="flex justify-between items-start mb-0.5">
                             <h4 className={`font-bold text-sm truncate ${activeTicket?.id === ticket.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                               {ticket.merchant}
                             </h4>
                             <span className="text-[10px] font-medium text-slate-400">{ticket.date}</span>
                          </div>
                          <p className={`text-xs font-medium truncate mb-2 ${activeTicket?.id === ticket.id ? 'text-indigo-700/70' : 'text-slate-500'}`}>
                            {ticket.subject}
                          </p>
                          <div className="flex items-center gap-2">
                             <StatusBadge status={ticket.status} />
                          </div>
                       </div>
                    </div>
                 </motion.div>
              ))}
              </AnimatePresence>
           </div>
        </div>

        {/* --- RIGHT CHAT AREA --- */}
        <div className={`flex-1 flex flex-col bg-white relative ${!activeTicket ? 'hidden md:flex' : 'flex'}`}>
           <AnimatePresence mode='wait'>
             {activeTicket ? (
               <motion.div 
                 key="chat-container"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="flex flex-col h-full"
               >
                 {/* Chat Header */}
                 <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                       <motion.button 
                         whileHover={{ scale: 1.1 }}
                         whileTap={{ scale: 0.9 }}
                         className="md:hidden p-2 bg-slate-50 rounded-full text-slate-500" 
                         onClick={() => setActiveTicket(null)}
                       >
                          <ChevronLeft size={20} />
                       </motion.button>
                       <div>
                          <motion.h2 
                            key={activeTicket.id}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="font-bold text-slate-800 text-lg"
                          >
                             {activeTicket.subject}
                          </motion.h2>
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                             <Briefcase size={12} />
                             <span>{activeTicket.merchant}</span>
                             <span className="text-slate-300">|</span>
                             <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">ID: {activeTicket.id}</span>
                          </div>
                       </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                       <MoreHorizontal size={20} />
                    </button>
                 </div>

                 {/* Messages Scroll Area */}
                 <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]"
                      style={{ backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                    
                    {activeTicket.messages.map((msg, idx) => (
                       <motion.div 
                         key={msg.id} 
                         initial={{ opacity: 0, y: 20, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         transition={{ delay: idx * 0.1 }}
                         className={`flex w-full ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                       >
                          <div className={`flex flex-col max-w-[80%] ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                             <div className={`px-6 py-3.5 shadow-sm text-sm leading-relaxed relative group ${
                               msg.sender === 'You' 
                                 ? 'bg-slate-900 text-white rounded-2xl rounded-tr-sm' 
                                 : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-sm'
                             }`}>
                                {msg.text}
                                <span className={`text-[9px] absolute bottom-1 ${msg.sender === 'You' ? 'right-2 text-slate-400' : 'left-2 text-slate-300'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                   {msg.time}
                                </span>
                             </div>
                             {msg.sender !== 'You' && <span className="text-[10px] text-slate-400 mt-1 ml-1">{msg.sender}</span>}
                          </div>
                       </motion.div>
                    ))}
                    <div ref={chatEndRef} />
                 </div>

                 {/* Input Area */}
                 <div className="p-5 bg-white border-t border-slate-100">
                    <form onSubmit={handleSendReply} className="relative max-w-4xl mx-auto">
                       <motion.div 
                         className="flex items-end gap-2 bg-slate-50 p-1.5 rounded-[20px] border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all"
                         whileFocus={{ scale: 1.01 }}
                       >
                          <motion.button 
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            type="button" 
                            className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                          >
                             <Paperclip size={20} />
                          </motion.button>
                          
                          <textarea 
                            rows="1"
                            placeholder="Write a reply..." 
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-2 resize-none text-slate-700 placeholder:text-slate-400 font-medium"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendReply(e);
                              }
                            }}
                          />
                          
                          <motion.button 
                            type="submit" 
                            disabled={!replyText.trim()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
                          >
                             <Send size={18} fill="currentColor" />
                          </motion.button>
                       </motion.div>
                    </form>
                 </div>
               </motion.div>
             ) : (
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }}
                 className="flex-1 flex flex-col items-center justify-center bg-slate-50/30"
               >
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-24 h-24 bg-gradient-to-tr from-slate-100 to-white rounded-3xl shadow-xl shadow-slate-200 border border-white flex items-center justify-center mb-6"
                  >
                     <MessageSquare size={36} className="text-slate-300" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-slate-700">Staff Workspace</h3>
                  <p className="text-slate-400 text-sm mt-2">Select a ticket to start resolving.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StaffSupport;