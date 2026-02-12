
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Calendar
} from 'lucide-react';
import { AttendanceRecord } from '../types';

const MOCK_LOGS: AttendanceRecord[] = [
  { id: '1', date: 'Aug 21', day: 'Wed', in: '09:05 AM', out: '06:12 PM', status: 'Present', hours: '9h 7m', location: 'HQ Office', month: 'August', year: 2024 },
  { id: '2', date: 'Aug 20', day: 'Tue', in: '08:58 AM', out: '06:05 PM', status: 'Present', hours: '9h 7m', location: 'Remote', month: 'August', year: 2024 },
  { id: '3', date: 'Aug 19', day: 'Mon', in: '09:15 AM', out: '06:30 PM', status: 'Late', hours: '9h 15m', location: 'HQ Office', month: 'August', year: 2024 },
  { id: '4', date: 'Aug 18', day: 'Sun', in: '-', out: '-', status: 'Absent', hours: '0h', location: '-', month: 'August', year: 2024 },
  { id: '5', date: 'Aug 17', day: 'Sat', in: '-', out: '-', status: 'Absent', hours: '0h', location: '-', month: 'August', year: 2024 },
  { id: '6', date: 'Aug 16', day: 'Fri', in: '08:55 AM', out: '05:45 PM', status: 'Present', hours: '8h 50m', location: 'HQ Office', month: 'August', year: 2024 },
  { id: '7', date: 'Aug 15', day: 'Thu', in: '-', out: '-', status: 'On Leave', hours: '0h', location: '-', month: 'August', year: 2024 },
  { id: '8', date: 'Jul 30', day: 'Tue', in: '09:00 AM', out: '06:00 PM', status: 'Present', hours: '9h 0m', location: 'HQ Office', month: 'July', year: 2024 },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const YEARS = [2023, 2024, 2025];

interface AttendanceHistoryProps {
  onBack: () => void;
}

export const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ onBack }) => {
  const currentMonthIdx = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[currentMonthIdx]);
  const [selectedYear, setSelectedYear] = useState(2024);

  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter(log => log.month === selectedMonth && log.year === selectedYear);
  }, [selectedMonth, selectedYear]);

  const handlePrevMonth = () => {
    const idx = MONTHS.indexOf(selectedMonth);
    if (idx > 0) setSelectedMonth(MONTHS[idx - 1]);
    else if (selectedYear > YEARS[0]) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(MONTHS[11]);
    }
  };

  const handleNextMonth = () => {
    const idx = MONTHS.indexOf(selectedMonth);
    if (idx < 11) setSelectedMonth(MONTHS[idx + 1]);
    else if (selectedYear < YEARS[YEARS.length - 1]) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(MONTHS[0]);
    }
  };

  return (
    <div className="p-4 space-y-6 animate-in slide-in-from-right duration-300">
      {/* Header with Back Button */}
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Attendance History</h2>
      </header>

      {/* Selectors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Year & Month</p>
          <div className="relative group">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 shadow-sm active:scale-95 transition-all">
              {selectedYear}
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block z-50 bg-white border border-slate-100 rounded-xl shadow-xl w-32 overflow-hidden">
              {YEARS.map(y => (
                <button 
                  key={y} 
                  onClick={() => setSelectedYear(y)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors ${selectedYear === y ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-slate-600'}`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <button 
            onClick={handlePrevMonth}
            className="p-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-blue-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-black text-slate-800 text-lg tracking-tight leading-none">{selectedMonth}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">{selectedYear}</span>
          </div>
          <button 
            onClick={handleNextMonth}
            className="p-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-blue-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* History List */}
      <section className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-400 tracking-tight">No records found for this period</p>
            <p className="text-[10px] text-slate-300 font-medium">Try selecting a different month or year</p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isLeave = log.status === 'On Leave';
            return (
              <div 
                key={log.id} 
                className={`bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4 transition-all ${isLeave ? 'opacity-50 grayscale bg-slate-50/50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center border ${isLeave ? 'bg-slate-100 border-slate-200' : 'bg-blue-50 border-blue-100'}`}>
                      <span className={`text-[9px] font-bold uppercase leading-none ${isLeave ? 'text-slate-400' : 'text-blue-400'}`}>{log.day}</span>
                      <span className={`text-xl font-black leading-tight ${isLeave ? 'text-slate-500' : 'text-slate-800'}`}>{log.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{log.date}</h4>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-300" />
                        <span className="text-[10px] font-medium text-slate-400">{isLeave ? 'Approved Leave' : log.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    log.status === 'Present' ? 'bg-green-100 text-green-700' :
                    log.status === 'Late' ? 'bg-orange-100 text-orange-700' :
                    log.status === 'On Leave' ? 'bg-slate-200 text-slate-700' :
                    'bg-red-50 text-red-500'
                  }`}>
                    {log.status}
                  </div>
                </div>

                {!isLeave && log.status !== 'Absent' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Clock In</p>
                        <p className="text-xs font-black text-slate-700">{log.in}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-1">Clock Out</p>
                        <p className="text-xs font-black text-slate-700">{log.out}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!isLeave && log.status !== 'Absent' && (
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-[11px] font-bold">Work Duration</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-xl border border-blue-100">
                      <Timer className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-black text-blue-700">{log.hours}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};
