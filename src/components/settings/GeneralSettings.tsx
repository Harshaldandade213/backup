import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { toast } from 'sonner@2.0.3';
import { School, Mail, Phone, MapPin, Globe, Calendar, Users, Briefcase, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GeneralSettings: React.FC = () => {
  const { schoolSettings, updateSchoolSettings, students, employees, classes } = useApp();
  
  const [formData, setFormData] = useState(schoolSettings);

  // Update form when context changes
  useEffect(() => {
    setFormData(schoolSettings);
  }, [schoolSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolSettings(formData);
    toast.success('Settings updated successfully!');
  };

  const handleCancel = () => {
    setFormData(schoolSettings);
    toast.info('Changes cancelled');
  };

  // Calculate real stats
  const totalStudents = students.filter(s => s.status === 'Active').length;
  const totalStaff = employees.filter(e => e.status === 'Active').length;
  const totalClasses = classes.length;

  return (
    <div className="p-6">
      <h1 className="text-gray-900 mb-6">General Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">School Information</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-2">
                  <School className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Input
                    label="School Name"
                    name="schoolName"
                    required
                    value={formData.schoolName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Input
                    label="Address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Input
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Established"
                      name="established"
                      value={formData.established}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Input
                  label="Principal Name"
                  name="principalName"
                  value={formData.principalName}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-gray-900 mb-4">Academic Session</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Session Start"
                    name="sessionStart"
                    type="date"
                    required
                    value={formData.sessionStart}
                    onChange={handleChange}
                  />
                  <Input
                    label="Session End"
                    name="sessionEnd"
                    type="date"
                    required
                    value={formData.sessionEnd}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Save Settings
              </Button>
            </div>
          </form>
        </div>

        {/* Quick Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-900 mb-4">Quick Info</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Total Students</p>
                  <p className="text-blue-600">{totalStudents}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Total Staff</p>
                  <p className="text-green-600">{totalStaff}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Total Classes</p>
                  <p className="text-purple-600">{totalClasses}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-gray-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SMS Service</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">WhatsApp</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Service</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};