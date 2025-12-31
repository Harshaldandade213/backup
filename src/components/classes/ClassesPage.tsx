import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Edit, GraduationCap } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';

export const ClassesPage: React.FC = () => {
  const { classes, employees, addClass, updateClass } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    monthlyFees: '',
    classTeacherId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingClass) {
      updateClass(editingClass.id, {
        name: formData.name,
        monthlyFees: parseFloat(formData.monthlyFees),
        classTeacherId: formData.classTeacherId || undefined,
      });
    } else {
      addClass({
        id: `class-${Date.now()}`,
        name: formData.name,
        monthlyFees: parseFloat(formData.monthlyFees),
        classTeacherId: formData.classTeacherId || undefined,
        totalStudents: 0,
        boysCount: 0,
        girlsCount: 0,
        otherCount: 0,
      });
    }
    
    setIsModalOpen(false);
    setEditingClass(null);
    setFormData({ name: '', monthlyFees: '', classTeacherId: '' });
  };

  const openAddModal = () => {
    setEditingClass(null);
    setFormData({ name: '', monthlyFees: '', classTeacherId: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (classData: any) => {
    setEditingClass(classData);
    setFormData({
      name: classData.name,
      monthlyFees: classData.monthlyFees.toString(),
      classTeacherId: classData.classTeacherId || '',
    });
    setIsModalOpen(true);
  };

  const teacherOptions = employees.map(emp => ({
    value: emp.id,
    label: `${emp.firstName} ${emp.lastName}`,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Classes</h1>
          <p className="text-sm text-gray-500 mt-1">Manage class structure and student distribution</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {classes.map((classData) => {
          const boysPercentage = classData.totalStudents > 0 
            ? Math.round((classData.boysCount / classData.totalStudents) * 100) 
            : 0;
          const girlsPercentage = classData.totalStudents > 0 
            ? Math.round((classData.girlsCount / classData.totalStudents) * 100) 
            : 0;
          const otherPercentage = classData.totalStudents > 0 
            ? Math.round((classData.otherCount / classData.totalStudents) * 100) 
            : 0;

          return (
            <div key={classData.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{classData.name}</h3>
                    <p className="text-xs text-gray-500">Class</p>
                  </div>
                </div>
                <button
                  onClick={() => openEditModal(classData)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="text-xl font-semibold text-gray-900">{classData.totalStudents}</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Boys */}
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-700">Boys</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{classData.boysCount}</span>
                    <span className="text-xs text-blue-600">({boysPercentage}%)</span>
                  </div>
                </div>

                {/* Girls */}
                <div className="flex items-center justify-between p-2 bg-pink-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                    <span className="text-sm text-gray-700">Girls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{classData.girlsCount}</span>
                    <span className="text-xs text-pink-600">({girlsPercentage}%)</span>
                  </div>
                </div>

                {/* Other */}
                {classData.otherCount > 0 && (
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                      <span className="text-sm text-gray-700">Other</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{classData.otherCount}</span>
                      <span className="text-xs text-gray-600">({otherPercentage}%)</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Monthly Fees</span>
                  <span className="font-semibold text-indigo-600">₹{classData.monthlyFees}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Class Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingClass(null);
          setFormData({ name: '', monthlyFees: '', classTeacherId: '' });
        }}
        title={editingClass ? 'Edit Class' : 'Add New Class'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Class Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., 10 A"
          />

          <Input
            label="Monthly Tuition Fees"
            type="number"
            required
            value={formData.monthlyFees}
            onChange={(e) => setFormData({ ...formData, monthlyFees: e.target.value })}
            placeholder="Enter amount"
          />

          <Select
            label="Select Class Teacher (Optional)"
            options={teacherOptions}
            value={formData.classTeacherId}
            onChange={(e) => setFormData({ ...formData, classTeacherId: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingClass(null);
                setFormData({ name: '', monthlyFees: '', classTeacherId: '' });
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingClass ? 'Update Class' : 'Create Class'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};