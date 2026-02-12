
import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Info,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  ChevronRight
} from 'lucide-react';

interface AttendanceProps {
  onViewHistory: () => void;
}

export const Attendance: React.FC<AttendanceProps> = ({ onViewHistory }) => {
  return (
    <div className="p-4 space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Attendance</h2>
        <p className="text-slate-500 text-sm">Today, {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </header>

      {/* Today's Clock Status (Clock Style Log) */}
      <section className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200 border border-slate-100 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-bold text-slate-600">Currently Clocked In</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">HQ Office</span>
        </div>

        <div className="flex justify-around items-center py-4 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100"></div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
              <ArrowUpRight className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Clock In</p>
              <p className="text-xl font-black text-slate-800 tracking-tight">09:05 AM</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200">
              <ArrowDownRight className="w-6 h-6 text-slate-400" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Clock Out</p>
              <p className="text-xl font-black text-slate-800 tracking-tight">--:--</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <MapPin className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-xs font-bold text-slate-700">Yangon HQ Office</p>
          </div>
          <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
            Switch Location
          </button>
        </div>
      </section>

      {/* Monthly Summary Cards */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-100">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Present Days</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black">18</span>
            <span className="text-xs font-bold opacity-60">/ 22 days</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-orange-500">
            <AlertCircle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Late Arrivals</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-800">3</span>
            <span className="text-xs font-bold text-slate-400">times</span>
          </div>
        </div>
      </section>

      {/* View History Button */}
      <button 
        onClick={onViewHistory}
        className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-bold flex items-center justify-between px-8 shadow-xl active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
            <ClipboardList className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-black">Attendance History</p>
            <p className="text-[10px] text-slate-400 font-medium">Detailed logs and filters</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-500" />
      </button>

      {/* Info Notice */}
      <section className="bg-slate-100/50 rounded-2xl p-4 flex gap-3 items-start border border-slate-200/50">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
          Daily attendance is finalized at 11:59 PM. Please ensure your clock-out records are accurate before the day ends.
        </p>
      </section>
    </div>
  );
};
