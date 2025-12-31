import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const StudentAttendanceReport: React.FC = () => {
  const { attendance, students, classes } = useApp();
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(1); // First day of current month
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  // Filter attendance records
  const filteredAttendance = attendance.filter(a => 
    a.studentId && 
    a.date >= startDate && 
    a.date <= endDate
  );

  // Group by student
  const attendanceByStudent: Record<string, any[]> = {};
  filteredAttendance.forEach(record => {
    if (!attendanceByStudent[record.studentId!]) {
      attendanceByStudent[record.studentId!] = [];
    }
    attendanceByStudent[record.studentId!].push(record);
  });

  // Prepare table data
  const reportData = Object.entries(attendanceByStudent).map(([studentId, records]) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return null;
    
    const cls = classes.find(c => c.id === student.classId);
    
    // Get unique dates and create attendance map
    const dateMap: Record<string, string> = {};
    records.forEach(record => {
      dateMap[record.date] = record.status[0]; // P, A, or O (On-leave)
    });
    
    return {
      id: studentId,
      name: `${student.firstName} ${student.lastName}`,
      class: cls?.name || '-',
      records: records.sort((a, b) => a.date.localeCompare(b.date)),
    };
  }).filter(Boolean);

  // Get all unique dates in range
  const dates: string[] = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  while (currentDate <= end) {
    // Skip weekends
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      dates.push(currentDate.toISOString().split('T')[0]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${day}-${month}`;
  };

  const formatDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="p-6">
      <h1 className="text-gray-900 mb-6">Students Attendance Record</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-600">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary">Copy</Button>
              <Button size="sm" variant="secondary">CSV</Button>
              <Button size="sm" variant="secondary">Excel</Button>
              <Button size="sm" variant="secondary">PDF</Button>
              <Button size="sm" variant="secondary">Print</Button>
            </div>
            <div className="flex-1"></div>
            <input
              type="text"
              placeholder="Search:"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Day</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Class</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              ) : (
                filteredAttendance.slice(0, 20).map((record, index) => {
                  const student = students.find(s => s.id === record.studentId);
                  const cls = classes.find(c => c.id === student?.classId);
                  const date = new Date(record.date);
                  
                  return (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear().toString().slice(-2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {student?.rollNumber || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {student ? `${student.firstName} ${student.lastName}` : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {cls?.name || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          record.status === 'Present' 
                            ? 'bg-green-100 text-green-800' 
                            : record.status === 'Absent'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status[0]}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {filteredAttendance.length > 0 && (
          <div className="px-4 py-3 text-sm text-gray-600 bg-white border-t border-gray-200 flex items-center justify-between">
            <span>Showing 1 to {Math.min(20, filteredAttendance.length)} of {filteredAttendance.length} entries</span>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary">Previous</Button>
              <Button size="sm" variant="secondary">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
