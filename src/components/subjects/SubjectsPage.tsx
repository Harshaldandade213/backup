import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const SubjectsPage: React.FC = () => {
  const { subjects, employees, addSubject, updateSubject, deleteSubject } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSubject) {
      updateSubject(editingSubject.id, formData);
      toast.success('Subject updated successfully!');
    } else {
      addSubject({
        id: `sub-${Date.now()}`,
        ...formData,
        classIds: [],
      });
      toast.success('Subject added successfully!');
    }
    
    setIsModalOpen(false);
    setEditingSubject(null);
    setFormData({ name: '', code: '', description: '' });
  };

  const openAddModal = () => {
    setEditingSubject(null);
    setFormData({ name: '', code: '', description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (subject: any) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description || '',
    });
    setIsModalOpen(true);
  };

  const columns = [
    {
      key: 'code',
      label: 'Subject Code',
    },
    {
      key: 'name',
      label: 'Subject Name',
    },
    {
      key: 'teacherId',
      label: 'Teacher',
      render: (value: string) => {
        if (!value) return '-';
        const teacher = employees.find(e => e.id === value);
        return teacher ? `${teacher.firstName} ${teacher.lastName}` : '-';
      },
    },
    {
      key: 'classIds',
      label: 'Classes',
      render: (value: string[]) => `${value.length} classes`,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="p-1 text-green-600 hover:bg-green-50 rounded"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              deleteSubject(row.id);
              toast.success('Subject deleted successfully!');
            }}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Subjects</h1>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Subject
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={subjects} />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSubject(null);
          setFormData({ name: '', code: '', description: '' });
        }}
        title={editingSubject ? 'Edit Subject' : 'Add Subject'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Subject Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Mathematics"
          />

          <Input
            label="Subject Code"
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="e.g., MATH"
          />

          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Optional description"
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingSubject(null);
                setFormData({ name: '', code: '', description: '' });
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingSubject ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
