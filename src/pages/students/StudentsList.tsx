import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import { Search, Filter, Eye, Trash2, Edit2, Plus, Download, Upload, X } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Table } from '../common/Table';
import { toast } from 'sonner';
import { StudentDetails } from './StudentDetails';

// Simple Select Component
const Select: React.FC<{
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ options, value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
  >
    <option value="">All Classes</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const StudentsList: React.FC = () => {
  const { students, classes, deleteStudent, updateStudent } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [viewingStudent, setViewingStudent] = useState<any>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>(null);

  // If viewing a student, show details page
  if (viewingStudent) {
    return (
      <StudentDetails
        student={viewingStudent}
        onBack={() => setViewingStudent(null)}
        onEdit={(student) => {
          setViewingStudent(null);
          handleEdit(student);
        }}
        onDelete={(student) => {
          setSelectedStudent(student);
          setDeleteModalOpen(true);
          setViewingStudent(null);
        }}
      />
    );
  }

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

  const columns = [
    {
      key: 'admissionNumber',
      label: 'Admission No.',
    },
    {
      key: 'photo',
      label: 'Photo',
      render: (_: any, row: any) => (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium shadow">
          {row.firstName[0]}{row.lastName[0]}
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Student Name',
      render: (_: any, row: any) => (
        <div>
          <p className="font-medium text-gray-900">{row.firstName} {row.lastName}</p>
          <p className="text-xs text-gray-500">{row.email || 'No email'}</p>
        </div>
      ),
    },
    {
      key: 'classId',
      label: 'Class',
      render: (value: string) => {
        const cls = classes.find((c) => c.id === value);
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {cls?.name || '-'}
          </span>
        );
      },
    },
    {
      key: 'rollNumber',
      label: 'Roll No.',
    },
    {
      key: 'fatherName',
      label: 'Guardian',
    },
    {
      key: 'mobile',
      label: 'Mobile',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-1">
          <button 
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" 
            title="View Details"
            onClick={(e) => {
              e.stopPropagation();
              handleView(row);
            }}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleView = (row: any) => {
    setViewingStudent(row);
  };

  const handleEdit = (row: any) => {
    setSelectedStudent(row);
    setEditFormData(row);
    setEditModalOpen(true);
  };

  const handleDelete = (row: any) => {
    setSelectedStudent(row);
    setDeleteModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editFormData && selectedStudent) {
      updateStudent(selectedStudent.id, editFormData);
      setEditModalOpen(false);
      setSelectedStudent(null);
      setEditFormData(null);
      toast.success('Student updated successfully!');
    }
  };

  const handleEditInputChange = (key: string, value: string) => {
    setEditFormData({
      ...editFormData,
      [key]: value,
    });
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      deleteStudent(selectedStudent.id);
      setDeleteModalOpen(false);
      toast.success('Student deleted successfully!');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">All Students</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all enrolled students</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => navigate('/students/admission')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters and Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Filter Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or admission number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-64">
              <Select
                options={classOptions}
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              />
            </div>
            <Button variant="secondary" size="md">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Students Count */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{filteredStudents.length}</span> of <span className="font-medium text-gray-900">{students.filter(s => s.status === 'Active').length}</span> students
          </p>
        </div>

        {/* Table */}
        <Table columns={columns} data={filteredStudents} />
      </div>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Edit Student</h2>
            <button 
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors" 
              onClick={() => setEditModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleEditSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <Input
                    value={editFormData?.firstName || ''}
                    onChange={(e) => handleEditInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <Input
                    value={editFormData?.lastName || ''}
                    onChange={(e) => handleEditInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
                  <Input
                    value={editFormData?.admissionNumber || ''}
                    onChange={(e) => handleEditInputChange('admissionNumber', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <Input
                    value={editFormData?.rollNumber || ''}
                    onChange={(e) => handleEditInputChange('rollNumber', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">Academic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <Select
                    options={classOptions}
                    value={editFormData?.classId || ''}
                    onChange={(e) => handleEditInputChange('classId', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <Input
                    value={editFormData?.mobile || ''}
                    onChange={(e) => handleEditInputChange('mobile', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    value={editFormData?.email || ''}
                    onChange={(e) => handleEditInputChange('email', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Guardian Information Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">Guardian Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father&apos;s Name</label>
                  <Input
                    value={editFormData?.fatherName || ''}
                    onChange={(e) => handleEditInputChange('fatherName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother&apos;s Name</label>
                  <Input
                    value={editFormData?.motherName || ''}
                    onChange={(e) => handleEditInputChange('motherName', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
              <Button type="submit" variant="primary" size="md">
                <Edit2 className="w-4 h-4 mr-2" />
                Update Student
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                size="md"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Delete Student</h2>
            <button 
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors" 
              onClick={() => setDeleteModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Warning Icon */}
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>

            {/* Warning Message */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Are you sure you want to delete this student?
              </p>
              {selectedStudent && (
                <p className="font-medium text-gray-900">
                  {selectedStudent.firstName} {selectedStudent.lastName} ({selectedStudent.admissionNumber})
                </p>
              )}
              <p className="text-xs text-red-600 mt-2">
                This action cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <Button 
                type="button" 
                variant="danger" 
                size="md" 
                onClick={confirmDelete}
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Yes, Delete
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                size="md"
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};