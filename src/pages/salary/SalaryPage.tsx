import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { Select } from '../common/Input';
import { DollarSign, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const SalaryPage: React.FC = () => {
  const { salaries, employees, updateSalary } = useApp();
  const [filterMonth, setFilterMonth] = useState(() => {
    const date = new Date();
    return date.toLocaleString('default', { month: 'long' });
  });
  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());
  const [filterStatus, setFilterStatus] = useState('');

  const filteredSalaries = salaries.filter((salary) => {
    const matchesMonth = !filterMonth || salary.month === filterMonth;
    const matchesYear = !filterYear || salary.year.toString() === filterYear;
    const matchesStatus = !filterStatus || salary.status === filterStatus;
    
    return matchesMonth && matchesYear && matchesStatus;
  });

  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].map(month => ({ value: month, label: month }));

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  const statusOptions = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Pending', label: 'Pending' },
  ];

  const handleMarkPaid = (salaryId: string) => {
    updateSalary(salaryId, {
      status: 'Paid',
      paidDate: new Date().toISOString().split('T')[0],
    });
    toast.success('Salary marked as paid!');
  };

  const columns = [
    {
      key: 'employeeId',
      label: 'Employee',
      render: (value: string) => {
        const employee = employees.find(e => e.id === value);
        return employee ? `${employee.firstName} ${employee.lastName}` : '-';
      },
    },
    {
      key: 'employeeIdDisplay',
      label: 'Employee ID',
      render: (_: any, row: any) => {
        const employee = employees.find(e => e.id === row.employeeId);
        return employee?.employeeId || '-';
      },
    },
    {
      key: 'designation',
      label: 'Designation',
      render: (_: any, row: any) => {
        const employee = employees.find(e => e.id === row.employeeId);
        return employee?.designation || '-';
      },
    },
    {
      key: 'month',
      label: 'Month',
      render: (value: string, row: any) => `${value} ${row.year}`,
    },
    {
      key: 'basicSalary',
      label: 'Basic Salary',
      render: (value: number) => `₹${value.toLocaleString()}`,
    },
    {
      key: 'allowances',
      label: 'Allowances',
      render: (value: number) => `₹${value.toLocaleString()}`,
    },
    {
      key: 'deductions',
      label: 'Deductions',
      render: (value: number) => `₹${value.toLocaleString()}`,
    },
    {
      key: 'netSalary',
      label: 'Net Salary',
      render: (value: number) => (
        <span className="text-green-600">₹{value.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const config = value === 'Paid' 
          ? { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-3 h-3" /> }
          : { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="w-3 h-3" /> };
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
              Mark Paid
            </Button>
          )}
          <Button size="sm" variant="ghost">View</Button>
        </div>
      ),
    },
  ];

  // Calculate statistics
  const totalSalary = filteredSalaries.reduce((sum, sal) => sum + sal.netSalary, 0);
  const paidSalary = filteredSalaries.filter(s => s.status === 'Paid').reduce((sum, sal) => sum + sal.netSalary, 0);
  const pendingSalary = filteredSalaries.filter(s => s.status === 'Pending').reduce((sum, sal) => sum + sal.netSalary, 0);

  return (
    <div className="p-6">
      <h1 className="text-gray-900 mb-6">Salary Management</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Salary</p>
              <p className="text-gray-900">₹{totalSalary.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Paid</p>
              <p className="text-green-600">₹{paidSalary.toLocaleString()}</p>
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
              <p className="text-yellow-600">₹{pendingSalary.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Salary Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-48">
              <Select
                options={monthOptions}
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              />
            </div>
            <div className="w-32">
              <Select
                options={yearOptions}
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select
                options={statusOptions}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
            </div>
            <div className="flex-1"></div>
            <Button>Generate Salary</Button>
          </div>
        </div>

        <Table columns={columns} data={filteredSalaries} />
      </div>
    </div>
  );
};
