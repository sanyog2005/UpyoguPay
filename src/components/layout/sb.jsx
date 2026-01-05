import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, CreditCard, Key, FileText, 
  Shield, LogOut, LifeBuoy, Settings, Zap, ChevronRight, Menu, X, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ role, onLogout }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto-close sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // --- Configuration ---
  const activeColor = "border-blue-500"; // UpyoguPay Blue accent
  
  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/merchants', label: 'Merchants', icon: Users },
    { to: '/admin/reports', label: 'Reports', icon: FileText },
    { to: '/admin/staff', label: 'Staff Management', icon: Shield },
    { to: '/admin/settings', label: 'Platform Settings', icon: Settings },
   
    
  ];

  const merchantLinks = [
    { to: '/merchant/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/merchant/transactions', label: 'Transactions', icon: CreditCard },
    { to: '/merchant/settlement', label: 'Settlements', icon: FileText },
    // { to: '/merchant/refund', label: 'Refunds', icon: Zap }, // Using Zap as placeholder
    { to: '/merchant/reportsMerch', label: 'Reports', icon: Settings },
    { to: '/merchant/profile', label: 'Accounts and Settings', icon: Users },
    // { to: '/merchant/kyc', label: 'Account & Settings', icon: Settings },
    // Simulating the "International Payments" link from image
    { to: '/merchant/international', label: 'International', icon: Globe, hasSubmenu: true }, 
  ];

  // Group 2 for visual similarity to "Payment Products" section
  const merchantProductLinks = [
    { to: '/merchant/api', label: 'Developer API', icon: Key },
    { to: '/merchant/merchantSupport', label: 'Support', icon: LifeBuoy },
    { to: '/merchant/profile', label: 'Profile', icon: Users },
  ];

  const staffLinks = [
    { to: '/staff/reports', label: 'Reports', icon: FileText },
    { to: '/staff/dashboard', label: 'Work Queue', icon: LayoutDashboard },
    { to: '/admin/merchants', label: 'Merchants', icon: Users },
    { to: '/staff/kyc-review', label: 'KYC Review', icon: FileText },
    { to: '/staff/support', label: 'Support Tickets', icon: LifeBuoy },
    { to: '/staff/operations', label: 'Operations', icon: Settings },
  ];

  let links = [];
  let productLinks = []; // For the second section
  
  if (role === 'admin') links = adminLinks;
  else if (role === 'merchant') {
     links = merchantLinks;
     productLinks = merchantProductLinks;
  }
  else if (role === 'staff') links = staffLinks;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#15192b] text-slate-300">
      {/* 1. Header / Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          {/* Logo Icon replicating the Blue Slash */}
          <div className="relative w-6 h-6 flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-600 transform -skew-x-12 rounded-sm"></div>
             <span className="relative text-white font-bold text-lg italic">/</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight italic font-sans">
            UpyoguPay <span className="text-[10px] not-italic font-normal text-slate-400 bg-slate-800 px-1 py-0.5 rounded align-top ml-1">CLONE</span>
          </h1>
        </div>
        
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden ml-auto p-1 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* 2. Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-4">
        
        {/* Primary Links */}
        <div className="flex flex-col">
          {links.map((link) => (
             <NavItem key={link.to} link={link} location={location} />
          ))}
        </div>

        {/* Section Divider / Header (Only if there are product links) */}
        {productLinks.length > 0 && (
          <div className="mt-6 mb-2">
            <h3 className="px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Payment Products
            </h3>
            <div className="flex flex-col">
              {productLinks.map((link) => (
                 <NavItem key={link.to} link={link} location={location} />
              ))}
            </div>
            
            <div className="px-6 mt-3">
               <button className="text-[11px] font-bold text-blue-500 hover:text-blue-400 uppercase tracking-wide">
                 Show All (12)
               </button>
            </div>
          </div>
        )}

      </nav>

      {/* 3. Footer / User Section */}
      <div className="p-4 border-t border-slate-700/50 bg-[#121522]">
        <button 
          onClick={onLogout} 
          className="flex items-center gap-3 w-full px-3 py-2 text-slate-400 hover:text-white transition-colors group"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-2 bg-[#15192b] text-white rounded-md shadow-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 z-30 shadow-xl shadow-slate-900/20">
        <SidebarContent />
      </aside>
    </>
  );
};

// Helper Component for consistent Link styling
const NavItem = ({ link, location }) => {
  const isActive = location.pathname === link.to;

  return (
    <NavLink
      to={link.to}
      className={`relative flex items-center justify-between px-6 py-3 transition-all duration-200 group
        ${isActive 
          ? 'bg-[#1e2336] text-white' // Active background & text
          : 'text-[#8b92a5] hover:text-slate-200 hover:bg-slate-800/30' // Inactive styles
        }
      `}
    >
      {/* Active Indicator Strip (The left border) */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
      )}

      <div className="flex items-center gap-3">
        <link.icon 
          size={18} 
          className={`${isActive ? 'text-white' : 'text-[#8b92a5] group-hover:text-slate-200'}`} 
        />
        <span className="text-sm font-medium tracking-wide">
          {link.label}
        </span>
      </div>

      {/* Chevron for submenus (Visual only) */}
      {link.hasSubmenu && (
        <ChevronRight size={14} className="text-slate-500" />
      )}
    </NavLink>
  );
};

export default Sidebar;