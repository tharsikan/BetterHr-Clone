
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Info,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  ChevronRight,
  Camera,
  Navigation
} from 'lucide-react';
import { Button } from './ui/Button.tsx';

interface AttendanceProps {
  onViewHistory: () => void;
}

export const Attendance: React.FC<AttendanceProps> = ({ onViewHistory }) => {
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [location, setLocation] = useState<string>("Yangon HQ Office");

  const handleClockToggle = () => {
    setIsClockedIn(!isClockedIn);
  };

  return (
    <div className="p-5 space-y-6">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Daily Attendance</h2>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <p className="text-slate-500 text-sm font-bold">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </header>

      <section className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${isClockedIn ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-slate-300'}`}></div>
            <span className="text-xs font-black text-slate-700 uppercase tracking-widest">
              {isClockedIn ? 'Currently Working' : 'Off Duty'}
            </span>
          </div>
          <div className="px-3 py-1 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
            <Navigation className="w-3 h-3 text-blue-600" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{location}</span>
          </div>
        </div>

        <div className="flex justify-around items-center py-6 relative z-10">
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-100"></div>
          <div className={`flex flex-col items-center gap-3 transition-all ${!isClockedIn ? 'opacity-30' : ''}`}>
            <div className="w-16 h-16 bg-green-50 rounded-3xl flex items-center justify-center border-2 border-green-100 shadow-sm">
              <ArrowUpRight className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clock In</p>
              <p className="text-2xl font-black text-slate-900 tabular-nums tracking-tighter">09:05 AM</p>
            </div>
          </div>
          <div className={`flex flex-col items-center gap-3 transition-all ${isClockedIn ? 'opacity-30' : ''}`}>
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center border-2 border-slate-100 shadow-sm">
              <ArrowDownRight className="w-8 h-8 text-slate-400" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clock Out</p>
              <p className="text-2xl font-black text-slate-900 tabular-nums tracking-tighter">--:--</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <Button 
            onClick={handleClockToggle}
            className={`py-5 rounded-[2rem] text-sm font-black shadow-xl ${isClockedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            <Camera className="w-5 h-5 mr-3" />
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </Button>
          <Button variant="outline" className="py-5 rounded-[2rem] text-sm font-black border-slate-200">
            <MapPin className="w-5 h-5 mr-3 text-slate-400" />
            Visit
          </Button>
        </div>
      </section>

      <button 
        onClick={onViewHistory}
        className="w-full bg-blue-50/50 border border-blue-100/50 p-6 rounded-[2.5rem] flex items-center justify-between active:scale-95 transition-all"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-blue-50">
            <ClipboardList className="w-7 h-7 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-lg font-black text-slate-900 leading-tight">Attendance Logs</p>
            <p className="text-xs text-slate-500 font-bold">Review your past performance</p>
          </div>
        </div>
        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
          <ChevronRight className="w-6 h-6 text-blue-600" />
        </div>
      </button>
    </div>
  );
};
