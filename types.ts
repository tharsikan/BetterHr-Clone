
export enum View {
  DASHBOARD = 'dashboard',
  EMPLOYEE_ATTENDANCE = 'employee_attendance',
  ATTENDANCE_HISTORY = 'attendance_history',
  LEAVE = 'leave',
  PAYROLL = 'payroll',
  AI_ASSISTANT = 'ai_assistant',
  PROFILE = 'profile'
}

export type UserRole = 'ADMIN' | 'HR' | 'EMPLOYEE';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'DEACTIVATED';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatar: string;
  joinDate: string;
  projectId?: string;
  projectName?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  day: string;
  in: string;
  out: string;
  status: 'Present' | 'Late' | 'Absent' | 'On Leave';
  location: string;
  hours: string;
  month: string;
  year: number;
}

export interface AdminDashboardData {
  totalHeadcount: number;
  pendingRequests: number;
  activeProjects: number;
  hrTeam: Array<{
    id: string;
    name: string;
    scope: 'Global' | string; // Project name or 'Global'
  }>;
}

export interface HRDashboardData {
  scope: {
    isGlobal: boolean;
    projectName?: string;
  };
  attendanceToday: {
    present: number;
    late: number;
    absent: number;
    onLeave: number;
  };
}

export interface EmployeeDashboardData {
  clockInTime?: string;
  clockOutTime?: string;
  isClockedIn: boolean;
  projectName: string;
}

export interface LeaveBalance {
  type: string;
  allocated: number;
  used: number;
  remaining: number;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
