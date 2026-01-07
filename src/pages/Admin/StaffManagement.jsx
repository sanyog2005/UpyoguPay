import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Activity, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Lock, 
  Clock, 
  CheckSquare, 
  Square,
  X,
  Save,
  MoreVertical,
  FileText
} from 'lucide-react';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import StatCard from '../../components/common/StatCard';

// --- MOCK DATA ---

const STAFF_MEMBERS = [
  { 
    id: 1, 
    name: "Sarah Jenkins", 
    email: "sarah.j@UpyugoPay.com", 
    role: "Support", 
    status: "Active", 
    lastLogin: "2 mins ago",
    permissions: { kyc: true, refunds: false, settlements: false, support: true }
  },
  { 
    id: 2, 
    name: "Michael Ross", 
    email: "mike.r@UpyugoPay.com", 
    role: "Finance", 
    status: "Active", 
    lastLogin: "1 hour ago",
    permissions: { kyc: true, refunds: true, settlements: true, support: false }
  },
  { 
    id: 3, 
    name: "David Chen", 
    email: "david.c@UpyugoPay.com", 
    role: "Technical", 
    status: "Inactive", 
    lastLogin: "3 days ago",
    permissions: { kyc: false, refunds: false, settlements: false, support: true, api: true }
  },
];

const ACTIVITY_LOGS = [
  { id: 101, staffId: 1, action: "Login", detail: "Successful login from IP 192.168.1.1", time: "2023-10-25 09:00 AM" },
  { id: 102, staffId: 1, action: "Update Status", detail: "Changed Merchant #402 status to Verified", time: "2023-10-25 09:15 AM" },
  { id: 103, staffId: 2, action: "Process Refund", detail: "Initiated refund for Order #TXN_992", time: "2023-10-25 10:30 AM" },
  { id: 104, staffId: 1, action: "View Document", detail: "Viewed PAN Card for Merchant #405", time: "2023-10-25 11:00 AM" },
  { id: 105, staffId: 3, action: "API Key Gen", detail: "Rolled API keys for Sandbox Env", time: "2023-10-22 04:45 PM" },
];

const MODULES = [
  { id: 'kyc', label: 'Merchant KYC', desc: 'Verify and approve documents' },
  { id: 'refunds', label: 'Refunds Management', desc: 'Process and approve refunds' },
  { id: 'settlements', label: 'Settlements', desc: 'Manage payouts and bank transfers' },
  { id: 'support', label: 'Customer Support', desc: 'Access ticketing system' },
  { id: 'api', label: 'API Configuration', desc: 'Manage keys and webhooks' },
];

const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null); // For Edit/Add
  const [viewingLogsFor, setViewingLogsFor] = useState(null); // For Activity Logs

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Support',
    status: 'Active',
    permissions: {}
  });

  const filteredStaff = STAFF_MEMBERS.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setCurrentStaff(null);
    setFormData({
      name: '',
      email: '',
      role: 'Support',
      status: 'Active',
      permissions: { kyc: true, support: true } // Default support permissions
    });
    setIsModalOpen(true);
  };

  const openEditModal = (staff) => {
    setCurrentStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      status: staff.status,
      permissions: { ...staff.permissions }
    });
    setIsModalOpen(true);
  };

  const openActivityLogs = (staff) => {
    setViewingLogsFor(staff);
    setIsLogOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to remove this staff member? This action cannot be undone.")) {
      alert(`Staff member ${id} deleted.`);
      // Logic to remove from state would go here
    }
  };

  const togglePermission = (moduleId) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [moduleId]: !prev.permissions[moduleId]
      }
    }));
  };

  const handleRoleChange = (newRole) => {
    // Auto-set permissions based on role template
    let newPerms = {};
    switch(newRole) {
        case 'Finance': newPerms = { refunds: true, settlements: true, kyc: true }; break;
        case 'Technical': newPerms = { api: true, support: true }; break;
        default: newPerms = { support: true, kyc: true }; // Support
    }
    setFormData(prev => ({ ...prev, role: newRole, permissions: newPerms }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // API Call to save/update
    alert(`Saved ${formData.name} as ${formData.role}`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Staff" value="12" subtext="Across 3 departments" icon={Users} color="bg-blue-600" />
        <StatCard title="Active Now" value="4" subtext="Online in dashboard" icon={Activity} color="bg-emerald-600" />
        <StatCard title="Security Alerts" value="0" subtext="No suspicious activity" icon={Shield} color="bg-purple-600" />
      </div>

      {/* 2. Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 w-full md:w-auto bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search staff by name or role..." 
            className="bg-transparent outline-none text-sm w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={openAddModal} icon={Plus}>Add New Staff</Button>
      </div>

      {/* 3. Staff Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-lg font-bold text-slate-800">Staff Directory</h3>
           <p className="text-sm text-slate-500">Manage access and roles for your team.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">User Details</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Login</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStaff.map(staff => (
                <tr key={staff.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {staff.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{staff.name}</p>
                        <p className="text-slate-500 text-xs">{staff.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${
                      staff.role === 'Finance' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      staff.role === 'Technical' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={staff.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                    <Clock size={14} /> {staff.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openActivityLogs(staff)} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="View Activity">
                         <Activity size={16} />
                      </button>
                      <button onClick={() => openEditModal(staff)} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                         <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(staff.id)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete">
                         <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL: ADD / EDIT STAFF --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 rounded-t-xl">
               <h2 className="text-xl font-bold text-slate-800">{currentStaff ? 'Edit Staff Member' : 'Add New Staff'}</h2>
               <button onClick={() => setIsModalOpen(false)}><X className="text-slate-400 hover:text-slate-600" /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Role</label>
                      <select 
                        className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.role}
                        onChange={e => handleRoleChange(e.target.value)}
                      >
                        <option>Support</option>
                        <option>Finance</option>
                        <option>Technical</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Account Status</label>
                    <select 
                      className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                    >
                      <option>Active</option>
                      <option>Suspended</option>
                      <option>Inactive</option>
                    </select>
                  </div>
               </div>

               {/* Permissions Section */}
               <div className="pt-4 border-t border-slate-100">
                 <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                   <Lock size={14} /> Module Permissions
                 </h3>
                 <div className="grid grid-cols-1 gap-2">
                   {MODULES.map(module => (
                     <div 
                        key={module.id} 
                        onClick={() => togglePermission(module.id)}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          formData.permissions[module.id] 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                     >
                       <div className={`mt-0.5 ${formData.permissions[module.id] ? 'text-blue-600' : 'text-slate-300'}`}>
                         {formData.permissions[module.id] ? <CheckSquare size={18} /> : <Square size={18} />}
                       </div>
                       <div>
                         <p className={`text-sm font-semibold ${formData.permissions[module.id] ? 'text-blue-800' : 'text-slate-600'}`}>{module.label}</p>
                         <p className="text-xs text-slate-400">{module.desc}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit" icon={Save}>Save Staff</Button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ACTIVITY LOGS --- */}
      {isLogOpen && viewingLogsFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                 <div>
                    <h2 className="text-xl font-bold text-slate-800">Activity Log</h2>
                    <p className="text-sm text-slate-500">History for {viewingLogsFor.name}</p>
                 </div>
                 <button onClick={() => setIsLogOpen(false)}><X className="text-slate-400 hover:text-slate-600" /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-0">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                       <tr className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <th className="px-6 py-3">Action</th>
                          <th className="px-6 py-3">Details</th>
                          <th className="px-6 py-3 text-right">Time</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {ACTIVITY_LOGS
                         .filter(log => log.staffId === viewingLogsFor.id || (viewingLogsFor.id === 3 && log.staffId === 3)) // Mock filter logic
                         .map(log => (
                           <tr key={log.id} className="text-sm">
                              <td className="px-6 py-4 font-medium text-slate-700">{log.action}</td>
                              <td className="px-6 py-4 text-slate-500">{log.detail}</td>
                              <td className="px-6 py-4 text-right text-slate-400 text-xs font-mono">{log.time}</td>
                           </tr>
                       ))}
                       {ACTIVITY_LOGS.filter(log => log.staffId === viewingLogsFor.id).length === 0 && (
                          <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-400">No recent activity found.</td></tr>
                       )}
                    </tbody>
                 </table>
              </div>
              <div className="p-4 border-t border-slate-100 text-center bg-slate-50 rounded-b-xl">
                 <Button variant="outline" onClick={() => setIsLogOpen(false)}>Close Logs</Button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default StaffManagement;