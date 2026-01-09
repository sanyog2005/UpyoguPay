import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../../assets/logo-icon.png'; // Ensure path is correct
import { 
  Headphones, Menu, ArrowRight, CreditCard, Landmark, Smartphone, Globe, 
  Monitor, Repeat, Zap, Layers, Settings, QrCode, Link as LinkIcon, 
  FileText, Briefcase, Coins, FilePlus, ShieldCheck, Percent, CheckCircle2, 
  DollarSign, X, BookOpen, Calendar, Users, Code2, Box, Calculator, Search 
} from 'lucide-react';

const NavbarLand = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  // --- MENU DATA WITH PATHS ---

  const paymentsMenu = {
    online: [
      { name: 'Payment Aggregator', path: '/payments/aggregator', desc: 'Accepting payments made easy for businesses', icon: Layers },
      { name: 'Payment Gateway', path: '/payments/gateway', desc: 'Payments on your Website & App', icon: CreditCard },
      { name: 'Payment Links', path: '/payments/links', desc: 'Create & send links to collect money', icon: LinkIcon },
      { name: 'Payment Pages', path: '/payments/pages', desc: 'Get paid with personalized page', icon: FileText },
      { name: 'QR Codes', path: '/payments/qr-codes', desc: 'Multi-feature QR for your business', icon: QrCode },
      { name: 'UPI Payments', path: '/payments/upi', desc: 'Discover the complete UPI stack', icon: Zap, badge: 'NEW' },
      { name: 'Magic Checkout', path: '/payments/magic-checkout', desc: 'Improve Order Conversions & Reduce RTOs', icon: SparklesIcon, badge: 'NEW' },
      { name: 'Subscriptions', path: '/payments/subscriptions', desc: 'Collect recurring subscription payments', icon: Repeat },
      { name: 'Instant Settlement', path: '/payments/settlements', desc: 'Customer payments settled faster', icon: Zap },
      { name: 'Optimizer', path: '/payments/optimizer', desc: 'Manage multiple payment gateways', icon: Settings },
    ],
    offline: [
      { name: 'UpyugoPay POS', path: '/payments/pos', desc: 'Accept Payments In-Store', icon: Smartphone },
    ],
    international: [
      { name: 'International Payments', path: '/payments/international', desc: 'Accept payments from across the globe', icon: Globe },
      { name: 'International Bank Transfers', path: '/payments/bank-transfers', desc: 'Accept USD, GBP, EUR payments in your account', icon: Landmark },
    ],
    global: [
      { name: 'Accept Payments from India', path: '/payments/global-india', desc: 'Seamless INR collections via UPI & cards', icon: Globe, badge: 'NEW' },
    ],
    allInOne: [
      { name: 'Omnichannel Payments', path: '/payments/omnichannel', desc: 'One Payment Platform for All Channels', icon: Monitor, badge: 'NEW' },
    ]
  };

  const bankingMenu = {
    businessBanking: [
      { name: 'RazorpayX', path: '/banking/razorpayx', desc: 'Business Banking Supercharged for disruptors', icon: X }, 
      { name: 'Current Account', path: '/banking/current-account', desc: 'Supercharged for businesses', icon: Landmark },
      { name: 'Source to Pay', path: '/banking/source-to-pay', desc: 'Integrated Accounts Payable Automation', icon: Layers, badge: 'NEW' },
      { name: 'Escrow+ Account', path: '/banking/escrow', desc: 'Escrow account for digital-first businesses', icon: ShieldCheck, badge: 'NEW' },
      { name: 'Payouts', path: '/banking/payouts', desc: '24x7, Instant & Automated Payouts', icon: Zap },
      { name: 'Forex/FDI Transfers', path: '/banking/forex', desc: 'Expert-led service to bring foreign currency', icon: DollarSign, badge: 'NEW' },
      { name: 'Payout Links', path: '/banking/payout-links', desc: 'Send money without recipient account details', icon: LinkIcon },
      { name: 'Bank Account Verification', path: '/banking/verification', desc: 'Instantly verify Bank Account, UPI ID or IFSC', icon: CheckCircle2, badge: 'NEW' },
      { name: 'View Live Demo', path: '/banking/demo', desc: 'See RazorpayX in action, no signup required!', icon: Monitor },
      { name: 'Tax Payments', path: '/banking/tax-payments', desc: 'Pay your business taxes in under 30 seconds', icon: Percent },
    ],
    lending: [
      { name: 'Lending Tech Stack', path: '/banking/lending-stack', desc: 'Fully compliant, 10-second disbursals', icon: Layers },
      { name: 'Corporate Cards', path: '/banking/corporate-cards', desc: 'Streamline your business expenses', icon: CreditCard, badge: 'NEW' },
      { name: 'Razorpay Capital', path: '/banking/capital', desc: 'Get money for your business needs', icon: Coins },
    ],
    startBusiness: [
      { name: 'Company Registration', path: '/banking/registration', desc: 'Simplify your business incorporation journey', icon: FilePlus },
    ]
  };

  const resourcesMenu = {
    awareness: [
      { name: 'Blog', path: '/resources/blog', icon: BookOpen },
      { name: 'Learn', path: '/resources/learn', icon: BookOpen },
      { name: 'Events', path: '/resources/events', icon: Calendar },
      { name: 'White papers', path: '/resources/white-papers', icon: FileText },
      { name: 'Customer Stories', path: '/resources/stories', icon: Users },
    ],
    developers: [
      { name: 'Developer Docs', path: '/resources/docs', icon: Code2 },
      { name: 'Integrations', path: '/resources/integrations', icon: Layers },
      { name: 'API Reference', path: '/resources/api-reference', icon: Code2 },
      { name: 'API Playground', path: '/resources/api-playground', icon: Monitor },
      { name: 'Onboarding APIs', path: '/resources/onboarding-apis', icon: Zap },
    ],
    solutions: [
      { name: 'SaaS', path: '/solutions/saas', icon: Box },
      { name: 'E-commerce', path: '/solutions/ecommerce', icon: Box },
      { name: 'Education', path: '/solutions/education', icon: Box },
      { name: 'BFSI', path: '/solutions/bfsi', icon: Box },
      { name: 'Freelance', path: '/solutions/freelance', icon: Box },
    ],
    freeTools: [
      { name: 'GST Calculator', path: '/tools/gst-calculator', icon: Calculator },
      { name: 'GST Number Search', path: '/tools/gst-search', icon: Search },
      { name: 'GST Search by PAN', path: '/tools/pan-search', icon: Search },
      { name: 'ROI Calculator', path: '/tools/roi-calculator', icon: Calculator, badge: 'NEW' },
      { name: 'CAGR Calculator', path: '/tools/cagr-calculator', icon: Calculator, badge: 'NEW' },
      { name: 'EBITDA Calculator', path: '/tools/ebitda-calculator', icon: Calculator, badge: 'NEW' },
    ]
  };

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-100 z-40 px-6 lg:px-12 h-20 flex items-center justify-between transition-all" onMouseLeave={() => setActiveMenu(null)}>
      {/* Left: Logo & Links */}
      <div className="flex items-center gap-10 h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 text-[#0C2454] font-extrabold text-2xl tracking-tighter mr-4">
          {logoIcon && <img src={logoIcon} alt="Logo" className="w-8 h-8 object-contain" />}
          UpyugoPay
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center h-full gap-1">
          
          {/* Payments Link - Top Level */}
          <div className="h-full flex items-center px-4 cursor-pointer group relative" onMouseEnter={() => setActiveMenu('payments')}>
            <Link to="/payment" className={`text-sm font-bold transition-colors ${activeMenu === 'payments' ? 'text-blue-600' : 'text-[#0C2454] group-hover:text-blue-600'}`}>
              Payments
            </Link>
            <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 transform scale-x-0 transition-transform duration-200 ${activeMenu === 'payments' ? 'scale-x-100' : 'group-hover:scale-x-100'}`}></div>
          </div>

          {/* Banking+ Link - Top Level */}
          <div className="h-full flex items-center px-4 cursor-pointer group relative" onMouseEnter={() => setActiveMenu('banking')}>
            <Link to="/banking" className={`text-sm font-bold transition-colors ${activeMenu === 'banking' ? 'text-blue-600' : 'text-[#0C2454] group-hover:text-blue-600'}`}>
              Banking+
            </Link>
            <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 transform scale-x-0 transition-transform duration-200 ${activeMenu === 'banking' ? 'scale-x-100' : 'group-hover:scale-x-100'}`}></div>
          </div>
          
          {/* Static Links */}
          {['Payroll', 'Engage', 'Partners'].map((item) => (
            <Link 
              key={item} 
              to={`/${item.toLowerCase()}`}
              className="h-full flex items-center px-4 text-sm font-bold text-[#0C2454] hover:text-blue-600 transition-colors relative group"
              onMouseEnter={() => setActiveMenu(null)} 
            >
              {item}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
            </Link>
          ))}

          {/* Resources Link - Top Level */}
          <div className="h-full flex items-center px-4 cursor-pointer group relative" onMouseEnter={() => setActiveMenu('resources')}>
            <Link to="/resources" className={`text-sm font-bold transition-colors ${activeMenu === 'resources' ? 'text-blue-600' : 'text-[#0C2454] group-hover:text-blue-600'}`}>
              Resources
            </Link>
            <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 transform scale-x-0 transition-transform duration-200 ${activeMenu === 'resources' ? 'scale-x-100' : 'group-hover:scale-x-100'}`}></div>
          </div>

          {/* Pricing Link */}
          <Link 
            to="/pricing"
            className="h-full flex items-center px-4 text-sm font-bold text-[#0C2454] hover:text-blue-600 transition-colors relative group"
            onMouseEnter={() => setActiveMenu(null)} 
          >
            Pricing
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </Link>

        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center gap-4">
            <div className="w-6 h-4 relative overflow-hidden rounded-[2px] border border-gray-300">
              <div className="absolute top-0 w-full h-1/3 bg-[#FF9933]"></div>
              <div className="absolute bottom-0 w-full h-1/3 bg-[#138808]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border-[0.5px] border-blue-800"></div>
            </div>
            <Headphones size={20} className="text-slate-500 hover:text-blue-600 cursor-pointer" />
        </div>
        
        <Link to="/login" className="hidden md:block text-sm font-bold text-[#0C2454] border border-blue-600 px-5 py-2.5 rounded-[4px] hover:bg-blue-50 transition-colors">
          Login
        </Link>
        <Link to="/signup" className="bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-[4px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-1 group">
          Sign Up <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <button className="lg:hidden text-[#0C2454]">
          <Menu size={24} />
        </button>
      </div>

      {/* --- MEGA MENUS --- */}
      
      {/* 1. PAYMENTS */}
      {activeMenu === 'payments' && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-30">
          <div className="max-w-[1400px] mx-auto p-8 lg:p-12">
            <div className="flex gap-16">
              <div className="flex-1 min-w-[300px]">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Accept Payments Online</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10">
                  {paymentsMenu.online.map((item) => (
                    // Updated to Link
                    <Link to={item.path} key={item.name} className="flex gap-3 group">
                      <div className="mt-1"><item.icon size={20} className="text-blue-600" /></div>
                      <div>
                        <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                            {item.badge && <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 rounded uppercase tracking-wide">{item.badge}</span>}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed group-hover:text-slate-600">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* ... Repeat logic for other sections ... */}
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Accept Payments Offline</h3>
                <div className="grid grid-cols-1 gap-6">
                  {paymentsMenu.offline.map((item) => (
                    <Link to={item.path} key={item.name} className="flex gap-3 group">
                      <div className="mt-1"><item.icon size={20} className="text-blue-600" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-[320px] shrink-0 border-l border-gray-100 pl-12">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Accept International Payments</h3>
                  <div className="space-y-6 mb-10">
                    {paymentsMenu.international.map((item) => (
                      <Link to={item.path} key={item.name} className="flex gap-3 group">
                        <div className="mt-1"><item.icon size={20} className="text-blue-600" /></div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/* ... Global and All-in-One sections similarly updated to Link ... */}
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Built For Global Businesses</h3>
                  <div className="space-y-6 mb-10">
                    {paymentsMenu.global.map((item) => (
                      <Link to={item.path} key={item.name} className="flex gap-3 group">
                        <div className="mt-1"><item.icon size={20} className="text-blue-600" /></div>
                        <div>
                          <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                              {item.badge && <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 rounded uppercase tracking-wide">{item.badge}</span>}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">All-in-One Payments</h3>
                  <div className="space-y-6">
                    {paymentsMenu.allInOne.map((item) => (
                      <Link to={item.path} key={item.name} className="flex gap-3 group">
                        <div className="mt-1"><item.icon size={20} className="text-blue-600" /></div>
                        <div>
                          <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                              {item.badge && <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 rounded uppercase tracking-wide">{item.badge}</span>}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BANKING+ */}
      {activeMenu === 'banking' && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-30">
          <div className="max-w-[1400px] mx-auto p-8 lg:p-12">
            <div className="flex gap-16">
              <div className="flex-1 min-w-[300px]">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Business Banking Plus</h3>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  {bankingMenu.businessBanking.map((item) => (
                    <Link to={item.path} key={item.name} className="flex gap-3 group">
                      <div className="mt-1">
                          <div className="p-1 rounded bg-blue-50 group-hover:bg-blue-100 transition-colors">
                            <item.icon size={18} className="text-blue-600" />
                          </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                            {item.badge && <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 rounded uppercase tracking-wide">{item.badge}</span>}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed group-hover:text-slate-600 max-w-[200px]">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-[340px] shrink-0 border-l border-gray-100 pl-12">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Digital Lending</h3>
                  <div className="space-y-8 mb-10">
                    {bankingMenu.lending.map((item) => (
                      <Link to={item.path} key={item.name} className="flex gap-3 group">
                        <div className="mt-1">
                            <div className="p-1 rounded bg-blue-50 group-hover:bg-blue-100 transition-colors">
                              <item.icon size={18} className="text-blue-600" />
                            </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                              {item.badge && <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 rounded uppercase tracking-wide">{item.badge}</span>}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Start Your Business</h3>
                  <div className="space-y-6">
                    {bankingMenu.startBusiness.map((item) => (
                      <Link to={item.path} key={item.name} className="flex gap-3 group">
                        <div className="mt-1">
                            <div className="p-1 rounded bg-blue-50 group-hover:bg-blue-100 transition-colors">
                              <item.icon size={18} className="text-blue-600" />
                            </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. RESOURCES */}
      {activeMenu === 'resources' && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-30">
          <div className="max-w-[1400px] mx-auto p-8 lg:p-12">
            <div className="grid grid-cols-4 gap-12">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Awareness</h3>
                <div className="space-y-6">
                  {resourcesMenu.awareness.map((item) => (
                    <Link to={item.path} key={item.name} className="flex items-center gap-3 group">
                      <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Developers</h3>
                <div className="space-y-6">
                  {resourcesMenu.developers.map((item) => (
                    <Link to={item.path} key={item.name} className="flex items-center gap-3 group">
                      <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Solutions</h3>
                <div className="space-y-6">
                  {resourcesMenu.solutions.map((item) => (
                    <Link to={item.path} key={item.name} className="flex items-center gap-3 group">
                      <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Free Tools</h3>
                <div className="space-y-6">
                  {resourcesMenu.freeTools.map((item) => (
                    <Link to={item.path} key={item.name} className="flex items-center gap-2 group">
                      <h4 className="text-sm font-bold text-[#0C2454] group-hover:text-blue-600">{item.name}</h4>
                      {item.badge && <span className="bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase tracking-wide">{item.badge}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

// Helper for one specific icon used in payments
const SparklesIcon = ({size, className}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;

export default NavbarLand;