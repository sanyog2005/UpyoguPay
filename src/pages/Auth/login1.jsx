import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Users, Shield, FileText, ArrowRight, Mail, Lock, ChevronLeft, Loader2, CheckCircle2, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      
      // 1. Set Auth Token/Role in LocalStorage (Crucial for Protected Routes)
      localStorage.setItem('userToken', 'mock-token-12345'); 
      localStorage.setItem('userRole', selectedRole);

      // 2. Call parent handler if provided
      if (onLogin) {
        onLogin(selectedRole, formData);
      }

      // 3. Navigate based on role
      if (selectedRole === 'merchant') {
        navigate('/merchant/dashboard');
      } else if (selectedRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (selectedRole === 'staff') {
        navigate('/staff/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex font-sans relative">
      
      {/* --- NEW: Back to Home Button --- */}
      <Link 
        to="/" 
        className="absolute top-6 right-6 z-50 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 hover:border-blue-200 transition-all shadow-sm hover:shadow-md"
      >
        <Home size={16} />
        <span>Back to Home</span>
      </Link>

      {/* LEFT SIDE - Hero Image & Testimonial */}
      <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-black">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
          alt="Office Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16">
           {/* Logo */}
           <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
              <div className="relative">
                 <div className="w-1 h-6 bg-blue-500 rotate-12 absolute left-0"></div>
                 <div className="w-1 h-6 bg-white rotate-12 ml-2"></div>
              </div>
              <span className="ml-4">UpyugoPay</span>
           </div>

           {/* Hero Text */}
           <div className="text-white space-y-6">
              <h1 className="text-4xl font-bold leading-snug">
                 Join <span className="text-[#4ADE80]">8 Million</span> Businesses that Trust <br />
                 UpyugoPay to Supercharge their Business
              </h1>
              
              <div className="flex items-center gap-8 text-sm font-medium text-slate-200">
                 <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-white" /> 100+ Payment Methods
                 </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-white" /> Easy Integration
                 </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-white" /> Powerful Dashboard
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* RIGHT SIDE - Authentication Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-8 bg-[#F9FAFB]">
         
         <AnimatePresence mode="wait">
            {/* VIEW 1: ROLE SELECTION */}
            {!selectedRole ? (
               <motion.div 
                  key="role-selection"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full max-w-[440px] bg-white p-10 rounded-xl shadow-lg border border-gray-100"
               >
                  <div className="mb-8 text-center">
                     <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">R</div>
                     <h2 className="text-2xl font-bold text-slate-900">Choose Portal</h2>
                     <p className="text-sm text-slate-500 mt-2">Select your access level to continue</p>
                  </div>

                  <div className="space-y-4">
                  <LargeRoleButton 
                    title="Merchant Portal" 
                    subtitle="Manage payments & analytics"
                    icon={Users}
                    color="blue"
                    onClick={() => setSelectedRole('merchant')}
                  />
                  <LargeRoleButton 
                    title="Super Admin" 
                    subtitle="System configuration"
                    icon={Shield}
                    color="purple"
                    onClick={() => setSelectedRole('admin')}
                  />
                  <LargeRoleButton 
                    title="Staff Access" 
                    subtitle="Customer support & operations"
                    icon={FileText}
                    color="emerald"
                    onClick={() => setSelectedRole('staff')}
                  />
                </div>
               </motion.div>
            ) : (
               /* VIEW 2: LOGIN FORM */
               <motion.div 
                  key="login-form"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="w-full max-w-[480px] bg-white p-10 md:p-12 rounded-xl shadow-2xl relative"
               >
                  <button 
                     onClick={() => setSelectedRole(null)}
                     className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                     <ChevronLeft size={24} />
                  </button>

                  <div className="mb-8 mt-2">
                     <div className="w-10 h-10 bg-[#3395FF] rounded-md flex items-center justify-center mb-6 transform -rotate-6 shadow-lg shadow-blue-200">
                        <div className="w-1 h-5 bg-white rotate-12"></div>
                     </div>
                     
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Welcome to UpyugoPay <span className="text-blue-600">{selectedRole}</span>
                     </p>
                     <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                        Get started with your <br/>
                        email or phone number
                     </h2>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                     <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 z-10" />
                        <input 
                           type="text" 
                           required
                           className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-[4px] text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-white relative"
                           placeholder="Enter your email or phone number"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                     </div>

                     <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 z-10" />
                        <input 
                           type="password" 
                           required
                           className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-[4px] text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-white relative"
                           placeholder="Enter your password"
                           value={formData.password}
                           onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                     </div>

                     <button 
                        disabled={isLoading}
                        className="w-full bg-[#2B83EA] hover:bg-blue-700 text-white font-bold py-3.5 rounded-[4px] text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
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

                  <div className="mt-8 text-[11px] text-slate-400 text-center leading-relaxed">
                     By continuing you agree to our <a href="#" className="text-blue-600 hover:underline">privacy policy</a> and <a href="#" className="text-blue-600 hover:underline">terms of use</a>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
    </div>
  );
};

const LargeRoleButton = ({ title, subtitle, icon: Icon, color, onClick }) => {
  const styles = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'group-hover:border-blue-500', iconBg: 'bg-blue-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'group-hover:border-purple-500', iconBg: 'bg-purple-100' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'group-hover:border-emerald-500', iconBg: 'bg-emerald-100' },
  };
  
  const s = styles[color];

  return (
    <motion.button 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`w-full p-5 bg-white border border-slate-200 rounded-2xl text-left transition-all duration-300 hover:shadow-lg group ${s.border}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${s.iconBg} ${s.text} transition-colors`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
             <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{title}</h3>
             <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>
      </div>
    </motion.button>
  );
};

export default Login;