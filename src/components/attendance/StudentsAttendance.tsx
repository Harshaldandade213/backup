import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Select } from '../common/Input';
import { toast } from 'sonner@2.0.3';

export const StudentsAttendance: React.FC = () => {
  const { students, classes, addAttendance } = useApp();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceData, setAttendanceData] = useState<Record<string, 'Present' | 'Absent' | 'On-leave'>>({});
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  const classOptions = classes.map((cls) => ({
    value: cls.id,
    label: cls.name,
  }));

  const handleDateSubmit = () => {
    if (!selectedClass) {
      toast.error('Please select a class');
      return;
    }
    setShowMarkAttendance(true);
    
    // Initialize attendance data for all students
    const classStudents = students.filter(s => s.classId === selectedClass && s.status === 'Active');
    const initialData: Record<string, 'Present' | 'Absent' | 'On-leave'> = {};
    classStudents.forEach(student => {
      initialData[student.id] = 'Present'; // Default to present
    });
    setAttendanceData(initialData);
  };

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'On-leave') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmitAttendance = () => {
    const attendanceRecords = Object.entries(attendanceData).map(([studentId, status]) => ({
      id: `att-${studentId}-${date}`,
      studentId,
      date,
      status,
      classId: selectedClass,
    }));

    addAttendance(attendanceRecords);
    toast.success('Attendance marked successfully!');
    setShowMarkAttendance(false);
    setSelectedClass('');
    setAttendanceData({});
  };

  const classStudents = students.filter(s => s.classId === selectedClass && s.status === 'Active');
  const selectedClassName = classes.find(c => c.id === selectedClass)?.name;

  if (!showMarkAttendance) {
    return (
      <div className="p-6">
        <h1 className="text-gray-900 mb-6">Add / Update Attendance</h1>

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

            <Select
              label="Class"
              required
              options={classOptions}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            />

            <Button onClick={handleDateSubmit} className="w-full">
              Submit
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
          <h1 className="text-gray-900">Mark Attendance</h1>
          <p className="text-sm text-gray-600">
            Class: {selectedClassName} • Date: {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <Button variant="secondary" onClick={() => setShowMarkAttendance(false)}>
          Back
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Photo</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Student Name</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Guardian</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {classStudents.map((student) => (
              <tr key={student.id} className="border-b border-gray-200">
                <td className="px-4 py-3 text-sm text-gray-700">{student.rollNumber || '-'}</td>
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                    {student.firstName[0]}{student.lastName[0]}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{student.fatherName}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(student.id, 'Present')}
                      className={`px-4 py-2 rounded text-sm transition-colors ${
                        attendanceData[student.id] === 'Present'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'On-leave')}
                      className={`px-4 py-2 rounded text-sm transition-colors ${
                        attendanceData[student.id] === 'On-leave'
                          ? 'bg-gray-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      On-leave
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'Absent')}
                      className={`px-4 py-2 rounded text-sm transition-colors ${
                        attendanceData[student.id] === 'Absent'
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
