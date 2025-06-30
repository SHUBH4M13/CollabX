import { useState } from "react";
import { Plus, Users, User, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    projectDesc: "",
    projectManager: [],
    projectTeam: []
  });

  const [employees, setEmployees] = useState([
    { _id: "1", name: "John Doe", role: "Senior Developer" },
    { _id: "2", name: "Jane Smith", role: "UI/UX Designer" },
    { _id: "3", name: "Mike Johnson", role: "Project Manager" },
    { _id: "4", name: "Sarah Wilson", role: "Backend Developer" },
    { _id: "5", name: "Tom Brown", role: "Frontend Developer" }
  ]);

  const [showManagerDropdown, setShowManagerDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Project data:", formData);
      alert("Project created successfully!");
      // Reset form
      setFormData({
        projectName: "",
        projectDesc: "",
        projectManager: [],
        projectTeam: []
      });
    } catch (err) {
      console.error("Error creating project:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEmployeeName = (id) => {
    const emp = employees.find((e) => e._id === id);
    return emp?.name || "";
  };

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
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 mt-2"
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
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 mt-2"
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
                    onClick={() => setShowManagerDropdown(!showManagerDropdown)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-left flex justify-between"
                  >
                    <span className="text-neutral-400">
                      {formData.projectManager.length > 0
                        ? `${formData.projectManager.length} manager(s) selected`
                        : "Select project managers..."}
                    </span>
                    <Plus
                      size={20}
                      className={`transition-transform ${
                        showManagerDropdown ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {showManagerDropdown && (
                    <div className="absolute mt-2 w-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {employees.map((emp) => (
                        <div
                          key={emp._id}
                          onClick={() => toggleManager(emp._id)}
                          className="px-4 py-2 hover:bg-neutral-700 flex justify-between cursor-pointer"
                        >
                          <div>
                            <div>{emp.name}</div>
                            <div className="text-sm text-neutral-400">
                              {emp.role}
                            </div>
                          </div>
                          {formData.projectManager.includes(emp._id) && (
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Managers */}
              {formData.projectManager.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.projectManager.map((id) => (
                    <span
                      key={id}
                      className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {getEmployeeName(id)}
                      <button
                        type="button"
                        onClick={() => toggleManager(id)}
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
                    onClick={() => setShowTeamDropdown(!showTeamDropdown)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-left flex justify-between"
                  >
                    <span className="text-neutral-400">
                      {formData.projectTeam.length > 0
                        ? `${formData.projectTeam.length} team member(s) selected`
                        : "Select team members..."}
                    </span>
                    <Plus
                      size={20}
                      className={`transition-transform ${
                        showTeamDropdown ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {showTeamDropdown && (
                    <div className="absolute mt-2 w-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {employees.map((emp) => (
                        <div
                          key={emp._id}
                          onClick={() => toggleTeamMember(emp._id)}
                          className="px-4 py-2 hover:bg-neutral-700 flex justify-between cursor-pointer"
                        >
                          <div>
                            <div>{emp.name}</div>
                            <div className="text-sm text-neutral-400">
                              {emp.role}
                            </div>
                          </div>
                          {formData.projectTeam.includes(emp._id) && (
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Team */}
              {formData.projectTeam.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.projectTeam.map((id) => (
                    <span
                      key={id}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {getEmployeeName(id)}
                      <button
                        type="button"
                        onClick={() => toggleTeamMember(id)}
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
                  disabled={
                    isSubmitting || !formData.projectName.trim()
                  }
                  className="w-60 rounded-lg bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 disabled:opacity-50 flex items-center justify-center gap-2"
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
