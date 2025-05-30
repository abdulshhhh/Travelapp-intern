import { useState } from 'react';
import { 
  FiUser, FiGlobe, FiLock, FiX, FiCamera, 
  FiCheck, FiPlus, FiTrash2, FiSave, 
  FiShield, FiBell
} from 'react-icons/fi';

export default function ProfileEdit({ profileData, onClose, onOTPVerification }) {
  const [activeSection, setActiveSection] = useState('basic');
  const [formData, setFormData] = useState({
    fullName: profileData.fullName,
    bio: profileData.bio,
    location: profileData.location,
    phone: profileData.phone,
    travelCategories: profileData.travelCategories,
    languages: profileData.languages,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(profileData.avatar);

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
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      travelCategories: prev.travelCategories.includes(category)
        ? prev.travelCategories.filter(c => c !== category)
        : [...prev.travelCategories, category]
    }));
  };

  const handleLanguageAdd = (language) => {
    if (language && !formData.languages.includes(language)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    }
  };

  const handleLanguageRemove = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }));
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    onOTPVerification('password');
  };

  const handlePhoneChange = () => {
    onOTPVerification('phone');
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Profile updated successfully!');
    onClose();
  };

  const availableCategories = [
    'Adventure', 'Culture', 'Food', 'Photography', 'Nature', 'Beach', 'Mountains', 
    'City', 'History', 'Art', 'Music', 'Sports', 'Wildlife', 'Luxury', 'Budget'
  ];

  const commonLanguages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 
    'Japanese', 'Korean', 'Arabic', 'Russian', 'Hindi', 'Dutch', 'Swedish'
  ];

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: <FiUser className="w-5 h-5" /> },
    { id: 'travel', label: 'Travel Preferences', icon: <FiGlobe className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <FiLock className="w-5 h-5" /> }
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] border border-gray-200 shadow-2xl flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-yellow-50 border-r border-gray-200 p-6">
          <h3 className="text-xl font-bold text-yellow-900 mb-6">Edit Profile</h3>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg font-semibold transition-colors ${
                  activeSection === section.id
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-600 hover:text-yellow-700 hover:bg-yellow-50'
                }`}
              >
                {section.icon}
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === 'basic' && (
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="bg-yellow-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Profile Picture</h4>
                  <div className="flex items-center space-x-6">
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-yellow-200"
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="profile-image"
                      />
                      <label
                        htmlFor="profile-image"
                        className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg cursor-pointer font-semibold transition-colors"
                      >
                        <FiCamera className="mr-2 w-5 h-5" />
                        Change Photo
                      </label>
                      <p className="text-gray-500 text-sm mt-2">
                        JPG, PNG or GIF. Max size 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="bg-amber-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">About Me</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-medium resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                      <div className="flex space-x-2">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-medium"
                        />
                        <button
                          onClick={handlePhoneChange}
                          className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
                        >
                          <FiCheck className="mr-2 w-5 h-5" />
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'travel' && (
              <div className="space-y-6">
                {/* Travel Categories */}
                <div className="bg-yellow-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Travel Categories</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {availableCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`p-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                          formData.travelCategories.includes(category)
                            ? 'bg-yellow-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-300'
                        }`}
                      >
                        {formData.travelCategories.includes(category) && (
                          <FiCheck className="mr-2 w-4 h-4" />
                        )}
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-amber-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Languages</h4>
                  
                  {/* Current Languages */}
                  <div className="mb-4">
                    <p className="text-gray-700 font-semibold mb-2">Current Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.languages.map((language) => (
                        <span
                          key={language}
                          className="flex items-center space-x-2 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                          <span>{language}</span>
                          <button
                            onClick={() => handleLanguageRemove(language)}
                            className="text-white hover:text-yellow-200"
                          >
                            <FiTrash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Add Languages */}
                  <div>
                    <p className="text-gray-700 font-semibold mb-2">Add Languages:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {commonLanguages
                        .filter(lang => !formData.languages.includes(lang))
                        .map((language) => (
                        <button
                          key={language}
                          onClick={() => handleLanguageAdd(language)}
                          className="flex items-center justify-center p-2 bg-white text-gray-700 rounded-lg hover:bg-yellow-50 hover:text-yellow-700 transition-colors text-sm font-medium border border-gray-300"
                        >
                          <FiPlus className="mr-1 w-3 h-3" />
                          {language}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-yellow-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-medium"
                      />
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <FiLock className="mr-2 w-5 h-5" />
                      Change Password (OTP Required)
                    </button>
                  </div>
                </div>

                {/* Account Security */}
                <div className="bg-amber-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Account Security</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700 font-semibold">Two-Factor Authentication</p>
                        <p className="text-gray-500 text-sm">Add extra security to your account</p>
                      </div>
                      <button className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        <FiShield className="mr-2 w-4 h-4" />
                        Enable
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700 font-semibold">Login Notifications</p>
                        <p className="text-gray-500 text-sm">Get notified of new logins</p>
                      </div>
                      <button className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        <FiBell className="mr-2 w-4 h-4" />
                        Enabled
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-white">
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center bg-#FCCB6E hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <FiSave className="mr-2 w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}