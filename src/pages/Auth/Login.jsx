import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Users, Shield, FileText, ArrowRight, Mail, Lock, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';
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
      onLogin(selectedRole, formData);
      if (selectedRole === 'merchant') navigate('/merchant/dashboard');
      if (selectedRole === 'admin') navigate('/admin/dashboard');
      if (selectedRole === 'staff') navigate('/staff/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* LEFT SIDE - BRANDING & VISUALS (Hidden on Mobile, Visible on LG screens) */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 relative items-center justify-center p-12 overflow-hidden">
        
        {/* Animated Background Gradients */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 flex items-center gap-3">
               <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <CreditCard className="text-white w-6 h-6" />
               </div>
               <span className="text-2xl font-bold text-white tracking-tight">UpyugoPay</span>
            </div>
            
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              The Secure Way to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Manage Payments
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Accept payments, manage risks, and track your business growth with our PCI-DSS Level 1 secured gateway infrastructure.
            </p>

            {/* Floating Glass Card Animation */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-[1.58/1] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-md opacity-80" />
                <CreditCard className="text-white/50 w-8 h-8" />
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-3 w-12 bg-white/20 rounded-full" />
                  <div className="h-3 w-12 bg-white/20 rounded-full" />
                  <div className="h-3 w-12 bg-white/20 rounded-full" />
                  <div className="h-3 w-12 bg-white/20 rounded-full" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="text-white/40 text-xs uppercase tracking-widest">Card Holder</div>
                    <div className="text-white font-medium tracking-wider">UpyugoPay MERCHANT</div>
                  </div>
                  <div className="text-white/90 font-mono text-xl">12/28</div>
                </div>
              </div>

              {/* Decorative floating checkmarks */}
              <motion.div 
                 animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                 className="absolute -right-8 top-12 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3"
              >
                 <div className="bg-green-100 p-1.5 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-600"/></div>
                 <div className="text-xs font-bold text-slate-800">Payment Verified</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE - INTERACTIVE FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-6 lg:p-20">
        <div className="w-full max-w-md">
          
          <AnimatePresence mode="wait">
            {/* VIEW 1: ROLE SELECTION */}
            {!selectedRole ? (
              <motion.div 
                key="roles"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Mobile Logo Only */}
                <div className="lg:hidden flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="text-white w-5 h-5" />
                   </div>
                   <span className="text-xl font-bold text-slate-900">UpyugoPay</span>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                <p className="text-slate-500 mb-8">Choose your portal to sign in.</p>
                
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
                
                <p className="mt-8 text-center text-sm text-slate-400">
                  Don't have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Contact Sales</a>
                </p>
              </motion.div>
            ) : (

              /* VIEW 2: LOGIN FORM */
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button 
                  onClick={() => setSelectedRole(null)}
                  className="flex items-center text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors font-medium group"
                >
                  <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
                  Switch Portal
                </button>

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 capitalize mb-2">{selectedRole} Login</h2>
                  <p className="text-slate-500">Please enter your details.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 pl-12 shadow-sm transition-all"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                       <label className="block text-sm font-semibold text-slate-700">Password</label>
                       <a href="#" className="text-sm text-blue-600 hover:underline font-medium">Forgot?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input 
                        type="password" 
                        required
                        className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 pl-12 shadow-sm transition-all"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-xl text-white font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all
                      ${selectedRole === 'merchant' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                      ${selectedRole === 'admin' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                      ${selectedRole === 'staff' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                    `}
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In to Dashboard'}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer info for mobile/desktop */}
        <div className="absolute bottom-6 right-6 lg:left-6 lg:right-auto text-xs text-slate-400">
          © 2024 UpyugoPay. All rights reserved.
        </div>
      </div>
    </div>
  );
};

// Larger, more spacious button component
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