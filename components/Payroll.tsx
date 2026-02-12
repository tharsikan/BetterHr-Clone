
import React from 'react';
import { 
  Eye, 
  Download, 
  ChevronRight, 
  PieChart as PieIcon, 
  ArrowUpRight,
  Shield
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

const PAYSLIP_DATA = [
  { month: 'Mar', amount: 4200 },
  { month: 'Apr', amount: 4200 },
  { month: 'May', amount: 4200 },
  { month: 'Jun', amount: 4500 },
  { month: 'Jul', amount: 4500 },
  { month: 'Aug', amount: 4500 },
];

export const Payroll: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Payroll & Benefits</h2>

      {/* Salary Overview Card */}
      <section className="bg-slate-900 rounded-[2rem] p-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidential</span>
        </div>

        <div className="mb-8">
          <p className="text-slate-400 text-xs font-medium mb-1">Current Net Salary (Aug 2024)</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black">$4,500.00</h3>
            <span className="text-green-400 text-xs font-bold flex items-center bg-green-400/10 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3" /> 7.1%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white text-slate-900 py-3 rounded-2xl text-xs font-bold transition-transform active:scale-95">
            <Eye className="w-4 h-4" /> View Detail
          </button>
          <button className="flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-2xl text-xs font-bold border border-slate-700 transition-transform active:scale-95">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </section>

      {/* Salary History Chart */}
      <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Salary Growth</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PAYSLIP_DATA}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {PAYSLIP_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === PAYSLIP_DATA.length - 1 ? '#2563eb' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Payslip Archive */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Payslip Archive</h3>
          <span className="text-xs font-bold text-blue-600">2024 <ChevronRight className="w-3 h-3 inline" /></span>
        </div>
        <div className="space-y-3">
          {['July', 'June', 'May'].map((month, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Payslip - {month} 2024</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Released on {month} 30, 2024</p>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const FileText: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
