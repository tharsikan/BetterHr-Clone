
import React, { useState } from 'react';
import { Calendar, Plus, ChevronRight, FileText, Info } from 'lucide-react';

export const Leave: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'balance' | 'history'>('balance');

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Leave Management</h2>
        <button className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {/* Tab Switcher */}
      <div className="bg-slate-200/50 p-1 rounded-xl flex">
        <button 
          onClick={() => setActiveTab('balance')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'balance' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
          }`}
        >
          Balances
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
          }`}
        >
          Request History
        </button>
      </div>

      {activeTab === 'balance' ? (
        <div className="space-y-4">
          {[
            { name: 'Annual Leave', total: 20, used: 4, color: 'bg-blue-500' },
            { name: 'Sick Leave', total: 10, used: 2, color: 'bg-red-500' },
            { name: 'Public Holidays', total: 12, used: 8, color: 'bg-green-500' },
            { name: 'Study Leave', total: 5, used: 0, color: 'bg-purple-500' },
          ].map((leave, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-slate-800">{leave.name}</h4>
                  <p className="text-xs text-slate-400">Policy: Calendar Year 2024</p>
                </div>
                <div className={`p-2 rounded-lg bg-slate-50`}>
                  <FileText className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              
              <div className="flex items-end justify-between mb-2">
                <div>
                  <span className="text-3xl font-black text-slate-800">{leave.total - leave.used}</span>
                  <span className="text-sm font-bold text-slate-400 ml-1">Days Left</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Allocated: {leave.total}</p>
                </div>
              </div>

              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${leave.color}`} 
                  style={{ width: `${((leave.total - leave.used) / leave.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
          
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0" />
            <p className="text-xs text-blue-700 font-medium leading-relaxed">
              Your annual leave balance will expire on Dec 31, 2024. Carry over is limited to 5 days.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {[
            { type: 'Annual', date: 'Aug 10 - Aug 12', status: 'Approved', days: 3 },
            { type: 'Sick', date: 'Jul 24 - Jul 24', status: 'Approved', days: 1 },
            { type: 'Annual', date: 'Sep 15 - Sep 18', status: 'Pending', days: 4 },
          ].map((req, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  req.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                }`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{req.type} Leave</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{req.date} • {req.days} days</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                req.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
              }`}>
                {req.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
