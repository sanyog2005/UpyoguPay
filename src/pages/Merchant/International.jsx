import React, { useState } from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  ExternalLink, 
  Info,
  HelpCircle,
  CreditCard,
  ChevronRight,
  Landmark,
  Smartphone,
  Clock,
  Wallet // Imported Wallet icon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const International = () => {
  const [activeTab, setActiveTab] = useState('Wallet'); // Defaulting to Wallet to show the new feature
  const [netbankingSubTab, setNetbankingSubTab] = useState('Retail');

  // Navigation Tabs
  const tabs = ['Cards', 'UPI/QR', 'Netbanking', 'EMI', 'Wallet', 'Pay Later', 'International Payments'];

  // --- MOCK DATA ---
  const domesticCards = [
    { name: 'Visa Cards', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg', status: 'ACTIVATED' },
    { name: 'MasterCard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg', status: 'ACTIVATED' },
    { name: 'Rupay Cards', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png', status: 'ACTIVATED' },
    { name: 'Amex Cards', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg', status: 'Request' },
    { name: 'Diners Club', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Diners_Club_Logo3.svg', status: 'Request' },
  ];

  const activeBanks = [
    'AU Small Finance Bank', 'Airtel Payments Bank', 'Allahabad Bank', 'Bank of Baroda', 
    'Bank of Maharashtra', 'Canara Bank', 'Catholic Syrian Bank', 'Central Bank of India',
    'City Union Bank', 'Corporation Bank', 'DBS Bank Ltd', 'DCB Bank', 'Deutsche Bank'
  ];

  const emiOptions = {
    debit: [{ name: 'HDFC Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg', status: 'ACTIVATED' }],
    credit: [
      { name: 'HDFC CC EMI', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg', status: 'ACTIVATED' },
      { name: 'SBI CC EMI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg', status: 'Request' },
      { name: 'Amex CC EMI', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg', status: 'ACTIVATED' },
      { name: 'Other banks', subtext: 'Axis, ICICI, IDFC, Kotak & more', icon: Landmark, status: 'ACTIVATED' }
    ],
    cardless: [
      { name: 'ZestMoney', icon: Smartphone, status: 'Request', alert: 'ZestMoney has paused onboarding of new merchants. We will keep you updated on when the onboarding resumes.' },
      { name: 'Early Salary', icon: Smartphone, status: 'ACTIVATED' },
      { name: 'Instacred', subtext: 'ICICI, Kotak, HDFC, Federal & more', icon: Smartphone, status: 'Request' },
      { name: 'Axio', icon: Smartphone, status: 'Request' }
    ]
  };

  const payLaterOptions = [
    { name: 'Flexipay', logoUrl: 'https://UpyugoPay.com/docs/build/browser/static/flexipay-72c0d3d4.svg', status: 'Request', alert: 'Flexipay has paused onboarding of new merchants. We will keep you updated on when the onboarding resumes.' },
    { name: 'Simpl', logoUrl: 'https://UpyugoPay.com/docs/build/browser/static/simpl-8244e6d4.svg', status: 'Request', alert: 'Simpl has paused onboarding of new merchants. We will keep you updated on when the onboarding resumes.' }
  ];

  // New Data for Wallets
  const walletOptions = [
    { name: 'Amazon Pay', icon: Wallet, status: 'Request' },
    { name: 'Paytm', icon: Wallet, status: 'Request' },
    { 
      name: 'Phonepe', 
      icon: Wallet, 
      status: 'Request', 
      alert: 'Phonepe has paused onboarding of new merchants. We will keep you updated on when the onboarding resumes.' 
    },
    { name: 'Airtel Money', icon: Smartphone, status: 'ACTIVATED' },
    { name: 'Jio Money', icon: Smartphone, status: 'ACTIVATED' },
    { name: 'Ola Money', icon: Smartphone, status: 'ACTIVATED' },
    { name: 'Mobikwik', icon: Wallet, status: 'ACTIVATED' },
    { name: 'Freecharge', icon: Wallet, status: 'ACTIVATED' }
  ];

  // Helper Component for Status Badge
  const StatusBadge = ({ status }) => (
    status === 'ACTIVATED' ? (
      <span className="bg-[#E6F4EA] text-[#1E8E3E] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
         Activated
      </span>
    ) : (
      <button className="bg-[#E3F2FD] text-[#1976D2] text-xs font-bold px-4 py-1.5 rounded hover:bg-[#BBDEFB] transition-colors">
         Request
      </button>
    )
  );

  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Breadcrumb Header */}
      <div className="bg-white border-b border-gray-200">
         <div className="px-8 py-4 flex items-center gap-2 text-sm text-slate-500">
            <Link to="/merchant/profile" className="hover:text-slate-800 flex items-center gap-1">
               <ArrowLeft size={16} /> Account & Settings
            </Link>
            <span>›</span>
            <span className="text-blue-600 font-medium">{activeTab}</span>
         </div>
         
         <div className="px-8 flex items-center gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
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

      <div className="px-8 py-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* Warning Banners */}
        <div className="bg-[#FFF4E5] border border-[#FFE0B2] p-3 rounded-sm flex items-start gap-3 text-sm text-[#663C00]">
           <AlertTriangle size={18} className="shrink-0 mt-0.5" />
           <span>Request for Payment methods is unavailable as your account is not enabled to accept transactions.</span>
        </div>
        <div className="bg-[#FFF4E5] border border-[#FFE0B2] p-3 rounded-sm flex items-start gap-3 text-sm text-[#663C00]">
           <AlertTriangle size={18} className="shrink-0 mt-0.5" />
           <span>KYC verification is mandatory. Please complete your <a href="#" className="text-blue-600 hover:underline">activation form</a>.</span>
        </div>

        {/* --- CONTENT AREA --- */}

        {/* 1. CARDS TAB */}
        {activeTab === 'Cards' && (
           <div className="mt-8">
              <h2 className="text-lg font-bold text-slate-800">Cards</h2>
              <p className="text-sm text-slate-500 mb-6">Visa, Master, Amex</p>
              <div className="bg-white border border-gray-200 rounded-sm shadow-sm max-w-2xl">
                 <div className="px-6 py-4 border-b border-gray-200"><h3 className="text-sm font-bold text-slate-800">Domestic Cards</h3></div>
                 <div className="divide-y divide-gray-100">
                    {domesticCards.map((card, idx) => (
                       <div key={idx} className="flex items-center justify-between px-6 py-4">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-6 flex items-center justify-center bg-white border border-gray-200 rounded p-1"><img src={card.logo} className="max-h-full max-w-full object-contain" /></div>
                             <span className="text-sm font-bold text-slate-700">{card.name}</span>
                          </div>
                          <StatusBadge status={card.status} />
                       </div>
                    ))}
                 </div>
                 {/* Cards Recurring Section */}
                 <div className="border-t border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 bg-[#FAFAFA]"><h3 className="text-xs font-bold text-slate-500 uppercase">Cards Recurring</h3></div>
                    <div className="p-6">
                       <div className="border border-gray-200 rounded p-4 flex items-center justify-between bg-white">
                          <div><h4 className="text-sm font-bold text-slate-800">Cards Recurring</h4><p className="text-xs text-slate-500 mt-1">Allow customers to create mandates via cards.</p></div>
                          <span className="bg-[#E6F4EA] text-[#1E8E3E] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">Activated</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* 2. UPI TAB */}
        {activeTab === 'UPI/QR' && (
           <div className="mt-8">
              <div className="flex justify-between items-start mb-6 max-w-4xl">
                 <div><h2 className="text-lg font-bold text-slate-800">UPI/QR</h2><p className="text-sm text-slate-500 mt-1">GooglePay, PhonePe, BHIM & more</p></div>
                 <a href="#" className="text-blue-600 text-sm flex items-center gap-1 hover:underline font-medium">Know More <ExternalLink size={14} /></a>
              </div>
              <div className="bg-white border border-gray-200 rounded-sm shadow-sm max-w-2xl p-6">
                 <div className="mb-8"><div className="flex justify-between items-center mb-3"><h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">UPI</h3></div><div className="border border-gray-200 rounded p-5 flex justify-between items-center bg-white"><div><h4 className="text-sm font-bold text-slate-800">UPI</h4><p className="text-xs text-slate-500 mt-1">Gpay, Phonepe, Paytm...</p></div><StatusBadge status="ACTIVATED" /></div></div>
                 <div><div className="flex justify-between items-center mb-3"><h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">UPI Autopay</h3></div><div className="border border-gray-200 rounded p-5 flex justify-between items-center bg-white"><div><h4 className="text-sm font-bold text-slate-800">UPI Autopay</h4><p className="text-xs text-slate-500 mt-1">Allow customers to create mandates via UPI.</p></div><StatusBadge status="ACTIVATED" /></div></div>
              </div>
           </div>
        )}

        {/* 3. NETBANKING TAB */}
        {activeTab === 'Netbanking' && (
           <div className="mt-8">
              <div className="flex justify-between items-start mb-6"><div><h2 className="text-lg font-bold text-slate-800">Netbanking</h2><p className="text-sm text-slate-500 mt-1">All Indian Banks</p></div><a href="#" className="text-blue-600 text-sm flex items-center gap-1 hover:underline font-medium">Know More <ExternalLink size={14} /></a></div>
              <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col md:flex-row min-h-[500px]">
                 <div className="w-full md:w-64 border-r border-gray-200">{['Retail', 'Corporate', 'E-Mandate'].map(sub => (<button key={sub} onClick={() => setNetbankingSubTab(sub)} className={`w-full text-left px-5 py-4 border-l-4 transition-colors ${netbankingSubTab === sub ? 'border-blue-600 bg-blue-50/30' : 'border-transparent hover:bg-slate-50'}`}><div className="flex items-center justify-between"><span className={`text-sm font-bold ${netbankingSubTab === sub ? 'text-blue-600' : 'text-slate-700'}`}>{sub} Netbanking</span>{netbankingSubTab === sub && <ChevronRight size={16} className="text-blue-600" />}</div></button>))}</div>
                 <div className="flex-1 p-6"><h3 className="text-sm font-bold text-slate-800 mb-4">Available Banks</h3><div className="border border-gray-200 rounded-sm overflow-hidden"><div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100 custom-scrollbar">{activeBanks.map((bank, index) => (<div key={index} className="flex justify-between items-center px-5 py-4 hover:bg-slate-50/50"><span className="text-sm text-slate-700 font-medium">{bank}</span><StatusBadge status="ACTIVATED" /></div>))}</div></div></div>
              </div>
           </div>
        )}

        {/* 4. EMI TAB */}
        {activeTab === 'EMI' && (
           <div className="mt-8">
              <div className="flex justify-between items-start mb-6"><div><h2 className="text-lg font-bold text-slate-800">EMI</h2><p className="text-sm text-slate-500 mt-1">Credit/Debit cards, Zest money & more</p></div><a href="#" className="text-blue-600 text-sm flex items-center gap-1 hover:underline font-medium">Know More <ExternalLink size={14} /></a></div>
              <div className="bg-white border border-gray-200 rounded-sm shadow-sm max-w-2xl">
                 <div className="p-6 border-b border-gray-200"><h3 className="text-xs font-bold text-slate-700 uppercase mb-4">Debit Card EMI</h3>{emiOptions.debit.map((opt, i) => (<div key={i} className="flex items-center justify-between border border-gray-200 rounded p-4 mb-2 bg-white"><div className="flex items-center gap-3"><div className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center p-1"><img src={opt.logo} className="w-full" /></div><span className="text-sm font-bold text-slate-700">{opt.name}</span></div><StatusBadge status={opt.status} /></div>))}</div>
                 <div className="p-6 border-b border-gray-200"><h3 className="text-xs font-bold text-slate-700 uppercase mb-4">Credit Card EMI</h3><div className="space-y-3">{emiOptions.credit.map((opt, i) => (<div key={i} className="flex items-center justify-between border border-gray-200 rounded p-4 bg-white"><div className="flex items-center gap-3"><div className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center p-1">{opt.logo ? <img src={opt.logo} className="w-full" /> : <opt.icon size={16} className="text-blue-600" />}</div><div><div className="text-sm font-bold text-slate-700">{opt.name}</div>{opt.subtext && <div className="text-[10px] text-blue-600">{opt.subtext}</div>}</div></div><StatusBadge status={opt.status} /></div>))}</div></div>
                 <div className="p-6"><h3 className="text-xs font-bold text-slate-700 uppercase mb-4">Cardless EMI</h3><div className="space-y-3">{emiOptions.cardless.map((opt, i) => (<div key={i} className="border border-gray-200 rounded overflow-hidden"><div className="flex items-center justify-between p-4 bg-white"><div className="flex items-center gap-3"><div className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center p-1 bg-green-50"><opt.icon size={16} className="text-green-600" /></div><div><div className="text-sm font-bold text-slate-700">{opt.name}</div>{opt.subtext && <div className="text-[10px] text-slate-500">{opt.subtext}</div>}</div></div><StatusBadge status={opt.status} /></div>{opt.alert && (<div className="bg-slate-50 p-3 flex gap-2 border-t border-gray-100"><Info size={14} className="text-slate-400 shrink-0 mt-0.5" /><p className="text-xs text-slate-500 leading-relaxed">{opt.alert}</p></div>)}</div>))}</div></div>
              </div>
           </div>
        )}

        {/* 5. WALLET TAB (NEW) */}
        {activeTab === 'Wallet' && (
           <div className="mt-8">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h2 className="text-lg font-bold text-slate-800">Wallet</h2>
                    <p className="text-sm text-slate-500 mt-1">Phonepe, Freecharge etc.</p>
                 </div>
                 <a href="#" className="text-blue-600 text-sm flex items-center gap-1 hover:underline font-medium">
                    Know More about payment methods <ExternalLink size={14} />
                 </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm shadow-sm max-w-2xl p-6">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-800">Wallets</h3>
                 </div>

                 <div className="space-y-4">
                    {walletOptions.map((opt, i) => (
                       <div key={i} className="border border-gray-200 rounded overflow-hidden">
                          <div className="flex items-center justify-between p-4 bg-white">
                             <div className="flex items-center gap-3">
                                {/* Icon container matching the screenshot */}
                                <div className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center p-2 bg-white">
                                   <opt.icon size={20} className="text-slate-700" />
                                </div>
                                <span className="text-sm font-bold text-slate-700">{opt.name}</span>
                             </div>
                             <StatusBadge status={opt.status} />
                          </div>
                          
                          {/* Alert Banner for PhonePe */}
                          {opt.alert && (
                             <div className="bg-[#F9FAFB] p-4 flex gap-3 border-t border-gray-100">
                                <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-slate-500 leading-relaxed">{opt.alert}</p>
                             </div>
                          )}
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* 6. PAY LATER TAB */}
        {activeTab === 'Pay Later' && (
           <div className="mt-8">
              <div className="flex justify-between items-start mb-6"><div><h2 className="text-lg font-bold text-slate-800">Pay Later</h2><p className="text-sm text-slate-500 mt-1">Buy now and pay later with ePay Later</p></div><a href="#" className="text-blue-600 text-sm flex items-center gap-1 hover:underline font-medium">Know More <ExternalLink size={14} /></a></div>
              <div className="bg-white border border-gray-200 rounded-sm shadow-sm max-w-2xl p-6">
                 <div className="flex justify-between items-center mb-4"><h3 className="text-sm font-bold text-slate-800">PayLater</h3><a href="#" className="text-blue-600 text-xs flex items-center gap-1 hover:underline font-bold">Documentation <ExternalLink size={10} /></a></div>
                 <div className="space-y-4">
                    {payLaterOptions.map((opt, i) => (
                       <div key={i} className="border border-gray-200 rounded overflow-hidden"><div className="flex items-center justify-between p-4 bg-white"><div className="flex items-center gap-3"><div className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center p-1 bg-white">{opt.logoUrl ? <img src={opt.logoUrl} className="w-full h-full object-contain" /> : <Clock size={20} className="text-slate-400" />}</div><span className="text-sm font-bold text-slate-700">{opt.name}</span></div><StatusBadge status={opt.status} /></div>{opt.alert && (<div className="bg-[#F9FAFB] p-4 flex gap-3 border-t border-gray-100"><Info size={16} className="text-slate-400 shrink-0 mt-0.5" /><p className="text-xs text-slate-500 leading-relaxed">{opt.alert}</p></div>)}</div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* 7. INTERNATIONAL PAYMENTS TAB CONTENT */}
        {activeTab === 'International Payments' && (
           <div className="bg-white border border-gray-200 rounded-sm shadow-sm mt-6">
              <div className="p-6 border-b border-gray-100 flex justify-between items-start"><div><h2 className="text-base font-bold text-slate-800">International Payments</h2><p className="text-xs text-slate-500 mt-1">Cards, PayPal, USD ACH & more</p></div><a href="#" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">Know More <ExternalLink size={14} /></a></div>
              <div className="p-8 space-y-12">
                 <div className="space-y-4"><div><h3 className="text-sm font-bold text-slate-800">International Cards</h3><p className="text-xs text-slate-500 mt-1">On Payment Gateway, Pages, Links and Invoices</p></div><div className="bg-[#F9FAFB] border border-gray-200 p-6 rounded text-center"><p className="text-sm font-bold text-slate-700">Your business type is not supported</p><p className="text-xs text-slate-500 mt-1">Link your PayPal account</p></div></div>
                 <div className="space-y-4 pb-8"><div><h3 className="text-sm font-bold text-slate-800">PayPal</h3><p className="text-xs text-slate-500 mt-1">Accept International Payments using PayPal</p></div><button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded transition-colors w-fit">Link Account</button><div className="bg-[#F5F7F9] p-3 flex items-start gap-3 text-xs text-slate-600 rounded"><Info size={14} className="shrink-0 mt-0.5 text-slate-400" /><span>You can accept Payments in <span className="font-bold">International Currencies only</span>.</span></div></div>
              </div>
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

export default International;