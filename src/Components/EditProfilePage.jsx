import axios from 'axios';
import { useState, useEffect } from 'react';

export default function EditProfilePage() {
  // Initialize formData with empty structure
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    profileImage: null
  });

  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoadingData(true);
        const _id = localStorage.getItem("_id");
        const token = localStorage.getItem("token");
        
        if (!_id || !token) {
          alert('Authentication required. Please login again.');
          return;
        }

        const res = await axios.get(`http://localhost:8000/edit/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response data:", res.data);

        // Extract user data from the response
        const userData = res.data.user || res.data;
        
        // Map backend data to frontend form structure
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          username: userData.username || '',
          email: userData.email || '',
          bio: userData.bio || '',
          phone: userData.phoneNo || userData.phone || '',
          location: userData.location || '',
          dateOfBirth: userData.dob || userData.dateOfBirth || '',
          profileImage: null
        });

        // If image exists, create preview URL
        if (userData.profileImage) {
          setImagePreview(`data:image/png;base64,${userData.profileImage}`);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          alert('Session expired. Please login again.');
        } else {
          alert('Failed to fetch user data. Please try again.');
        }
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("_id");

      if (!token || !user_id) {
        alert('Authentication required. Please login again.');
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();

      // Map frontend data to backend field names
      const backendData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        bio: formData.bio,
        phoneNo: formData.phone,
        location: formData.location,
        dob: formData.dateOfBirth,
      };

      // Append regular fields
      Object.keys(backendData).forEach(key => {
        if (backendData[key] !== null && backendData[key] !== undefined) {
          submitData.append(key, backendData[key]);
        }
      });

      // Append profile image if exists
      if (formData.profileImage) {
        submitData.append('profileImage', formData.profileImage);
      }

      // Make API call to update user
      const response = await axios.put(`http://localhost:8000/edit`, submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Loading State */}
        {isLoadingData ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-3 text-neutral-400">
              <div className="w-6 h-6 border-2 border-neutral-600 border-t-orange-500 rounded-full animate-spin"></div>
              <span>Loading profile data...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
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
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Edit Profile</h1>
                  <p className="text-neutral-400 text-sm md:text-base">Update your personal information and preferences</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Picture Section */}
              <div className="animate-fade-in-delay">
                <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-white mb-6">Profile Picture</h2>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile"
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-orange-500"
                        />
                      ) : (
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neutral-800 flex items-center justify-center border-4 border-neutral-600 text-neutral-500">
                          No Image
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => document.getElementById('imageInput').click()}
                        className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-white font-medium mb-2">Change Profile Photo</h3>
                      <p className="text-neutral-400 text-sm mb-4">Upload a new profile picture. JPG, PNG(max 5MB)</p>
                      <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('imageInput').click()}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm"
                      >
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="animate-fade-in-delay-2">
                <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="animate-fade-in-delay-3">
                <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="animate-fade-in-delay-3">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-neutral-800 text-neutral-300 rounded-lg font-medium hover:bg-neutral-700 transition-colors order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}