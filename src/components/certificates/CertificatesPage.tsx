import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { Table } from '../common/Table';
import { toast } from 'sonner@2.0.3';

export const CertificatesPage: React.FC = () => {
  const { students, employees, certificates, addCertificate } = useApp();
  const [formData, setFormData] = useState({
    templateType: '',
    recipientType: 'Student' as 'Student' | 'Employee',
    recipientId: '',
    reason: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleGenerate = () => {
    if (!formData.templateType || !formData.recipientId || !formData.reason) {
      toast.error('Please fill all required fields');
      return;
    }

    addCertificate({
      id: `cert-${Date.now()}`,
      ...formData,
      generatedDate: new Date().toISOString().split('T')[0],
    });

    toast.success('Certificate generated successfully!');
    setFormData({
      templateType: '',
      recipientType: 'Student',
      recipientId: '',
      reason: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const templateOptions = [
    { value: 'achievement', label: 'Achievement Certificate' },
    { value: 'participation', label: 'Participation Certificate' },
    { value: 'completion', label: 'Course Completion Certificate' },
    { value: 'excellence', label: 'Certificate of Excellence' },
  ];

  const recipientTypeOptions = [
    { value: 'Student', label: 'Student' },
    { value: 'Employee', label: 'Employee' },
  ];

  const recipientOptions = formData.recipientType === 'Student'
    ? students.filter(s => s.status === 'Active').map(s => ({
        value: s.id,
        label: `${s.firstName} ${s.lastName} (${s.admissionNumber})`,
      }))
    : employees.filter(e => e.status === 'Active').map(e => ({
        value: e.id,
        label: `${e.firstName} ${e.lastName} (${e.employeeId})`,
      }));

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'templateType', label: 'Certificate', render: (value: string) => value.charAt(0).toUpperCase() + value.slice(1) },
    { key: 'recipientType', label: 'Recipient Type' },
    {
      key: 'recipientId',
      label: 'Recipient',
      render: (value: string, row: any) => {
        if (row.recipientType === 'Student') {
          const student = students.find(s => s.id === value);
          return student ? `${student.firstName} ${student.lastName}` : '-';
        } else {
          const employee = employees.find(e => e.id === value);
          return employee ? `${employee.firstName} ${employee.lastName}` : '-';
        }
      },
    },
    { key: 'generatedDate', label: 'Generated Date' },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary">View</Button>
          <Button size="sm" variant="secondary">Download</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-gray-900 mb-6">Generate Certificate</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Generate Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <div className="flex gap-4 border-b border-gray-200 mb-6">
              <button className="pb-2 px-1 border-b-2 border-blue-500 text-blue-600 text-sm">
                Required
              </button>
              <button className="pb-2 px-1 text-gray-600 text-sm">
                Optional
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-purple-600 mb-1">Select Template *</label>
              <Select
                options={templateOptions}
                value={formData.templateType}
                onChange={(e) => setFormData({ ...formData, templateType: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-purple-600 mb-1">Recipient Type *</label>
              <Select
                options={recipientTypeOptions}
                value={formData.recipientType}
                onChange={(e) => setFormData({ ...formData, recipientType: e.target.value as 'Student' | 'Employee', recipientId: '' })}
              />
            </div>

            <div>
              <label className="block text-sm text-purple-600 mb-1">Recipient *</label>
              <Select
                options={recipientOptions}
                value={formData.recipientId}
                onChange={(e) => setFormData({ ...formData, recipientId: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-purple-600 mb-1">Reason *</label>
              <Input
                placeholder="e.g., Outstanding Performance"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-purple-600 mb-1">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <Button onClick={handleGenerate} className="w-full bg-yellow-500 hover:bg-yellow-600">
              ● Generate Certificate
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-900 mb-4">Certificate Preview</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-500">
            Select a template and recipient to preview the Certificate.
          </div>
        </div>
      </div>

      {/* Saved Certificates */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-gray-900">Saved Certificates</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select className="px-2 py-1 border border-gray-300 rounded">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
            <div className="flex-1"></div>
            <input
              type="text"
              placeholder="Search:"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Table columns={columns} data={certificates} />
        </div>
      </div>
    </div>
  );
};
