import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, X, HelpCircle, ArrowLeft, Check, Info, Pencil, ChevronDown, Video, FileText, Home, MapPin } from 'lucide-react';
import logoIcon from '../../assets/logo-icon.png';
import { Link } from 'react-router-dom';
const Verify = () => {
  const navigate = useNavigate();
  // Flow: ... -> 'bankDetails' -> 'videoKyc' -> Dashboard
  const [step, setStep] = useState('contact');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [phone, setPhone] = useState('');

  const [fullName, setFullName] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [businessType, setBusinessType] = useState('unregistered');
  const [pan, setPan] = useState('');
  const [brandName, setBrandName] = useState('');
  const [isCustomBrand, setIsCustomBrand] = useState(false);
  
  // Category States
  const [category, setCategory] = useState('IT and software');
  const [subCategory, setSubCategory] = useState('Web design, development, hosting');

  // Bank States
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const platforms = [
    { id: 'website', label: 'Website' },
    { id: 'android', label: 'Android App' },
    { id: 'ios', label: 'iOS App' },
    { id: 'whatsapp', label: 'WhatsApp, SMS, or Email' },
    { id: 'social', label: 'Social Media (like Facebook, Instagram)' },
    { id: 'others', label: 'Others' },
  ];

  // --- SIDEBAR LOGIC ---
  const basicDetailsSteps = ['contact', 'name', 'platform'];
  const businessDetailsSteps = ['businessType', 'personalPan', 'reviewPan', 'brandName', 'reviewBusinessDetails'];
  const kycDetailsSteps = ['confirmBusinessCategory', 'editBusinessCategory', 'bankDetails', 'videoKyc'];

  // Basic details are done if current step is NOT in basicDetailsSteps
  const isBasicDetailsDone = !basicDetailsSteps.includes(step);
  
  // Business details are active if current step IS in businessDetailsSteps
  const isBusinessDetailsActive = businessDetailsSteps.includes(step);

  // Business details are done if current step is in kycDetailsSteps
  const isBusinessDetailsDone = kycDetailsSteps.includes(step);

  // KYC details are active if current step IS in kycDetailsSteps
  const isKycDetailsActive = kycDetailsSteps.includes(step);

  // Determine indicator position
  let indicatorPosition = 'top-10';
  if (isBusinessDetailsActive) indicatorPosition = 'top-32';
  else if (isKycDetailsActive) indicatorPosition = 'top-[136px]';


  // --- HANDLERS ---

  const handleContactContinue = () => { setIsLoading(true); setTimeout(() => { setIsLoading(false); setStep('name'); }, 1000); };
  const handleNameContinue = (e) => { e.preventDefault(); if (!fullName.trim()) return; setIsLoading(true); setTimeout(() => { setIsLoading(false); setStep('platform'); setBrandName(fullName.toUpperCase()); }, 1000); };
  const handlePlatformContinue = () => { setIsLoading(true); setTimeout(() => { setIsLoading(false); setStep('businessType'); }, 1000); };
  const handleBusinessTypeContinue = () => { setIsLoading(true); setTimeout(() => { setIsLoading(false); setStep('personalPan'); }, 1000); };
  const handlePanSubmit = (e) => { e.preventDefault(); if (!pan.trim()) return; setIsLoading(true); setTimeout(() => { setIsLoading(false); setStep('reviewPan'); }, 1000); };
  const handleReviewPanSubmit = () => { setIsLoading(true); setTimeout(() => { setIsLoading(false); setStep('brandName'); }, 1000); };
  const handleBrandNameSubmit = () => { setIsLoading(true); setTimeout(() => { setIsLoading(false); setStep('reviewBusinessDetails'); }, 1000); };
  const handleReviewBusinessDetailsSubmit = () => { setIsLoading(true); setTimeout(() => { setIsLoading(false); setStep('confirmBusinessCategory'); }, 1000); };
  const handleEditCategoryClick = () => { setStep('editBusinessCategory'); };
  
  const handleSaveCategory = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('confirmBusinessCategory');
    }, 500);
  };

  const handleConfirmBusinessCategorySubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('bankDetails'); 
    }, 1000);
  };

  // Step 10: Bank Details -> Video KYC
  const handleBankDetailsSubmit = (e) => {
    e.preventDefault();
    if (!bankAccountNumber.trim() || !ifscCode.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('videoKyc'); // Move to Video KYC
    }, 1500);
  };

  // Step 11: Video KYC -> Dashboard (Final)
  // Step 11: Video KYC -> OnBoarding Page
  const handleConnectAgent = () => {
    setIsLoading(true);
    // Simulate connection
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to the new OnBoarding component
      navigate('/onboarding'); 
    }, 2000);
  };


  // Helper functions
  const togglePlatform = (platformId) => {
    setSelectedPlatforms((prev) => prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]);
  };

  const selectBrandOption = (option, isCustom = false) => {
    setIsCustomBrand(isCustom);
    if (!isCustom) setBrandName(option); else setBrandName('');
  };

  const handleBack = () => {
    if (step === 'name') setStep('contact');
    else if (step === 'platform') setStep('name');
    else if (step === 'businessType') setStep('platform');
    else if (step === 'personalPan') setStep('businessType');
    else if (step === 'reviewPan') setStep('personalPan');
    else if (step === 'brandName') setStep('reviewPan');
    else if (step === 'reviewBusinessDetails') setStep('brandName');
    else if (step === 'confirmBusinessCategory') setStep('reviewBusinessDetails');
    else if (step === 'editBusinessCategory') setStep('confirmBusinessCategory');
    else if (step === 'bankDetails') setStep('confirmBusinessCategory');
    else if (step === 'videoKyc') setStep('bankDetails');
  };

  return (
    <div className="min-h-screen bg-white flex font-sans text-slate-800">
      
      {/* --- LEFT SIDEBAR --- */}
      <aside className="hidden md:flex w-[280px] bg-white border-r border-gray-100 flex-col justify-between h-screen sticky top-0">
        <div className="p-8 relative">
          {/* Green Indicator Bar */}
          <div 
            className={`absolute left-0 w-1.5 h-12 bg-[#00A651] rounded-r transition-all duration-300 ease-in-out ${indicatorPosition}`}
          ></div>
          
          <div className="mb-10 pl-2">
            <h2 className="text-sm text-slate-500 font-medium mb-1">Onboarding:</h2>
            <h1 className="text-xl font-bold text-slate-800">UpyugoPay Payments</h1>
          </div>
          
          <nav className="space-y-2">
            {/* 1. Basic details */}
            <div className={`px-4 py-3 rounded-md text-sm font-bold flex items-center justify-between ${isBasicDetailsDone ? 'text-[#00A651] bg-green-50' : 'text-slate-900 bg-gray-100'}`}>
              <span>1. Basic details</span>
              {isBasicDetailsDone && <Check size={18} />}
            </div>

            {/* 2. Business details */}
            <div className={`px-4 py-3 rounded-md text-sm font-bold flex items-center justify-between transition-colors ${isBusinessDetailsDone ? 'text-[#00A651] bg-green-50' : isBusinessDetailsActive ? 'text-slate-900 bg-gray-100' : 'text-slate-500'}`}>
              <span>2. Business details</span>
              {isBusinessDetailsDone && <Check size={18} />}
            </div>

            {/* 3. KYC details */}
            <div className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${isKycDetailsActive ? 'text-slate-900 bg-gray-100 font-bold' : 'text-slate-500'}`}>
              3. KYC details
            </div>
            
            {/* 4. Video KYC (New Item in Sidebar based on screenshot) */}
            {step === 'videoKyc' && (
               <div className="px-4 py-3 rounded-md text-sm font-bold text-slate-900 bg-gray-100 mt-2">
                 4. Video KYC
               </div>
            )}
          </nav>
        </div>
        <div className="p-8 border-t border-gray-50 flex items-center justify-between">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-slate-700 text-sm font-bold rounded transition-colors"><Link to="/login" className="hidden md:block text-sm font-bold text-[#0C2454] border border-blue-600 px-5 py-2.5 rounded-[4px] hover:bg-blue-50 transition-colors">
          Logout
        </Link></button>
          <button className="text-slate-400 hover:text-slate-600"><HelpCircle size={20} /></button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col p-12 md:p-24 max-w-5xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
           {step !== 'contact' ? (
             <button onClick={handleBack} className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"><ArrowLeft size={18} /> Back</button>
           ) : <div></div>}
           <div className="flex items-center gap-2 text-sm font-bold text-slate-500"><img src={logoIcon} alt="Logo" className="w-5 h-5 object-contain" /> UpyugoPay Payments</div>
        </div>

        {/* --- STEPS 1-10 (Collapsed) --- */}
        {step === 'contact' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Verify your Contact Details</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">We require this to verify your identity.</p>
            <div className="mb-16">
                <label className="block text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Mobile number</label>
                <div className="w-full bg-[#F3F4F6] border border-transparent rounded-[4px] px-4 py-3.5 flex items-center justify-between">
                <input type="tel" autoFocus placeholder="Enter Phone Number" className="w-full border border-blue-500 rounded-[4px] px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    
                </div></div>
            <button onClick={handleContactContinue} disabled={isLoading} className="w-full bg-[#2B83EA] hover:bg-blue-600 text-white font-bold py-3.5 rounded-[4px] text-sm flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}</button>
          </div>
        )}
        {step === 'name' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Add your Name</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">Let us know the name of the person who'll be completing the onboarding</p>
            <form onSubmit={handleNameContinue}><div className="mb-16"><label className="block text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Full name</label><input type="text" autoFocus placeholder="Add your name here" className="w-full border border-blue-500 rounded-[4px] px-4 py-3.5 text-sm outline-none" value={fullName} onChange={(e) => setFullName(e.target.value)} /></div><button disabled={isLoading || !fullName.trim()} className="w-full bg-[#2B83EA] hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3.5 rounded-[4px] text-sm flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}</button></form>
          </div>
        )}
        {step === 'platform' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Accept Payments on</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">Where would you like to accept payments?</p>
            <div className="space-y-4 mb-16">{platforms.map((platform) => (<label key={platform.id} className={`flex items-center gap-4 p-4 rounded-[4px] border cursor-pointer ${selectedPlatforms.includes(platform.id) ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200'}`}><div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedPlatforms.includes(platform.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 bg-white'}`}>{selectedPlatforms.includes(platform.id) && <Check size={14} className="text-white" />}</div><input type="checkbox" className="hidden" checked={selectedPlatforms.includes(platform.id)} onChange={() => togglePlatform(platform.id)} /><span className="text-sm font-medium">{platform.label}</span></label>))}</div>
            <button onClick={handlePlatformContinue} disabled={isLoading || selectedPlatforms.length === 0} className="w-full bg-[#2B83EA] hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3.5 rounded-[4px] text-sm flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}</button>
          </div>
        )}
        {step === 'businessType' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Select your Business Type</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">Select the option that best describes your business.</p>
            <div className="flex p-1 bg-gray-100 rounded-full w-fit mb-8"><button onClick={() => setBusinessType('registered')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${businessType === 'registered' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Registered</button><button onClick={() => setBusinessType('unregistered')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${businessType === 'unregistered' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Unregistered</button></div>
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex items-start gap-3 mb-16"><Info size={20} className="text-blue-600 shrink-0 mt-0.5" /><p className="text-sm text-slate-700">{businessType === 'unregistered' ? "Businesses run by individuals that are not yet formally registered." : "Businesses that are formally registered."}</p></div>
            <button onClick={handleBusinessTypeContinue} disabled={isLoading} className="w-full bg-[#2B83EA] hover:bg-blue-600 text-white font-bold py-3.5 rounded-[4px] text-sm flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}</button>
          </div>
        )}
        {step === 'personalPan' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Add your Personal PAN</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">We require this to verify your identity.</p>
            <form onSubmit={handlePanSubmit}><div className="mb-16"><label className="block text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Personal PAN</label><input type="text" autoFocus placeholder="Personal PAN number" className="w-full border border-blue-500 rounded-[4px] px-4 py-3.5 text-sm outline-none uppercase" value={pan} onChange={(e) => setPan(e.target.value)} maxLength={10} /></div><button disabled={isLoading || !pan.trim()} className="w-full bg-[#2B83EA] hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3.5 rounded-[4px] text-sm flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}</button></form>
          </div>
        )}
        {step === 'reviewPan' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Review your Personal PAN Name</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">Ensure your PAN details are correct</p>
            <div className="mb-16 relative bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg p-6 h-48 flex flex-col justify-between shadow-inner border border-blue-200"><div className="flex justify-between text-[10px] font-bold text-slate-500"><span>INCOME TAX DEPARTMENT</span><span>GOVERNMENT OF INDIA</span></div><div className="text-center opacity-50"><img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="w-12 h-12 mx-auto" /></div><div className="font-bold text-slate-800"><p className="text-sm">{fullName.toUpperCase() || 'SANYOG SHARMA'}</p><p className="text-[10px] font-medium text-slate-500 mt-1">Permanent Account Number</p><p className="text-lg tracking-widest">{pan || 'RSMPS8946G'}</p></div></div>
            <div className="flex gap-4"><button onClick={() => setStep('personalPan')} disabled={isLoading} className="flex-1 bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold py-3.5 rounded-[4px] text-sm">Edit PAN</button><button onClick={handleReviewPanSubmit} disabled={isLoading} className="flex-1 bg-[#2B83EA] hover:bg-blue-600 text-white font-bold py-3.5 rounded-[4px] text-sm flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Yes, Confirm'}</button></div>
          </div>
        )}
        {step === 'brandName' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Select your brand name</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">Your customers will see this name on checkout pages.</p>
            <div className="mb-10"><label className="block text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Brand Name</label><div className="flex flex-wrap gap-3 mb-6"><button onClick={() => selectBrandOption(fullName.toUpperCase(), false)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${!isCustomBrand && brandName === fullName.toUpperCase() ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-200 text-slate-700 hover:border-gray-300'}`}>{fullName.toUpperCase() || 'YOUR NAME'}</button><button onClick={() => selectBrandOption('GITHUB', false)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${!isCustomBrand && brandName === 'GITHUB' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-200 text-slate-700 hover:border-gray-300'}`}>{fullName}</button><button onClick={() => selectBrandOption('', true)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${isCustomBrand ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-200 text-slate-700 hover:border-gray-300'}`}>Other</button></div>{isCustomBrand && (<div className="animate-in fade-in slide-in-from-top-2"><input type="text" autoFocus placeholder="Enter your business name" className="w-full border border-blue-500 rounded-[4px] px-4 py-3.5 text-sm outline-none uppercase" value={brandName} onChange={(e) => setBrandName(e.target.value)} /></div>)}</div>
            <button onClick={handleBrandNameSubmit} disabled={isLoading || !brandName.trim()} className="w-full bg-[#2B83EA] hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3.5 rounded-[4px] text-sm flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}</button>
          </div>
        )}
        {step === 'reviewBusinessDetails' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Review/ Edit</h1>
            <h2 className="text-4xl font-bold text-slate-500 mb-10">Business details</h2>
            <div className="space-y-6 mb-16">
               <div className="flex justify-between items-center border-b border-gray-100 pb-4"><div><p className="text-xs text-slate-500 mb-1">Select your Business Type</p><p className="text-sm font-medium text-slate-900 capitalize">{businessType}</p></div><button onClick={() => setStep('businessType')} className="text-blue-600 hover:text-blue-700 transition-colors"><Pencil size={16} /></button></div>
               <div className="flex justify-between items-center border-b border-gray-100 pb-4"><div><p className="text-xs text-slate-500 mb-1">Add your Personal PAN</p><p className="text-sm font-medium text-slate-900 uppercase">{pan || 'RSMPS8946G'}</p></div><button onClick={() => setStep('personalPan')} className="text-blue-600 hover:text-blue-700 transition-colors"><Pencil size={16} /></button></div>
               <div className="flex justify-between items-center border-b border-gray-100 pb-4"><div><p className="text-xs text-slate-500 mb-1">Review your Personal PAN Name</p><p className="text-sm font-medium text-slate-900 uppercase">{fullName || 'SANYOG SHARMA'}</p></div><button onClick={() => setStep('name')} className="text-blue-600 hover:text-blue-700 transition-colors"><Pencil size={16} /></button></div>
               <div className="flex justify-between items-center border-b border-gray-100 pb-4"><div><p className="text-xs text-slate-500 mb-1">Select your brand name</p><p className="text-sm font-medium text-slate-900 uppercase">{brandName || 'SANYOG SHARMA'}</p></div><button onClick={() => setStep('brandName')} className="text-blue-600 hover:text-blue-700 transition-colors"><Pencil size={16} /></button></div>
            </div>
            <button onClick={handleReviewBusinessDetailsSubmit} disabled={isLoading} className="w-full bg-[#2B83EA] hover:bg-blue-600 text-white font-bold py-3.5 rounded-[4px] text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}</button>
          </div>
        )}
        {step === 'confirmBusinessCategory' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Confirm your Business Category</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">We've identified your category and sub-category from your website.</p>
            <div className="space-y-8 mb-16">
              <div><label className="block text-xs font-bold text-slate-500 mb-2">Category</label><div className="flex items-center justify-between text-sm font-medium text-slate-900"><span>{category}</span><Check size={18} className="text-[#00A651]" /></div></div>
              <div><label className="block text-xs font-bold text-slate-500 mb-2">Sub Category</label><div className="flex items-center justify-between text-sm font-medium text-slate-900"><span>{subCategory}</span><Check size={18} className="text-[#00A651]" /></div></div>
            </div>
            <div className="mb-10"><button onClick={handleEditCategoryClick} className="text-sm text-blue-600 font-medium hover:underline">Incorrect category or sub-category? Update</button></div>
            <button onClick={handleConfirmBusinessCategorySubmit} disabled={isLoading} className="w-full bg-[#2B83EA] hover:bg-blue-600 text-white font-bold py-3.5 rounded-[4px] text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Confirm'}</button>
          </div>
        )}
        {step === 'editBusinessCategory' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Update Business Category</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">Select the correct category and sub-category for your business.</p>
            <form onSubmit={handleSaveCategory}>
              <div className="mb-8"><label className="block text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Category</label><div className="relative"><select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-blue-500 rounded-[4px] px-4 py-3.5 text-sm text-slate-900 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"><option value="IT and software">IT and software</option><option value="Ecommerce">Ecommerce</option><option value="Education">Education</option><option value="Services">Services</option></select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} /></div></div>
              <div className="mb-16"><label className="block text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Sub Category</label><div className="relative"><select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full border border-blue-500 rounded-[4px] px-4 py-3.5 text-sm text-slate-900 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"><option value="Web design, development, hosting">Web design, development, hosting</option><option value="Software as a Service (SaaS)">Software as a Service (SaaS)</option><option value="E-learning">E-learning</option><option value="Consulting">Consulting</option></select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} /></div></div>
              <button disabled={isLoading} className="w-full bg-[#2B83EA] hover:bg-blue-600 text-white font-bold py-3.5 rounded-[4px] text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Update Category'}</button>
            </form>
          </div>
        )}
        {step === 'bankDetails' && (
          <div className="max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Add your Bank details</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">Add bank account details linked to {fullName.toUpperCase() || 'YOUR NAME'}. Payments from your customers will be transferred to this account</p>
            <form onSubmit={handleBankDetailsSubmit}>
              <div className="mb-8"><label className="block text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Bank Account Number</label><input type="text" autoFocus placeholder="Bank Account number" className="w-full border border-blue-500 rounded-[4px] px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} /></div>
              <div className="mb-16"><label className="block text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">Bank IFSC Code</label><input type="text" placeholder="Bank IFSC code" className="w-full border border-blue-500 rounded-[4px] px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all uppercase" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} maxLength={11} /></div>
              <button disabled={isLoading || !bankAccountNumber.trim() || !ifscCode.trim()} className="w-full bg-[#2B83EA] hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-[4px] text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">{isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}</button>
            </form>
          </div>
        )}

        {/* --- STEP 11: VIDEO KYC (NEW) --- */}
        {step === 'videoKyc' && (
          <div className="max-w-[700px] animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Start Video KYC</h1>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">
              You'll be connected to an agent for a quick verification. Please make sure you meet the requirements below before continuing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {/* Card 1 */}
              <div className="border border-blue-100 bg-blue-50/50 rounded-lg p-6 flex flex-col items-start gap-3">
                <div className="p-2 bg-white rounded shadow-sm text-blue-600"><Video size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Original PAN (physical card only) and Aadhaar</h4>
                  <p className="text-xs text-slate-500">No photo copies or images</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border border-blue-100 bg-blue-50/50 rounded-lg p-6 flex flex-col items-start gap-3">
                <div className="p-2 bg-white rounded shadow-sm text-blue-600"><FileText size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">No one else should be present</h4>
                  <p className="text-xs text-slate-500">Only you must appear on camera</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="border border-blue-100 bg-blue-50/50 rounded-lg p-6 flex flex-col items-start gap-3">
                <div className="p-2 bg-white rounded shadow-sm text-blue-600"><Home size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Be in a well-lit, quiet room</h4>
                  <p className="text-xs text-slate-500">so we can see and hear you clearly.</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="border border-blue-100 bg-blue-50/50 rounded-lg p-6 flex flex-col items-start gap-3">
                <div className="p-2 bg-white rounded shadow-sm text-blue-600"><MapPin size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">You must be in India</h4>
                </div>
              </div>
            </div>

            <button 
              onClick={handleConnectAgent}
              disabled={isLoading}
              className="w-full bg-[#2B83EA] hover:bg-blue-600 text-white font-bold py-3.5 rounded-[4px] text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Connect with agent'}
            </button>
          </div>
        )}

      </main>

      {/* Help & Support Button (Fixed Position) */}
      <button className="fixed bottom-8 right-8 bg-[#02042B] text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 hover:bg-black transition-colors z-50 text-sm font-bold">
        <HelpCircle size={16} /> Help & Support
      </button>

    </div>
  );
};

export default Verify;