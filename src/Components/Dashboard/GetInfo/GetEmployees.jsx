import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Mail, Phone, MapPin, Calendar, Search, Filter } from 'lucide-react';

export default function GetEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  useEffect(() => {
    fetchEmployees();
  }, []);
  //
  //fetching all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:8000/dashboard/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        // Handle backend response structure: {allEmployees: [...]}
        if (data.allEmployees && Array.isArray(data.allEmployees)) {
          setEmployees(data.allEmployees);
        } else if (Array.isArray(data)) {
          setEmployees(data);
        } else {
          setEmployees([]);
        }

      }
    } catch (err) {
      console.error('Failed to fetch employees:', err);
      setError('Failed to load employees. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeClick = (employeeId) => {
    window.location.href = `/user/${employeeId}`;
  };

  const employeesArray = Array.isArray(employees) ? employees : [];
  const departments = [...new Set(employeesArray.map(emp => emp.department).filter(Boolean))];


  const filteredEmployees = employeesArray.filter(employee => {
    const matchesSearch = 
      employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      filterDepartment === 'all' || employee.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="border border-bordercolour bg-hovercolor text-red-400 px-4 py-3 rounded">
            <p>{error}</p>
            <button 
              onClick={fetchEmployees}
              className="mt-2 text-white px-4 py-2 rounded transition-colors bg-primary hover:bg-[#e55a00]"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8  bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 mr-2 text-primary" />
            <h1 className="text-3xl font-bold text-white">Our Team</h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {employeesArray.length > 0 && ` We have ${employeesArray.length} amazing team members.`}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="rounded-lg shadow-sm p-6 mb-8 animate-fade-in-delay bg-hovercolor border border-bordercolour">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search employees by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:outline-none text-white placeholder-gray-500 bg-background border border-bordercolour focus:border-primary"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg focus:ring-2 focus:outline-none min-w-[200px] text-white bg-background border border-bordercolour focus:border-primary"
              >
                <option value="all" className="bg-hovercolor">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept} className="bg-hovercolor">{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredEmployees.length} of {employeesArray.length} employees
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12 animate-fade-in-delay-2">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-600" />
            <h3 className="text-lg font-medium text-white mb-2">No employees found</h3>
            <p className="text-gray-400">
              {searchTerm || filterDepartment !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'No employees have been added yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-delay-2">
            {filteredEmployees.map((employee, index) => (
              <div
                key={employee._id}
                className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer bg-hovercolor border border-bordercolour hover:border-primary hover:-translate-y-1"
                onClick={() => handleEmployeeClick(employee._id)}
              >
                {/* Header with gradient */}
                <div className="h-24 flex items-center justify-center relative bg-gradient-to-br from-primary to-[#ff8533]">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl bg-background border-4 border-white">
                    {employee.firstName?.[0]?.toUpperCase()}{employee.lastName?.[0]?.toUpperCase()}
                  </div>
                </div>

                {/* Employee Information */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  
                  {employee.position && (
                    <p className="font-medium mb-3 text-primary">{employee.position}</p>
                  )}
                  
                  {employee.department && (
                    <div className="inline-block text-gray-300 px-3 py-1 rounded-full text-xs font-medium mb-4 bg-background border border-bordercolour">
                      {employee.department}
                    </div>
                  )}

                  <div className="space-y-3 text-sm text-gray-400">
                    {employee.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3 text-primary" />
                        <span className="truncate">{employee.email}</span>
                      </div>
                    )}

                    {employee.phoneNo && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-primary" />
                        <span>{employee.phoneNo}</span>
                      </div>
                    )}

                    {employee.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-3 text-primary" />
                        <span className="truncate">{employee.location}</span>
                      </div>
                    )}

                    {employee.dob && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-3 text-primary" />
                        <span>{new Date(employee.dob).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {employee.bio && (
                    <div className="mt-4 pt-4 border-t border-bordercolour">
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {employee.bio.length > 100 ? `${employee.bio.substring(0, 100)}...` : employee.bio}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}