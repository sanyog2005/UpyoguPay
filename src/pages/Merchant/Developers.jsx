import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Clock,
  ExternalLink,
  CheckSquare,
  Square
} from 'lucide-react';

const Developers = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('API');
  const [duration, setDuration] = useState('Past 3 Hours');
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState('15 Minutes');
  const [filters, setFilters] = useState({
    all: true,
    '2xx': false,
    '3xx': false,
    '4xx': false,
    '5xx': false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [responseCode, setResponseCode] = useState('All');

  // --- HANDLERS ---
  const handleTabClick = (tab) => setActiveTab(tab);

  const toggleFilter = (key) => {
    if (key === 'all') {
      setFilters({ all: !filters.all, '2xx': false, '3xx': false, '4xx': false, '5xx': false });
    } else {
      setFilters(prev => ({ ...prev, all: false, [key]: !prev[key] }));
    }
  };

  const handleSearch = () => {
    alert(`Searching for "${searchQuery}" with response code: ${responseCode}`);
  };

  const handleClear = () => {
    setSearchQuery('');
    setResponseCode('All');
  };

  const handleDurationSelect = (newDuration) => {
    setDuration(newDuration);
    setIsDurationOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Page Header / Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
         <div className="px-8 flex items-center gap-8">
            {['API', 'Webhooks'].map((tab) => (
              <button 
                key={tab}
                onClick={() => handleTabClick(tab)}
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
      </div>

      <div className="px-8 py-6 max-w-[1400px] mx-auto">
        
        {/* CONDITIONAL RENDER BASED ON TAB */}
        {activeTab === 'API' ? (
          <>
            {/* 2. API Logs Section */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm mb-8">
               
               <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-base font-bold text-slate-700">API Logs</h2>
               </div>

               <div className="p-6">
                  {/* Duration Filter */}
                  <div className="mb-6 relative">
                     <label className="text-xs font-bold text-slate-500 mb-1.5 block">
                        Duration (can only be fetched for max. past 7 days)
                     </label>
                     <div className="flex items-center bg-white border border-gray-300 rounded overflow-hidden shadow-sm h-9 w-fit relative">
                        <button 
                          onClick={() => setIsDurationOpen(!isDurationOpen)}
                          className="flex items-center gap-2 px-3 h-full border-r border-gray-200 text-sm text-slate-600 hover:bg-gray-50 bg-[#F5F7F9]"
                        >
                           <Calendar size={14} className="text-slate-400" />
                           {duration} <ChevronDown size={14} className="ml-1 text-slate-400" />
                        </button>
                        <div className="px-3 text-sm font-bold text-slate-700">
                           05 Jan 2026 <span className="text-slate-400 font-normal mx-1">to</span> 05 Jan 2026
                        </div>
                     </div>

                     {/* Duration Dropdown */}
                     {isDurationOpen && (
                        <div className="absolute top-16 left-0 w-48 bg-white border border-gray-200 rounded shadow-lg z-20">
                           {['Past 3 Hours', 'Past 24 Hours', 'Past 7 Days'].map((opt) => (
                              <button 
                                key={opt}
                                onClick={() => handleDurationSelect(opt)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-gray-50"
                              >
                                 {opt}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* API Requests Graph Container */}
                  <div className="border border-gray-200 rounded-sm">
                     
                     {/* Graph Controls Header */}
                     <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-white flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                           <span className="text-xs font-bold text-slate-500">API Requests</span>
                           <span className="text-xs font-medium text-blue-600 border border-blue-600 px-2 py-0.5 rounded-full">{duration}</span>
                        </div>

                        <div className="flex items-center gap-6">
                           {/* Legend / Filters */}
                           <div className="flex items-center gap-3">
                              <button onClick={() => toggleFilter('all')} className="flex items-center gap-1 text-xs text-slate-600 cursor-pointer">
                                 {filters.all ? <CheckSquare size={14} className="text-blue-600 fill-blue-600" /> : <Square size={14} className="text-slate-300" />} All
                              </button>
                              {['2xx', '3xx', '4xx', '5xx'].map((code) => (
                                 <button key={code} onClick={() => toggleFilter(code)} className="flex items-center gap-1 text-xs text-slate-400 cursor-pointer hover:text-slate-600">
                                    {filters[code] ? <CheckSquare size={14} className="text-blue-600" /> : <Square size={14} />} {code}
                                 </button>
                              ))}
                           </div>

                           {/* Time Resolution Toggle */}
                           <div className="flex border border-gray-200 rounded overflow-hidden">
                              {['15 Minutes', 'Hourly', 'Daily'].map((res) => (
                                 <button 
                                   key={res}
                                   onClick={() => setSelectedResolution(res)}
                                   className={`px-3 py-1 text-[10px] font-medium border-r border-gray-200 last:border-r-0 transition-colors ${
                                      selectedResolution === res 
                                      ? 'bg-gray-100 text-slate-800 font-bold' 
                                      : 'bg-white text-slate-500 hover:bg-gray-50'
                                   }`}
                                 >
                                    {res}
                                 </button>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Empty Graph State */}
                     <div className="h-64 flex flex-col items-center justify-center bg-white">
                        <p className="text-sm text-slate-500 font-medium">No request logs found for selected time range</p>
                     </div>

                     {/* Graph Footer */}
                     <div className="px-4 py-2 bg-[#FAFAFA] border-t border-gray-200 text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock size={10} /> Last updated on 05-Jan, 2026, 01:50 pm
                     </div>
                  </div>

               </div>
            </div>

            {/* 3. API Request Logs Table Section */}
            <div className="bg-white border border-gray-200 rounded-sm shadow-sm min-h-[400px]">
               
               <div className="p-6 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">
                     API Request Logs in {duration} <span className="font-normal text-slate-500">(05 Jan - 05 Jan)</span>
                  </h3>

                  <div className="flex items-end gap-4">
                     <div className="flex-1 max-w-md">
                        <label className="text-xs font-bold text-slate-500 mb-1.5 block">Search</label>
                        <div className="relative">
                           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input 
                             type="text" 
                             value={searchQuery}
                             onChange={(e) => setSearchQuery(e.target.value)}
                             placeholder="Search for any keyword from request, response or headers"
                             className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
                           />
                        </div>
                     </div>
                     
                     <div className="w-48">
                        <label className="text-xs font-bold text-slate-500 mb-1.5 block">Response Code</label>
                        <div className="relative">
                           <select 
                             value={responseCode}
                             onChange={(e) => setResponseCode(e.target.value)}
                             className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-slate-600 focus:outline-none focus:border-blue-500 appearance-none bg-white cursor-pointer"
                           >
                              <option value="All">All</option>
                              <option value="2xx">2xx Success</option>
                              <option value="4xx">4xx Client Error</option>
                              <option value="5xx">5xx Server Error</option>
                           </select>
                           <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                     </div>

                     <div className="flex gap-2">
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
               </div>

               {/* Table Header */}
               <div className="bg-[#FAFAFA] px-6 py-3 grid grid-cols-4 text-xs font-bold text-slate-500 uppercase tracking-wide border-b border-gray-200">
                  <div>Log ID</div>
                  <div>Method & Endpoint</div>
                  <div className="text-center">Date and Time</div>
                  <div className="text-right">Response Code</div>
               </div>

               {/* Empty Table State */}
               <div className="flex items-center justify-center h-40 bg-white">
                  <span className="text-sm text-slate-400">No logs to display</span>
               </div>

            </div>
          </>
        ) : (
          /* Placeholder for Webhooks Tab */
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center">
             <h3 className="text-lg font-bold text-slate-700 mb-2">Webhooks</h3>
             <p className="text-sm text-slate-500">Configure and manage your webhooks here.</p>
             <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold">Add New Webhook</button>
          </div>
        )}

      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#022D45] hover:bg-[#0a2544] text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-sm font-medium transition-transform hover:scale-105 z-50">
        <div className="grid place-items-center"><HelpCircle size={18} /></div>
        Help & Support
      </button>

    </div>
  );
};

export default Developers;