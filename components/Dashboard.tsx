
import React from 'react';
import { 
  Zap, 
  Users, 
  Megaphone,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Employee } from '../types';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

export const Dashboard: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="p-5 space-y-8 pb-32">
      {/* Header Section */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Hello, {employee.name.split(' ')[0]}</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Product Team • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="relative">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      </header>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-slate-900 border-none shadow-blue-900/10">
          <CardContent className="p-5">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Worked Today</p>
            <div className="flex items-baseline gap-1 text-white">
              <span className="text-2xl font-black">6h 45m</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[75%]" />
              </div>
              <span className="text-[10px] font-bold text-slate-500">75%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Leave Balance</p>
            <div className="flex items-baseline gap-1 text-slate-900">
              <span className="text-2xl font-black">12</span>
              <span className="text-xs font-bold text-slate-400">days</span>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full text-[10px] py-1 h-auto rounded-lg">Apply Now</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Grid */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Workspace</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Zap, label: 'Tools', color: 'bg-amber-50 text-amber-600 border-amber-100' },
            { icon: Users, label: 'Team', color: 'bg-sky-50 text-sky-600 border-sky-100' },
            { icon: Megaphone, label: 'News', color: 'bg-violet-50 text-violet-600 border-violet-100' },
            { icon: Briefcase, label: 'Assets', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
          ].map((item, idx) => (
            <button key={idx} className="flex flex-col items-center gap-2 group">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center border transition-all group-active:scale-90 shadow-sm`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-600">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Banner */}
      <Card className="bg-blue-600 border-none relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all"></div>
        <CardContent className="p-6 text-white relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-1">Upcoming Policy Update</h4>
              <p className="text-blue-100 text-xs font-medium max-w-[200px]">Review the updated remote work guidelines for Q4.</p>
            </div>
            <Button variant="secondary" size="icon" className="rounded-full bg-white text-blue-600 shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Feed */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Updates</h3>
          <Button variant="ghost" size="sm" className="text-blue-600 font-bold p-0 hover:bg-transparent">View All</Button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Salary Credited', time: '2 hours ago', type: 'PAYROLL', icon: Briefcase },
            { title: 'Leave Approved', time: 'Yesterday', type: 'LEAVE', icon: Calendar },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{item.title}</p>
                <p className="text-[10px] text-slate-500">{item.time}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
