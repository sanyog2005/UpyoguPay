import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CreditCard, 
  Landmark, 
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Github,
  Linkedin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NavbarLand from '../../components/common/NavbarLand';
 // Adjust path if necessary

const LandingPage = () => {

  const footerLinks = {
    acceptPayments: ['Payment Aggregator', 'Payment Gateway', 'Payment Pages', 'Payment Links', 'UpyugoPay POS', 'QR Codes', 'Subscriptions', 'Smart Collect', 'Optimizer', 'Instant Settlements'],
    bankingPlus: ['UpyugoPayX', 'Source to pay', 'Current Accounts', 'Payouts', 'Payout Links', 'Corporate Credit Card'],
    developers: ['Docs', 'Integrations', 'API Reference'],
    resources: ['Blog', 'Learn', 'Customer Stories', 'Events', 'Chargeback Guide', 'Settlement Guide'],
    solutions: ['Education', 'E-commerce', 'SaaS', 'BFSI'],
    freeTools: ['GST Calculator', 'GST Number Search', 'GST Search by PAN', 'ROI Calculator', 'CAGR Calculator', 'EBITDA Calculator'],
    company: ['About Us', 'Careers', 'Website Terms', 'Terms of Use', 'Privacy Policy', 'Grievance Redressal', 'Responsible Disclosure', 'Partners', 'White papers', 'Corporate Information'],
    help: ['Support', 'Knowledge base']
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 relative overflow-x-hidden selection:bg-blue-100">
      
      {/* 1. Top Notification Banner */}
      <div className="bg-[#02042B] text-white text-[11px] sm:text-xs py-3 px-4 text-center font-medium relative z-50">
        <span className="opacity-80">Effective January 1, 2026</span>
        <span className="mx-2 opacity-40">|</span>
        <span>Payment aggregation services will be operated by UpyugoPay Payments Private Limited (RBI - authorised Payment Aggregator)</span>
        <button className="ml-4 bg-white text-[#02042B] px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wide hover:bg-opacity-90 transition-colors">
          Know More
        </button>
      </div>

      {/* 2. Imported Navbar */}
      <NavbarLand />

      {/* 3. Hero Section */}
      <div className="relative pt-12 pb-16 lg:pt-24 lg:pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Background Gradients */}
        <div className="absolute top-0 left-[-20%] w-[60%] h-[60%] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Left Content */}
        <div className="flex-1 z-10 space-y-8 text-center lg:text-left">
           <h1 className="text-4xl lg:text-[56px] font-extrabold text-[#0C2454] leading-[1.1] tracking-tight">
             Advanced Payment Solutions <br/>
             <span className="relative inline-block">
                for India's boldest disruptors
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-green-400 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
             </span>
           </h1>
           <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-slate-500 font-medium text-lg">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> 100+ Payment Methods</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Easy Integration</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> Powerful Dashboard</span>
           </div>
           <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button className="w-full sm:w-auto bg-blue-600 text-white text-base font-bold px-8 py-3.5 rounded-[4px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group">
                 Sign Up Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto text-blue-600 font-bold px-8 py-3.5 rounded-[4px] hover:bg-blue-50 transition-colors">
                 Know More
              </button>
           </div>
        </div>

        {/* Right Content: Feature Card Graphic */}
        <div className="flex-1 relative z-10 perspective-1000">
           {/* Navigation Arrows */}
           <button className="absolute -left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg text-blue-600 flex items-center justify-center hover:scale-110 transition-transform z-20"><ChevronLeft size={20}/></button>
           <button className="absolute -right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg text-blue-600 flex items-center justify-center hover:scale-110 transition-transform z-20"><ChevronRight size={20}/></button>

           {/* Blue Geometric Backdrop */}
           <div className="absolute top-[-20px] right-[-40px] w-[120%] h-[120%] bg-[#1E40AF] opacity-5 transform rotate-[-5deg] rounded-3xl -z-10"></div>
           <div className="absolute inset-0 bg-blue-600 transform skew-x-[-6deg] rounded-3xl translate-x-4 translate-y-4 -z-10"></div>

           {/* Main Card */}
           <div className="relative bg-[#E3F2FD] rounded-2xl overflow-hidden shadow-2xl border border-white/50 w-full max-w-md mx-auto transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-[#D1F349] p-6 text-center relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold text-[#0C2454]">Payments</h3>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 flex items-center justify-center gap-1">
                       POWERS <span className="text-[#0C2454] font-extrabold tracking-tight normal-case text-sm">mamaearth</span>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-bl-full"></div>
              </div>
              <div className="p-6 bg-white">
                 <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-20 bg-gradient-to-b from-green-100 to-green-50 rounded-lg flex items-center justify-center border border-green-100 p-2">
                        <div className="w-8 h-14 bg-[#4A7D37] rounded-sm opacity-80 shadow-inner"></div>
                    </div>
                    <div>
                       <div className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Body Lotion</div>
                       <div className="text-xl font-bold text-[#0C2454]">₹ 455</div>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Select Payment Method</p>
                    <div className="grid grid-cols-2 gap-2">
                       <button className="flex items-center gap-2 p-2 border border-slate-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"><CreditCard size={16} className="text-slate-400" /> <span className="text-xs font-bold text-slate-700">Card</span></button>
                       <button className="flex items-center gap-2 p-2 border border-green-500 bg-green-50 rounded text-left relative overflow-hidden"><div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-bl"></div><Smartphone size={16} className="text-green-600" /> <span className="text-xs font-bold text-slate-800">UPI ID</span></button>
                       <button className="flex items-center gap-2 p-2 border border-slate-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"><Landmark size={16} className="text-slate-400" /> <span className="text-xs font-bold text-slate-700">Netbanking</span></button>
                       <button className="flex items-center gap-2 p-2 border border-slate-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"><CreditCard size={16} className="text-slate-400" /> <span className="text-xs font-bold text-slate-700">EMI</span></button>
                    </div>
                 </div>
              </div>
              <div className="bg-[#2A5CDC] p-6 text-white relative overflow-hidden">
                 <div className="relative z-10 flex items-end justify-between">
                    <div>
                       <div className="flex items-center gap-2 text-xs opacity-80 mb-1"><ArrowRight size={12} className="-rotate-45" /> MAMAEARTH FOUNDER</div>
                       <div className="text-4xl font-handwriting text-[#D1F349] font-bold -ml-2" style={{ fontFamily: 'cursive' }}>Ghazal</div>
                    </div>
                    <div className="w-16 h-16 rounded-full border-2 border-white/30 overflow-hidden bg-slate-400">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="Founder" className="w-full h-full object-cover opacity-80" />
                    </div>
                 </div>
                 <div className="absolute top-[-50%] right-[-20%] w-[200px] h-[200px] bg-blue-500/30 rounded-full blur-xl"></div>
              </div>
           </div>
        </div>
      </div>

      {/* 4. Partner Logos */}
      <div className="py-12 bg-white overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 overflow-x-auto no-scrollbar">
               <span className="text-lg font-bold font-serif text-slate-800">ZERODHA</span>
               <span className="text-lg font-bold text-slate-800 tracking-wider">ATHER</span>
               <span className="text-lg font-bold italic text-blue-900">IndiGo</span>
               <span className="text-lg font-bold text-orange-600">Akasa Air</span>
               <span className="text-lg font-bold text-slate-800 flex items-center gap-1"><span className="text-pink-500">M</span> Myntra</span>
               <span className="text-lg font-light border border-slate-800 px-1 py-0.5">nish</span>
               <span className="text-xl font-bold text-[#FF5A5F]">airbnb</span>
               <span className="text-xl font-bold text-[#1877F2]">facebook</span>
               <div className="flex items-center gap-1 font-bold text-[#25D366] text-lg"><Smartphone size={20} fill="currentColor" className="text-white bg-[#25D366] rounded-full p-0.5" /> WhatsApp</div>
            </div>
         </div>
      </div>

      {/* 5. International Payments Banner */}
      <div className="max-w-[1200px] mx-auto px-6 mt-16 mb-20">
         <div className="relative rounded-3xl overflow-hidden bg-[#8B1E16] min-h-[360px] flex items-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7a1610] to-[#b93a32]"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 bg-[url('https://images.unsplash.com/photo-1593672715438-d88a70629afd?auto=format&fit=crop&q=80')] bg-cover mix-blend-overlay"></div>
            <div className="absolute right-20 top-20 text-white/20 rotate-12"><Globe size={120} /></div>
            <div className="absolute right-40 bottom-10 text-yellow-400/40 -rotate-12 font-serif text-6xl">$</div>
            <div className="absolute right-10 top-1/2 text-yellow-400/40 rotate-45 font-serif text-6xl">₹</div>
            <div className="relative z-10 p-12 max-w-2xl">
               <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8 drop-shadow-sm">Accept payments in 130+ currencies.<br/>Go global today!</h2>
               <button className="bg-white text-[#8B1E16] text-sm font-bold px-8 py-4 rounded-[4px] hover:bg-gray-100 transition-colors shadow-lg">Accept International Payments</button>
            </div>
         </div>
      </div>

      {/* 6. Finance Platform Headline */}
      <div className="text-center pb-40 px-6">
         <h2 className="text-3xl md:text-5xl font-bold text-[#0C2454] leading-tight">The all in one <span className="text-[#00A651]">finance platform</span><br/>you’ve been looking for</h2>
      </div>

      {/* 7. Bottom Discovery Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-30">
         <div className="bg-white rounded-lg shadow-2xl border border-gray-100 p-2 pl-6 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-3 shrink-0 mr-4 border-r border-gray-100 pr-6">
               <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-[1px]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-[1px]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-[1px]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-[1px]"></div>
               </div>
               <span className="text-sm font-bold text-slate-700 whitespace-nowrap">Looking for a product?</span>
            </div>
            <div className="flex items-center gap-2">
               {[{ icon: CreditCard, label: 'Accept Payments', active: true }, { icon: ArrowRight, label: 'Make Payouts' }, { icon: Landmark, label: 'Start Business Banking' }, { icon: CreditCard, label: 'Get Credit' }, { icon: Smartphone, label: 'Automate Payroll' }, { icon: Sparkles, label: 'Something else?' }].map((item, idx) => (
                  <button key={idx} className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-bold whitespace-nowrap transition-all ${item.active ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                     <item.icon size={14} className={item.active ? 'text-blue-600' : 'text-slate-400'} />
                     {item.label}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* 8. Floating "Ask RAY" Button */}
      <button className="fixed bottom-6 right-6 z-40 bg-white border border-blue-100 text-blue-800 px-5 py-3 rounded shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 font-bold text-sm">
         <Sparkles size={18} className="text-blue-600 fill-blue-100" /> Ask RAY
      </button>

      {/* Footer */}
      <footer className="bg-white text-slate-600 relative z-20">
         <div className="bg-[#F4F8FF] py-16 text-center">
            <h2 className="text-3xl font-extrabold text-[#0C2454] mb-6">Supercharge your business <br/> with UpyugoPay</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-[4px] shadow-lg shadow-blue-600/20 transition-transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">Sign Up Now <ArrowRight size={18} /></button>
         </div>
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
            <div className="space-y-6">
               <Link to="/" className="flex items-center gap-1 text-[#0C2454] font-extrabold text-2xl tracking-tighter"><div className="w-0.5 h-6 bg-blue-600 rotate-12 mr-0.5"></div>UpyugoPay</Link>
               <p className="text-xs leading-relaxed text-slate-500">UpyugoPay is the only payments solution in India that allows businesses to accept, process and disburse payments...</p>
               <div className="flex gap-3 pt-2">
                  <div className="w-12 h-12 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-[8px] text-center font-bold text-slate-400">PCI DSS</div>
                  <div className="w-12 h-12 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-[8px] text-center font-bold text-slate-400">ISO</div>
                  <div className="w-12 h-12 bg-blue-600 rounded-full border border-blue-700 flex items-center justify-center text-[8px] text-center font-bold text-white">AICPA SOC</div>
               </div>
            </div>
            <div className="space-y-8">
               <div><h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Accept Payments</h4><ul className="space-y-2">{footerLinks.acceptPayments.map((link, i) => (<li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>))}</ul></div>
               <div><h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Payroll</h4><ul className="space-y-2"><li><a href="#" className="hover:text-blue-600 text-blue-500">UpyugoPayX Payroll</a></li></ul></div>
            </div>
            <div className="space-y-8">
               <div><h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Banking Plus</h4><ul className="space-y-2">{footerLinks.bankingPlus.map((link, i) => (<li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>))}</ul></div>
               <div><h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Developers</h4><ul className="space-y-2">{footerLinks.developers.map((link, i) => (<li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>))}</ul></div>
               <div><h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Solutions</h4><ul className="space-y-2">{footerLinks.solutions.map((link, i) => (<li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>))}</ul></div>
            </div>
            <div className="space-y-8">
               <div><h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Company</h4><ul className="space-y-2">{footerLinks.company.map((link, i) => (<li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>))}</ul></div>
               <div>
                  <h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Find Us Online</h4>
                  <div className="flex gap-4">
                     <a href="#" className="bg-[#0C2454] p-1.5 rounded-full text-white hover:bg-blue-600 transition-colors"><Facebook size={16} /></a>
                     <a href="#" className="bg-[#0C2454] p-1.5 rounded-full text-white hover:bg-blue-600 transition-colors"><Twitter size={16} /></a>
                     <a href="#" className="bg-[#0C2454] p-1.5 rounded-full text-white hover:bg-blue-600 transition-colors"><Instagram size={16} /></a>
                     <a href="#" className="bg-[#0C2454] p-1.5 rounded-full text-white hover:bg-blue-600 transition-colors"><Github size={16} /></a>
                     <a href="#" className="bg-[#0C2454] p-1.5 rounded-full text-white hover:bg-blue-600 transition-colors"><Linkedin size={16} /></a>
                  </div>
               </div>
               <div><h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Regd. Office Address</h4><p className="text-xs text-slate-500 leading-relaxed">UpyugoPay Software Limited, <br/>1st Floor, SJR Cyber, <br/>22 Laskar Hosur Road, Adugodi, <br/>Bengaluru, 560030, <br/>Karnataka, India <br/>CIN: U62099KA2024PTC188982</p></div>
               <div className="text-xs text-slate-400 mt-8"><p>© UpyugoPay 2025 <br/> All Rights Reserved</p></div>
            </div>
         </div>
      </footer>

    </div>
  );
};

export default LandingPage;