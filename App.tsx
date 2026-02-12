
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  CalendarDays, 
  Wallet, 
  Bot, 
  User, 
  Bell, 
  Menu,
  ChevronRight,
  LogOut,
  Settings,
  ShieldCheck,
  HelpCircle,
  Users,
  Search,
  Megaphone
} from 'lucide-react';
import { View, Employee } from './types.ts';
import { Dashboard } from './components/Dashboard.tsx';
import { Attendance } from './components/Attendance.tsx';
import { AttendanceHistory } from './components/AttendanceHistory.tsx';
import { Leave } from './components/Leave.tsx';
import { Payroll } from './components/Payroll.tsx';
import { AIAssistant } from './components/AIAssistant.tsx';
import { Profile } from './components/Profile.tsx';
import { Login } from './components/Login.tsx';
import { Directory } from './components/Directory.tsx';
import { Announcements } from './components/Announcements.tsx';
import { ProfileCompletion } from './components/ProfileCompletion.tsx';

const INITIAL_EMPLOYEE: Employee = {
  id: "EMP-001",
  name: "Alex Johnson",
  role: "Senior Product Designer",
  department: "Product & Engineering",
  email: "alex.j@betterhr.pro",
  avatar: "https://picsum.photos/seed/alex/200",
  joinDate: "Jan 12, 2022"
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [employee, setEmployee] = useState<Employee>(INITIAL_EMPLOYEE);

  useEffect(() => {
    // 1. Check for token in URL (OAuth Callback)
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    
    if (tokenFromUrl) {
      localStorage.setItem('betterhr_token', tokenFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
      handleLoginSuccess(tokenFromUrl);
    } else {
      const savedToken = localStorage.getItem('betterhr_token');
      if (savedToken) {
        handleLoginSuccess(savedToken);
      }
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    const isNew = token.includes('eyJlbWFpbCI6Im5ldy51c2VyQGJldHRlcmhyLnBybyIsImlzTmV3Ijp0cnVlfQ');
    
    if (isNew) {
      setEmployee(prev => ({ ...prev, email: 'new.user@betterhr.pro', isNewUser: true }));
      setIsAuthenticated(true);
      setCurrentView(View.COMPLETING_PROFILE);
    } else {
      setIsAuthenticated(true);
      setCurrentView(View.DASHBOARD);
    }
  };

  const handleProfileComplete = (data: Partial<Employee>) => {
    setEmployee(prev => ({
      ...prev,
      ...data,
      isNewUser: false,
      id: `EMP-${Math.floor(Math.random() * 900) + 100}`
    }));
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('betterhr_token');
    setIsAuthenticated(false);
    setIsSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentView === View.COMPLETING_PROFILE) {
    return (
      <div className="min-h-screen bg-slate-50 overflow-y-auto safe-top pb-10">
        <ProfileCompletion email={employee.email} onComplete={handleProfileComplete} />
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard employee={employee} />;
      case View.EMPLOYEE_ATTENDANCE: return <Attendance onViewHistory={() => setCurrentView(View.ATTENDANCE_HISTORY)} />;
      case View.ATTENDANCE_HISTORY: return <AttendanceHistory onBack={() => setCurrentView(View.EMPLOYEE_ATTENDANCE)} />;
      case View.LEAVE: return <Leave />;
      case View.PAYROLL: return <Payroll />;
      case View.AI_ASSISTANT: return <AIAssistant />;
      case View.PROFILE: return <Profile employee={employee} />;
      case View.DIRECTORY: return <Directory />;
      case View.ANNOUNCEMENTS: return <Announcements />;
      default: return <Dashboard employee={employee} />;
    }
  };

  const navItems = [
    { id: View.DASHBOARD, label: 'Home', icon: LayoutDashboard },
    { id: View.EMPLOYEE_ATTENDANCE, label: 'Attendance', icon: ClipboardList },
    { id: View.LEAVE, label: 'Leave', icon: CalendarDays },
    { id: View.PAYROLL, label: 'Pay', icon: Wallet },
    { id: View.AI_ASSISTANT, label: 'Ask HR', icon: Bot },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <header className="bg-white border-b border-slate-100 px-4 flex items-center justify-between sticky top-0 z-40 safe-pt pb-4 transition-all shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-50 rounded-2xl transition-colors active:scale-90"
          >
            <Menu className="w-6 h-6 text-slate-800" />
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-0.5">BetterHR Pro</span>
            <h1 className="font-bold text-lg text-slate-900 leading-tight">
              {navItems.find(i => i.id === currentView)?.label || 
               (currentView === View.DIRECTORY ? 'Colleagues' : 
                currentView === View.ANNOUNCEMENTS ? 'News' : 
                currentView === View.PROFILE ? 'Profile' : 'Portal')}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentView(View.ANNOUNCEMENTS)}
            className="p-2 hover:bg-slate-50 rounded-2xl transition-colors active:scale-90 relative"
          >
            <Bell className="w-6 h-6 text-slate-800" />
            {notificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-black border-2 border-white">
                {notificationsCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setCurrentView(View.PROFILE)}
            className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm active:scale-90 transition-all"
          >
            <img src={employee.avatar} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="max-w-md mx-auto h-full">
          {renderView()}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 z-40 safe-pb shadow-[0_-8px_24px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around py-2.5 max-w-md mx-auto px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === View.EMPLOYEE_ATTENDANCE && currentView === View.ATTENDANCE_HISTORY);
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all ${
                  isActive ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : ''}`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                </div>
                <span className={`text-[10px] font-bold ${isActive ? 'text-blue-900' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/60 z-50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-[60] shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-left duration-300 safe-top">
            <div className="p-8 border-b border-slate-50">
              <div className="flex items-center gap-4 mb-6">
                <img src={employee.avatar} alt="Profile" className="w-16 h-16 rounded-3xl object-cover shadow-xl" />
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">{employee.name}</h3>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{employee.role}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              {[
                { icon: Users, label: 'Colleagues', id: View.DIRECTORY },
                { icon: Megaphone, label: 'Announcements', id: View.ANNOUNCEMENTS },
                { icon: Search, label: 'Search' },
                { icon: ShieldCheck, label: 'Company Policy' },
                { icon: Settings, label: 'Settings' },
                { icon: HelpCircle, label: 'Help Center' },
              ].map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => {
                    if (item.id) setCurrentView(item.id as View);
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-4 text-slate-600 hover:bg-slate-50 rounded-2xl transition-all group active:bg-blue-50 active:text-blue-600"
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-6 h-6 group-active:text-blue-600" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-active:text-blue-600" />
                </button>
              ))}
            </div>

            <div className="p-6 border-t border-slate-50 safe-pb">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 py-4 bg-red-50 text-red-600 rounded-2xl transition-all active:scale-95 font-black text-sm"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
              <p className="mt-4 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">BetterHR Pro Android</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
