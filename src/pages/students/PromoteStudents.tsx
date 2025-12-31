import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { toast } from 'sonner@2.0.3';

export const PromoteStudents: React.FC = () => {
  const { students, classes, promoteStudents } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [targetClass, setTargetClass] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = !filterClass || student.classId === filterClass;
    
    return matchesSearch && matchesClass && student.status === 'Active';
  });

  const classOptions = classes.map((cls) => ({
    value: cls.id,
    label: cls.name,
  }));

  const handleToggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleToggleAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    }
  };

  const handlePromote = () => {
    if (selectedStudents.length === 0) {
      toast.error('Please select at least one student');
      return;
    }
    if (!targetClass) {
      toast.error('Please select target class');
      return;
    }

    promoteStudents(selectedStudents, targetClass);
    toast.success(`${selectedStudents.length} students promoted successfully!`);
    setSelectedStudents([]);
    setTargetClass('');
  };

  return (
    <div className="p-6">
      <h1 className="text-gray-900 mb-6">Promote Students</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-48">
                <Select
                  options={classOptions}
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                onChange={handleToggleAll}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-600">
                Select All ({selectedStudents.length} selected)
              </span>
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto">
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No students found
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  const cls = classes.find((c) => c.id === student.classId);
                  return (
                    <div
                      key={student.id}
                      className="p-4 hover:bg-gray-50 flex items-center gap-4"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleToggleStudent(student.id)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student.admissionNumber} • Class: {cls?.name}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600">
                        Roll: {student.rollNumber || '-'}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Promote Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-900 mb-4">Promote In</h2>
          
          <div className="space-y-4">
            <Select
              label="Select Target Class"
              options={classOptions}
              value={targetClass}
              onChange={(e) => setTargetClass(e.target.value)}
              required
            />

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Students Selected</p>
              <p className="text-blue-600">{selectedStudents.length}</p>
            </div>

            {targetClass && (
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Target Class</p>
                <p className="text-green-600">
                  {classes.find((c) => c.id === targetClass)?.name}
                </p>
              </div>
            )}

            <Button
              className="w-full"
              onClick={handlePromote}
              disabled={selectedStudents.length === 0 || !targetClass}
            >
              Promote Students
            </Button>

            {selectedStudents.length > 0 && (
              <p className="text-xs text-gray-500 text-center">
                This action will move {selectedStudents.length} student(s) to the selected class
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
