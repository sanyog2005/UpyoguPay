import React from 'react';
import { 
  Landmark, 
  Layers, 
  ShieldCheck, 
  Zap, 
  DollarSign, 
  Link as LinkIcon, 
  CheckCircle2, 
  Monitor, 
  Percent, 
  CreditCard, 
  Coins, 
  FilePlus,
  ArrowRight,
  X,
  Briefcase
} from 'lucide-react';
import NavbarLand from '../../components/common/NavbarLand';

const BankingLand = () => {
  
  // Data Structure for Banking Products
  const sections = [
    {
      title: "Business Banking Plus",
      description: "Supercharge your finances with a suite designed for disruptors.",
      items: [
        { name: 'RazorpayX', desc: 'Business Banking Supercharged for disruptors', icon: X },
        { name: 'Current Account', desc: 'Supercharged for businesses', icon: Landmark },
        { name: 'Source to Pay', desc: 'Integrated Accounts Payable Automation', icon: Layers, badge: 'NEW' },
        { name: 'Escrow+ Account', desc: 'Escrow account for digital-first businesses', icon: ShieldCheck, badge: 'NEW' },
        { name: 'Payouts', desc: '24x7, Instant & Automated Payouts', icon: Zap },
        { name: 'Forex/FDI Transfers', desc: 'Expert-led service to bring foreign currency', icon: DollarSign, badge: 'NEW' },
        { name: 'Payout Links', desc: 'Send money without recipient account details', icon: LinkIcon },
        { name: 'Bank Account Verification', desc: 'Instantly verify Bank Account, UPI ID or IFSC', icon: CheckCircle2, badge: 'NEW' },
        { name: 'View Live Demo', desc: 'See RazorpayX in action, no signup required!', icon: Monitor },
        { name: 'Tax Payments', desc: 'Pay your business taxes in under 30 seconds', icon: Percent },
      ]
    },
    {
      title: "Digital Lending",
      description: "Get capital and manage expenses with ease.",
      items: [
        { name: 'Lending Tech Stack', desc: 'Fully compliant, 10-second disbursals', icon: Layers },
        { name: 'Corporate Cards', desc: 'Streamline your business expenses', icon: CreditCard, badge: 'NEW' },
        { name: 'Razorpay Capital', desc: 'Get money for your business needs', icon: Coins },
      ]
    },
    {
      title: "Start Your Business",
      description: "Everything you need to incorporate and launch.",
      items: [
        { name: 'Company Registration', desc: 'Simplify your business incorporation journey', icon: FilePlus },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      
      {/* 1. Reuse existing Navbar */}
      <NavbarLand />

      {/* 2. Hero Header */}
      <div className="bg-[#0b1a2b] text-white pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        {/* Abstract shape for visual interest */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6 text-green-400">
            Banking+ Suite
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            The Future of <span className="text-green-400">Business Banking</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Automate payroll, access corporate cards, manage tax payments, and get instant loans. 
            All from one powerful dashboard tailored for modern businesses.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2">
              Sign Up Now <ArrowRight size={18} />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-full transition-all backdrop-blur-sm border border-white/10">
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Content - Product Grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        
        {sections.map((section, idx) => (
          <div key={idx} className="mb-20 last:mb-0">
            {/* Section Header */}
            <div className="mb-10 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold text-[#0C2454] mb-2 flex items-center gap-2">
                {section.title}
              </h2>
              <p className="text-slate-500 text-sm font-medium">{section.description}</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((product) => (
                <div 
                  key={product.name} 
                  className="group p-6 rounded-xl border border-gray-100 bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer flex flex-col items-start relative overflow-hidden"
                >
                  {/* Hover Accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

                  <div className="flex items-start justify-between w-full mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-colors duration-300">
                      <product.icon size={24} strokeWidth={1.5} />
                    </div>
                    {product.badge && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                    {product.desc}
                  </p>

                  <div className="flex items-center text-blue-600 font-bold text-xs group-hover:translate-x-1 transition-transform mt-auto">
                    Know More <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* 4. Bottom CTA */}
      <div className="bg-[#F4F8FF] border-t border-blue-50 py-20 text-center">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#0C2454] mb-6">Start your financial journey today</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10 text-slate-600 font-medium">
               <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> Instant Activation</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> Fully Compliant</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> 24/7 Support</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1">
               Open Current Account
            </button>
         </div>
      </div>

    </div>
  );
};

export default BankingLand;