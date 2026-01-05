import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  CheckCircle2, 
  User, 
  Activity, 
  LogOut, 
  Settings, 
  AlertCircle,
  X,
  BellOff,
  Copy,
  Share2,
  RefreshCw,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [isLive, setIsLive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);
  const [isHealthOpen, setIsHealthOpen] = useState(false);

  // --- HANDLERS ---
  const toggleLiveMode = () => setIsLive(!isLive);
  
  // Close other panels when opening one
  const handleProfileClick = () => { setIsProfileOpen(!isProfileOpen); setIsHealthOpen(false); setIsWhatsNewOpen(false); };
  const handleWhatsNewClick = () => { setIsWhatsNewOpen(true); setIsProfileOpen(false); setIsHealthOpen(false); };
  const handleHealthClick = () => { setIsHealthOpen(!isHealthOpen); setIsProfileOpen(false); setIsWhatsNewOpen(false); };
  
  const closeWhatsNew = () => setIsWhatsNewOpen(false);
  const closeHealth = () => setIsHealthOpen(false);
  
  const handleLogout = () => navigate('/login');
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // --- MOCK DATA: ECOSYSTEM HEALTH ---
  const statusColumns = [
    {
      title: 'VPA handle',
      items: [
        { name: 'APL', status: 'operational', logo: 'https://cdn.UpyoguPay.com/static/assets/upi/apl.svg' },
        { name: 'okicici', status: 'operational', logo: 'https://cdn.UpyoguPay.com/static/assets/upi/okicici.svg' },
        { name: 'oksbi', status: 'operational', logo: 'https://cdn.UpyoguPay.com/static/assets/upi/oksbi.svg' },
        { name: 'okaxis', status: 'operational', logo: 'https://cdn.UpyoguPay.com/static/assets/upi/okaxis.svg' },
        { name: 'YBL', status: 'operational' },
        { name: 'okhdfcbank', status: 'operational' }
      ]
    },
    {
      title: 'Network',
      items: [
        { name: 'Diners Club', status: 'operational' },
        { name: 'VISA', status: 'operational' },
        { name: 'Mastercard', status: 'operational' },
        { name: 'American Express', status: 'operational' },
        { name: 'RUPAY', status: 'operational' }
      ]
    },
    {
      title: 'Bank',
      items: [
        { name: 'Kotak Mahindra Bank', status: 'operational' },
        { name: 'ICICI Bank', status: 'operational' },
        { name: 'Axis Bank', status: 'operational' },
        { name: 'HDFC Bank', status: 'operational' },
        { name: 'State Bank Of India', status: 'operational' }
      ]
    },
    {
      title: 'Bank / Issuer',
      items: [
        { name: 'Axis Bank', status: 'operational' },
        { name: 'HDFC Bank', status: 'operational' },
        { name: 'ICICI Bank', status: 'operational' },
        { name: 'Kotak Mahindra Bank', status: 'operational' },
        { name: 'State Bank Of India', status: 'operational' },
        { name: 'Bank Of India', status: 'downtime' }, // The issue
        { name: 'Paytm Payments Bank', status: 'operational' }
      ]
    }
  ];

  return (
    <>
      {/* Navbar Header - High Z-Index to stay on top of page content, but below overlays if needed */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
        
        {/* Left Side: Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search payment products, settings, and more"
              className="w-full bg-[#F2F5F8] border border-transparent rounded-md pl-10 pr-4 py-2.5 text-sm text-slate-600 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-6 ml-4">
          
          {/* Live Mode */}
          <button onClick={toggleLiveMode} className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-50 px-2 py-1.5 rounded transition-colors">
            <div className="relative flex items-center justify-center">
               <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                  {isLive ? <CheckCircle2 size={10} className="text-white stroke-[3]" /> : <AlertCircle size={10} className="text-white stroke-[3]" />}
               </div>
            </div>
            <span className="text-slate-700">{isLive ? 'Live Mode' : 'Test Mode'}</span>
            <ChevronDown size={14} className="text-slate-400 mt-0.5" />
          </button>

          {/* What's New */}
          <button onClick={handleWhatsNewClick} className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">What's New</button>

          {/* Activity / Ecosystem Health Toggle */}
           <button 
              onClick={handleHealthClick}
              className={`p-2 rounded-full transition-colors ${isHealthOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
           >
             <Activity size={20} className="stroke-[1.5]" />
           </button>

           {/* Profile Dropdown */}
           <div className="relative">
             <button 
                onClick={handleProfileClick}
                className={`p-2 rounded-full transition-colors ${isProfileOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
             >
               <User size={20} className="stroke-[1.5]" />
             </button>

             {isProfileOpen && (
               <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 top-12 w-[340px] bg-white border border-gray-200 rounded-sm shadow-xl z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                     {/* ... Profile Content (Same as previous) ... */}
                     <div className="px-5 py-4 flex gap-3 items-start">
                        <div className="w-10 h-10 bg-slate-100 rounded-sm flex items-center justify-center text-slate-400"><User size={24} strokeWidth={1.5} /></div>
                        <div className="flex-1">
                           <h3 className="text-sm font-bold text-slate-800 uppercase leading-tight">Raushan Kumar</h3>
                           <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-slate-500">M9Ds0a8o4cFo25</span>
                              <button onClick={() => copyToClipboard('M9Ds0a8o4cFo25')} className="text-[10px] text-blue-600 border border-blue-200 hover:bg-blue-50 px-1.5 py-0.5 rounded transition-colors">Copy Merchant Id</button>
                           </div>
                        </div>
                     </div>
                     <div className="px-5 pb-4">
                        <div className="border border-blue-100 rounded-sm p-0 overflow-hidden relative">
                           <div className="absolute top-[-1px] left-[-1px] bg-[#00A651] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-sm z-10">NEW</div>
                           <div className="flex items-center justify-between p-2 pt-3 bg-white hover:bg-slate-50 cursor-pointer transition-colors group">
                              <div className="flex items-center gap-1 text-xs text-slate-600 truncate"><span className="opacity-60">UpyoguPay.me/</span><span className="font-bold text-slate-800">@raushan1075</span></div>
                              <div className="flex items-center gap-2 text-slate-400"><Share2 size={14} className="hover:text-blue-600" /><ChevronDown size={14} className="-rotate-90 group-hover:text-blue-600" /></div>
                           </div>
                        </div>
                     </div>
                     <div className="border-t border-gray-100 mx-5"></div>
                     <div className="px-5 py-4">
                        <p className="text-xs text-slate-500 mb-2">Logged in as</p>
                        <div className="flex items-center gap-2 mb-4"><div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-slate-500"><User size={12} /></div><span className="text-sm text-slate-600 truncate">rk6358797@gmail.com</span></div>
                        <button onClick={handleLogout} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2 rounded-sm transition-colors shadow-sm">Log out</button>
                     </div>
                     <div className="bg-[#EEF2FF] p-5 flex items-end justify-between relative overflow-hidden">
                        <div className="relative z-10">
                           <h4 className="text-sm font-bold text-slate-800 mb-1">Help brands go online?</h4>
                           <p className="text-xs text-slate-600 mb-3 leading-relaxed">Become a <span className="font-bold">Partner</span>. Delight clients. Unlock additional revenue.</p>
                           <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-sm transition-colors">Explore Partner Program</button>
                        </div>
                     </div>
                  </div>
               </>
             )}
           </div>
        </div>
      </header>

      {/* --- ECOSYSTEM HEALTH OVERLAY --- */}
      {isHealthOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 top-16 bg-black/10 backdrop-blur-[1px] z-30" onClick={closeHealth}></div>
          
          {/* Main Health Panel */}
          <div className="fixed top-16 left-0 w-full bg-[#F4F6F8] shadow-2xl z-40 border-t border-gray-200 animate-in slide-in-from-top-2 duration-300 max-h-[calc(100vh-64px)] overflow-y-auto">
             <div className="max-w-[1400px] mx-auto p-6 pb-12">
                
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-4">
                      <h2 className="text-lg font-bold text-slate-800">Ecosystem Health</h2>
                      <span className="text-xs text-slate-500 flex items-center gap-1 border-l border-gray-300 pl-4">
                         Last updated at : 03:48 PM 
                         <button className="text-blue-600 hover:underline flex items-center gap-1 ml-1">
                            <RefreshCw size={10} /> Refresh
                         </button>
                      </span>
                   </div>
                   <button onClick={closeHealth} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                      <X size={20} className="text-slate-500" />
                   </button>
                </div>

                {/* Global Alert Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-sm px-4 py-2.5 mb-6 flex items-center gap-2 shadow-sm">
                   <div className="w-2 h-2 bg-slate-800 rounded-full shrink-0"></div>
                   <span className="text-sm font-bold text-slate-700">Few drops noticed in Cards</span>
                </div>

                {/* --- Primary Status Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                   
                   {/* 1. UPI */}
                   <div className="bg-white border border-gray-200 rounded-sm p-4 border-l-4 border-l-[#43A047] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                         <h3 className="text-sm font-bold text-slate-700">UPI</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-2.5 h-2.5 bg-[#43A047] rounded-full shrink-0"></div>
                         <span className="text-xs font-bold text-slate-700">All instruments are functional</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-4.5">No ongoing downtimes</p>
                   </div>

                   {/* 2. Cards (Problematic) */}
                   <div className="bg-white border border-gray-200 rounded-sm p-4 border-l-4 border-l-[#EF5350] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                         <h3 className="text-sm font-bold text-slate-700">Cards</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-2.5 h-2.5 bg-[#EF5350] rounded-full shrink-0"></div>
                         <span className="text-xs font-bold text-slate-700">High Severity Downtime</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-4.5">Bank of India (started at 11/12, 14:54)</p>
                   </div>

                   {/* 3. Net Banking */}
                   <div className="bg-white border border-gray-200 rounded-sm p-4 border-l-4 border-l-[#43A047] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                         <h3 className="text-sm font-bold text-slate-700">Net Banking</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-2.5 h-2.5 bg-[#43A047] rounded-full shrink-0"></div>
                         <span className="text-xs font-bold text-slate-700">All instruments are functional</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-4.5">No ongoing downtimes</p>
                   </div>

                   {/* 4. E-mandate */}
                   <div className="bg-white border border-gray-200 rounded-sm p-4 border-l-4 border-l-[#43A047] shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                         <h3 className="text-sm font-bold text-slate-700">E-mandate</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-2.5 h-2.5 bg-[#43A047] rounded-full shrink-0"></div>
                         <span className="text-xs font-bold text-slate-700">All instruments are functional</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-4.5">No ongoing downtimes</p>
                   </div>
                </div>

                {/* --- Detailed Status Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                   {statusColumns.map((col, idx) => (
                      <div key={idx}>
                         <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">{col.title}</h4>
                         <div className="space-y-2">
                            {col.items.map((item, i) => (
                               <div 
                                  key={i} 
                                  className={`flex items-center justify-between p-2.5 rounded-sm transition-colors ${item.status === 'downtime' ? 'bg-red-50 border border-red-100' : 'hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100'}`}
                               >
                                  <div className="flex items-center gap-3">
                                     {/* Simple Icon/Logo Placeholder */}
                                     {item.status === 'downtime' ? (
                                        <AlertTriangle size={14} className="text-[#EF5350]" /> 
                                     ) : (
                                        <div className="w-4 h-4 bg-gray-200 rounded-full shrink-0 flex items-center justify-center text-[8px] text-gray-500 font-bold overflow-hidden">
                                           {item.logo ? <img src={item.logo} alt="" className="w-full h-full object-cover" /> : item.name[0]}
                                        </div>
                                     )}
                                     
                                     <span className={`text-sm font-medium ${item.status === 'downtime' ? 'text-[#C62828]' : 'text-slate-700'}`}>
                                        {item.name}
                                     </span>
                                  </div>
                                  
                                  {/* Status Dot */}
                                  <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'downtime' ? 'bg-[#EF5350]' : 'bg-[#43A047]'}`}></div>
                               </div>
                            ))}
                         </div>
                      </div>
                   ))}
                </div>

             </div>
          </div>
        </>
      )}

      {/* --- WHAT'S NEW SIDE PANEL (Existing) --- */}
      {isWhatsNewOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 transition-opacity" onClick={closeWhatsNew}></div>
          <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right">
             <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-base font-bold text-slate-800">Announcements</h2>
                <button onClick={closeWhatsNew} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"><X size={20} /></button>
             </div>
             <div className="flex flex-col items-center justify-center h-[calc(100%-70px)] p-8 text-center">
                <div className="bg-slate-50 p-6 rounded-full mb-4 relative"><BellOff size={32} className="text-slate-300" strokeWidth={1.5} /><span className="absolute top-4 right-5 text-xs font-bold text-blue-400">Zzz</span></div>
                <h3 className="text-slate-600 font-medium text-sm">No announcements right now</h3>
             </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;