import React from 'react';
import { FileText } from 'lucide-react';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';

const MerchantKYC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Complete Your KYC</h2>
            <p className="text-sm text-slate-500">Required to activate Live Mode</p>
          </div>
          <StatusBadge status="Pending" />
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Business Name</label>
              <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter legal name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">GSTIN</label>
              <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="22AAAAA0000A1Z5" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">PAN Number</label>
              <input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ABCDE1234F" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Business Type</label>
              <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Private Limited</option>
                <option>Proprietorship</option>
                <option>Individual</option>
              </select>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-800 mb-4">Document Upload</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50">
              <FileText className="mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-600">Drag and drop your Registration Proof & Bank Statement</p>
              <p className="text-xs text-slate-400 mt-1">PDF, JPG up to 5MB</p>
              <Button variant="secondary" className="mt-4 mx-auto">Browse Files</Button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button>Submit for Verification</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantKYC;