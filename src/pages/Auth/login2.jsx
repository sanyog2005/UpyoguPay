import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Home, Eye, EyeOff, Check } from 'lucide-react';
import logoIcon from '../../assets/logo-icon.png';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  
  // State for flow control: 'email' -> 'otp' -> 'password'
  const [step, setStep] = useState('email'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // --- HANDLERS ---

  // Step 1: Submit Email
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if(!email) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp'); // Move to OTP step
    }, 1000);
  };

  // Step 2: Verify OTP -> Move to Password Creation
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('password'); // Move to Password step
    }, 1000);
  };

  // Step 3: Create Password & Complete Login
  const handleCreatePassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      // Set Auth Token & Role
      localStorage.setItem('userToken', 'mock-merchant-token-123'); 
      localStorage.setItem('userRole', 'merchant');

      if (onLogin) {
        onLogin('merchant', { email });
      }

      navigate('/merchant/dashboard');
    }, 1500);
  };

  // OTP Input Logic
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Password Validation Logic (Visual Only)
  const passwordValidations = [
    { label: 'Must include 8 characters', valid: password.length >= 8 },
    { label: 'Must include at least 1 alphabet', valid: /[a-zA-Z]/.test(password) },
    { label: 'Must include a number', valid: /[0-9]/.test(password) },
    { label: 'Must include a special character', valid: /[!@#$%^&*]/.test(password) },
  ];

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden font-sans">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
          alt="Office Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-6 left-10 z-50 flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all hover:bg-black/30"
      >
        <Home size={16} />
        <span>Back to Home</span>
      </Link>

      {/* Left Content */}
      <div className="hidden lg:flex w-[55%] relative z-10 flex-col justify-center p-16 pl-24 h-full pointer-events-none">
         <div className="absolute top-12 left-12 flex items-center gap-2 text-white font-bold text-2xl tracking-tight pointer-events-auto">
             <img src={logoIcon} alt="Logo" className="w-8 h-8 object-contain" />
            <span className="ml-4">UpyugoPay</span>
         </div>

         <div className="text-white space-y-8 mt-20 pointer-events-auto">
            <h1 className="text-5xl font-bold leading-tight">
               Join <span className="text-[#4ADE80]">8 Million</span> Businesses that Trust <br />
               UpyugoPay to Supercharge their Business
            </h1>
            <div className="flex items-center gap-8 text-base font-medium text-slate-200">
               <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-[#4ADE80]" /> 100+ Payment Methods</div>
               <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-[#4ADE80]" /> Easy Integration</div>
               <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-[#4ADE80]" /> Powerful Dashboard</div>
            </div>
         </div>
      </div>

      {/* Right Content - Interactive Card */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 relative z-10 h-full">
         <div className="bg-white w-full max-w-[480px] p-10 md:p-12 rounded-xl shadow-2xl relative min-h-[550px] flex flex-col justify-center">
            
            <div className="mb-8">
               <img src={logoIcon} alt="Logo" className="w-12 h-12 object-contain mb-6" />
               
               {step === 'email' && (
                 <>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Welcome to UpyugoPay</p>
                   <h2 className="text-3xl font-bold text-slate-900 leading-tight">Get started with your <br/> email or phone number</h2>
                 </>
               )}
               {step === 'otp' && (
                 <>
                   <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-2">Enter the code sent to <br/> your email</h2>
                   <p className="text-sm text-slate-600">
                      {email} <button onClick={() => setStep('email')} className="text-blue-600 font-bold hover:underline ml-1">Change</button>
                   </p>
                 </>
               )}
               {step === 'password' && (
                 <>
                   <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-2">Create your password</h2>
                   <p className="text-sm text-slate-600">
                      {email} <button onClick={() => setStep('email')} className="text-blue-600 font-bold hover:underline ml-1">Change</button>
                   </p>
                 </>
               )}
            </div>

            {/* STEP 1: EMAIL */}
            {step === 'email' && (
              <form className="space-y-5" onSubmit={handleEmailSubmit}>
                 <input 
                    type="text" 
                    placeholder="Enter your email or phone number"
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-[4px] text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-gray-50 focus:bg-white outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                 />
                 <button disabled={isLoading} className="w-full bg-[#2B83EA] hover:bg-blue-700 text-white font-bold py-3.5 rounded-[4px] text-sm transition-all shadow-md flex items-center justify-center gap-2">
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}
                 </button>
                 <div className="relative flex items-center justify-center py-2"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div><span className="relative bg-white px-3 text-xs text-slate-400 font-medium uppercase">or</span></div>
                 <button type="button" className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-bold py-3.5 rounded-[4px] text-sm transition-all flex items-center justify-center gap-3">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" /> Continue with Google
                 </button>
                 <p className="mt-4 text-[11px] text-slate-400 text-center leading-relaxed">By continuing you agree to our <a href="#" className="text-blue-600 hover:underline">privacy policy</a> and <a href="#" className="text-blue-600 hover:underline">terms of use</a></p>
              </form>
            )}

            {/* STEP 2: OTP */}
            {step === 'otp' && (
              <form className="space-y-8" onSubmit={handleVerifyOtp}>
                 <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                       <input key={index} ref={el => inputRefs.current[index] = el} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} className="w-12 h-12 text-center border border-gray-300 rounded-[4px] text-lg font-bold text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all" />
                    ))}
                 </div>
                 <div className="text-right"><button type="button" className="text-xs font-bold text-blue-600 hover:underline">Resend OTP in 14s</button></div>
                 <button disabled={isLoading} className="w-full bg-[#EBF4FF] hover:bg-blue-100 text-blue-600 font-bold py-3.5 rounded-[4px] text-sm transition-all flex items-center justify-center gap-2">
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Verify'}
                 </button>
                 <div className="text-center mt-6"><p className="text-xs text-slate-500">Want to change your login mode? <button type="button" onClick={() => setStep('email')} className="text-blue-600 font-bold hover:underline">Use another method</button></p></div>
              </form>
            )}

            {/* STEP 3: PASSWORD (NEW) */}
            {step === 'password' && (
              <form className="space-y-6" onSubmit={handleCreatePassword}>
                 <div className="relative">
                    <input 
                       type={showPassword ? "text" : "password"}
                       placeholder="Enter password"
                       className="w-full px-4 py-3.5 border border-gray-300 rounded-[4px] text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none pr-10"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                 </div>

                 <div className="space-y-2">
                    {passwordValidations.map((item, idx) => (
                       <div key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                          {item.valid ? <Check size={14} className="text-green-500" /> : <Check size={14} className="text-slate-300" />}
                          <span className={item.valid ? "text-slate-700 font-medium" : ""}>{item.label}</span>
                       </div>
                    ))}
                 </div>

                 <button disabled={isLoading} className="w-full bg-[#EBF4FF] hover:bg-blue-100 text-blue-600 font-bold py-3.5 rounded-[4px] text-sm transition-all flex items-center justify-center gap-2 mt-4">
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Create Password'}
                 </button>

                 <div className="text-center mt-6"><p className="text-xs text-slate-500">Want to change your signup mode? <button type="button" onClick={() => setStep('email')} className="text-blue-600 font-bold hover:underline">Use another method</button></p></div>
              </form>
            )}

         </div>
      </div>

    </div>
  );
};

export default Login;