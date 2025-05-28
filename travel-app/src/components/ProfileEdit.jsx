import { useState } from 'react';

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
    { id: 'basic', label: 'Basic Info', icon: '👤' },
    { id: 'travel', label: 'Travel Preferences', icon: '🌍' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-[#FCCB6E] rounded-2xl w-full max-w-4xl h-[80vh] border-2 border-[#5E5854] shadow-2xl flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#6F93AD] border-r border-[#5E5854] p-6">
          <h3 className="text-xl font-bold text-[#204231] mb-6">Edit Profile</h3>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg font-semibold transition-colors ${
                  activeSection === section.id
                    ? 'bg-[#FCCB6E] text-[#204231]'
                    : 'text-[#204231]/70 hover:text-[#204231] hover:bg-[#FCCB6E]/20'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#5E5854] bg-[#6F93AD]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#204231]">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <button
                onClick={onClose}
                className="text-[#204231] hover:text-[#EC8E3D] text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === 'basic' && (
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                  <h4 className="text-lg font-bold text-[#204231] mb-4">Profile Picture</h4>
                  <div className="flex items-center space-x-6">
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#EE9C8F]"
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
                        className="bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-4 py-2 rounded-lg cursor-pointer font-semibold transition-colors"
                      >
                        📷 Change Photo
                      </label>
                      <p className="text-[#204231]/70 text-sm mt-2">
                        JPG, PNG or GIF. Max size 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854]">
                  <h4 className="text-lg font-bold text-[#204231] mb-4">Basic Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#204231] font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[#204231] font-semibold mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[#204231] font-semibold mb-2">About Me</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#204231] font-semibold mb-2">Phone Number</label>
                      <div className="flex space-x-2">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                        />
                        <button
                          onClick={handlePhoneChange}
                          className="bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-4 py-3 rounded-xl font-semibold transition-colors"
                        >
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
                <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                  <h4 className="text-lg font-bold text-[#204231] mb-4">Travel Categories</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {availableCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`p-3 rounded-lg font-semibold transition-colors ${
                          formData.travelCategories.includes(category)
                            ? 'bg-[#EC8E3D] text-white'
                            : 'bg-[#FCCB6E] text-[#204231] hover:bg-[#EE9C8F]'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854]">
                  <h4 className="text-lg font-bold text-[#204231] mb-4">Languages</h4>
                  
                  {/* Current Languages */}
                  <div className="mb-4">
                    <p className="text-[#204231] font-semibold mb-2">Current Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.languages.map((language) => (
                        <span
                          key={language}
                          className="flex items-center space-x-2 bg-[#204231] text-[#FCCB6E] px-3 py-1 rounded-full text-sm font-medium"
                        >
                          <span>{language}</span>
                          <button
                            onClick={() => handleLanguageRemove(language)}
                            className="text-[#FCCB6E] hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Add Languages */}
                  <div>
                    <p className="text-[#204231] font-semibold mb-2">Add Languages:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {commonLanguages
                        .filter(lang => !formData.languages.includes(lang))
                        .map((language) => (
                        <button
                          key={language}
                          onClick={() => handleLanguageAdd(language)}
                          className="p-2 bg-[#FCCB6E] text-[#204231] rounded-lg hover:bg-[#EC8E3D] hover:text-white transition-colors text-sm font-medium"
                        >
                          + {language}
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
                <div className="bg-[#6F93AD] p-6 rounded-xl border border-[#5E5854]">
                  <h4 className="text-lg font-bold text-[#204231] mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#204231] font-semibold mb-2">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[#204231] font-semibold mb-2">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[#204231] font-semibold mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#FCCB6E] border-2 border-[#5E5854] rounded-xl text-[#204231] focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] font-medium"
                      />
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      🔒 Change Password (OTP Required)
                    </button>
                  </div>
                </div>

                {/* Account Security */}
                <div className="bg-[#EE9C8F] p-6 rounded-xl border border-[#5E5854]">
                  <h4 className="text-lg font-bold text-[#204231] mb-4">Account Security</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#204231] font-semibold">Two-Factor Authentication</p>
                        <p className="text-[#204231]/70 text-sm">Add extra security to your account</p>
                      </div>
                      <button className="bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        Enable
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#204231] font-semibold">Login Notifications</p>
                        <p className="text-[#204231]/70 text-sm">Get notified of new logins</p>
                      </div>
                      <button className="bg-[#5E5854] hover:bg-[#204231] text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        Enabled
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#5E5854] bg-[#6F93AD]">
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="bg-[#5E5854] hover:bg-[#204231] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#EC8E3D] hover:bg-[#EE9C8F] text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
