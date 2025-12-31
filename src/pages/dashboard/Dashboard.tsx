import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Briefcase, BookOpen, FileText, UserCheck, UserX, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, GraduationCap, UsersRound, School, ClipboardCheck, Calendar, Clock, TrendingDown } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const Dashboard: React.FC = () => {
  const { getDashboardStats, students, employees, attendance, classes, fees } = useApp();
  const stats = getDashboardStats();

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      change: '+12%',
      trend: 'up',
      icon: GraduationCap,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      change: '+3%',
      trend: 'up',
      icon: UsersRound,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Total Classes',
      value: stats.totalClasses,
      change: '0%',
      trend: 'neutral',
      icon: School,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      change: '+5%',
      trend: 'up',
      icon: ClipboardCheck,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
    },
  ];

  // Get recent students
  const recentStudents = students.slice(0, 5);

  // Get today's attendance summary
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today && a.studentId);

  // Prepare chart data
  const attendanceData = [
    { name: 'Present', value: todayAttendance.filter(a => a.status === 'Present').length, color: '#10b981' },
    { name: 'Absent', value: todayAttendance.filter(a => a.status === 'Absent').length, color: '#ef4444' },
    { name: 'On Leave', value: todayAttendance.filter(a => a.status === 'On-leave').length, color: '#f59e0b' },
  ];

  const classDistribution = classes.map(cls => ({
    name: cls.name,
    students: students.filter(s => s.classId === cls.id).length,
  }));

  // Calculate real monthly trends from actual data
  const calculateMonthlyTrends = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const last6Months = [];

    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();
      const monthStart = new Date(year, date.getMonth(), 1).toISOString().split('T')[0];
      const monthEnd = new Date(year, date.getMonth() + 1, 0).toISOString().split('T')[0];

      // Count students admitted up to this month
      const studentCount = students.filter(s => s.admissionDate <= monthEnd).length;

      // Calculate revenue for this specific month (paid fees)
      const monthRevenue = fees
        .filter(f => 
          f.paidDate && 
          f.paidDate >= monthStart && 
          f.paidDate <= monthEnd &&
          f.status === 'Paid'
        )
        .reduce((sum, f) => sum + f.amount, 0);

      last6Months.push({
        month: monthName,
        students: studentCount,
        revenue: monthRevenue,
      });
    }

    return last6Months;
  };

  const monthlyData = calculateMonthlyTrends();

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 bg-background min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-foreground text-xl sm:text-2xl lg:text-3xl">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Last 30 days</span>
            <span className="xs:hidden">30d</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col gap-2 sm:gap-3">
                  {/* Icon and Badge */}
                  <div className="flex items-start justify-between">
                    <div className={`${stat.bgColor} p-2 sm:p-2.5 md:p-3 rounded-lg`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${stat.color}`} />
                    </div>
                    {stat.trend === 'up' && (
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                        <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                        <span className="hidden xs:inline">{stat.change}</span>
                        <span className="xs:hidden">{stat.change.replace('+', '')}</span>
                      </Badge>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-1">
                    <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground line-clamp-1">
                      {stat.title}
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Monthly Trends</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Student enrollment and revenue over time</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="w-full -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} iconSize={10} />
                  <Line 
                    type="monotone" 
                    dataKey="students" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    dot={{ fill: 'hsl(var(--primary))', r: 3 }} 
                    name="Students"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ fill: '#10b981', r: 3 }} 
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Distribution */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Today&apos;s Attendance</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Student attendance distribution</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            {todayAttendance.length === 0 ? (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground text-xs sm:text-sm">
                <p>No attendance data available</p>
              </div>
            ) : (
              <div className="w-full -mx-2 sm:mx-0">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      style={{ fontSize: '11px' }}
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        fontSize: '12px',
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Class Distribution and Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Class Distribution */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Class Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Students per class</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="w-full -mx-2 sm:mx-0">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={classDistribution} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="students" 
                    fill="hsl(var(--primary))" 
                    radius={[6, 6, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Students */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Recent Students</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Latest student enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            {recentStudents.length === 0 ? (
              <p className="text-muted-foreground text-center py-8 text-xs sm:text-sm">No students enrolled yet</p>
            ) : (
              <div className="space-y-2">
                {recentStudents.map((student) => (
                  <div 
                    key={student.id} 
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0 text-xs sm:text-sm">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                        {student.admissionNumber}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-[10px] sm:text-xs flex-shrink-0">
                      {student.classId}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-amber-50 p-2 sm:p-2.5 md:p-3 rounded-lg flex-shrink-0">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-0.5 line-clamp-1">
                  Pending Fees
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                  {stats.pendingFees}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-emerald-50 p-2 sm:p-2.5 md:p-3 rounded-lg flex-shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-0.5 line-clamp-1">
                  Total Revenue
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">
                  ₹{(stats.totalRevenue / 1000).toFixed(0)}k
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-rose-50 p-2 sm:p-2.5 md:p-3 rounded-lg flex-shrink-0">
                <UserX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-0.5 line-clamp-1">
                  Absent Today
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                  {stats.absentToday}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-violet-50 p-2 sm:p-2.5 md:p-3 rounded-lg flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground mb-0.5 line-clamp-1">
                  Total Subjects
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                  {stats.totalSubjects}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};