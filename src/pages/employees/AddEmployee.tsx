import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { toast } from 'sonner@2.0.3';

export const AddEmployee: React.FC = () => {
  const { addEmployee } = useApp();
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    designation: '',
    department: '',
    joiningDate: new Date().toISOString().split('T')[0],
    qualification: '',
    experience: '',
    salary: '',
    bloodGroup: '',
    emergencyContact: '',
    emergencyContactName: '',
    aadhaarNumber: '',
    panNumber: '',
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      employeeId: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      mobile: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      designation: '',
      department: '',
      joiningDate: new Date().toISOString().split('T')[0],
      qualification: '',
      experience: '',
      salary: '',
      bloodGroup: '',
      emergencyContact: '',
      emergencyContactName: '',
      aadhaarNumber: '',
      panNumber: '',
      username: '',
      password: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addEmployee({
      id: `emp-${Date.now()}`,
      ...formData,
      salary: parseFloat(formData.salary),
      status: 'Active',
    });
    
    toast.success('Employee added successfully!');
    handleReset();
  };

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const designationOptions = [
    { value: 'Principal', label: 'Principal' },
    { value: 'Vice Principal', label: 'Vice Principal' },
    { value: 'Senior Teacher', label: 'Senior Teacher' },
    { value: 'Teacher', label: 'Teacher' },
    { value: 'Lab Assistant', label: 'Lab Assistant' },
    { value: 'Librarian', label: 'Librarian' },
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Admin Staff', label: 'Admin Staff' },
  ];

  const departmentOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'English', label: 'English' },
    { value: 'Social Studies', label: 'Social Studies' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Physical Education', label: 'Physical Education' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Accounts', label: 'Accounts' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-gray-900 mb-6">Add Employee</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
        {/* Personal Information */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Employee ID"
              name="employeeId"
              required
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="e.g., EMP001"
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
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
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
              label="Aadhaar Number"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
            />
            <Input
              label="PAN Number"
              name="panNumber"
              value={formData.panNumber}
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

        {/* Professional Information */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900 mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Designation"
              name="designation"
              required
              options={designationOptions}
              value={formData.designation}
              onChange={handleChange}
            />
            <Select
              label="Department"
              name="department"
              required
              options={departmentOptions}
              value={formData.department}
              onChange={handleChange}
            />
            <Input
              label="Joining Date"
              name="joiningDate"
              type="date"
              required
              value={formData.joiningDate}
              onChange={handleChange}
            />
            <Input
              label="Qualification"
              name="qualification"
              required
              value={formData.qualification}
              onChange={handleChange}
              placeholder="e.g., M.Sc, B.Ed"
            />
            <Input
              label="Experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 5 years"
            />
            <Input
              label="Salary"
              name="salary"
              type="number"
              required
              value={formData.salary}
              onChange={handleChange}
              placeholder="Monthly salary"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900 mb-4">Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contact Name"
              name="emergencyContactName"
              required
              value={formData.emergencyContactName}
              onChange={handleChange}
            />
            <Input
              label="Contact Number"
              name="emergencyContact"
              type="tel"
              required
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Login Credentials */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900 mb-4">Login Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="p-6 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
