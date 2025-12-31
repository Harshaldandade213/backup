import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Select } from '../common/Input';
import { Plus } from 'lucide-react';

export const TimetablePage: React.FC = () => {
  const { timetables, classes, subjects, employees } = useApp();
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || '');

  const classTimetable = timetables.filter(tt => tt.classId === selectedClass);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = [1, 2, 3, 4, 5, 6];

  const getTimetableEntry = (day: string, period: number) => {
    return classTimetable.find(tt => tt.day === day && tt.period === period);
  };

  const classOptions = classes.map((cls) => ({
    value: cls.id,
    label: cls.name,
  }));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Timetable</h1>
        <div className="flex items-center gap-4">
          <div className="w-64">
            <Select
              options={classOptions}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Edit Timetable
          </Button>
        </div>
      </div>

      {!selectedClass ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">Please select a class to view timetable</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm text-gray-600 uppercase w-32">
                    Day / Period
                  </th>
                  {periods.map((period) => (
                    <th
                      key={period}
                      className="px-4 py-3 text-center text-sm text-gray-600 uppercase"
                    >
                      Period {period}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day} className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 text-gray-900">
                      {day}
                    </td>
                    {periods.map((period) => {
                      const entry = getTimetableEntry(day, period);
                      const subject = subjects.find(s => s.id === entry?.subjectId);
                      const teacher = employees.find(e => e.id === entry?.teacherId);
                      
                      return (
                        <td
                          key={period}
                          className="px-4 py-3 text-center border-l border-gray-200 hover:bg-gray-50 cursor-pointer"
                        >
                          {entry ? (
                            <div className="space-y-1">
                              <div className="text-sm text-gray-900">
                                {subject?.name || '-'}
                              </div>
                              <div className="text-xs text-gray-500">
                                {teacher ? `${teacher.firstName} ${teacher.lastName}` : '-'}
                              </div>
                              <div className="text-xs text-gray-400">
                                {entry.startTime} - {entry.endTime}
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Regular Class</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Lab Session</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-sm text-gray-600">Sports/Activities</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
