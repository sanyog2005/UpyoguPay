import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import Sidebar from './Sidebar';
import Navbar from './Navbar'; // --- 1. Import the Navbar ---

const Layout = ({ role, onLogout }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#F4F6F8] overflow-hidden font-sans">
      
      {/* Sidebar - Fixed Left */}
      <Sidebar role={role} onLogout={onLogout} />
      
      {/* Right Side Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* --- 2. Add Navbar Here --- */}
        {/* It sits at the top of the flex column */}
        <Navbar />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
           
           {/* Added extra top padding so content doesn't feel cramped against the navbar */}
           <div className="max-w-7xl mx-auto space-y-8 pb-10">
             
             {/* Page Transition Wrapper */}
             <AnimatePresence mode="wait">
               <motion.div
                 key={location.pathname}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.2 }}
               >
                 <Outlet /> 
               </motion.div>
             </AnimatePresence>

           </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;