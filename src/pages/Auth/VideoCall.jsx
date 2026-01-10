import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Send, MessageSquare, User, Paperclip, CheckCircle, ShieldCheck } from 'lucide-react';
import logoIcon from '../../assets/logo-icon.png';

// 1. Accept onLogin as a prop here
const VideoCall = ({ onLogin }) => {
  const navigate = useNavigate();
  
  const [callStatus, setCallStatus] = useState('active');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'agent', text: 'Hello! I am Riya from the verification team.', time: '10:00 AM' },
    { id: 2, sender: 'agent', text: 'Please show your original PAN card to the camera.', time: '10:01 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (callStatus === 'active') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, callStatus]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setNewMessage('');
  };

  const handleEndCall = () => {
    if(window.confirm("Are you sure you want to end the verification call?")) {
        setCallStatus('completed');
    }
  };

  // --- THIS IS THE FIX ---
  const handleGoToDashboard = () => {
     // 1. Set LocalStorage (Identical to your Login.jsx)
     localStorage.setItem('userToken', 'mock-merchant-token-123'); 
     localStorage.setItem('userRole', 'merchant');

     // 2. Update the App State (Identical to your Login.jsx)
     // We simulate a verified email here
     if (onLogin) {
        onLogin('merchant', { email: 'verified-merchant@upyugopay.com' });
     }

     // 3. Navigate
     // If onLogin is missing, we use a force reload to try and trigger the App to read localStorage
     if (onLogin) {
         navigate('/merchant/dashboard');
     } else {
         window.location.href = '/merchant/dashboard'; 
     }
  };

  if (callStatus === 'active') {
    return (
      <div className="h-screen bg-[#F8F9FA] flex flex-col font-sans overflow-hidden">
        <header className="bg-white h-16 border-b border-gray-200 px-6 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-2">
            <img src={logoIcon} alt="Logo" className="w-6 h-6 object-contain" />
            <div className="flex flex-col">
               <span className="text-sm font-bold text-[#02042B] leading-none">Video KYC Verification</span>
               <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Live Secure Connection
               </span>
            </div>
          </div>
          <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Session ID: #VK-902-11</div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 bg-black relative flex flex-col justify-center items-center overflow-hidden">
              <div className="w-full h-full object-cover opacity-90 relative">
                   <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" alt="Agent" className="w-full h-full object-cover"/>
                   <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">Agent Riya (IDfy)</div>
              </div>
              <div className="absolute bottom-24 right-6 w-48 h-36 bg-slate-800 rounded-lg border-2 border-white/20 shadow-2xl overflow-hidden transition-all hover:scale-105">
                  {isVideoOff ? <div className="w-full h-full flex items-center justify-center bg-slate-700 text-slate-400"><VideoOff size={24} /></div> : 
                  <div className="w-full h-full bg-slate-600 flex items-center justify-center relative"><User className="text-slate-400" size={32} /><span className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded">You</span></div>}
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-lg">
                  <button onClick={() => setIsMuted(!isMuted)} className={`p-3 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>{isMuted ? <MicOff size={20} /> : <Mic size={20} />}</button>
                  <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-3 rounded-full transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}>{isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}</button>
                  <button onClick={handleEndCall} className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all px-6 flex items-center gap-2"><PhoneOff size={20} /><span className="text-sm font-bold">End</span></button>
              </div>
          </div>
          <div className="w-[350px] bg-white border-l border-gray-200 flex flex-col shadow-xl z-20">
              <div className="h-14 border-b border-gray-100 flex items-center px-4 justify-between bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-700 font-bold text-sm"><MessageSquare size={16} className="text-blue-600" />Agent Chat</div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                  {messages.map((msg) => (
                      <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'}`}>{msg.text}</div>
                          <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                      </div>
                  ))}
                  <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
                  <div className="relative flex items-center gap-2">
                      <button type="button" className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Paperclip size={18} /></button>
                      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"/>
                      <button type="submit" disabled={!newMessage.trim()} className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors shadow-sm"><Send size={16} className={newMessage.trim() ? "ml-0.5" : ""} /></button>
                  </div>
              </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F3F5] flex flex-col font-sans text-slate-800">
        <header className="bg-white h-16 border-b border-gray-200 px-6 md:px-12 flex items-center gap-4 sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <img src={logoIcon} alt="Logo" className="w-6 h-6 object-contain" />
                <span className="text-xl font-bold text-[#02042B] tracking-tight">UpyugoPay</span>
            </div>
        </header>

        <main className="flex-1 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-sm p-8 md:p-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="text-[#00A651] w-10 h-10" strokeWidth={3} /></div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Verification Completed</h1>
                <p className="text-slate-500 mb-8 leading-relaxed">Thank you for your time. Your video KYC has been recorded successfully and is being processed.</p>
                <div className="bg-slate-50 rounded-lg p-4 mb-8 text-left border border-slate-100">
                    <div className="flex items-center justify-between mb-2"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span><span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">IN REVIEW</span></div>
                    <div className="flex items-center gap-3"><ShieldCheck className="text-slate-400" size={20} /><div><p className="text-sm font-bold text-slate-800">Identity Verification</p><p className="text-xs text-slate-500">Usually takes 10-15 minutes</p></div></div>
                </div>
                <button onClick={handleGoToDashboard} className="w-full bg-[#2B83EA] hover:bg-blue-600 text-white font-bold py-3.5 rounded-[4px] text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">Go to Dashboard</button>
            </div>
        </main>
    </div>
  );
};

export default VideoCall;