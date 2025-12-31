import React from 'react';
import { useApp } from '../../context/AppContext';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export const StaffLogin: React.FC = () => {
  const { employees } = useApp();

  const columns = [
    {
      key: 'employeeId',
      label: 'Employee ID',
    },
    {
      key: 'name',
      label: 'Name',
      render: (_: any, row: any) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'username',
      label: 'Username',
    },
    {
      key: 'password',
      label: 'Password',
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <span>{'•'.repeat(8)}</span>
          <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded text-xs ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary">
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="danger">
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Staff Login Management</h1>
        <Button>Add New Staff Login</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table columns={columns} data={employees} />
      </div>
    </div>
  );
};
