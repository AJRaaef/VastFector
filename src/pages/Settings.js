import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Bell, Shield, Globe, Moon,
  Mail, MessageSquare, Gift, Lock, Key, Trash2, Save,
  RefreshCw, Eye, EyeOff, Download, Upload, User,
  CreditCard, Clock, Smartphone, Database, AlertTriangle,
  Check, X, HelpCircle, Info
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [promotions, setPromotions] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');
  const [timeZone, setTimeZone] = useState('America/New_York');
  const [exportFormat, setExportFormat] = useState('json');
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveSettings = () => {
    // In a real app, you would make API calls here
    console.log('Settings saved:', {
      notifications,
      newsletter,
      darkMode,
      emailNotifications,
      smsNotifications,
      promotions,
      twoFactor,
      language,
      currency,
      timeZone
    });
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setNewsletter(false);
    setDarkMode(false);
    setEmailNotifications(true);
    setSmsNotifications(false);
    setPromotions(true);
    setTwoFactor(false);
    setLanguage('English');
    setCurrency('USD');
    setTimeZone('America/New_York');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    alert('Password updated successfully!');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleExportData = () => {
    alert(`Exporting data in ${exportFormat.toUpperCase()} format...`);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      'Are you absolutely sure you want to delete your account?\n\n' +
      'This action cannot be undone. All your data will be permanently deleted.\n' +
      'Type "DELETE" to confirm:'
    );
    
    if (confirmDelete) {
      const userInput = prompt('Please type "DELETE" to confirm account deletion:');
      if (userInput === 'DELETE') {
        alert('Account deletion scheduled. You will receive a confirmation email.');
      }
    }
  };

  const settingsTabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-100 rounded-lg">
                <SettingsIcon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Manage your account preferences and security</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                <HelpCircle className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Info className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-1">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border border-primary-100'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Settings Progress */}
              <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary-900">Settings Complete</span>
                  <span className="text-sm font-bold text-primary-700">85%</span>
                </div>
                <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-primary-600 mt-2">
                  Complete security setup for full protection
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <SettingsIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
                      <p className="text-gray-600">Basic account and display preferences</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-gray-100 rounded-lg">
                          <Moon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Dark Mode</h3>
                          <p className="text-sm text-gray-500">Switch to dark theme for better viewing at night</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={darkMode}
                          onChange={(e) => setDarkMode(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    {/* Newsletter */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-100 rounded-lg">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Newsletter Subscription</h3>
                          <p className="text-sm text-gray-500">Get the latest news, updates, and special offers</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newsletter}
                          onChange={(e) => setNewsletter(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-green-100 rounded-lg">
                          <Bell className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Enable Notifications</h3>
                          <p className="text-sm text-gray-500">Receive notifications about your orders and updates</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications}
                          onChange={(e) => setNotifications(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                      <p className="text-gray-600">Choose how you want to be notified</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-100 rounded-lg">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive order updates and promotions via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailNotifications}
                          onChange={(e) => setEmailNotifications(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* SMS Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-green-100 rounded-lg">
                          <MessageSquare className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">SMS Notifications</h3>
                          <p className="text-sm text-gray-500">Get order updates via text message</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={smsNotifications}
                          onChange={(e) => setSmsNotifications(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>

                    {/* Promotional Offers */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-purple-100 rounded-lg">
                          <Gift className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Promotional Offers</h3>
                          <p className="text-sm text-gray-500">Receive exclusive deals and discounts</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={promotions}
                          onChange={(e) => setPromotions(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Shield className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                      <p className="text-gray-600">Manage your account security and privacy</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-red-100 rounded-lg">
                          <Lock className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          {twoFactor && (
                            <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                              <Check className="w-4 h-4" />
                              <span>2FA is currently active</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={twoFactor}
                          onChange={(e) => setTwoFactor(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    {/* Change Password */}
                    <div className="p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2.5 bg-blue-100 rounded-lg">
                          <Key className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Change Password</h3>
                          <p className="text-sm text-gray-500">Update your account password</p>
                        </div>
                      </div>

                      <div className="space-y-4 pl-14">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showOldPassword ? "text" : "password"}
                              name="oldPassword"
                              value={passwordData.oldPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowOldPassword(!showOldPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showOldPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showNewPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handleUpdatePassword}
                          className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Globe className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
                      <p className="text-gray-600">Customize your experience</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Language */}
                    <div className="p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2.5 bg-purple-100 rounded-lg">
                          <Globe className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">Language</h3>
                          <p className="text-sm text-gray-500">Select your preferred language</p>
                        </div>
                      </div>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Chinese">Chinese</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div className="p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2.5 bg-green-100 rounded-lg">
                          <CreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">Currency</h3>
                          <p className="text-sm text-gray-500">Choose your preferred currency</p>
                        </div>
                      </div>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                      </select>
                    </div>

                    {/* Time Zone */}
                    <div className="p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2.5 bg-blue-100 rounded-lg">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">Time Zone</h3>
                          <p className="text-sm text-gray-500">Set your local time zone</p>
                        </div>
                      </div>
                      <select
                        value={timeZone}
                        onChange={(e) => setTimeZone(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="America/New_York">Eastern Time (US & Canada)</option>
                        <option value="America/Chicago">Central Time (US & Canada)</option>
                        <option value="America/Denver">Mountain Time (US & Canada)</option>
                        <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                        <option value="Asia/Dubai">Dubai</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data & Privacy */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Database className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Data & Privacy</h2>
                      <p className="text-gray-600">Manage your data and privacy settings</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Export Data */}
                    <div className="p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2.5 bg-blue-100 rounded-lg">
                          <Download className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">Export Your Data</h3>
                          <p className="text-sm text-gray-500">Download a copy of your personal data</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 pl-14">
                        <select
                          value={exportFormat}
                          onChange={(e) => setExportFormat(e.target.value)}
                          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="json">JSON Format</option>
                          <option value="csv">CSV Format</option>
                          <option value="xml">XML Format</option>
                          <option value="pdf">PDF Format</option>
                        </select>
                        <button
                          onClick={handleExportData}
                          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Export Data
                        </button>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2.5 bg-red-100 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-red-900 mb-1">Danger Zone</h3>
                          <p className="text-sm text-red-700">Irreversible actions - proceed with caution</p>
                        </div>
                      </div>
                      
                      <div className="pl-14">
                        <div className="p-4 bg-white rounded-lg border border-red-200 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Delete Account</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Permanently delete your account and all associated data. This action cannot be undone.
                          </p>
                          <button
                            onClick={handleDeleteAccount}
                            className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete My Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Apply Changes</h3>
                  <p className="text-sm text-gray-500">Save or reset your settings</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleResetSettings}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset to Default
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save All Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;