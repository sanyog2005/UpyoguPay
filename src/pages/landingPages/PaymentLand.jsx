import React from 'react';
import { 
  Layers, 
  CreditCard, 
  Link as LinkIcon, 
  FileText, 
  QrCode, 
  Zap, 
  Sparkles, 
  Repeat, 
  Settings, 
  Smartphone, 
  Globe, 
  Landmark, 
  Monitor,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import NavbarLand from '../../components/common/NavbarLand';

const PaymentLand = () => {
  
  // Data Structure for Payment Products
  const sections = [
    {
      title: "Accept Payments Online",
      description: "Everything you need to accept payments on your website or app.",
      items: [
        { name: 'Payment Aggregator', desc: 'Accepting payments made easy for businesses', icon: Layers },
        { name: 'Payment Gateway', desc: 'Payments on your Website & App', icon: CreditCard },
        { name: 'Payment Links', desc: 'Create & send links to collect money', icon: LinkIcon },
        { name: 'Payment Pages', desc: 'Get paid with personalized page', icon: FileText },
        { name: 'QR Codes', desc: 'Multi-feature QR for your business', icon: QrCode },
        { name: 'UPI Payments', desc: 'Discover the complete UPI stack', icon: Zap, badge: 'NEW' },
        { name: 'Magic Checkout', desc: 'Improve Order Conversions & Reduce RTOs', icon: Sparkles, badge: 'NEW' },
        { name: 'Subscriptions', desc: 'Collect recurring subscription payments', icon: Repeat },
        { name: 'Instant Settlement', desc: 'Customer payments settled faster', icon: Zap },
        { name: 'Optimizer', desc: 'Manage multiple payment gateways', icon: Settings },
      ]
    },
    {
      title: "Accept Payments Offline",
      description: "Seamless in-store payment solutions.",
      items: [
        { name: 'UpyugoPay POS', desc: 'Accept Payments In-Store', icon: Smartphone },
      ]
    },
    {
      title: "Accept International Payments",
      description: "Go global and accept payments from anywhere in the world.",
      items: [
        { name: 'International Payments', desc: 'Accept payments from across the globe', icon: Globe },
        { name: 'International Bank Transfers', desc: 'Accept USD, GBP, EUR payments in your account', icon: Landmark },
      ]
    },
    {
      title: "Built For Global Businesses",
      description: "Solutions tailored for international enterprises.",
      items: [
        { name: 'Accept Payments from India', desc: 'Seamless INR collections via UPI & cards', icon: Globe, badge: 'NEW' },
      ]
    },
    {
      title: "All-in-One Payments",
      description: "Unified platforms for omnichannel commerce.",
      items: [
        { name: 'Omnichannel Payments', desc: 'One Payment Platform for All Channels', icon: Monitor, badge: 'NEW' },
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            The Complete <span className="text-blue-400">Payments Stack</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            From easy-to-integrate payment gateways to comprehensive financial suites, 
            explore all the tools you need to build, run, and scale your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2">
              Sign Up Now <ArrowRight size={18} />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-full transition-all backdrop-blur-sm border border-white/10">
              Contact Sales
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
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

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
            <h2 className="text-3xl font-bold text-[#0C2454] mb-6">Ready to get started?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10 text-slate-600 font-medium">
               <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> No Setup Fee</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> No Maintenance Fee</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> Quick Support</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1">
               Sign Up Now
            </button>
         </div>
      </div>

    </div>
  );
};

export default PaymentLand;