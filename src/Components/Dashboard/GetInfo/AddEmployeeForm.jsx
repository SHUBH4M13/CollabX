import React, { useState } from 'react';
import axios from "axios";

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    password: '',
    phoneNo: '',
    gender: '',
    location: '',
    dob: '',
    company: '',
    verified: false,
    projects: [],
    roles: []
  });

  const [profilePic, setProfilePic] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (e, field) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleProjectsChange = (e) => {
    const projects = e.target.value.split(',').map(p => p.trim()).filter(p => p);
    setFormData(prev => ({
      ...prev,
      projects
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setProfilePic(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const token = localStorage.getItem("token")

  const handleSubmit = async () => {
    console.log(formData); 
  
    try {
      const res = await axios.post(
        `http://localhost:8000/dashboard/employees/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (res.status === 201) {
        alert("Employee added");
      }
    } catch (err) {
      console.error("Failed to add user", err);
      alert("Failed to add user");
    }
  };
  

  return (
    <div className="min-h-screen bg-background text-white">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Add New Employee</h2>
          <p className="text-neutral-400">Create a comprehensive employee profile with all necessary details</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Left Column - Profile Picture */}
          <div className="xl:col-span-1">
            <div className="bg-neutral-900 rounded-2xl p-8 h-fit sticky top-8">
              <h3 className="text-xl font-semibold mb-6 text-white">Profile Information</h3>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive ? 'border-orange-500 bg-orange-500/5' : 'border-neutral-600 hover:border-neutral-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-6">
                  <div className="w-24 h-24 mx-auto bg-neutral-900 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-lg">
                      {profilePic ? profilePic.name : 'Upload Profile Picture'}
                    </p>
                    <p className="text-neutral-400 text-sm mt-2">
                      Drag and drop or click to browse<br />
                      <span className="text-xs">Supports JPG, PNG, GIF up to 10MB</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-neutral-700">
                <h4 className="text-lg font-medium mb-4 text-white">Employee Status</h4>
                <label className="flex items-center space-x-3 cursor-pointer group p-4 rounded-xl hover:bg-neutral-900 transition-all duration-200">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={formData.verified}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-500 bg-neutral-900 border-neutral-600 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <div>
                    <span className="text-white font-medium">Verified Employee</span>
                    <p className="text-neutral-400 text-sm">Employee has been verified and approved</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="xl:col-span-2 space-y-10">
            
            {/* Personal Details */}
            <div className="bg-neutral-900 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-8 text-white flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Personal Details
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium mb-3 text-neutral-300">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-neutral-300">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-neutral-300">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="employee@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-neutral-300">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-600 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-neutral-300">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-neutral-300">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-600 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="block text-sm font-medium mb-3 text-neutral-300">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-5 py-4 bg-neutral-900 border border-neutral-600 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about this employee's background, experience, and role within the company..."
                />
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-neutral-900 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-8 text-white flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Professional Details
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-3 text-neutral-300">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-600 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-neutral-300">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-600 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium mb-3 text-neutral-300">Projects</label>
                <input
                  type="text"
                  onChange={handleProjectsChange}
                  className="w-full px-5 py-4 bg-neutral-900 border border-neutral-600 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                  placeholder="Project Alpha, Project Beta, Project Gamma"
                />
                <p className="text-neutral-500 text-sm mt-2">Separate multiple projects with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4 text-neutral-300">Roles & Permissions</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Admin', 'Manager', 'Employee'].map(role => (
                    <label key={role} className="flex items-center space-x-3 p-4 bg-neutral-900 rounded-xl cursor-pointer group hover:bg-neutral-600 transition-all duration-200">
                      <input
                        type="checkbox"
                        value={role}
                        checked={formData.roles.includes(role)}
                        onChange={(e) => handleMultiSelect(e, 'roles')}
                        className="w-5 h-5 text-orange-500 bg-neutral-600 border-neutral-500 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <div>
                        <span className="text-white font-medium">{role}</span>
                        <p className="text-neutral-400 text-xs">
                          {role === 'Admin' && 'Full system access'}
                          {role === 'Manager' && 'Team management'}
                          {role === 'Employee' && 'Basic access'}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-neutral-900 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-8 text-white flex items-center">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                Security & Access
              </h3>
              
              <div>
                <label className="block text-sm font-medium mb-3 text-neutral-300">Initial Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 bg-neutral-900 border border-neutral-600 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                  placeholder="Create secure password"
                />
                <p className="text-neutral-500 text-sm mt-2">Employee will be required to change password on first login</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12 pt-8 border-t border-neutral-800">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            Create Employee Profile
          </button>
          <button
            type="button"
            className="flex-1 bg-neutral-900 hover:bg-neutral-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 focus:ring-offset-neutral-900 border border-neutral-600"
          >
            Cancel & Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;