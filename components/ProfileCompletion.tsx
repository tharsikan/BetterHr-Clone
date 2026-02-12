
import React, { useState } from 'react';
import { User, Briefcase, Building, ArrowRight, Camera } from 'lucide-react';
import { Button } from './ui/Button';
import { Employee } from '../types';
import { db } from '../db';
import { employeeProfiles, companies, authUsers } from '../db/schema';
import { eq } from 'drizzle-orm';

interface ProfileCompletionProps {
  onComplete: (data: Partial<Employee>) => void;
  email: string;
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ onComplete, email }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [dept, setDept] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Actually use Neon Auth: Find the record created by the Google OAuth flow
      const authUserResult = await db.select().from(authUsers).where(eq(authUsers.email, email)).limit(1);
      const authUser = authUserResult[0];

      if (!authUser) {
        throw new Error(`Authentication record not found for ${email}. Please ensure Neon Auth is configured.`);
      }

      // 2. Multi-tenant setup: Ensure default company exists
      const companyCode = 'BHR-PRO-001';
      let company = await db.query.companies.findFirst({
        where: (companies, { eq }) => eq(companies.companyCode, companyCode),
      });

      if (!company) {
        const [newCompany] = await db.insert(companies).values({
          name: 'BetterHR Default Corp',
          companyCode: companyCode,
        }).returning();
        company = newCompany;
      }

      // 3. Link Profile: Create the employee profile using the REAL Neon Auth User ID
      const [newProfile] = await db.insert(employeeProfiles).values({
        userId: authUser.id, // Linking to the Neon Auth ID
        companyId: company.id,
        fullName: name,
        role: role,
        department: dept,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || 'default'}`,
        status: 'ACTIVE',
      }).returning();

      onComplete({
        id: newProfile.id,
        name: newProfile.fullName,
        role: newProfile.role,
        department: newProfile.department || '',
        email: email,
        avatar: newProfile.avatarUrl || '',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    } catch (err: any) {
      console.error("Auth Link Error:", err);
      setError(err.message || "Failed to link your Neon Auth account. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Welcome to the Team!</h2>
        <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">Let's set up your profile</p>
      </div>

      <div className="relative mb-10 group">
        <div className="w-32 h-32 rounded-[3rem] bg-slate-100 flex items-center justify-center border-4 border-white shadow-2xl relative overflow-hidden transition-transform group-active:scale-95">
           <User className="w-12 h-12 text-slate-300" />
           <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Camera className="w-8 h-8 text-white" />
           </div>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2.5 rounded-2xl shadow-lg border-4 border-white">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[11px] font-bold text-center leading-relaxed">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="relative group">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              required
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-3xl py-5 pl-14 pr-6 text-base font-bold text-slate-900 focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>
          <div className="relative group">
            <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              required
              type="text" 
              placeholder="Job Title (e.g. Senior Designer)" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-3xl py-5 pl-14 pr-6 text-base font-bold text-slate-900 focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>
          <div className="relative group">
            <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <select 
              required
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-3xl py-5 pl-14 pr-6 text-base font-bold text-slate-900 focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-slate-400">Select Department</option>
              <option value="Engineering" className="text-slate-900">Engineering</option>
              <option value="Product" className="text-slate-900">Product</option>
              <option value="Marketing" className="text-slate-900">Marketing</option>
              <option value="Human Resources" className="text-slate-900">Human Resources</option>
              <option value="Operations" className="text-slate-900">Operations</option>
            </select>
          </div>
        </div>

        <Button isLoading={isLoading} type="submit" className="w-full py-5 text-base font-black rounded-[2rem] bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-200">
          Complete Setup
          <ArrowRight className="w-6 h-6 ml-3" />
        </Button>
      </form>
    </div>
  );
};
