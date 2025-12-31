import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  BookOpen,
  FileText,
  Users,
  Briefcase,
  Wallet,
  DollarSign,
  CreditCard,
  Calendar,
  ClipboardList,
  Award,
  ShoppingCart,
  MessageSquare,
  Mail,
  Send,
  Video,
  FileQuestion,
  GraduationCap,
  FlaskConical,
  ClipboardCheck,
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'general-settings', label: 'General Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  { id: 'classes', label: 'Classes', path: '/classes', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'subjects', label: 'Subjects', path: '/subjects', icon: <FileText className="w-5 h-5" /> },
  {
    id: 'students',
    label: 'Students',
    path: '/students',
    icon: <Users className="w-5 h-5" />,
    children: [
      { id: 'students-list', label: 'All Students', path: '/students/list', icon: null },
      { id: 'students-admission', label: 'Admission', path: '/students/admission', icon: null },
      { id: 'students-promote', label: 'Promote Students', path: '/students/promote', icon: null },
    ],
  },
  {
    id: 'employees',
    label: 'Employees',
    path: '/employees',
    icon: <Briefcase className="w-5 h-5" />,
    children: [
      { id: 'employees-list', label: 'All Employees', path: '/employees/list', icon: null },
      { id: 'employees-add', label: 'Add Employee', path: '/employees/add', icon: null },
      { id: 'employees-login', label: 'Staff Login', path: '/employees/staff-login', icon: null },
    ],
  },
  { id: 'accounts', label: 'Accounts', path: '/accounts', icon: <Wallet className="w-5 h-5" /> },
  { id: 'fees', label: 'Fees', path: '/fees', icon: <DollarSign className="w-5 h-5" /> },
  { id: 'salary', label: 'Salary', path: '/salary', icon: <CreditCard className="w-5 h-5" /> },
  {
    id: 'attendance',
    label: 'Attendance',
    path: '/attendance',
    icon: <Calendar className="w-5 h-5" />,
    children: [
      { id: 'attendance-students', label: 'Students Attendance', path: '/attendance/students', icon: null },
      { id: 'attendance-employees', label: 'Employees Attendance', path: '/attendance/employees', icon: null },
      { id: 'attendance-class-report', label: 'Class wise Report', path: '/attendance/class-report', icon: null },
      { id: 'attendance-student-report', label: 'Students Attendance Report', path: '/attendance/student-report', icon: null },
      { id: 'attendance-employee-report', label: 'Employees Attendance Report', path: '/attendance/employee-report', icon: null },
    ],
  },
  { id: 'whatsapp', label: 'WhatsApp', path: '/whatsapp', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'messaging', label: 'Messaging', path: '/messaging', icon: <Mail className="w-5 h-5" /> },
  { id: 'sms', label: 'SMS Services', path: '/sms', icon: <Send className="w-5 h-5" /> },
  { id: 'live-class', label: 'Live Class', path: '/live-class', icon: <Video className="w-5 h-5" /> },
  { id: 'question-paper', label: 'Question Paper', path: '/question-paper', icon: <FileQuestion className="w-5 h-5" /> },
  {
    id: 'exams',
    label: 'Exams',
    path: '/exams',
    icon: <GraduationCap className="w-5 h-5" />,
    children: [
      { id: 'exams-list', label: 'All Exams', path: '/exams/list', icon: null },
      { id: 'exams-results', label: 'Results', path: '/exams/results', icon: null },
    ],
  },
  { id: 'class-tests', label: 'Class Tests', path: '/class-tests', icon: <FlaskConical className="w-5 h-5" /> },
  { id: 'reports', label: 'Reports', path: '/reports', icon: <ClipboardCheck className="w-5 h-5" /> },
  {
    id: 'certificates',
    label: 'Certificates',
    path: '/certificates',
    icon: <Award className="w-5 h-5" />,
    children: [
      { id: 'certificates-generate', label: 'Generate Certificate', path: '/certificates/generate', icon: null },
      { id: 'certificates-templates', label: 'Certificate Templates', path: '/certificates/templates', icon: null },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['students', 'employees', 'attendance', 'exams', 'certificates']);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = isActiveRoute(item.path);

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleExpanded(item.id)}
            className={`w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-medium transition-all duration-200 ${
              level > 0 ? 'pl-12 sm:pl-14' : ''
            } ${
              isActive
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span className="flex-1 text-left truncate">{item.label}</span>
            <span className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          </button>
          {isExpanded && (
            <div className="bg-slate-900/50">
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.path}
        onClick={onClose}
        className={`w-full flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-medium transition-all duration-200 ${
          level > 0 ? 'pl-12 sm:pl-14' : ''
        } ${
          isActive
            ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span className="flex-1 text-left truncate">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar - Always visible on lg+ screens */}
      <div className="hidden lg:flex lg:w-72 bg-slate-950 border-r border-slate-900 h-screen overflow-y-auto flex-col">
        <div className="p-4 sm:p-6 border-b border-slate-900">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-teal-600/30">
              <span className="text-white font-bold text-lg sm:text-xl">KN</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-base sm:text-lg">KinderNet</h3>
              <p className="text-xs text-slate-400">Management Portal</p>
            </div>
          </Link>
        </div>
        <nav className="py-3 flex-1 overflow-y-auto">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
      </div>

      {/* Mobile Sidebar - Slide-in from left */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-950 border-r border-slate-900 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto flex flex-col">
          {/* Mobile Header with Close Button */}
          <div className="p-4 border-b border-slate-900 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3" onClick={onClose}>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-teal-600/30">
                <span className="text-white font-bold text-lg">KN</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">KinderNet</h3>
                <p className="text-xs text-slate-400">Management Portal</p>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-300" />
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <nav className="py-3 flex-1 overflow-y-auto">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>
        </div>
      </div>
    </>
  );
};