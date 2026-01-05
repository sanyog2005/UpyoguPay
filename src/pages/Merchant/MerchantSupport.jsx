import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  Send, 
  Paperclip, 
  X, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronLeft,
  User,
  Headphones
} from 'lucide-react';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';

// --- MOCK DATA ---
const MOCK_TICKETS = [
  { 
    id: 'TKT_2001', 
    subject: 'Settlement delay for Oct 24', 
    category: 'Settlements', 
    priority: 'High', 
    status: 'Open', 
    date: '2023-10-25 09:30', 
    lastUpdate: '10 mins ago',
    messages: [
      { id: 1, sender: 'You', text: 'Hi, my settlement for yesterday is still pending. Usually it arrives by 10 AM.', time: '09:30 AM' },
      { id: 2, sender: 'Support', text: 'Hello! Let me check the UTR status with our banking partner. Please hold on.', time: '09:35 AM' },
    ]
  },
  { 
    id: 'TKT_1092', 
    subject: 'API Documentation for Node.js', 
    category: 'Integration', 
    priority: 'Medium', 
    status: 'Resolved', 
    date: '2023-10-22 14:15', 
    lastUpdate: '2 days ago',
    messages: [
      { id: 1, sender: 'You', text: 'I am getting a 401 error on the create order endpoint.', time: 'Oct 22, 02:15 PM' },
      { id: 2, sender: 'Support', text: 'Please ensure you are using the Test Mode keys for the sandbox environment.', time: 'Oct 22, 02:30 PM' },
      { id: 3, sender: 'You', text: 'Ah, that was it. Thanks!', time: 'Oct 22, 02:45 PM' },
    ]
  },
  { 
    id: 'TKT_1050', 
    subject: 'Refund failed for #ORD_991', 
    category: 'Refunds', 
    priority: 'High', 
    status: 'In Progress', 
    date: '2023-10-20 11:00', 
    lastUpdate: '5 hours ago',
    messages: [
      { id: 1, sender: 'You', text: 'Refund failed with error "Bank Declined".', time: 'Oct 20, 11:00 AM' }
    ]
  },
];

const MerchantSupport = () => {
  const [activeTicket, setActiveTicket] = useState(null);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // New Ticket Form State
  const [newTicketForm, setNewTicketForm] = useState({
    subject: '',
    category: 'General',
    priority: 'Medium',
    description: ''
  });

  // Filter Logic
  const filteredTickets = MOCK_TICKETS.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, this would push to backend
    const msg = { 
      id: Date.now(), 
      sender: 'You', 
      text: newMessage, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    // Optimistic UI update
    const updatedTicket = { ...activeTicket, messages: [...activeTicket.messages, msg] };
    setActiveTicket(updatedTicket);
    setNewMessage('');
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    alert("Ticket created successfully! Ticket ID: TKT_" + Math.floor(Math.random() * 10000));
    setIsNewTicketModalOpen(false);
    // Reset form
    setNewTicketForm({ subject: '', category: 'General', priority: 'Medium', description: '' });
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-6">
      
      {/* 1. Header & Stats */}
      {!activeTicket && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Headphones size={24} /></div>
               <div><p className="text-slate-500 text-xs font-bold uppercase">Open Tickets</p><h3 className="text-xl font-bold text-slate-800">2</h3></div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
               <div className="p-3 bg-green-100 text-green-600 rounded-lg"><CheckCircle size={24} /></div>
               <div><p className="text-slate-500 text-xs font-bold uppercase">Resolved</p><h3 className="text-xl font-bold text-slate-800">14</h3></div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
               <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Clock size={24} /></div>
               <div><p className="text-slate-500 text-xs font-bold uppercase">Avg Response</p><h3 className="text-xl font-bold text-slate-800">2h 15m</h3></div>
            </div>
         </div>
      )}

      {/* 2. Main Layout (Ticket List + Chat) */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex">
        
        {/* LEFT PANEL: Ticket List */}
        <div className={`w-full md:w-1/3 border-r border-slate-100 flex flex-col ${activeTicket ? 'hidden md:flex' : 'flex'}`}>
           
           {/* Controls */}
           <div className="p-4 border-b border-slate-100 space-y-3">
              <Button className="w-full" icon={Plus} onClick={() => setIsNewTicketModalOpen(true)}>Raise New Ticket</Button>
              <div className="flex gap-2">
                 <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search tickets..." 
                      className="w-full pl-9 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                 <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100">
                    <Filter size={18} />
                 </button>
              </div>
              {/* Status Tabs */}
              <div className="flex gap-2 text-xs overflow-x-auto pb-1">
                 {['All', 'Open', 'In Progress', 'Resolved'].map(status => (
                    <button 
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1.5 rounded-full whitespace-nowrap border ${
                        filterStatus === status ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {status}
                    </button>
                 ))}
              </div>
           </div>

           {/* List */}
           <div className="flex-1 overflow-y-auto">
              {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
                 <div 
                    key={ticket.id}
                    onClick={() => setActiveTicket(ticket)}
                    className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${activeTicket?.id === ticket.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
                 >
                    <div className="flex justify-between items-start mb-1">
                       <span className="font-mono text-xs text-slate-400">{ticket.id}</span>
                       <span className="text-xs text-slate-400">{ticket.lastUpdate}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1 truncate">{ticket.subject}</h4>
                    <div className="flex justify-between items-center mt-2">
                       <div className="flex gap-2">
                          <StatusBadge status={ticket.status} />
                          <span className={`text-xs px-2 py-0.5 rounded border ${
                            ticket.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 
                            ticket.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                            'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                            {ticket.priority}
                          </span>
                       </div>
                       <span className="text-xs text-slate-500">{ticket.category}</span>
                    </div>
                 </div>
              )) : (
                 <div className="p-8 text-center text-slate-400">
                    <MessageSquare className="mx-auto mb-2 opacity-50" size={32} />
                    <p className="text-sm">No tickets found.</p>
                 </div>
              )}
           </div>
        </div>

        {/* RIGHT PANEL: Chat Interface */}
        <div className={`flex-1 flex flex-col bg-slate-50/50 ${!activeTicket ? 'hidden md:flex' : 'flex'}`}>
           {activeTicket ? (
             <>
               {/* Chat Header */}
               <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <button className="md:hidden text-slate-500" onClick={() => setActiveTicket(null)}>
                        <ChevronLeft size={24} />
                     </button>
                     <div>
                        <h3 className="font-bold text-slate-800">{activeTicket.subject}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-2">
                           ID: {activeTicket.id} • {activeTicket.category} 
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <StatusBadge status={activeTicket.status} />
                  </div>
               </div>

               {/* Chat Messages */}
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="text-center text-xs text-slate-400 my-4">
                     Ticket created on {activeTicket.date}
                  </div>
                  
                  {activeTicket.messages.map(msg => (
                     <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] md:max-w-[70%] rounded-xl p-4 shadow-sm ${
                           msg.sender === 'You' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                        }`}>
                           <p className="text-sm leading-relaxed">{msg.text}</p>
                           <p className={`text-[10px] mt-2 text-right ${msg.sender === 'You' ? 'text-blue-200' : 'text-slate-400'}`}>
                              {msg.time} • {msg.sender}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Chat Input */}
               <div className="p-4 bg-white border-t border-slate-200">
                  {activeTicket.status === 'Resolved' ? (
                     <div className="text-center p-3 bg-slate-50 rounded-lg text-slate-500 text-sm">
                        This ticket has been marked as resolved. <button className="text-blue-600 font-medium hover:underline">Re-open Ticket</button>
                     </div>
                  ) : (
                     <form onSubmit={handleSendMessage} className="flex gap-2">
                        <button type="button" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                           <Paperclip size={20} />
                        </button>
                        <input 
                           type="text" 
                           placeholder="Type your message..." 
                           className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 outline-none focus:border-blue-500 focus:bg-white transition-all"
                           value={newMessage}
                           onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button 
                           type="submit" 
                           disabled={!newMessage.trim()}
                           className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           <Send size={20} />
                        </button>
                     </form>
                  )}
               </div>
             </>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                   <MessageSquare size={32} className="text-blue-200" />
                </div>
                <h3 className="text-lg font-bold text-slate-600">Select a Ticket</h3>
                <p className="text-sm max-w-xs">View conversation history or continue chatting with our support team.</p>
             </div>
           )}
        </div>
      </div>

      {/* 3. New Ticket Modal */}
      {isNewTicketModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
               <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                  <h2 className="text-lg font-bold text-slate-800">Raise New Ticket</h2>
                  <button onClick={() => setIsNewTicketModalOpen(false)}><X className="text-slate-400 hover:text-slate-600" /></button>
               </div>
               
               <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-slate-700">Subject</label>
                     <input 
                        required
                        type="text" 
                        placeholder="Brief summary of the issue"
                        className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={newTicketForm.subject}
                        onChange={e => setNewTicketForm({...newTicketForm, subject: e.target.value})}
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Category</label>
                        <select 
                           className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                           value={newTicketForm.category}
                           onChange={e => setNewTicketForm({...newTicketForm, category: e.target.value})}
                        >
                           <option>General</option>
                           <option>Settlements</option>
                           <option>Refunds</option>
                           <option>Integration / API</option>
                           <option>Account & KYC</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Priority</label>
                        <select 
                           className="w-full p-2.5 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                           value={newTicketForm.priority}
                           onChange={e => setNewTicketForm({...newTicketForm, priority: e.target.value})}
                        >
                           <option>Low</option>
                           <option>Medium</option>
                           <option>High</option>
                           <option>Critical</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-medium text-slate-700">Description</label>
                     <textarea 
                        required
                        rows="5"
                        placeholder="Please describe the issue in detail..."
                        className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        value={newTicketForm.description}
                        onChange={e => setNewTicketForm({...newTicketForm, description: e.target.value})}
                     ></textarea>
                  </div>

                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center">
                     <p className="text-sm text-slate-500">
                        <Paperclip size={16} className="inline mr-2" />
                        Attach screenshots or files (Optional)
                     </p>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                     <Button type="button" variant="secondary" onClick={() => setIsNewTicketModalOpen(false)}>Cancel</Button>
                     <Button type="submit">Submit Ticket</Button>
                  </div>
               </form>
            </div>
         </div>
      )}

    </div>
  );
};

export default MerchantSupport;