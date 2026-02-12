
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
  HelpCircle
} from 'lucide-react';
import { View, Employee } from './types';
import { Dashboard } from './components/Dashboard';
import { Attendance } from './components/Attendance';
import { AttendanceHistory } from './components/AttendanceHistory';
import { Leave } from './components/Leave';
import { Payroll } from './components/Payroll';
import { AIAssistant } from './components/AIAssistant';
import { Profile } from './components/Profile';
import { Login } from './components/Login';

const MOCK_EMPLOYEE: Employee = {
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

  // Check for existing session
  useEffect(() => {
    const token = localStorage.getItem('betterhr_token');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('betterhr_token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('betterhr_token');
    setIsAuthenticated(false);
    setIsSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard employee={MOCK_EMPLOYEE} />;
      case View.EMPLOYEE_ATTENDANCE: return <Attendance onViewHistory={() => setCurrentView(View.ATTENDANCE_HISTORY)} />;
      case View.ATTENDANCE_HISTORY: return <AttendanceHistory onBack={() => setCurrentView(View.EMPLOYEE_ATTENDANCE)} />;
      case View.LEAVE: return <Leave />;
      case View.PAYROLL: return <Payroll />;
      case View.AI_ASSISTANT: return <AIAssistant />;
      case View.PROFILE: return <Profile employee={MOCK_EMPLOYEE} />;
      default: return <Dashboard employee={MOCK_EMPLOYEE} />;
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
      {/* Header with Safe Area Top */}
      <header className="bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40 safe-pt pb-3 transition-all">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg text-slate-800 tracking-tight">BetterHR</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
            {notificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white">
                {notificationsCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setCurrentView(View.PROFILE)}
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-100"
          >
            <img src={MOCK_EMPLOYEE.avatar} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="max-w-md mx-auto h-full">
          {renderView()}
        </div>
      </main>

      {/* Bottom Navigation with Safe Area Bottom */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 z-40 safe-pb shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-around py-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === View.EMPLOYEE_ATTENDANCE && currentView === View.ATTENDANCE_HISTORY);
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                  isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-blue-50' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                </div>
                <span className={`text-[10px] font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sidebar / Drawer */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[280px] bg-white z-[60] shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-left duration-300 safe-top">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <img src={MOCK_EMPLOYEE.avatar} alt="Profile" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-slate-800">{MOCK_EMPLOYEE.name}</h3>
                  <p className="text-xs text-slate-500">{MOCK_EMPLOYEE.role}</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium text-slate-600">Active - HQ Office</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {[
                { icon: User, label: 'Personal Information' },
                { icon: ShieldCheck, label: 'Verification & Privacy' },
                { icon: Settings, label: 'App Settings' },
                { icon: HelpCircle, label: 'Support & Help' },
              ].map((item, idx) => (
                <button key={idx} className="w-full flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors text-sm font-medium">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 safe-pb">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-bold"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
