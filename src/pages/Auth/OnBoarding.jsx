import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AlertTriangle, Settings, Loader2, CheckCircle2, Headset } from 'lucide-react';
import logoIcon from '../../assets/logo-icon.png'; 

const OnBoarding = () => {
  const navigate = useNavigate();
  
  // viewState options: 'initial' | 'fetching_location' | 'connecting_agent' | 'permission_denied'
  const [viewState, setViewState] = useState('initial');

  // Effect to trigger location request or agent connection based on state
  useEffect(() => {
    
    // 1. Handle Location Request
    if (viewState === 'fetching_location') {
      const timer = setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // SUCCESS: Move to Connecting Agent screen
            console.log("Location Access Granted");
            setViewState('connecting_agent');
          },
          (error) => {
            // ERROR: Move to Denied screen
            console.error("Location Access Denied", error);
            setViewState('permission_denied');
          }
        );
      }, 1000); 
      return () => clearTimeout(timer);
    }

    // 2. Handle Connecting Agent Simulation
// ... inside OnBoarding.jsx

    // 2. Handle Connecting Agent Simulation
    if (viewState === 'connecting_agent') {
      const timer = setTimeout(() => {
        // SUCCESS: Navigate to the new Video Call page
        navigate('/video-call'); 
      }, 3000);
      return () => clearTimeout(timer);
    }

  }, [viewState, navigate]);

  const handleProceed = () => {
    setViewState('fetching_location');
  };

  const handleRetry = () => {
    setViewState('fetching_location');
  };

  return (
    <div className="min-h-screen bg-[#F2F3F5] flex flex-col font-sans text-slate-800 relative">
      
      {/* Header */}
      <header className="bg-white h-16 border-b border-gray-200 px-6 md:px-12 flex items-center gap-4 sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <img src={logoIcon} alt="Logo" className="w-6 h-6 object-contain" />
          <span className="text-xl font-bold text-[#02042B] tracking-tight">UpyugoPay</span>
        </div>
        <div className="h-5 w-px bg-gray-300 mx-1"></div>
        <span className="text-sm font-medium text-slate-600">Permissions</span>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center w-full pb-12">
        <div className="bg-white w-full max-w-2xl min-h-[calc(100vh-64px)] md:min-h-0 md:h-auto md:my-8 md:shadow-sm md:rounded flex flex-col relative overflow-hidden">
          
          {/* --- VIEW 1: INITIAL (AVATAR) --- */}
          {viewState === 'initial' && (
            <>
              <div className="flex-1 flex flex-col items-center justify-center w-full px-8 py-20">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-blue-50 rounded-full transform scale-150 opacity-50"></div>
                  <div className="absolute inset-0 border border-blue-100 rounded-full transform scale-125"></div>
                  <div className="w-24 h-24 bg-[#0F172A] rounded-full flex items-center justify-center relative z-10 shadow-lg">
                    <User className="text-white" size={40} strokeWidth={2.5} />
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                  Let's Set You up for Verification
                </h1>
              </div>
              <div className="w-full px-8 md:px-16 pb-12 mt-auto">
                <button 
                  onClick={handleProceed}
                  className="w-full bg-[#24459c] hover:bg-[#1a3478] text-white font-semibold py-3.5 rounded-[4px] transition-colors shadow-sm text-sm"
                >
                  Proceed
                </button>
              </div>
            </>
          )}

          {/* --- VIEW 2: FETCHING LOCATION (LOADING SCREEN) --- */}
          {viewState === 'fetching_location' && (
            <div className="flex flex-col h-full animate-in fade-in duration-300">
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                
                {/* Progress Dots */}
                <div className="mb-12 flex flex-col items-center gap-4">
                  <h2 className="text-lg font-medium text-slate-700">Setup in Progress ...</h2>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#24459c] ring-2 ring-blue-100"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                  </div>
                </div>

                {/* Big Location Spinner */}
                <div className="relative mb-8">
                   <div className="w-32 h-32 border-4 border-slate-100 border-t-[#0F172A] rounded-full animate-spin absolute inset-0 m-auto"></div>
                   <div className="w-32 h-32 flex items-center justify-center">
                      <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center relative">
                         <div className="absolute bottom-0 translate-y-1 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-slate-600"></div>
                         <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                   </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2">Fetching Location</h3>
                <p className="text-slate-500 text-sm">Please ensure your Location is on</p>

              </div>
              <div className="bg-[#FFF9F0] p-4 text-center border-t border-orange-100">
                 <p className="text-sm text-slate-800">Please click on <span className="font-bold">'Allow'</span> when the pop up appears</p>
              </div>
            </div>
          )}

          {/* --- VIEW 3: CONNECTING AGENT (NEW SCREEN) --- */}
          {viewState === 'connecting_agent' && (
             <div className="flex flex-col h-full animate-in fade-in duration-500">
             <div className="flex-1 flex flex-col items-center justify-center p-8">
               
               {/* Success Indicator */}
               <div className="mb-8 flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 animate-in slide-in-from-top-4 fade-in duration-700">
                 <CheckCircle2 size={16} />
                 <span className="text-sm font-bold">Location Verified</span>
               </div>

               {/* Agent Connection Animation */}
               <div className="relative mb-8">
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                  
                  <div className="w-32 h-32 bg-[#24459c] rounded-full flex items-center justify-center relative z-10 shadow-xl ring-4 ring-blue-50">
                     <Headset className="text-white w-14 h-14" />
                  </div>
               </div>

               <h3 className="text-xl font-bold text-slate-900 mb-2">Connecting to an agent</h3>
               <p className="text-slate-500 text-sm mb-8 text-center max-w-xs">
                 Please wait while we connect you to the next available verification expert.
               </p>

               <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
                 <Loader2 size={14} className="animate-spin text-[#24459c]" />
                 Connecting...
               </div>

             </div>
           </div>
          )}

          {/* --- VIEW 4: PERMISSION DENIED (ERROR SCREEN) --- */}
          {viewState === 'permission_denied' && (
            <div className="flex flex-col h-full animate-in fade-in duration-300">
              
              <div className="p-8 md:p-12 flex-1">
                <div className="border border-red-200 bg-white rounded-md p-6 mb-8 flex items-start justify-between shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    <div>
                        <p className="text-slate-600 text-sm mb-1">We are not able to access your :</p>
                        <p className="text-slate-900 font-bold text-lg">Location</p>
                    </div>
                    <AlertTriangle className="text-red-500" size={24} />
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-slate-700 mb-3 text-sm">System Settings</h3>
                    <div className="border border-gray-200 rounded-lg p-5 bg-white text-sm text-slate-600 leading-relaxed">
                        1. Go to Settings <span className="mx-1">→</span> Privacy <span className="mx-1">→</span> Location <span className="mx-1">→</span> Toggle on 'Allow apps to access your location'
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold text-slate-700 mb-3 text-sm">Browser Settings</h3>
                    <div className="border border-gray-200 rounded-lg p-5 bg-white text-sm text-slate-600 leading-relaxed flex items-center flex-wrap gap-1">
                        1. Click on <span className="inline-flex items-center justify-center bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5 mx-1"><Settings size={12} className="text-slate-700" /></span> icon <span className="mx-1">→</span> Permissions <span className="mx-1">→</span> Reset Permissions
                    </div>
                </div>
              </div>

              <div className="bg-[#FFF9F0] p-8 md:p-12 mt-auto border-t border-orange-100">
                <p className="text-center text-xs font-bold text-orange-800 mb-4">Once done, click on ‘Retry Permissions’</p>
                <button 
                  onClick={handleRetry}
                  className="w-full bg-[#24459c] hover:bg-[#1a3478] text-white font-semibold py-3.5 rounded-[4px] transition-colors shadow-sm text-sm"
                >
                  Retry Permissions
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Global Footer (Black Strip) */}
      <footer className="bg-[#0F172A] py-3 w-full text-center flex items-center justify-center gap-2 mt-auto shrink-0 z-10">
        <span className="text-white text-xs font-medium">Secured by</span>
        <div className="flex items-center gap-0.5">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-[#0F172A]">ID</div>
            <span className="text-white text-sm font-bold italic">fy</span>
        </div>
      </footer>
    </div>
  );
};

export default OnBoarding;