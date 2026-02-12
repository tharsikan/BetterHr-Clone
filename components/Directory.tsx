
import React, { useState } from 'react';
import { Search, Phone, Mail, MessageSquare, ChevronRight, Filter } from 'lucide-react';
import { Employee } from '../types';

const MOCK_DIRECTORY: Employee[] = [
  { id: '1', name: 'Alex Johnson', role: 'Senior Designer', department: 'Product', email: 'alex.j@betterhr.pro', avatar: 'https://picsum.photos/seed/alex/100', joinDate: '2022', status: 'Office', phone: '+95 912345678' },
  { id: '2', name: 'Sarah Chen', role: 'Lead Developer', department: 'Engineering', email: 'sarah.c@betterhr.pro', avatar: 'https://picsum.photos/seed/sarah/100', joinDate: '2021', status: 'Remote', phone: '+95 912345679' },
  { id: '3', name: 'Michael Ross', role: 'HR Manager', department: 'People', email: 'm.ross@betterhr.pro', avatar: 'https://picsum.photos/seed/michael/100', joinDate: '2020', status: 'Office', phone: '+95 912345680' },
  { id: '4', name: 'Jessica Pearson', role: 'CEO', department: 'Management', email: 'j.pearson@betterhr.pro', avatar: 'https://picsum.photos/seed/jessica/100', joinDate: '2019', status: 'Office', phone: '+95 912345681' },
  { id: '5', name: 'Louis Litt', role: 'Legal Counsel', department: 'Legal', email: 'l.litt@betterhr.pro', avatar: 'https://picsum.photos/seed/louis/100', joinDate: '2022', status: 'On Leave', phone: '+95 912345682' },
];

export const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_DIRECTORY.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 space-y-6">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Colleagues</h2>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or department..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="space-y-4">
        {filtered.map((employee) => (
          <div key={employee.id} className="bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm flex flex-col gap-4 active:scale-[0.98] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={employee.avatar} alt={employee.name} className="w-14 h-14 rounded-2xl object-cover shadow-md" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    employee.status === 'Office' ? 'bg-green-500' : 
                    employee.status === 'Remote' ? 'bg-blue-500' : 'bg-slate-300'
                  }`} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 leading-tight">{employee.name}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{employee.role} • {employee.department}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-200" />
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 py-3 rounded-xl flex items-center justify-center transition-all">
                <Phone className="w-4 h-4" />
              </button>
              <button className="flex-1 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 py-3 rounded-xl flex items-center justify-center transition-all">
                <Mail className="w-4 h-4" />
              </button>
              <button className="flex-1 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 py-3 rounded-xl flex items-center justify-center transition-all">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
