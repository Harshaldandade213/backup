import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ClassWiseReport: React.FC = () => {
  const { classes, attendance, students } = useApp();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const getClassAttendance = (classId: string) => {
    const classStudentIds = students.filter(s => s.classId === classId && s.status === 'Active').map(s => s.id);
    const dayAttendance = attendance.filter(a => 
      a.date === date && 
      a.studentId && 
      classStudentIds.includes(a.studentId)
    );

    const present = dayAttendance.filter(a => a.status === 'Present').length;
    const onLeave = dayAttendance.filter(a => a.status === 'On-leave').length;
    const absent = dayAttendance.filter(a => a.status === 'Absent').length;
    const total = dayAttendance.length;

    return { present, onLeave, absent, total };
  };

  return (
    <div className="p-6">
      <h1 className="text-gray-900 mb-6">Class wise Attendance Report</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {classes.map((cls) => {
            const { present, onLeave, absent, total } = getClassAttendance(cls.id);
            
            if (total === 0) {
              return (
                <div key={cls.id} className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-gray-900 mb-4">
                    Attendance report {date.split('-').reverse().join(' ')} for<br />
                    {cls.name}
                  </h2>
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 text-yellow-400">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Attendance is not marked yet.</p>
                    </div>
                  </div>
                </div>
              );
            }

            const presentPercent = Math.round((present / total) * 100);
            const onLeavePercent = Math.round((onLeave / total) * 100);
            const absentPercent = Math.round((absent / total) * 100);
            
            // Calculate donut chart
            const radius = 70;
            const circumference = 2 * Math.PI * radius;
            const presentOffset = 0;
            const onLeaveOffset = (present / total) * circumference;
            const absentOffset = ((present + onLeave) / total) * circumference;

            return (
              <div key={cls.id} className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-gray-900 mb-4">
                  Attendance report {date.split('-').reverse().join(' ')} for<br />
                  {cls.name}
                </h2>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="35"
                      />
                      
                      {/* Present segment */}
                      <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="35"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (present / total) * circumference}
                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                      />
                      
                      {/* On-leave segment */}
                      <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="35"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - onLeaveOffset - (onLeave / total) * circumference}
                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                      />
                      
                      {/* Absent segment */}
                      <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="35"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - absentOffset - (absent / total) * circumference}
                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                      />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600">Present</span>
                    </div>
                    <p className="text-blue-500">{presentPercent}%</p>
                    <p className="text-gray-900">{present}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-gray-600">On-leave</span>
                    </div>
                    <p className="text-yellow-500">{onLeavePercent}%</p>
                    <p className="text-gray-900">{onLeave}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-600">Absent</span>
                    </div>
                    <p className="text-red-500">{absentPercent}%</p>
                    <p className="text-gray-900">{absent}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
