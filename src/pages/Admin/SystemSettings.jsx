import React, { useState } from 'react';
import { 
  Settings, 
  CreditCard, 
  Server, 
  Bell, 
  AlertTriangle, 
  Database, 
  Save,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Search,
  Terminal,
  Wifi,
  WifiOff
} from 'lucide-react';
import Button from '../../components/common/Button';

// --- MOCK DATA ---
const SYSTEM_LOGS = [
  { id: 'SYS_5001', level: 'Error', module: 'SMTP', message: 'Connection timeout to smtp.mailgun.org', time: '2023-10-25 14:20:05' },
  { id: 'SYS_5002', level: 'Info', module: 'CRON', message: 'Daily Settlement Job completed successfully', time: '2023-10-25 02:00:00' },
  { id: 'SYS_5003', level: 'Warning', module: 'Webhook', message: 'Retry attempt 3 for Merchant #102 failed', time: '2023-10-24 18:45:12' },
  { id: 'SYS_5004', level: 'Info', module: 'Auth', message: 'Admin user password policy updated', time: '2023-10-24 10:15:00' },
  { id: 'SYS_5005', level: 'Error', module: 'Gateway', message: 'Upstream provider (HDFC) high latency detected', time: '2023-10-23 09:30:00' },
];

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('payments'); // payments | integrations | logs
  const [loading, setLoading] = useState(false);

  // Configuration State
  const [config, setConfig] = useState({
    maintenanceMode: false,
    globalFee: 2.0,
    gst: 18,
    payoutDelay: 'T+1',
    methods: {
      cards: true,
      netbanking: true,
      upi: true,
      wallets: false,
      emi: false
    },
    providers: {
      upi: 'Google Pay Business',
      netbanking: 'BillDesk Aggregator',
      cards: 'Stripe Connect'
    },
    smtp: {
      host: 'smtp.mailgun.org',
      port: '587',
      user: 'postmaster@UpyugoPay.com'
    },
    sms: {
      provider: 'Twilio',
      apiKey: 'sk_live_...'
    }
  });

  const handleToggleMethod = (key) => {
    setConfig(prev => ({
      ...prev,
      methods: { ...prev.methods, [key]: !prev.methods[key] }
    }));
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("System configuration updated successfully!");
    }, 1000);
  };

  const handleMaintenanceToggle = () => {
    if (!config.maintenanceMode) {
      const confirm = window.confirm("⚠️ Enable Maintenance Mode?\n\nThis will prevent ALL merchants from logging in and processing payments. Are you sure?");
      if (!confirm) return;
    }
    setConfig(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div>
           <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
             <Settings className="text-slate-400" /> System Settings
           </h2>
           <p className="text-sm text-slate-500 mt-1">Configure global platform parameters and integrations.</p>
        </div>
        
        <div className="flex items-center gap-4">
           {config.maintenanceMode ? (
             <div className="px-4 py-2 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 font-bold animate-pulse">
               <WifiOff size={18} /> Maintenance Mode ON
             </div>
           ) : (
             <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 font-medium">
               <Wifi size={18} /> Systems Operational
             </div>
           )}
           <Button icon={Save} onClick={handleSave} className={loading ? 'opacity-70' : ''}>
             {loading ? 'Saving...' : 'Save Changes'}
           </Button>
        </div>
      </div>

      {/* 2. Main Content Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation for Settings */}
        <div className="space-y-2">
           <button 
             onClick={() => setActiveTab('payments')}
             className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-all ${
               activeTab === 'payments' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent'
             }`}
           >
             <CreditCard size={18} /> Payment & Fees
           </button>
           <button 
             onClick={() => setActiveTab('integrations')}
             className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-all ${
               activeTab === 'integrations' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent'
             }`}
           >
             <Server size={18} /> Integrations (SMTP/SMS)
           </button>
           <button 
             onClick={() => setActiveTab('logs')}
             className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-all ${
               activeTab === 'logs' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent'
             }`}
           >
             <Database size={18} /> System Logs
           </button>
           
           <div className="pt-4 mt-4 border-t border-slate-200">
             <button 
                onClick={handleMaintenanceToggle}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium text-red-600 hover:bg-red-50 transition-all"
             >
                <AlertTriangle size={18} /> Maintenance Control
             </button>
           </div>
        </div>

        {/* Configuration Forms */}
        <div className="lg:col-span-3 space-y-6">
           
           {/* -- TAB: PAYMENTS & FEES -- */}
           {activeTab === 'payments' && (
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <section>
                   <h3 className="text-lg font-bold text-slate-800 mb-4">Global Fee Configuration</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">Platform Commission (%)</label>
                         <input 
                            type="number" 
                            step="0.1"
                            value={config.globalFee} 
                            onChange={(e) => setConfig({...config, globalFee: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">GST on Fee (%)</label>
                         <input 
                            type="number" 
                            value={config.gst} 
                            onChange={(e) => setConfig({...config, gst: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">Default Settlement Cycle</label>
                         <select 
                           className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                           value={config.payoutDelay}
                           onChange={(e) => setConfig({...config, payoutDelay: e.target.value})}
                         >
                           <option>T+1 (Next Day)</option>
                           <option>T+2 (Standard)</option>
                           <option>T+3</option>
                           <option>Instant (Real-time)</option>
                         </select>
                      </div>
                   </div>
                </section>

                <div className="border-t border-slate-100 my-6"></div>

                <section>
                   <h3 className="text-lg font-bold text-slate-800 mb-4">Active Payment Methods</h3>
                   <div className="space-y-4">
                      {Object.keys(config.methods).map(method => (
                         <div key={method} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex items-center gap-3">
                               <div className={`p-2 rounded-md ${config.methods[method] ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-400'}`}>
                                  <CreditCard size={20} />
                                </div>
                                <div>
                                   <p className="font-bold text-slate-700 capitalize">{method === 'upi' ? 'UPI' : method.replace(/([A-Z])/g, ' $1').trim()}</p>
                                   <p className="text-xs text-slate-500">
                                      Provider: <span className="text-slate-700 font-medium">{config.providers[method] || 'Standard Gateway'}</span>
                                   </p>
                                </div>
                            </div>
                            <button 
                               onClick={() => handleToggleMethod(method)}
                               className={`text-2xl transition-colors ${config.methods[method] ? 'text-blue-600' : 'text-slate-300'}`}
                            >
                               {config.methods[method] ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                         </div>
                      ))}
                   </div>
                </section>

                <section className="pt-4">
                   <h3 className="text-lg font-bold text-slate-800 mb-4">Upstream Providers</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">Netbanking Aggregator</label>
                         <select className="w-full p-2 border rounded-lg bg-white">
                            <option>BillDesk Aggregator</option>
                            <option>UpyugoPay Route</option>
                            <option>PayU Biz</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">UPI Switch</label>
                         <select className="w-full p-2 border rounded-lg bg-white">
                            <option>Google Pay Business</option>
                            <option>PhonePe Switch</option>
                            <option>Juspay</option>
                         </select>
                      </div>
                   </div>
                </section>
             </div>
           )}

           {/* -- TAB: INTEGRATIONS -- */}
           {activeTab === 'integrations' && (
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <section>
                   <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Bell size={18} /> Email Configuration (SMTP)</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-lg border border-slate-200">
                      <div className="col-span-2 space-y-2">
                         <label className="text-sm font-medium text-slate-700">SMTP Host</label>
                         <input type="text" defaultValue={config.smtp.host} className="w-full p-2 border rounded-lg bg-white" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">Port</label>
                         <input type="text" defaultValue={config.smtp.port} className="w-full p-2 border rounded-lg bg-white" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">Username</label>
                         <input type="text" defaultValue={config.smtp.user} className="w-full p-2 border rounded-lg bg-white" />
                      </div>
                      <div className="col-span-2 space-y-2">
                         <label className="text-sm font-medium text-slate-700">Password / API Key</label>
                         <input type="password" value="****************" className="w-full p-2 border rounded-lg bg-white text-slate-400" readOnly />
                      </div>
                      <div className="col-span-2 flex justify-end">
                         <Button variant="outline" className="text-xs h-8">Test Connection</Button>
                      </div>
                   </div>
                </section>

                <div className="border-t border-slate-100 my-6"></div>

                <section>
                   <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Server size={18} /> SMS & Webhooks</h3>
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">SMS Provider</label>
                         <select className="w-full p-2 border rounded-lg bg-white">
                            <option>Twilio</option>
                            <option>AWS SNS</option>
                            <option>MSG91</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">Global Webhook URL (Admin)</label>
                         <div className="flex gap-2">
                            <input type="text" placeholder="https://..." className="w-full p-2 border rounded-lg" />
                            <Button>Verify</Button>
                         </div>
                         <p className="text-xs text-slate-500">This webhook receives all system-critical events.</p>
                      </div>
                   </div>
                </section>
             </div>
           )}

           {/* -- TAB: LOGS -- */}
           {activeTab === 'logs' && (
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                   <h3 className="font-bold text-slate-800 flex items-center gap-2"><Terminal size={18} /> System Event Logs</h3>
                   <div className="flex gap-2">
                      <input type="text" placeholder="Search logs..." className="text-sm p-1.5 border rounded-lg outline-none w-48" />
                      <button className="p-1.5 bg-white border rounded-lg hover:bg-slate-50"><RefreshCw size={16} /></button>
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-white border-b border-slate-100 text-xs uppercase text-slate-500 font-bold">
                         <tr>
                            <th className="px-4 py-3">Timestamp</th>
                            <th className="px-4 py-3">Level</th>
                            <th className="px-4 py-3">Module</th>
                            <th className="px-4 py-3">Message</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm font-mono">
                         {SYSTEM_LOGS.map(log => (
                            <tr key={log.id} className="hover:bg-slate-50">
                               <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{log.time}</td>
                               <td className="px-4 py-3">
                                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                     log.level === 'Error' ? 'bg-red-100 text-red-600' :
                                     log.level === 'Warning' ? 'bg-amber-100 text-amber-600' :
                                     'bg-blue-50 text-blue-600'
                                  }`}>
                                     {log.level}
                                  </span>
                               </td>
                               <td className="px-4 py-3 font-semibold text-slate-700">{log.module}</td>
                               <td className="px-4 py-3 text-slate-600">{log.message}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default SystemSettings;