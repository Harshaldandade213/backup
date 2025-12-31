import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Input, Select, Textarea } from '../common/Input';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const HomeworkPage: React.FC = () => {
  const { homework, classes, subjects, addHomework, updateHomework, deleteHomework } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHomework, setEditingHomework] = useState<any>(null);
  const [formData, setFormData] = useState({
    classId: '',
    subjectId: '',
    title: '',
    description: '',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingHomework) {
      updateHomework(editingHomework.id, formData);
      toast.success('Homework updated successfully!');
    } else {
      addHomework({
        id: `hw-${Date.now()}`,
        ...formData,
        assignedDate: new Date().toISOString().split('T')[0],
      });
      toast.success('Homework assigned successfully!');
    }
    
    setIsModalOpen(false);
    setEditingHomework(null);
    setFormData({ classId: '', subjectId: '', title: '', description: '', dueDate: '' });
  };

  const openAddModal = () => {
    setEditingHomework(null);
    setFormData({ classId: '', subjectId: '', title: '', description: '', dueDate: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (hw: any) => {
    setEditingHomework(hw);
    setFormData({
      classId: hw.classId,
      subjectId: hw.subjectId,
      title: hw.title,
      description: hw.description,
      dueDate: hw.dueDate,
    });
    setIsModalOpen(true);
  };

  const classOptions = classes.map((cls) => ({
    value: cls.id,
    label: cls.name,
  }));

  const subjectOptions = subjects.map((sub) => ({
    value: sub.id,
    label: sub.name,
  }));

  const columns = [
    {
      key: 'classId',
      label: 'Class',
      render: (value: string) => {
        const cls = classes.find(c => c.id === value);
        return cls?.name || '-';
      },
    },
    {
      key: 'subjectId',
      label: 'Subject',
      render: (value: string) => {
        const subject = subjects.find(s => s.id === value);
        return subject?.name || '-';
      },
    },
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'assignedDate',
      label: 'Assigned Date',
      render: (value: string) => new Date(value).toLocaleDateString('en-GB'),
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (value: string) => new Date(value).toLocaleDateString('en-GB'),
    },
    {
      key: 'status',
      label: 'Status',
      render: (_: any, row: any) => {
        const today = new Date().toISOString().split('T')[0];
        const isOverdue = row.dueDate < today;
        return (
          <span className={`px-2 py-1 rounded text-xs ${
            isOverdue 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isOverdue ? 'Overdue' : 'Active'}
          </span>
        );
      },
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
              deleteHomework(row.id);
              toast.success('Homework deleted successfully!');
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
        <h1 className="text-gray-900">Homework</h1>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          Assign Homework
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={homework} />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingHomework(null);
          setFormData({ classId: '', subjectId: '', title: '', description: '', dueDate: '' });
        }}
        title={editingHomework ? 'Edit Homework' : 'Assign Homework'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Class"
              required
              options={classOptions}
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
            />

            <Select
              label="Subject"
              required
              options={subjectOptions}
              value={formData.subjectId}
              onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
            />
          </div>

          <Input
            label="Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Chapter 5 Exercises"
          />

          <Textarea
            label="Description"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed homework instructions..."
            rows={4}
          />

          <Input
            label="Due Date"
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingHomework(null);
                setFormData({ classId: '', subjectId: '', title: '', description: '', dueDate: '' });
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingHomework ? 'Update' : 'Assign'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
