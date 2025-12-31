import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Edit, Trash2, Eye, Lock, X } from 'lucide-react';
import { Modal } from '../common/Modal';
import { toast } from 'sonner';
import { EmployeeDetails } from './EmployeeDetails';

export const EmployeesList: React.FC = () => {
  const { employees, deleteEmployee } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [viewingEmployee, setViewingEmployee] = useState<any>(null);

  // If viewing an employee, show details page
  if (viewingEmployee) {
    return (
      <EmployeeDetails
        employee={viewingEmployee}
        onBack={() => setViewingEmployee(null)}
        onEdit={(employee) => {
          // Handle edit functionality
          setViewingEmployee(null);
          // You can add edit modal here
        }}
        onDelete={(employee) => {
          setSelectedEmployee(employee);
          setDeleteModalOpen(true);
          setViewingEmployee(null);
        }}
      />
    );
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && employee.status === 'Active';
  });

  const columns = [
    {
      key: 'employeeId',
      label: 'Employee ID',
    },
    {
      key: 'photo',
      label: 'Photo',
      render: (_: any, row: any) => (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white">
          {row.firstName[0]}{row.lastName[0]}
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      render: (_: any, row: any) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: 'designation',
      label: 'Designation',
    },
    {
      key: 'department',
      label: 'Department',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'mobile',
      label: 'Mobile',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <button 
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            onClick={() => setViewingEmployee(row)}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1 text-green-600 hover:bg-green-50 rounded">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1 text-purple-600 hover:bg-purple-50 rounded">
            <Lock className="w-4 h-4" />
          </button>
          <button
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            onClick={() => {
              setSelectedEmployee(row);
              setDeleteModalOpen(true);
            }}
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
        <h1 className="text-gray-900">All Employees</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Table columns={columns} data={filteredEmployees} />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Employee" size="sm">
        <div className="space-y-4">
          {/* Warning Icon */}
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>

          {/* Warning Message */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Are you sure you want to delete this employee?
            </p>
            {selectedEmployee && (
              <p className="font-medium text-gray-900">
                {selectedEmployee.firstName} {selectedEmployee.lastName} ({selectedEmployee.employeeId})
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
              onClick={() => {
                if (selectedEmployee) {
                  deleteEmployee(selectedEmployee.id);
                  setDeleteModalOpen(false);
                  setSelectedEmployee(null);
                  toast.success('Employee deleted successfully!');
                }
              }}
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
      </Modal>
    </div>
  );
};