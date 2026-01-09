import React from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  Headphones, 
  Menu, 
  Search, 
  Sparkles, 
  CreditCard, 
  Landmark, 
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  FileText,
  MousePointerClick,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Mock Data for E-commerce Logos
  const ecommercePlatforms = [
    { name: 'WooCommerce', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/WooCommerce_logo.svg' },
    { name: 'Shopify', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
    { name: 'Magento', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Magento_Logo.svg' },
    { name: 'OpenCart', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/OpenCart_logo.svg' },
    { name: 'PrestaShop', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a5/PrestaShop.svg' },
    { name: 'CS-Cart', logo: 'https://www.cs-cart.com/images/logos/cs-cart-logo.svg' },
  ];

  // Footer Link Data
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

      {/* 2. Navigation Bar */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 px-6 lg:px-12 h-20 flex items-center justify-between transition-all">
        {/* Left: Logo & Links */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 text-[#0C2454] font-extrabold text-2xl tracking-tighter">
            <div className="w-0.5 h-6 bg-blue-600 rotate-12 mr-0.5"></div>
            UpyugoPay
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-bold text-[#0C2454]">
            <a href="#" className="hover:text-blue-600 transition-colors">Payments</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Banking+</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Payroll</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Engage</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Partners</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Resources</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
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
          <Link to="/merchant/dashboard" className="bg-blue-600 text-white text-sm font-bold px-6 py-2.5 rounded-[4px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-1 group">
            Sign Up <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="lg:hidden text-[#0C2454]">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* 3. Hero Section */}
      <div className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 px-6 lg:px-12 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        
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
              
              {/* Card Header */}
              <div className="bg-[#D1F349] p-6 text-center relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold text-[#0C2454]">Payments</h3>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 flex items-center justify-center gap-1">
                       POWERS <span className="text-[#0C2454] font-extrabold tracking-tight normal-case text-sm">mamaearth</span>
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-bl-full"></div>
              </div>

              {/* Card Body */}
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
                       <button className="flex items-center gap-2 p-2 border border-slate-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                          <CreditCard size={16} className="text-slate-400" /> <span className="text-xs font-bold text-slate-700">Card</span>
                       </button>
                       <button className="flex items-center gap-2 p-2 border border-green-500 bg-green-50 rounded text-left relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-bl"></div>
                          <Smartphone size={16} className="text-green-600" /> <span className="text-xs font-bold text-slate-800">UPI ID</span>
                       </button>
                       <button className="flex items-center gap-2 p-2 border border-slate-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                          <Landmark size={16} className="text-slate-400" /> <span className="text-xs font-bold text-slate-700">Netbanking</span>
                       </button>
                       <button className="flex items-center gap-2 p-2 border border-slate-200 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                          <CreditCard size={16} className="text-slate-400" /> <span className="text-xs font-bold text-slate-700">EMI</span>
                       </button>
                    </div>
                 </div>
              </div>

              {/* Founder Quote Area */}
              <div className="bg-[#2A5CDC] p-6 text-white relative overflow-hidden">
                 <div className="relative z-10 flex items-end justify-between">
                    <div>
                       <div className="flex items-center gap-2 text-xs opacity-80 mb-1">
                          <ArrowRight size={12} className="-rotate-45" /> MAMAEARTH FOUNDER
                       </div>
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

      {/* --- E-commerce Plugins Section --- */}
      <div className="py-16 bg-slate-50 border-y border-gray-100">
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0C2454] mb-2">E-commerce plugins</h2>
            <p className="text-slate-500 font-medium mb-10">Supported platforms</p>

            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
               {ecommercePlatforms.map((platform) => (
                  <div 
                     key={platform.name} 
                     className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center p-3 hover:shadow-md hover:-translate-y-1 transition-all"
                     title={platform.name}
                  >
                     <img 
                        src={platform.logo} 
                        alt={`${platform.name} logo`} 
                        className="w-full h-full object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all" 
                     />
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* --- NO-CODE PRODUCTS SECTION --- */}
      <div className="py-24 bg-[#F4F8FF] relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[150px]"></div>

         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
            <p className="text-slate-500 font-mono text-sm mb-2 opacity-60">&lt;what html?&gt;</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#00A651] mb-2">Not a developer?</h2>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-[#0C2454] mb-12">Our No-Code products have you covered</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Card 1: Payment Links */}
               <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-transparent hover:border-blue-100 relative group">
                  <div className="flex justify-between items-start mb-6">
                     <h4 className="text-xl font-bold text-[#0C2454]">Payment Links</h4>
                     <LinkIcon size={24} className="text-blue-500" />
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed min-h-[80px]">
                     Accept payments instantly: <span className="text-blue-600 font-bold">Share links</span> via email, text, or social.
                  </p>
                  <div className="flex gap-6 font-bold text-sm">
                     <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">Sign Up <ArrowRight size={14}/></a>
                     <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">Know More <ExternalLinkIcon size={12}/></a>
                  </div>
               </div>

               {/* Card 2: Payment Pages */}
               <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-transparent hover:border-blue-100 relative group">
                  <div className="flex justify-between items-start mb-6">
                     <h4 className="text-xl font-bold text-[#0C2454]">Payment Pages</h4>
                     <FileText size={24} className="text-blue-500" />
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed min-h-[80px]">
                     Accept payments without coding on a <span className="text-blue-600 font-bold">custom-branded store</span>
                  </p>
                  <div className="flex gap-6 font-bold text-sm">
                     <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">Sign Up <ArrowRight size={14}/></a>
                     <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">Know More <ExternalLinkIcon size={12}/></a>
                  </div>
               </div>

               {/* Card 3: Payment Buttons */}
               <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-transparent hover:border-blue-100 relative group">
                  <div className="flex justify-between items-start mb-6">
                     <h4 className="text-xl font-bold text-[#0C2454]">Payment Buttons</h4>
                     <MousePointerClick size={24} className="text-blue-500" />
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed min-h-[80px]">
                     Effortlessly <span className="text-blue-600 font-bold">add a Pay Now button</span> without any coding knowledge
                  </p>
                  <div className="flex justify-between items-center">
                     <div className="flex gap-6 font-bold text-sm">
                        <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">Sign Up <ArrowRight size={14}/></a>
                        <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">Know More <ExternalLinkIcon size={12}/></a>
                     </div>
                     <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <ChevronRight size={18} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Growth Stats */}
            <div className="mt-24 flex flex-col md:flex-row items-center justify-between border-t border-blue-200 pt-10">
               <h2 className="text-3xl font-bold text-[#0C2454] mb-4 md:mb-0">
                  UpyugoPay grows with <span className="text-blue-600">you!</span>
               </h2>
               <div className="text-xl font-bold text-[#0C2454] flex items-center gap-2">
                  1,50,000+ Businesses
               </div>
            </div>
         </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-white text-slate-600 relative z-20">
         
         {/* 1. Supercharge CTA Banner */}
         <div className="bg-[#F4F8FF] py-16 text-center">
            <h2 className="text-3xl font-extrabold text-[#0C2454] mb-6">
               Supercharge your business <br/> with UpyugoPay
            </h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-[4px] shadow-lg shadow-blue-600/20 transition-transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
               Sign Up Now <ArrowRight size={18} />
            </button>
         </div>

         {/* 2. Main Footer Links */}
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
            
            {/* Column 1: Brand & Socials */}
            <div className="space-y-6">
               <Link to="/" className="flex items-center gap-1 text-[#0C2454] font-extrabold text-2xl tracking-tighter">
                  <div className="w-0.5 h-6 bg-blue-600 rotate-12 mr-0.5"></div>
                  UpyugoPay
               </Link>
               <p className="text-xs leading-relaxed text-slate-500">
                  UpyugoPay is the only payments solution in India that allows businesses to accept, process and disburse payments with its product suite. It gives you access to all payment modes including credit card, debit card, netbanking, UPI and popular wallets including JioMoney, Mobikwik, Airtel Money, FreeCharge, Ola Money and PayZapp.
               </p>
               {/* Certifications Placeholders */}
               <div className="flex gap-3 pt-2">
                  <div className="w-12 h-12 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-[8px] text-center font-bold text-slate-400">PCI DSS</div>
                  <div className="w-12 h-12 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-[8px] text-center font-bold text-slate-400">ISO</div>
                  <div className="w-12 h-12 bg-blue-600 rounded-full border border-blue-700 flex items-center justify-center text-[8px] text-center font-bold text-white">AICPA SOC</div>
               </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
               <div>
                  <h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Accept Payments</h4>
                  <ul className="space-y-2">
                     {footerLinks.acceptPayments.map((link, i) => (
                        <li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Payroll</h4>
                  <ul className="space-y-2">
                     <li><a href="#" className="hover:text-blue-600 text-blue-500">UpyugoPayX Payroll</a></li>
                  </ul>
               </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-8">
               <div>
                  <h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Banking Plus</h4>
                  <ul className="space-y-2">
                     {footerLinks.bankingPlus.map((link, i) => (
                        <li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Developers</h4>
                  <ul className="space-y-2">
                     {footerLinks.developers.map((link, i) => (
                        <li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>
                     ))}
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Solutions</h4>
                  <ul className="space-y-2">
                     {footerLinks.solutions.map((link, i) => (
                        <li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Column 4 */}
            <div className="space-y-8">
               <div>
                  <h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Company</h4>
                  <ul className="space-y-2">
                     {footerLinks.company.map((link, i) => (
                        <li key={i}><a href="#" className="hover:text-blue-600 text-blue-500">{link}</a></li>
                     ))}
                  </ul>
               </div>
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
               <div>
                  <h4 className="font-bold text-[#0C2454] mb-4 uppercase text-xs tracking-wider">Regd. Office Address</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                     UpyugoPay Software Limited, <br/>
                     1st Floor, SJR Cyber, <br/>
                     22 Laskar Hosur Road, Adugodi, <br/>
                     Bengaluru, 560030, <br/>
                     Karnataka, India <br/>
                     CIN: U62099KA2024PTC188982
                  </p>
               </div>
               <div className="text-xs text-slate-400 mt-8">
                  <p>© UpyugoPay 2025 <br/> All Rights Reserved</p>
               </div>
            </div>

         </div>
      </footer>

      {/* 4. Bottom Discovery Bar (Existing) */}
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
               {[
                  { icon: CreditCard, label: 'Accept Payments', active: true },
                  { icon: ArrowRight, label: 'Make Payouts' },
                  { icon: Landmark, label: 'Start Business Banking' },
                  { icon: CreditCard, label: 'Get Credit' },
                  { icon: Smartphone, label: 'Automate Payroll' },
                  { icon: Sparkles, label: 'Something else?' },
               ].map((item, idx) => (
                  <button 
                     key={idx}
                     className={`flex items-center gap-2 px-4 py-2.5 rounded text-xs font-bold whitespace-nowrap transition-all ${
                        item.active 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                     }`}
                  >
                     <item.icon size={14} className={item.active ? 'text-blue-600' : 'text-slate-400'} />
                     {item.label}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* 5. Floating "Ask RAY" Button */}
      <button className="fixed bottom-6 right-6 z-40 bg-white border border-blue-100 text-blue-800 px-5 py-3 rounded shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 font-bold text-sm">
         <Sparkles size={18} className="text-blue-600 fill-blue-100" />
         Ask RAY
      </button>

    </div>
  );
};

// Simple Icon component helper if not imported
const ExternalLinkIcon = ({ size, className }) => (
   <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
   >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
   </svg>
);

export default LandingPage;