import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { Select } from '../common/Input';
import { DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

export const FeesPage: React.FC = () => {
  const { fees, students, classes, updateFee } = useApp();
  const [filterStatus, setFilterStatus] = useState('');
  const [filterClass, setFilterClass] = useState('');

  const filteredFees = fees.filter((fee) => {
    const matchesStatus = !filterStatus || fee.status === filterStatus;
    const student = students.find(s => s.id === fee.studentId);
    const matchesClass = !filterClass || student?.classId === filterClass;
    
    return matchesStatus && matchesClass;
  });

  const statusOptions = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Overdue', label: 'Overdue' },
  ];

  const classOptions = classes.map((cls) => ({
    value: cls.id,
    label: cls.name,
  }));

  const handleMarkPaid = (feeId: string) => {
    updateFee(feeId, {
      status: 'Paid',
      paidDate: new Date().toISOString().split('T')[0],
    });
  };

  const columns = [
    {
      key: 'studentId',
      label: 'Student',
      render: (value: string) => {
        const student = students.find(s => s.id === value);
        return student ? `${student.firstName} ${student.lastName}` : '-';
      },
    },
    {
      key: 'admissionNumber',
      label: 'Admission No.',
      render: (_: any, row: any) => {
        const student = students.find(s => s.id === row.studentId);
        return student?.admissionNumber || '-';
      },
    },
    {
      key: 'classId',
      label: 'Class',
      render: (_: any, row: any) => {
        const student = students.find(s => s.id === row.studentId);
        const cls = classes.find(c => c.id === student?.classId);
        return cls?.name || '-';
      },
    },
    {
      key: 'feeType',
      label: 'Fee Type',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value: number) => `₹${value.toLocaleString()}`,
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (value: string) => new Date(value).toLocaleDateString('en-GB'),
    },
    {
      key: 'paidDate',
      label: 'Paid Date',
      render: (value: string) => value ? new Date(value).toLocaleDateString('en-GB') : '-',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const statusConfig = {
          Paid: { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
          Pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="w-3 h-3" /> },
          Overdue: { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-3 h-3" /> },
        };
        const config = statusConfig[value as keyof typeof statusConfig];
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${config.bg} ${config.text}`}>
            {config.icon}
            {value}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          {row.status !== 'Paid' && (
            <Button size="sm" variant="success" onClick={() => handleMarkPaid(row.id)}>
              <DollarSign className="w-3 h-3 mr-1" />
              Mark Paid
            </Button>
          )}
          <Button size="sm" variant="ghost">View</Button>
        </div>
      ),
    },
  ];

  // Calculate statistics
  const totalAmount = filteredFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidAmount = filteredFees.filter(f => f.status === 'Paid').reduce((sum, fee) => sum + fee.amount, 0);
  const pendingAmount = filteredFees.filter(f => f.status === 'Pending').reduce((sum, fee) => sum + fee.amount, 0);
  const overdueAmount = filteredFees.filter(f => f.status === 'Overdue').reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="p-6">
      <h1 className="text-gray-900 mb-6">Fee Management</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Fees</p>
              <p className="text-gray-900">₹{totalAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Collected</p>
              <p className="text-green-600">₹{paidAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-yellow-600">₹{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overdue</p>
              <p className="text-red-600">₹{overdueAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Fees Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-48">
              <Select
                options={statusOptions}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select
                options={classOptions}
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              />
            </div>
            <div className="flex-1"></div>
            <Button>Generate Fee</Button>
          </div>
        </div>

        <Table columns={columns} data={filteredFees.slice(0, 50)} />
      </div>
    </div>
  );
};
