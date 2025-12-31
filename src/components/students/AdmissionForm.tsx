import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { toast } from 'sonner@2.0.3';

export const AdmissionForm: React.FC = () => {
  const { classes, addStudent } = useApp();
  const [formData, setFormData] = useState({
    // Personal Information
    admissionNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    religion: '',
    caste: '',
    nationality: 'Indian',
    motherTongue: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Academic Information
    classId: '',
    rollNumber: '',
    admissionDate: new Date().toISOString().split('T')[0],
    previousSchool: '',
    
    // Father Information
    fatherName: '',
    fatherMobile: '',
    fatherProfession: '',
    fatherIncome: '',
    fatherEducation: '',
    
    // Mother Information
    motherName: '',
    motherMobile: '',
    motherProfession: '',
    motherIncome: '',
    motherEducation: '',
    
    // Guardian Information (if different)
    guardianName: '',
    guardianRelation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      admissionNumber: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      religion: '',
      caste: '',
      nationality: 'Indian',
      motherTongue: '',
      mobile: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      classId: '',
      rollNumber: '',
      admissionDate: new Date().toISOString().split('T')[0],
      previousSchool: '',
      fatherName: '',
      fatherMobile: '',
      fatherProfession: '',
      fatherIncome: '',
      fatherEducation: '',
      motherName: '',
      motherMobile: '',
      motherProfession: '',
      motherIncome: '',
      motherEducation: '',
      guardianName: '',
      guardianRelation: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addStudent({
      id: `std-${Date.now()}`,
      ...formData,
      status: 'Active',
    });
    
    toast.success('Student admitted successfully!');
    handleReset();
  };

  const classOptions = classes.map((cls) => ({
    value: cls.id,
    label: cls.name,
  }));

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-gray-900">Student Admission</h1>
        <p className="text-sm text-gray-500 mt-1">Fill in the student details to complete the admission process</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Personal Information */}
        <div className="border-b border-gray-200">
          <div className="bg-indigo-600 text-white px-6 py-3 rounded-t-xl">
            <h3 className="uppercase tracking-wide">Personal Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Admission Number"
                name="admissionNumber"
                required
                value={formData.admissionNumber}
                onChange={handleChange}
              />
              <Input
                label="First Name"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <Select
                label="Gender"
                name="gender"
                required
                options={genderOptions}
                value={formData.gender}
                onChange={handleChange}
              />
              <Input
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
              <Input
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              />
              <Input
                label="Caste"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
              />
              <Input
                label="Nationality"
                name="nationality"
                required
                value={formData.nationality}
                onChange={handleChange}
              />
              <Input
                label="Mother Tongue"
                name="motherTongue"
                value={formData.motherTongue}
                onChange={handleChange}
              />
              <Input
                label="Mobile"
                name="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="md:col-span-2 lg:col-span-3">
                <Input
                  label="Address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <Input
                label="City"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                label="State"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
              />
              <Input
                label="Pincode"
                name="pincode"
                required
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="border-b border-gray-200">
          <div className="bg-indigo-600 text-white px-6 py-3">
            <h3 className="uppercase tracking-wide">Academic Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                label="Class"
                name="classId"
                required
                options={classOptions}
                value={formData.classId}
                onChange={handleChange}
              />
              <Input
                label="Roll Number"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
              />
              <Input
                label="Admission Date"
                name="admissionDate"
                type="date"
                required
                value={formData.admissionDate}
                onChange={handleChange}
              />
              <Input
                label="Previous School"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Father Information */}
        <div className="border-b border-gray-200">
          <div className="bg-indigo-600 text-white px-6 py-3">
            <h3 className="uppercase tracking-wide">Father / Guardian Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Name"
                name="fatherName"
                required
                value={formData.fatherName}
                onChange={handleChange}
              />
              <Input
                label="Mobile"
                name="fatherMobile"
                type="tel"
                required
                value={formData.fatherMobile}
                onChange={handleChange}
              />
              <Input
                label="Profession"
                name="fatherProfession"
                value={formData.fatherProfession}
                onChange={handleChange}
              />
              <Input
                label="Annual Income"
                name="fatherIncome"
                value={formData.fatherIncome}
                onChange={handleChange}
              />
              <Input
                label="Education"
                name="fatherEducation"
                value={formData.fatherEducation}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Mother Information */}
        <div className="border-b border-gray-200">
          <div className="bg-indigo-600 text-white px-6 py-3">
            <h3 className="uppercase tracking-wide">Mother Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Name"
                name="motherName"
                required
                value={formData.motherName}
                onChange={handleChange}
              />
              <Input
                label="Mobile"
                name="motherMobile"
                type="tel"
                value={formData.motherMobile}
                onChange={handleChange}
              />
              <Input
                label="Profession"
                name="motherProfession"
                value={formData.motherProfession}
                onChange={handleChange}
              />
              <Input
                label="Annual Income"
                name="motherIncome"
                value={formData.motherIncome}
                onChange={handleChange}
              />
              <Input
                label="Education"
                name="motherEducation"
                value={formData.motherEducation}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="p-6 bg-gray-50 rounded-b-xl flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">
            Submit Admission
          </Button>
        </div>
      </form>
    </div>
  );
};