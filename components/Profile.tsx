
import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Building, 
  Calendar,
  Settings,
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Employee } from '../types';

export const Profile: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col items-center pt-4 pb-2">
        <div className="relative">
          <img 
            src={employee.avatar} 
            alt={employee.name} 
            className="w-28 h-28 rounded-[2.5rem] object-cover border-4 border-white shadow-xl"
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center border-2 border-white shadow-lg">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        <h2 className="mt-4 text-2xl font-black text-slate-800">{employee.name}</h2>
        <p className="text-sm font-bold text-blue-600">{employee.role}</p>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">{employee.department}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Employee ID</p>
          <p className="text-sm font-bold text-slate-800">{employee.id}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Joined Date</p>
          <p className="text-sm font-bold text-slate-800">{employee.joinDate}</p>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="font-bold text-slate-800 px-1">Personal Details</h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
          {[
            { icon: Mail, label: 'Email', value: employee.email },
            { icon: Phone, label: 'Phone', value: '+1 (555) 0123 4567' },
            { icon: MapPin, label: 'Location', value: 'Singapore, Central' },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 flex items-center justify-between ${idx !== 2 ? 'border-b border-slate-50' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <item.icon className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-bold text-slate-800 px-1">Account & Security</h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
          {[
            { icon: ShieldCheck, label: 'Authentication', value: '2FA Enabled', color: 'text-green-500' },
            { icon: CreditCard, label: 'Bank Account', value: 'DBS Bank •••• 1234', color: 'text-slate-500' },
          ].map((item, idx) => (
            <button key={idx} className={`w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors ${idx === 0 ? 'border-b border-slate-50' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <item.icon className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</p>
                  <p className={`text-sm font-medium ${item.color}`}>{item.value}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
