import { useEffect, useState } from "react";
import { Plus, Users, User, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    projectDesc: "",
    projectManager: [],
    projectTeam: []
  });

  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showManagerDropdown, setShowManagerDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleManager = (employeeId) => {
    setFormData((prev) => ({
      ...prev,
      projectManager: prev.projectManager.includes(employeeId)
        ? prev.projectManager.filter((id) => id !== employeeId)
        : [...prev.projectManager, employeeId]
    }));
  };

  const toggleTeamMember = (employeeId) => {
    setFormData((prev) => ({
      ...prev,
      projectTeam: prev.projectTeam.includes(employeeId)
        ? prev.projectTeam.filter((id) => id !== employeeId)
        : [...prev.projectTeam, employeeId]
    }));
  };

  const GetManagers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/project/managers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("Managers API Response:", res.data);
      setManagers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching managers:", error);
      setError("Failed to fetch managers");
      setManagers([]);
    }
  };

  const GetEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8000/project/Employees", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("Employees API Response:", res.data);
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to fetch employees");
      setEmployees([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([GetEmployees(), GetManagers()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/project/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (res.status === 201) {
        console.log("Project created successfully");
        navigate(-1);
      }
    } catch (err) {
      console.error("Error creating project:", err.response?.data || err.message);
      setError("Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEmployeeName = (id) => {
    const manager = managers.find((m) => m._id === id);
    if (manager) {
      return `${manager.firstName} ${manager.lastName}`;
    }
    
    const emp = employees.find((e) => e._id === id);
    if (emp) {
      return `${emp.firstName} ${emp.lastName}`;
    }
    
    return "Unknown User";
  };

  // Close dropdowns when clicking outside
  const handleDropdownToggle = (dropdownType) => {
    if (dropdownType === 'manager') {
      setShowManagerDropdown(!showManagerDropdown);
      setShowTeamDropdown(false);
    } else {
      setShowTeamDropdown(!showTeamDropdown);
      setShowManagerDropdown(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-4 py-10 md:py-20">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>

          <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">
            Create New Project
          </h1>
          <p className="mx-auto max-w-xl py-4 text-lg text-neutral-400">
            Set up your project details, assign managers and build your team
          </p>
        </div>

        {error && (
          <div className="mx-auto max-w-4xl mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center"
        >
          <div className="w-full max-w-4xl rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-md">
            <div className="space-y-8">
              {/* Project Name */}
              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-white">
                  <FileText size={20} className="text-orange-500" />
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="Enter project name..."
                  required
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 mt-2 text-white placeholder-neutral-400 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-white">
                  <FileText size={20} className="text-orange-500" />
                  Project Description
                </label>
                <textarea
                  name="projectDesc"
                  value={formData.projectDesc}
                  onChange={handleInputChange}
                  placeholder="Describe your project..."
                  rows={4}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 mt-2 text-white placeholder-neutral-400 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              {/* Project Managers */}
              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-white">
                  <User size={20} className="text-orange-500" />
                  Project Managers
                </label>
                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() => handleDropdownToggle('manager')}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-left flex justify-between items-center hover:border-neutral-600 focus:border-orange-500 focus:outline-none"
                  >
                    <span className={formData.projectManager.length > 0 ? "text-white" : "text-neutral-400"}>
                      {formData.projectManager.length > 0
                        ? `${formData.projectManager.length} manager(s) selected`
                        : "Select project managers..."}
                    </span>
                    <Plus
                      size={20}
                      className={`transition-transform text-neutral-400 ${
                        showManagerDropdown ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {showManagerDropdown && (
                    <div className="absolute mt-2 w-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {managers.length > 0 ? (
                        managers.map((manager) => (
                          <div
                            key={manager._id}
                            onClick={() => toggleManager(manager._id)}
                            className="px-4 py-3 hover:bg-neutral-700 flex justify-between items-center cursor-pointer transition-colors"
                          >
                            <div>
                              <div className="text-white">
                                {`${manager.firstName} ${manager.lastName}`}
                              </div>
                              <div className="text-sm text-neutral-400">
                                {manager.roles && manager.roles.length > 0 ? manager.roles.join(', ') : 'Manager'}
                              </div>
                            </div>
                            {formData.projectManager.includes(manager._id) && (
                              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-neutral-400">
                          {loading ? "Loading managers..." : "No managers available"}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Managers */}
              {formData.projectManager.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.projectManager.map((id) => (
                    <span
                      key={id}
                      className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {getEmployeeName(id)}
                      <button
                        type="button"
                        onClick={() => toggleManager(id)}
                        className="hover:text-orange-100 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Project Team */}
              <div>
                <label className="flex items-center gap-2 text-lg font-medium text-white">
                  <Users size={20} className="text-orange-500" />
                  Project Team
                </label>
                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() => handleDropdownToggle('team')}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-left flex justify-between items-center hover:border-neutral-600 focus:border-orange-500 focus:outline-none"
                  >
                    <span className={formData.projectTeam.length > 0 ? "text-white" : "text-neutral-400"}>
                      {formData.projectTeam.length > 0
                        ? `${formData.projectTeam.length} team member(s) selected`
                        : "Select team members..."}
                    </span>
                    <Plus
                      size={20}
                      className={`transition-transform text-neutral-400 ${
                        showTeamDropdown ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {showTeamDropdown && (
                    <div className="absolute mt-2 w-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {employees.length > 0 ? (
                        employees.map((emp) => (
                          <div
                            key={emp._id}
                            onClick={() => toggleTeamMember(emp._id)}
                            className="px-4 py-3 hover:bg-neutral-700 flex justify-between items-center cursor-pointer transition-colors"
                          >
                            <div>
                              <div className="text-white">{`${emp.firstName} ${emp.lastName}`}</div>
                              <div className="text-sm text-neutral-400">
                                {emp.roles && emp.roles.length > 0 ? emp.roles.join(', ') : 'Employee'}
                              </div>
                            </div>
                            {formData.projectTeam.includes(emp._id) && (
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-neutral-400">No employees available</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Team */}
              {formData.projectTeam.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.projectTeam.map((id) => (
                    <span
                      key={id}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {getEmployeeName(id)}
                      <button
                        type="button"
                        onClick={() => toggleTeamMember(id)}
                        className="hover:text-blue-100 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.projectName.trim()}
                  className="w-60 rounded-lg bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Project...
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      Create Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}