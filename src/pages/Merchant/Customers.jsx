import React from 'react';
import { HelpCircle } from 'lucide-react';

const Customers = () => {
  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-slate-800 pb-20 relative">
      
      {/* 1. Page Header / Tab */}
      <div className="bg-white border-b border-gray-200">
         <div className="px-8 flex items-center gap-8">
            <button 
              className="py-4 text-sm font-bold border-b-2 border-blue-600 text-blue-600 transition-colors"
            >
              Customers
            </button>
         </div>
      </div>

      <div className="px-8 py-6 max-w-[1400px] mx-auto">
        
        {/* 2. Customers Table Container */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm min-h-[400px]">
           
           {/* Table Header */}
           <div className="bg-[#FAFAFA] border-b border-gray-200 px-6 py-3 grid grid-cols-5 text-xs font-bold text-slate-500 uppercase tracking-wide">
              <div>Customer Id</div>
              <div>Customer Name</div>
              <div className="text-center">Email</div>
              <div className="text-center">Contact</div>
              <div className="text-right">Action</div>
           </div>

           {/* Empty State */}
           <div className="flex flex-col items-center justify-center py-24 border-b border-gray-100">
              <h3 className="text-slate-500 font-medium text-sm">No Customers found!</h3>
           </div>
           
           {/* Footer / Pagination Placeholder (Optional, based on standard pattern) */}
           <div className="px-6 py-4"></div>

        </div>

      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#022D45] hover:bg-[#0a2544] text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-sm font-medium transition-transform hover:scale-105 z-50">
        <div className="grid place-items-center"><HelpCircle size={18} /></div>
        Help & Support
      </button>

    </div>
  );
};

export default Customers;