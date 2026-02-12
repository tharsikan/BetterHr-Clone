
import React from 'react';
import { 
  Zap, 
  Users, 
  Megaphone,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Gift,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Employee } from '../types.ts';
import { Card, CardContent } from './ui/Card.tsx';
import { Button } from './ui/Button.tsx';

export const Dashboard: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="p-5 space-y-8 pb-32">
      <header className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight">
            Hi, {employee.name.split(' ')[0]} 👋
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">On Duty • HQ Office</p>
          </div>
        </div>
        <button className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center shadow-2xl border border-slate-50 active:scale-90 transition-all">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-600 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-blue-200 flex flex-col justify-between h-44 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
          <div className="flex flex-col gap-1 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Working Hours</p>
            <h3 className="text-4xl font-black tracking-tighter">06:45<span className="text-sm opacity-50 ml-1">hrs</span></h3>
          </div>
          <div className="relative z-10">
             <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-white w-[75%] transition-all duration-1000" />
             </div>
             <p className="text-[10px] font-black opacity-80 uppercase tracking-tighter">75% of target shift</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-slate-900/10 flex flex-col justify-between h-44">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Leave Balance</p>
            <h3 className="text-4xl font-black tracking-tighter text-blue-400">12<span className="text-sm text-slate-500 ml-1">days</span></h3>
          </div>
          <Button variant="outline" className="w-full rounded-2xl bg-white/5 border-slate-800 text-slate-300 py-2.5 text-xs font-black hover:bg-white/10">
            Apply Now
          </Button>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Actions</h3>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Zap, label: 'Systems', color: 'bg-amber-50 text-amber-600 border-amber-100' },
            { icon: Users, label: 'Directory', color: 'bg-sky-50 text-sky-600 border-sky-100' },
            { icon: Megaphone, label: 'Updates', color: 'bg-violet-50 text-violet-600 border-violet-100' },
            { icon: Briefcase, label: 'Inventory', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
          ].map((item, idx) => (
            <button key={idx} className="flex flex-col items-center gap-2 group transition-all">
              <div className={`w-16 h-16 ${item.color} rounded-[1.75rem] flex items-center justify-center border-2 transition-all active:scale-90 shadow-lg shadow-transparent active:shadow-slate-100`}>
                <item.icon className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 border-none relative overflow-hidden group rounded-[2.5rem] shadow-xl shadow-indigo-200">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-all group-hover:scale-110"></div>
        <CardContent className="p-7 text-white relative z-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">New Update</span>
            </div>
            <div>
              <h4 className="text-xl font-black mb-1 leading-tight tracking-tight">Q4 Annual Party 2024</h4>
              <p className="text-blue-100 text-xs font-bold opacity-80">Voting for the venue is now open until Friday!</p>
            </div>
            <Button variant="secondary" className="w-full bg-white text-indigo-600 rounded-2xl font-black text-sm py-4 shadow-xl shadow-indigo-900/20 active:scale-95 border-none">
              View All News
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
