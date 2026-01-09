import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Users, 
  Code2, 
  Layers, 
  Monitor, 
  Zap, 
  ShoppingBag, 
  GraduationCap, 
  Landmark, 
  Briefcase, 
  Calculator, 
  Search, 
  ArrowRight,
  CheckCircle2,
  Box
} from 'lucide-react';
import NavbarLand from '../../components/common/NavbarLand';

const ResourcesLand = () => {
  
  // Data Structure for Resources
  const sections = [
    {
      title: "Awareness",
      description: "Insights, guides, and stories to help you grow.",
      items: [
        { name: 'Blog', desc: 'Latest updates, industry trends & insights', icon: BookOpen },
        { name: 'Learn', desc: 'In-depth guides and financial education', icon: BookOpen },
        { name: 'Events', desc: 'Webinars, workshops & community meetups', icon: Calendar },
        { name: 'White papers', desc: 'Research reports and market analysis', icon: FileText },
        { name: 'Customer Stories', desc: 'How businesses scale with UpyugoPay', icon: Users },
      ]
    },
    {
      title: "Developers",
      description: "Tools and documentation to build seamless integrations.",
      items: [
        { name: 'Developer Docs', desc: 'Comprehensive guides for integration', icon: Code2 },
        { name: 'Integrations', desc: 'Plugins for major e-commerce platforms', icon: Layers },
        { name: 'API Reference', desc: 'Detailed API endpoints and parameters', icon: Code2 },
        { name: 'API Playground', desc: 'Test APIs in real-time environment', icon: Monitor },
        { name: 'Onboarding APIs', desc: 'Automate merchant onboarding flows', icon: Zap },
      ]
    },
    {
      title: "Solutions",
      description: "Tailored payment solutions for every industry.",
      items: [
        { name: 'SaaS', desc: 'Subscription billing for software companies', icon: Box },
        { name: 'E-commerce', desc: 'Seamless checkout for online stores', icon: ShoppingBag },
        { name: 'Education', desc: 'Fee collection for schools & edtech', icon: GraduationCap },
        { name: 'BFSI', desc: 'Secure payments for financial services', icon: Landmark },
        { name: 'Freelance', desc: 'Easy invoicing for independent pros', icon: Briefcase },
      ]
    },
    {
      title: "Free Tools",
      description: "Calculators and search tools for business compliance.",
      items: [
        { name: 'GST Calculator', desc: 'Calculate GST amounts quickly', icon: Calculator },
        { name: 'GST Number Search', desc: 'Verify GSTIN validity instantly', icon: Search },
        { name: 'GST Search by PAN', desc: 'Find GST details using PAN card', icon: Search },
        { name: 'ROI Calculator', desc: 'Estimate return on investment', icon: Calculator, badge: 'NEW' },
        { name: 'CAGR Calculator', desc: 'Calculate compound annual growth', icon: Calculator, badge: 'NEW' },
        { name: 'EBITDA Calculator', desc: 'Measure operating profitability', icon: Calculator, badge: 'NEW' },
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
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/4"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6 text-purple-300">
            Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Resources & <span className="text-blue-400">Developer Tools</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are a developer looking for APIs, a founder needing business tools, 
            or just looking to learn, we have you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2">
              Explore Docs <Code2 size={18} />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-full transition-all backdrop-blur-sm border border-white/10">
              Read Blog
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Content - Grid */}
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
              {section.items.map((item) => (
                <div 
                  key={item.name} 
                  className="group p-6 rounded-xl border border-gray-100 bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer flex flex-col items-start relative overflow-hidden"
                >
                  {/* Hover Accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

                  <div className="flex items-start justify-between w-full mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-colors duration-300">
                      <item.icon size={24} strokeWidth={1.5} />
                    </div>
                    {item.badge && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                    {item.desc}
                  </p>

                  <div className="flex items-center text-blue-600 font-bold text-xs group-hover:translate-x-1 transition-transform mt-auto">
                    View Details <ArrowRight size={14} className="ml-1" />
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
            <h2 className="text-3xl font-bold text-[#0C2454] mb-6">Need help integrating?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10 text-slate-600 font-medium">
               <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> 24/7 Developer Support</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> Extensive APIs</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> Sandbox Environment</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1">
               Contact Support
            </button>
         </div>
      </div>

    </div>
  );
};

export default ResourcesLand;