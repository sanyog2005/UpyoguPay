import React, { useState, useEffect } from 'react';
import logoIcon from '../../assets/logo-icon.png';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  RotateCcw, 
  CheckCircle2, 
  FileText, 
  Settings, 
  Globe, 
  QrCode, 
  Link as LinkIcon, 
  RefreshCw, 
  Users, 
  Tag, 
  Code2, 
  Grid,
  Menu,
  X,
  Shield, 
  LifeBuoy, 
  LogOut,
  Landmark,       // For Smart Collect
  StickyNote,     // For Payment Pages
  MousePointerClick, // For Payment Button
  Receipt,        // For Invoices
  Gift,           // For Checkout Rewards
  MessageSquare,  // For Konnect
  ShoppingBag,    // For Affordability
  AtSign,         // For UpyugoPay.me Link
  GitFork         // For Optimizer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ role, onLogout }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // --- STATE FOR SHOW ALL / SHOW LESS ---
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);

  // Auto-close sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // --- LINK CONFIGURATION ---

  // 1. ADMIN Links
  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/merchants', label: 'Merchants', icon: Users },
    { to: '/admin/reports', label: 'Reports', icon: FileText },
    { to: '/admin/staff', label: 'Staff Management', icon: Shield },
    { to: '/admin/settings', label: 'Platform Settings', icon: Settings },
  ];

  // 2. STAFF Links
  const staffLinks = [
    { to: '/staff/dashboard', label: 'Work Queue', icon: LayoutDashboard },
    { to: '/staff/reports', label: 'Reports', icon: FileText },
    { to: '/admin/merchants', label: 'Merchants', icon: Users },
    { to: '/staff/kyc-review', label: 'KYC Review', icon: FileText },
    { to: '/staff/support', label: 'Support Tickets', icon: LifeBuoy },
    { to: '/staff/operations', label: 'Operations', icon: Settings },
  ];

  // 3. MERCHANT Links
  const merchantCoreLinks = [
    { to: '/merchant/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/merchant/transactions', label: 'Transactions', icon: RotateCcw },
    { to: '/merchant/settlement', label: 'Settlements', icon: CheckCircle2 },
    { to: '/merchant/reportsMerch', label: 'Reports', icon: FileText },
    { to: '/merchant/profile', label: 'Account & Settings', icon: Settings },
  ];

  const merchantInternationalLink = { 
    to: '/merchant/international', 
    label: 'International Payments', 
    isSpecial: true 
  };

  // Full list of Payment Products
  const allMerchantProductLinks = [
    { to: '/merchant/QRcode', label: 'QR Codes', icon: QrCode },
    { to: '/merchant/paymentLinks', label: 'Payment Links', icon: LinkIcon },
    { to: '/merchant/subscriptions', label: 'Subscriptions', icon: RefreshCw },
    // --- Hidden Items (Revealed on Show All) ---
    { to: '/merchant/smart-collect', label: 'Smart Collect', icon: Landmark },
    { to: '/merchant/paymentPages', label: 'Payment Pages', icon: StickyNote },
    { to: '/merchant/paymentButton', label: 'Payment Button', icon: MousePointerClick },
    { to: '/merchant/invoices', label: 'Invoices', icon: Receipt },
    { to: '/merchant/rewards', label: 'Checkout Rewards', icon: Gift },
    { to: '/merchant/konnect', label: 'Konnect', icon: MessageSquare },
    { to: '/merchant/affordability', label: 'Affordability', icon: ShoppingBag },
    { to: '/merchant/UpyugoPay-link', label: 'UpyugoPay.me Link', icon: AtSign },
    { to: '/merchant/optimizer', label: 'Optimizer', icon: GitFork },
    
  ];

  // Logic to slice the array based on state
  const visibleProductLinks = isProductsExpanded ? allMerchantProductLinks : allMerchantProductLinks.slice(0, 3);

  const merchantToolLinks = [
    { to: '/merchant/customers', label: 'Customers', icon: Users },
    { to: '/merchant/offers', label: 'Offers', icon: Tag },
    { to: '/merchant/developers', label: 'Developers', icon: Code2 },
    { to: '/merchant/apps', label: 'Apps & Deals', icon: Grid },
  ];

  // --- CONTENT RENDERER ---
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#1e2434] text-[#8b92a5]">
      
      {/* 1. Logo Section */}
      {/* 1. Logo Section */}
<div className="h-16 flex items-center px-6 mb-2 flex-shrink-0">
  <div className="flex items-center gap-3"> {/* Increased gap slightly for spacing */}

     {/* REPLACED CSS SHAPE WITH IMG */}
     <img 
       src={logoIcon} 
       alt="Logo" 
       className="w-8 h-8 object-contain" 
     />

     {/* Kept the Text */}
     <span className="text-xl font-bold text-white tracking-tight font-sans italic">
       UpyugoPay.
     </span>
  </div>

  <button 
    onClick={() => setIsMobileOpen(false)}
    className="lg:hidden ml-auto text-slate-400 hover:text-white"
  >
    <X size={20} />
  </button>
</div>

      {/* 2. Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* --- ADMIN VIEW --- */}
        {role === 'admin' && (
          <div className="flex flex-col mb-4">
            <div className="px-6 py-2 text-[10px] font-bold text-[#8b92a5] uppercase tracking-wider">Admin Console</div>
            {adminLinks.map(link => (
               <NavItem key={link.to} link={link} location={location} />
            ))}
          </div>
        )}

        {/* --- STAFF VIEW --- */}
        {role === 'staff' && (
          <div className="flex flex-col mb-4">
            <div className="px-6 py-2 text-[10px] font-bold text-[#8b92a5] uppercase tracking-wider">Staff Workspace</div>
            {staffLinks.map(link => (
               <NavItem key={link.to} link={link} location={location} />
            ))}
          </div>
        )}

        {/* --- MERCHANT VIEW --- */}
        {role === 'merchant' && (
          <>
            {/* Core Links */}
            <div className="flex flex-col mb-4">
              {merchantCoreLinks.map(link => (
                 <NavItem key={link.to} link={link} location={location} />
              ))}
            </div>

            {/* International Payments */}
            <div className="px-6 mb-6">
               <NavLink 
                 to={merchantInternationalLink.to}
                 className="text-[#4D89FF] text-[13px] font-medium hover:text-[#7aa6ff] flex items-center justify-between"
               >
                 {merchantInternationalLink.label}
                 <span className="text-xs">›</span>
               </NavLink>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700/40 mx-6 mb-6"></div>

            {/* Payment Products Section (With Show All Logic) */}
            <div className="mb-6">
               <h3 className="px-6 text-[10px] font-bold text-[#8b92a5] uppercase tracking-wider mb-2">
                 Payment Products
               </h3>
               <div className="flex flex-col">
                  {visibleProductLinks.map(link => (
                     <NavItem key={link.to} link={link} location={location} />
                  ))}
               </div>
               
               {/* Show All / Show Less Toggle Button */}
               <div className="px-6 mt-3">
                  <button 
                    onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                    className="text-[10px] font-bold text-[#4D89FF] hover:text-[#7aa6ff] uppercase tracking-wide transition-colors"
                  >
                    {isProductsExpanded ? 'SHOW LESS' : `SHOW ALL (${allMerchantProductLinks.length})`}
                  </button>
               </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700/40 mx-6 mb-6"></div>

            {/* Tools Section */}
            <div className="flex flex-col mb-6">
               {merchantToolLinks.map(link => (
                  <NavItem key={link.to} link={link} location={location} />
               ))}
            </div>
          </>
        )}

      </nav>

      {/* 3. Footer / Logout */}
      <div className="p-4 border-t border-slate-700/30 bg-[#1a202e]">
        <button 
          onClick={onLogout} 
          className="flex items-center gap-3 w-full px-3 py-2 text-[#8b92a5] hover:text-white transition-colors"
        >
          <LogOut size={16} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button onClick={() => setIsMobileOpen(true)} className="p-2 bg-[#1e2434] text-white rounded shadow-lg">
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

// --- HELPER COMPONENT ---
const NavItem = ({ link, location }) => {
  const isActive = location.pathname === link.to;

  return (
    <NavLink
      to={link.to}
      className={`relative flex items-center gap-3 px-6 py-2.5 transition-colors duration-200 group
        ${isActive 
          ? 'bg-black text-white' 
          : 'text-[#8b92a5] hover:text-white hover:bg-white/5' 
        }
      `}
    >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white"></div>
      )}

      <link.icon 
        size={18} 
        className={`shrink-0 ${isActive ? 'text-white' : 'text-[#8b92a5] group-hover:text-white'}`} 
      />
      <span className="text-[14px] font-medium tracking-wide">
        {link.label}
      </span>
    </NavLink>
  );
};

export default Sidebar;