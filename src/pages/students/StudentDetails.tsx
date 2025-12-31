import React from 'react';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Calendar, User, GraduationCap, Users, MapPin } from 'lucide-react';
import { Student } from '../../types';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

interface StudentDetailsProps {
  student: Student;
  onBack: () => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export const StudentDetails: React.FC<StudentDetailsProps> = ({ 
  student, 
  onBack, 
  onEdit, 
  onDelete 
}) => {
  const { classes } = useApp();
  const studentClass = classes.find(c => c.id === student.classId);

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
            <h1 className="text-gray-900">Student Details</h1>
            <p className="text-sm text-gray-500 mt-1">View and manage student information</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => onEdit(student)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => onDelete(student)}
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
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl shadow-xl">
            {student.firstName[0]}{student.lastName[0]}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h2 className="text-white text-2xl mb-1">{student.firstName} {student.lastName}</h2>
            <p className="text-gray-400 mb-4">Student</p>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {student.admissionNumber}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-300 border border-green-500/30">
                {student.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{student.email || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{student.mobile}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Joined: {new Date(student.admissionDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <GraduationCap className="w-4 h-4 text-gray-500" />
                <span>Class: {studentClass?.name || 'Not assigned'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <User className="w-4 h-4 text-gray-500" />
                <span>Roll: {student.rollNumber || 'N/A'}</span>
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
            <User className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white">Personal Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Father/Guardian</p>
              <p className="text-gray-300">{student.fatherName || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Gender</p>
              <p className="text-gray-300">{student.gender || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
              <p className="text-gray-300">{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Blood Group</p>
              <p className="text-gray-300">{student.bloodGroup || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Religion</p>
              <p className="text-gray-300">{student.religion || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Nationality</p>
              <p className="text-gray-300">{student.nationality || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white">Academic Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Admission Number</p>
              <p className="text-gray-300">{student.admissionNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Class</p>
              <p className="text-gray-300">{studentClass?.name || 'Not assigned'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Roll Number</p>
              <p className="text-gray-300">{student.rollNumber || 'Not assigned'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Admission Date</p>
              <p className="text-gray-300">{new Date(student.admissionDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Previous School</p>
              <p className="text-gray-300">{student.previousSchool || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Mother Tongue</p>
              <p className="text-gray-300">{student.motherTongue || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guardian Information */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-indigo-400" />
          <h3 className="text-white">Guardian Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm text-gray-400 mb-4">Father's Details</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <p className="text-gray-300">{student.fatherName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mobile</p>
                <p className="text-gray-300">{student.fatherMobile || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Profession</p>
                <p className="text-gray-300">{student.fatherProfession || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Education</p>
                <p className="text-gray-300">{student.fatherEducation || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Income</p>
                <p className="text-gray-300">{student.fatherIncome || 'Not provided'}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm text-gray-400 mb-4">Mother's Details</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <p className="text-gray-300">{student.motherName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mobile</p>
                <p className="text-gray-300">{student.motherMobile || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Profession</p>
                <p className="text-gray-300">{student.motherProfession || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Education</p>
                <p className="text-gray-300">{student.motherEducation || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Income</p>
                <p className="text-gray-300">{student.motherIncome || 'Not provided'}</p>
              </div>
            </div>
          </div>
          {student.guardianName && (
            <div className="col-span-2 pt-4 border-t border-gray-700">
              <h4 className="text-sm text-gray-400 mb-4">Guardian Details (if different)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Guardian Name</p>
                  <p className="text-gray-300">{student.guardianName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Relation</p>
                  <p className="text-gray-300">{student.guardianRelation || 'Not provided'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact & Address */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-indigo-400" />
          <h3 className="text-white">Contact & Address</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Mobile Number</p>
            <p className="text-gray-300">{student.mobile}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className="text-gray-300">{student.email || 'Not provided'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-gray-300">{student.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">City</p>
            <p className="text-gray-300">{student.city}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">State</p>
            <p className="text-gray-300">{student.state}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Pincode</p>
            <p className="text-gray-300">{student.pincode}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Caste</p>
            <p className="text-gray-300">{student.caste || 'Not provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
