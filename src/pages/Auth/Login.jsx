import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Home } from 'lucide-react';
import logoIcon from '../../assets/logo-icon.png';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      
      // 1. Set Auth Token & Role (Defaulting to Merchant)
      localStorage.setItem('userToken', 'mock-merchant-token-123'); 
      localStorage.setItem('userRole', 'merchant');

      // 2. Call parent handler if provided
      if (onLogin) {
        onLogin('merchant', { email });
      }

      // 3. Navigate directly to Merchant Dashboard
      navigate('/merchant/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden font-sans">
      
      {/* --- FULL SCREEN BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
          alt="Office Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* --- Back to Home Button --- */}
      <Link 
        to="/" 
        className="absolute top-2 left-10 z-50 flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all hover:bg-black/30"
      >
        <Home size={16} />
        <span>Back to Home</span>
      </Link>

      {/* LEFT SIDE - Hero Text Overlay (on top of bg) */}
      <div className="hidden lg:flex w-[55%] relative z-10 flex-col justify-center p-16 pl-24 h-full pointer-events-none">
         {/* Logo */}
         <div className="absolute top-15 left-12 flex items-center gap-2 text-white font-bold text-2xl tracking-tight pointer-events-auto">
             <img 
                   src={logoIcon} 
                   alt="Logo" 
                   className="w-8 h-8 object-contain" 
                 />
            <span className="ml-4">UpyugoPay</span>
         </div>
         

         {/* Hero Text */}
         <div className="text-white space-y-8 mt-20 pointer-events-auto">
            <h1 className="text-5xl font-bold leading-tight">
               Join <span className="text-[#4ADE80]">8 Million</span> Businesses that Trust <br />
               UpyugoPay to Supercharge their Business
            </h1>
            
            <div className="flex items-center gap-8 text-base font-medium text-slate-200">
               <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#4ADE80]" /> 100+ Payment Methods
               </div>
               <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#4ADE80]" /> Easy Integration
               </div>
               <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#4ADE80]" /> Powerful Dashboard
               </div>
            </div>
         </div>
      </div>

      {/* RIGHT SIDE - Login Card (on top of bg) */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 relative z-10 h-full">
         
         <div className="bg-white w-full max-w-[480px] p-10 md:p-12 rounded-xl shadow-2xl relative animate-in slide-in-from-right-8 duration-500">
            
            {/* Header */}
            <div className="mb-8">
              <img 
                   src={logoIcon} 
                   alt="Logo" 
                   className="w-15 h-15 object-contain" 
                 />
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Welcome to UpyugoPay</p>
               <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                  Get started with your <br/>
                  email or phone number
               </h2>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleLogin}>
               <div>
                  <input 
                     type="text" 
                     placeholder="Enter your email or phone number"
                     className="w-full px-4 py-3.5 border border-gray-300 rounded-[4px] text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-gray-50 focus:bg-white"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>

               <button 
                  disabled={isLoading}
                  className="w-full bg-[#2B83EA] hover:bg-blue-700 text-white font-bold py-3.5 rounded-[4px] text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 transform active:scale-[0.98]"
               >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}
               </button>

               <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <span className="relative bg-white px-3 text-xs text-slate-400 font-medium uppercase">or</span>
               </div>

               <button 
                  type="button"
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-bold py-3.5 rounded-[4px] text-sm transition-all flex items-center justify-center gap-3"
               >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                  Continue with Google
               </button>
            </form>

            {/* Footer */}
            <p className="mt-8 text-[11px] text-slate-400 text-center leading-relaxed">
               By continuing you agree to our <a href="#" className="text-blue-600 hover:underline">privacy policy</a> and <a href="#" className="text-blue-600 hover:underline">terms of use</a>
            </p>

         </div>
      </div>

    </div>
  );
};

export default Login;