import React, { useState } from 'react';
import { 
  Copy, 
  CreditCard, 
  Monitor, 
  Briefcase, 
  IndianRupee, 
  FileText, 
  Bell, 
  ShoppingCart, 
  ExternalLink,
  HelpCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

// --- MOCK DATA FOR SETTINGS GRID ---
const SETTINGS_GROUPS = [
  {
    title: 'Payment methods',
    icon: CreditCard,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    links: ['Cards', 'UPI/QR', 'Netbanking', 'EMI', 'Wallet', 'Pay Later', 'International payments']
  },
  {
    title: 'Website and app settings',
    icon: Monitor,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    links: ['Business policy details', 'Business website detail', 'API keys', 'Webhooks']
  },
  {
    title: 'Business settings',
    icon: Briefcase,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    links: ['Account details', 'Business details', 'GST details', 'Customer support details', 'Activation details', 'Manage team', 'Support tickets']
  },
  {
    title: 'Payments and refunds',
    icon: IndianRupee,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    links: ['Balances', 'Credits', 'Reminders', 'Transaction limits', 'Capture and refund settings']
  },
  {
    title: 'Bank accounts and settlements',
    icon: FileText,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    links: ['Bank account details', 'Settlement details']
  },
  {
    title: 'Notification settings',
    icon: Bell,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    links: ['Email', 'SMS']
  },
  {
    title: 'Checkout settings',
    icon: ShoppingCart,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-50',
    links: ['Checkout Styling', 'Checkout Features', 'Payment Configuration']
  }
];

const Profile = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  // --- SUB-COMPONENTS ---
  
  const SettingsCard = ({ group }) => (
    <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${group.iconBg} ${group.iconColor}`}>
          <group.icon size={16} />
        </div>
        <h3 className="text-sm font-medium text-slate-700">{group.title}</h3>
      </div>
      <ul className="space-y-3">
        {group.links.map((link, index) => (
          <li key={index}>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      <div className="max-w-[1400px] mx-auto p-8">
        
        {/* 1. Header & User Card */}
        <h1 className="text-lg font-medium text-slate-700 mb-4">Your profile</h1>
        
        <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-8 mb-10 flex flex-col md:flex-row gap-8">
           
           {/* Left: Avatar & ID */}
           <div className="flex gap-6 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0">
              <div className="w-24 h-24 bg-white border border-gray-200 shadow-sm rounded flex items-center justify-center text-4xl text-slate-400 font-medium">
                R
              </div>
              <div className="flex flex-col justify-center">
                 <h2 className="text-base font-bold text-slate-800">Raushan</h2>
                 <p className="text-sm text-slate-500 mb-4">Owner</p>
                 
                 <p className="text-xs text-slate-400 uppercase font-bold mb-1">Merchant ID</p>
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800 font-mono">M9Ds0a8o4cFo25</span>
                    <button className="text-slate-400 hover:text-blue-600"><Copy size={14} /></button>
                 </div>
              </div>
           </div>

           {/* Right: Contact Details */}
           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 pl-0 md:pl-4">
              {/* Row 1 */}
              <div>
                 <div className="flex justify-between">
                    <span className="text-sm font-bold text-slate-700">Phone number</span>
                    <span className="text-sm text-slate-600">9576724881 <a href="#" className="text-blue-600 ml-1">Edit</a></span>
                 </div>
              </div>
              <div>
                 {/* Empty column or spacing if needed */}
              </div>

              {/* Row 2 */}
              <div>
                 <div className="flex justify-between">
                    <span className="text-sm font-bold text-slate-700">Login email</span>
                    <span className="text-sm text-slate-600">rk6358797@gmail.com <a href="#" className="text-blue-600 ml-1">Edit</a></span>
                 </div>
              </div>
              <div></div>

              {/* Row 3 */}
              <div>
                 <div className="flex justify-between">
                    <span className="text-sm font-bold text-slate-700">Password</span>
                    <span className="text-sm text-slate-600 flex items-center gap-1">
                      •••••••••• <a href="#" className="text-blue-600 ml-1">Edit</a>
                    </span>
                 </div>
              </div>
              <div></div>

              {/* Row 4 */}
              <div className="col-span-2">
                 <div className="flex items-center gap-12">
                    <div className="flex items-center gap-1">
                       <span className="text-sm font-bold text-slate-700">2-step verification</span>
                       <HelpCircle size={14} className="text-slate-400" />
                    </div>
                    <button onClick={() => setTwoFactor(!twoFactor)} className="text-slate-300 hover:text-slate-400">
                       {twoFactor ? <ToggleRight size={32} className="text-green-500" /> : <ToggleLeft size={32} />}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. Settings Grid Header */}
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-lg font-medium text-slate-700">Account and product settings</h2>
           <a href="#" className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
             Documentation <ExternalLink size={14} />
           </a>
        </div>

        {/* 3. Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {SETTINGS_GROUPS.map((group, idx) => (
             <SettingsCard key={idx} group={group} />
           ))}
           {/* Empty Filler Card to match layout if needed, or CSS Grid handles it */}
           <div className="hidden lg:block"></div>
        </div>

      </div>

      {/* Footer */}
      <div className="max-w-[1400px] mx-auto px-8 py-6 text-xs text-slate-400 border-t border-gray-200 mt-8">
         © 2017-2026 Copyright UpyugoPay · <a href="#" className="hover:text-slate-600 underline">Terms of Use</a> · <a href="#" className="hover:text-slate-600 underline">Privacy Policy</a>
      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#022D45] hover:bg-[#0a2544] text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-sm font-medium transition-transform hover:scale-105 z-50">
        <div className="grid place-items-center"><HelpCircle size={18} /></div>
        Help & Support
      </button>

    </div>
  );
};

export default Profile;