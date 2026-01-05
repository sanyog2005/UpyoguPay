import React, { useState, useEffect } from 'react';
import { 
  Key, 
  RefreshCw, 
  AlertCircle, 
  Check, 
  Copy, 
  Eye, 
  EyeOff, 
  Globe, 
  Plus, 
  Trash2, 
  Shield, 
  Zap, 
  BookOpen,
  Layout,
  Terminal,
  Activity,
  Server
} from 'lucide-react';

// --- MOCK DATA GENERATORS ---
const generateRandomString = (prefix, length = 24) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}_${result}`;
};

// --- REUSABLE COMPONENTS ---

const Button = ({ children, variant = 'primary', icon: Icon, onClick, className = '', disabled = false, isLoading = false }) => {
  const base = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 focus:ring-indigo-500 border border-transparent",
    secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-400 shadow-sm",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 focus:ring-red-500",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400",
    dark: "bg-slate-800 text-white hover:bg-slate-900 shadow-lg shadow-slate-200 focus:ring-slate-800"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {isLoading ? <RefreshCw className="animate-spin" size={16} /> : (Icon && <Icon size={16} />)}
      {children}
    </button>
  );
};

const Toggle = ({ enabled, onChange, label }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${enabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
  >
    <span className="sr-only">{label}</span>
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

const Badge = ({ children, variant = 'default' }) => {
  const styles = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20',
    warning: 'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-600/20',
    live: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-600/20',
    test: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-600/20',
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};

// --- MAIN COMPONENT ---

const APISettings = () => {
  // State: Environment
  const [env, setEnv] = useState('test'); // 'test' | 'live'
  
  // State: Keys
  const [keys, setKeys] = useState({
    test: { pk: 'pk_test_51MzAbCq3d9XyZ1', sk: 'sk_test_51MzXyZ9q3dAbC2', created: 'Oct 24, 2023' },
    live: { pk: 'pk_live_99QrLtZ2mNxKj8', sk: 'sk_live_88PlKjY3nOxLi7', created: 'Sep 15, 2023' }
  });
  const [showSecret, setShowSecret] = useState(false);
  const [isRollingKey, setIsRollingKey] = useState(false);
  
  // State: Webhooks
  const [webhooks, setWebhooks] = useState([
    { id: 1, url: 'https://api.mysite.com/webhooks/payment', status: 'active', events: ['payment.success', 'payment.failed'] },
    { id: 2, url: 'https://backup.mysite.com/logs', status: 'failed', events: ['all'] }
  ]);
  const [newWebhookUrl, setNewWebhookUrl] = useState('');

  // State: IP Whitelist
  const [ips, setIps] = useState([
    { id: 1, ip: '192.168.1.1', label: 'Office VPN' },
    { id: 2, ip: '203.0.113.45', label: 'Production Server' }
  ]);
  const [newIp, setNewIp] = useState('');
  const [newIpLabel, setNewIpLabel] = useState('');

  // State: UI Feedback
  const [toast, setToast] = useState(null);

  // --- ACTIONS ---

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
  };

  const handleRollKey = () => {
    if (!window.confirm(`Are you sure you want to roll the ${env.toUpperCase()} Secret Key? The old key will stop working immediately.`)) return;
    
    setIsRollingKey(true);
    setTimeout(() => {
      const newSk = generateRandomString(`sk_${env}`);
      setKeys(prev => ({
        ...prev,
        [env]: { ...prev[env], sk: newSk, created: new Date().toLocaleDateString() }
      }));
      setIsRollingKey(false);
      showToast('New secret key generated successfully.');
    }, 1500);
  };

  const handleAddWebhook = () => {
    if (!newWebhookUrl) return;
    setWebhooks([...webhooks, { 
      id: Date.now(), 
      url: newWebhookUrl, 
      status: 'active', 
      events: ['all'] 
    }]);
    setNewWebhookUrl('');
    showToast('Webhook endpoint added.');
  };

  const handleRemoveWebhook = (id) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
  };

  const handleAddIp = () => {
    if (!newIp) return;
    setIps([...ips, { id: Date.now(), ip: newIp, label: newIpLabel || 'Unnamed' }]);
    setNewIp('');
    setNewIpLabel('');
    showToast('IP address whitelisted.');
  };

  const handleRemoveIp = (id) => {
    setIps(ips.filter(i => i.id !== id));
  };

  // --- RENDER HELPERS ---

  const currentKeys = keys[env];
  const isTest = env === 'test';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            {toast.type === 'success' ? <Check size={18} className="text-green-400" /> : <AlertCircle size={18} className="text-red-400" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <Terminal size={20} />
             </div>
             <h1 className="text-lg font-bold text-slate-800">DevPortal</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1">
              <BookOpen size={16} /> Documentation
            </a>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1">
               <button 
                 onClick={() => setEnv('test')}
                 className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${isTest ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Test
               </button>
               <button 
                 onClick={() => setEnv('live')}
                 className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${!isTest ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Live
               </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className={`relative overflow-hidden rounded-2xl p-8 text-white transition-all duration-500 shadow-xl ${isTest ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-indigo-900 to-indigo-800'}`}>
          <div className="relative z-10 flex justify-between items-start">
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center gap-3">
                <Badge variant={isTest ? 'warning' : 'live'}>
                  {isTest ? 'TEST ENVIRONMENT' : 'LIVE ENVIRONMENT'}
                </Badge>
                {!isTest && <span className="flex items-center gap-1 text-xs text-emerald-300"><Shield size={12}/> Production Ready</span>}
              </div>
              <h2 className="text-3xl font-bold tracking-tight">API Configuration</h2>
              <p className={`text-sm leading-relaxed ${isTest ? 'text-slate-400' : 'text-indigo-200'}`}>
                {isTest 
                  ? "You are currently in Sandbox mode. Transactions made here are simulated and will not affect real data or funds. Use these keys for development and testing." 
                  : "You are in Live mode. Keys generated here will process real transactions. Please ensure your implementation is secure before going live."}
              </p>
            </div>
            
            {/* Visual Decorative Icon */}
            <div className={`p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner hidden md:block transition-all duration-500 ${isTest ? 'rotate-3' : '-rotate-3'}`}>
               <Server size={48} className={isTest ? 'text-amber-400' : 'text-emerald-400'} />
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
        </div>

        {/* --- API KEYS SECTION --- */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Key size={18} className="text-slate-400" />
              Standard Keys
            </h3>
            <span className="text-xs text-slate-400 font-mono">Created: {currentKeys.created}</span>
          </div>
          
          <div className="p-6 space-y-6">
            
            {/* Publishable Key */}
            <div className="group">
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Publishable Key</label>
                <span className="text-xs text-slate-400">Public-facing (Client-side)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between group-hover:border-indigo-300 transition-colors">
                  <code className="text-sm text-indigo-600 font-mono truncate">{currentKeys.pk}</code>
                  <Check size={16} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <Button variant="secondary" icon={Copy} onClick={() => handleCopy(currentKeys.pk)}>Copy</Button>
              </div>
            </div>

            {/* Secret Key */}
            <div className="group">
               <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Secret Key 
                  <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-2">SENSITIVE</span>
                </label>
                <span className="text-xs text-slate-400">Server-side only</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between group-hover:border-indigo-300 transition-colors relative overflow-hidden">
                  <code className={`text-sm font-mono truncate transition-all duration-300 ${showSecret ? 'text-slate-700' : 'text-slate-400 tracking-widest'}`}>
                    {showSecret ? currentKeys.sk : '•'.repeat(40)}
                  </code>
                  {/* Subtle noise texture for hidden state could go here */}
                </div>
                <Button variant="secondary" icon={showSecret ? EyeOff : Eye} onClick={() => setShowSecret(!showSecret)}>
                  {showSecret ? 'Hide' : 'Reveal'}
                </Button>
                <Button variant="secondary" icon={Copy} onClick={() => handleCopy(currentKeys.sk)}>Copy</Button>
              </div>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                <AlertCircle size={12} className="text-amber-500" /> 
                Ensure this key is stored securely in your environment variables. Never commit it to version control.
              </p>
            </div>

            {/* Roll Key Action */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
               <div>
                  <p className="text-sm font-medium text-slate-900">Regenerate Secret Key</p>
                  <p className="text-xs text-slate-500">This will invalidate the current secret key immediately.</p>
               </div>
               <Button 
                 variant="danger" 
                 icon={RefreshCw} 
                 onClick={handleRollKey} 
                 isLoading={isRollingKey}
               >
                 Roll Key
               </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* --- WEBHOOKS SECTION --- */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Activity size={18} className="text-slate-400" />
                Webhooks
              </h3>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-6">
              <div className="space-y-4">
                 {webhooks.length > 0 ? (
                   webhooks.map((hook) => (
                     <div key={hook.id} className="border border-slate-100 rounded-lg p-3 flex items-start justify-between group hover:border-indigo-200 hover:shadow-sm transition-all">
                        <div className="space-y-1 overflow-hidden">
                           <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${hook.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              <p className="text-sm font-mono text-slate-600 truncate w-full" title={hook.url}>{hook.url}</p>
                           </div>
                           <div className="flex gap-2">
                             {hook.events.map(ev => (
                               <span key={ev} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">{ev}</span>
                             ))}
                           </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveWebhook(hook.id)} 
                          className="text-slate-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                     </div>
                   ))
                 ) : (
                   <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-100 rounded-lg">
                      <Zap size={24} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No webhooks configured</p>
                   </div>
                 )}
              </div>

              <div className="mt-auto pt-4 border-t border-slate-50">
                 <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Add Endpoint</label>
                 <div className="flex gap-2">
                   <div className="relative flex-1">
                      <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        value={newWebhookUrl}
                        onChange={(e) => setNewWebhookUrl(e.target.value)}
                        placeholder="https://api.yoursite.com/hook" 
                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                   </div>
                   <Button onClick={handleAddWebhook} disabled={!newWebhookUrl}><Plus size={16}/></Button>
                 </div>
              </div>
            </div>
          </div>

          {/* --- IP WHITELIST SECTION --- */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Shield size={18} className="text-slate-400" />
                IP Whitelist
              </h3>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-6">
               <p className="text-sm text-slate-500">Restrict API access to specific IP addresses. If empty, requests are allowed from any IP.</p>
               
               <div className="space-y-3">
                 {ips.map((item) => (
                   <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3">
                         <div className="bg-white p-1.5 rounded border border-slate-200 shadow-sm">
                            <Server size={14} className="text-indigo-500" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-700">{item.ip}</p>
                            <p className="text-xs text-slate-400">{item.label}</p>
                         </div>
                      </div>
                      <button 
                         onClick={() => handleRemoveIp(item.id)}
                         className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      >
                         <Trash2 size={16} />
                      </button>
                   </div>
                 ))}
               </div>

               <div className="mt-auto pt-4 border-t border-slate-50 space-y-3">
                 <label className="text-xs font-bold text-slate-500 uppercase block">Add IP Address</label>
                 <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      value={newIp}
                      onChange={(e) => setNewIp(e.target.value)}
                      placeholder="e.g. 192.168.1.1" 
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input 
                      type="text" 
                      value={newIpLabel}
                      onChange={(e) => setNewIpLabel(e.target.value)}
                      placeholder="Label (Optional)" 
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                 </div>
                 <Button variant="secondary" className="w-full" onClick={handleAddIp} disabled={!newIp}>Add to Whitelist</Button>
               </div>
            </div>
          </div>

        </div>

        <div className="text-center text-xs text-slate-400 py-8">
           <p>Last login from 127.0.0.1 on {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default APISettings;