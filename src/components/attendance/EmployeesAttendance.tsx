import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { toast } from 'sonner@2.0.3';
import { Attendance } from '../../types';

export const EmployeesAttendance: React.FC = () => {
  const { employees, addAttendance } = useApp();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<Record<string, 'Present' | 'Absent' | 'On-leave'>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  const activeEmployees = employees.filter(e => e.status === 'Active');

  const handleInitialize = () => {
    const initialData: Record<string, 'Present' | 'Absent' | 'On-leave'> = {};
    activeEmployees.forEach(employee => {
      initialData[employee.id] = 'Present'; // Default to present
    });
    setAttendanceData(initialData);
    setIsInitialized(true);
  };

  const handleStatusChange = (employeeId: string, status: 'Present' | 'Absent' | 'On-leave') => {
    setAttendanceData(prev => ({
      ...prev,
      [employeeId]: status,
    }));
  };

  const handleSubmitAttendance = () => {
    const attendanceRecords: Attendance[] = Object.entries(attendanceData).map(([employeeId, status]) => ({
      id: `att-emp-${employeeId}-${date}`,
      employeeId,
      date,
      status,
    }));

    addAttendance(attendanceRecords);
    toast.success('Employee attendance marked successfully!');
    setIsInitialized(false);
    setAttendanceData({});
  };

  if (!isInitialized) {
    return (
      <div className="p-6">
        <h1 className="text-gray-900 mb-6">Employees Attendance</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button onClick={handleInitialize} className="w-full">
              Mark Attendance
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-gray-900">Mark Employee Attendance</h1>
          <p className="text-sm text-gray-600">
            Date: {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <Button variant="secondary" onClick={() => setIsInitialized(false)}>
          Back
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Employee ID</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Photo</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Designation</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Department</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {activeEmployees.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-200">
                <td className="px-4 py-3 text-sm text-gray-700">{employee.employeeId}</td>
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white">
                    {employee.firstName[0]}{employee.lastName[0]}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {employee.firstName} {employee.lastName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{employee.designation}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{employee.department}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(employee.id, 'Present')}
                      className={`px-4 py-2 rounded text-sm transition-colors ${
                        attendanceData[employee.id] === 'Present'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleStatusChange(employee.id, 'On-leave')}
                      className={`px-4 py-2 rounded text-sm transition-colors ${
                        attendanceData[employee.id] === 'On-leave'
                          ? 'bg-gray-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      On-leave
                    </button>
                    <button
                      onClick={() => handleStatusChange(employee.id, 'Absent')}
                      className={`px-4 py-2 rounded text-sm transition-colors ${
                        attendanceData[employee.id] === 'Absent'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSubmitAttendance}>
          Submit Attendance
        </Button>
      </div>
    </div>
  );
};
