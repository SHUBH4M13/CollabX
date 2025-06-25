import { useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function EmployeeProfileView() {
  const token = localStorage.getItem("token")
  const [ employeeData , setemployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    gender: '',
    company: '',
    verified: false,
    projects: [''],
    roles: [''],
  })

  const [isFollowing, setIsFollowing] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const {user_id} = useParams();
 
  useEffect(() => {
    if (!user_id || !token) return;
    
    axios.get(`http://localhost:8000/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
      setemployeeData(response.data); 
    })
    .catch((err) => {
      console.error("Error fetching employee:", err);
    });
  }, [user_id, token]);


  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleSendMessage = () => {
    setShowMessageModal(true);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Manager': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Employee': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Back Button */}
        <div className="animate-fade-in mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => window.history.back()}
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Employee Profile</h1>
              <p className="text-neutral-400 text-sm md:text-base">View employee information</p>
            </div>
          </div>
        </div>

        {/* Cover Image & Profile Section */}
        <div className="animate-fade-in-delay">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden">
            {/* Cover Image */}
            <div className="relative h-48 md:h-64 bg-gradient-to-r from-orange-900/20 to-orange-600/20">
              <img
                src={employeeData.coverImage}
                alt="Cover"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              {/* Profile Image */}
              <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-20">
                <div className="relative">
                  <img
                    src={employeeData.profileImage}
                    alt={`${employeeData.firstName} ${employeeData.lastName}`}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-orange-500 bg-neutral-800"
                  />
                  {employeeData.verified && (
                    <div className="absolute top-0 right-0 w-6 h-6 bg-orange-500 rounded-full border-2 border-neutral-900 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 md:ml-auto">
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg font-medium hover:bg-neutral-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Message
                  </button>
                  <button
                    onClick={handleFollowToggle}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      isFollowing
                        ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Connect'}
                  </button>
                </div>
              </div>

              {/* Employee Info */}
              <div className="mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">
                    {employeeData.firstName} {employeeData.lastName}
                  </h1>
                  {employeeData.verified && (
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Role Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {employeeData.roles.map((role, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(role)}`}
                    >
                      {role}
                    </span>
                  ))}
                </div>

                {/* Employee Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    {employeeData.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {employeeData.phoneNo}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {employeeData.company}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    ID: {employeeData.employeeId}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M3 8h18l-2 12H5L3 8z" />
                    </svg>
                    Joined {employeeData.joinedDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {employeeData.isOnline ? 'Online now' : `Last seen ${employeeData.lastSeen}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="animate-fade-in-delay-2 mt-8">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Current Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employeeData.projects.map((project, index) => (
                <div key={index} className="bg-neutral-800 border border-neutral-600 rounded-lg p-4 hover:bg-neutral-750 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <h3 className="text-white font-medium text-sm">{project}</h3>
                  </div>
                  <p className="text-neutral-400 text-xs">Active Project</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="animate-fade-in-delay-3 mt-8">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Employee Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{employeeData.projects.length}</div>
                <div className="text-neutral-400 text-sm">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{employeeData.friendsCount}</div>
                <div className="text-neutral-400 text-sm">Colleagues</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{employeeData.roles.length}</div>
                <div className="text-neutral-400 text-sm">Roles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{employeeData.verified ? 'Yes' : 'No'}</div>
                <div className="text-neutral-400 text-sm">Verified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Modal */}
        {showMessageModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Send Message</h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-neutral-800 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <textarea
                placeholder={`Send a message to ${employeeData.firstName} ${employeeData.lastName}...`}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                rows={4}
              ></textarea>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg font-medium hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    alert('Message sent!');
                  }}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}