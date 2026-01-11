import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, 
  ShoppingBag, Package, Heart, CreditCard,
  Edit2, Save, X, Eye, Download, Bell,
  Shield, Lock, Globe, Award, TrendingUp,
  CheckCircle, Clock, Truck, Settings,
  Camera, Upload, FileText, History
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@vastfactor.io',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    country: 'United States',
    postalCode: '10001',
    bio: 'E-commerce enthusiast and tech lover. Always looking for the next best product!',
    company: 'VastFactor',
    website: 'https://vastfactor.io'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would make an API call here
  };

  const orderHistory = [
    { id: 1001, date: '2024-12-20', items: 3, total: 249.98, status: 'Delivered' },
    { id: 1002, date: '2024-11-15', items: 1, total: 899.99, status: 'Delivered' },
    { id: 1003, date: '2024-10-05', items: 5, total: 159.97, status: 'Delivered' },
    { id: 1004, date: '2024-09-22', items: 2, total: 199.98, status: 'Shipped' },
    { id: 1005, date: '2024-08-30', items: 4, total: 549.96, status: 'Processing' }
  ];

  const activityLog = [
    { action: 'Logged into account', timestamp: '2024-12-27 10:30 AM', icon: '🔐' },
    { action: 'Added MacBook Pro to cart', timestamp: '2024-12-26 03:15 PM', icon: '🛒' },
    { action: 'Updated profile information', timestamp: '2024-12-25 11:20 AM', icon: '📝' },
    { action: 'Placed order #1003', timestamp: '2024-12-22 02:45 PM', icon: '📦' },
    { action: 'Wrote a product review', timestamp: '2024-12-20 09:15 AM', icon: '⭐' }
  ];

  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'blue', change: '+2 this month' },
    { label: 'Total Spent', value: '$2,450', icon: CreditCard, color: 'green', change: '+$320 this month' },
    { label: 'Wishlist Items', value: '8', icon: Heart, color: 'pink', change: '+3 recently' },
    { label: 'Avg. Rating', value: '4.8', icon: Award, color: 'amber', change: 'Top 10%' }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Shipped': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'Processing': return <Clock className="w-4 h-4 text-amber-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar" 
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                    {formData.name.charAt(0)}
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 bg-white text-primary-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{formData.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-primary-200">
                      <Mail className="w-4 h-4" />
                      <span>{formData.email}</span>
                    </div>
                    <span className="text-primary-200">•</span>
                    <div className="flex items-center gap-1 text-primary-200">
                      <Award className="w-4 h-4" />
                      <span>{user?.role || 'Administrator'}</span>
                    </div>
                  </div>
                  <p className="text-primary-200 mt-3 max-w-2xl">
                    Member since December 2023 • Last login: Today, 10:30 AM
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white text-primary-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white text-primary-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 bg-${stat.color}-100 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-xs text-green-600 font-medium">{stat.change}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-gray-200 mb-6">
              {['profile', 'orders', 'activity', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'profile' && 'Profile Information'}
                  {tab === 'orders' && 'Order History'}
                  {tab === 'activity' && 'Activity Log'}
                  {tab === 'settings' && 'Account Settings'}
                </button>
              ))}
            </div>

            {/* Profile Information */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{formData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{formData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{formData.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Role
                      </label>
                      <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{user?.role || 'Administrator'}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{formData.address}</p>
                    )}
                  </div>

                  {/* Location Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{formData.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{formData.country}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{formData.postalCode}</p>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{formData.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Order History */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                      <p className="text-gray-600">Your recent purchases</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
                      <FileText className="w-4 h-4" />
                      Export Orders
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Order ID</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Date</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Items</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Total</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orderHistory.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-medium text-primary-600">#{order.id}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{order.date}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{order.items} items</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(order.status)}
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Eye className="w-4 h-4 text-gray-500" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Download className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Activity Log */}
            {activeTab === 'activity' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                    <p className="text-gray-600">Your account activity timeline</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <History className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {activityLog.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6">
            {/* Account Security */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-500" />
                Account Security
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email Verified</p>
                      <p className="text-xs text-gray-500">{formData.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Lock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Password</p>
                      <p className="text-xs text-gray-500">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-sm bg-amber-100 text-amber-700 font-medium rounded-lg hover:bg-amber-200 transition-colors">
                    Change
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bell className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Notifications</p>
                      <p className="text-xs text-gray-500">Email & push notifications</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <ShoppingBag className="w-5 h-5 text-gray-500" />
                  <span>View My Orders</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-500" />
                  <span>My Wishlist</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <span>Payment Methods</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span>Account Settings</span>
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg">
                  <Award className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900">Premium Member</h3>
                  <p className="text-sm text-primary-700">Elite status since Dec 2023</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-700">Order completion</span>
                  <span className="text-sm font-medium text-primary-900">92%</span>
                </div>
                <div className="h-2 bg-primary-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600" style={{ width: '92%' }}></div>
                </div>
                <p className="text-xs text-primary-600 mt-3">
                  Complete 5 more orders to reach VIP status
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;