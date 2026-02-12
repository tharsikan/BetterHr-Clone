
export enum View {
  DASHBOARD = 'dashboard',
  EMPLOYEE_ATTENDANCE = 'employee_attendance',
  ATTENDANCE_HISTORY = 'attendance_history',
  LEAVE = 'leave',
  PAYROLL = 'payroll',
  AI_ASSISTANT = 'ai_assistant',
  PROFILE = 'profile',
  DIRECTORY = 'directory',
  ANNOUNCEMENTS = 'announcements',
  COMPLETING_PROFILE = 'completing_profile'
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
  status?: 'Office' | 'Remote' | 'On Leave';
  phone?: string;
  isNewUser?: boolean;
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
  coordinates?: { lat: number; lng: number };
  selfieUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Company' | 'Event' | 'Policy' | 'Alert';
  date: string;
  author: string;
  imageUrl?: string;
  readTime: string;
}
