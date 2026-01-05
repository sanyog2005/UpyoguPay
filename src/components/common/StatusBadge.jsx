import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle, RefreshCcw, Ban } from 'lucide-react';

const StatusBadge = ({ status }) => {
  // Normalize status to handle Case Sensitivity (e.g. "success" vs "Success")
  const normalizedStatus = status?.toLowerCase() || 'default';

  const config = {
    success: {
      color: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      icon: CheckCircle2,
      label: "Success"
    },
    active: {
      color: "bg-blue-50 text-blue-700 ring-blue-600/20", // Distinguish Active vs Success
      icon: CheckCircle2,
      label: "Active"
    },
    pending: {
      color: "bg-amber-50 text-amber-700 ring-amber-600/20",
      icon: Clock,
      label: "Pending"
    },
    processing: {
      color: "bg-blue-50 text-blue-700 ring-blue-600/20",
      icon: RefreshCcw, // Spinning icon logic can be added here
      label: "Processing"
    },
    failed: {
      color: "bg-red-50 text-red-700 ring-red-600/10",
      icon: XCircle,
      label: "Failed"
    },
    rejected: {
      color: "bg-rose-50 text-rose-700 ring-rose-600/10",
      icon: Ban,
      label: "Rejected"
    },
    refunded: {
      color: "bg-purple-50 text-purple-700 ring-purple-600/20",
      icon: RefreshCcw,
      label: "Refunded"
    },
    default: {
      color: "bg-slate-50 text-slate-600 ring-slate-500/10",
      icon: AlertCircle,
      label: status || "Unknown"
    }
  };

  const style = config[normalizedStatus] || config.default;
  const Icon = style.icon;

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
      ring-1 ring-inset transition-colors duration-200
      ${style.color}
    `}>
      <Icon className="w-3.5 h-3.5" />
      <span className="capitalize">{style.label}</span>
    </span>
  );
};

export default StatusBadge;