import React from 'react';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, Briefcase, GraduationCap, User } from 'lucide-react';
import { Employee } from '../../types';
import { Button } from '../common/Button';

interface EmployeeDetailsProps {
  employee: Employee;
  onBack: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ 
  employee, 
  onBack, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-gray-900">Employee Details</h1>
            <p className="text-sm text-gray-500 mt-1">View and manage employee information</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => onEdit(employee)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => onDelete(employee)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-8">
        <div className="flex items-start gap-6">
          {/* Profile Photo */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-2xl shadow-xl">
            {employee.firstName[0]}{employee.lastName[0]}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h2 className="text-white text-2xl mb-1">{employee.firstName} {employee.lastName}</h2>
            <p className="text-gray-400 mb-4">{employee.designation}</p>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-teal-500/20 text-teal-300 border border-teal-500/30">
                ID: {employee.employeeId}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-300 border border-green-500/30">
                {employee.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{employee.email || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{employee.mobile}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Joined: {new Date(employee.joiningDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span>Salary: ${employee.salary.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-teal-400" />
            <h3 className="text-white">Personal Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Father/Guardian</p>
              <p className="text-gray-300">Not provided</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Gender</p>
              <p className="text-gray-300">{employee.gender || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
              <p className="text-gray-300">{employee.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Blood Group</p>
              <p className="text-gray-300">{employee.bloodGroup || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Religion</p>
              <p className="text-gray-300">Not provided</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">National ID</p>
              <p className="text-gray-300">{employee.aadhaarNumber || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-teal-400" />
            <h3 className="text-white">Professional Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Education</p>
              <p className="text-gray-300">{employee.qualification || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Experience</p>
              <p className="text-gray-300">{employee.experience || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Employee ID</p>
              <p className="text-gray-300">{employee.employeeId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Date of Joining</p>
              <p className="text-gray-300">{new Date(employee.joiningDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Monthly Salary</p>
              <p className="text-gray-300">${employee.salary.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Department</p>
              <p className="text-gray-300">{employee.department}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Address */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Phone className="w-5 h-5 text-teal-400" />
          <h3 className="text-white">Contact & Address</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Mobile Number</p>
            <p className="text-gray-300">{employee.mobile}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-gray-300">{employee.email || 'Not provided'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-gray-300">{employee.address}, {employee.city}, {employee.state} - {employee.pincode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Emergency Contact Name</p>
            <p className="text-gray-300">{employee.emergencyContactName || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Emergency Contact Number</p>
            <p className="text-gray-300">{employee.emergencyContact || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="w-5 h-5 text-teal-400" />
          <h3 className="text-white">Additional Information</h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN Number</p>
            <p className="text-gray-300">{employee.panNumber || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Aadhaar Number</p>
            <p className="text-gray-300">{employee.aadhaarNumber || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Username</p>
            <p className="text-gray-300">{employee.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
