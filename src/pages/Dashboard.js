import React, { useState } from 'react';
import { 
  BarChart3, ShoppingBag, DollarSign, Package, 
  TrendingUp, TrendingDown, Users, CreditCard,
  AlertCircle, MoreVertical, Calendar, Filter,
  ChevronRight, CheckCircle, Clock, Truck, XCircle,
  Download, Share2, RefreshCw, Eye
} from 'lucide-react';
import { products, orders, salesData } from '../data/products';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalProducts = products.length;
  const totalCustomers = 1568; // Demo data
  const conversionRate = 4.2; // Demo data
  
  const topSellingProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const lowStockProducts = products.filter(p => p.stock < 10);
  const recentOrders = orders.slice(0, 5);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Shipped': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'Processing': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'Pending': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-amber-100 text-amber-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Find max sales for chart scaling
  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </button>
              
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                  <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">${totalRevenue.toFixed(2)}</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+12.5%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-green-100 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">{totalOrders}</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+8.3%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>

          {/* Average Order Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-purple-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Avg. Order Value</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">${averageOrderValue.toFixed(2)}</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-red-600 font-medium">-2.1%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-amber-100 rounded-lg">
                <Package className="w-5 h-5 text-amber-600" />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Products</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">{totalProducts}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Active in store</span>
            </div>
          </div>

          {/* Customers Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-pink-100 rounded-lg">
                <Users className="w-5 h-5 text-pink-600" />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Customers</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">{totalCustomers.toLocaleString()}</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+5.2%</span>
              <span className="text-gray-500">this month</span>
            </div>
          </div>

          {/* Conversion Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-indigo-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">{conversionRate}%</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+1.8%</span>
              <span className="text-gray-500">from last week</span>
            </div>
          </div>
        </div>

        {/* Charts and Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Sales Overview</h2>
                <p className="text-gray-600 text-sm">Monthly revenue performance</p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedMetric === 'revenue' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`} onClick={() => setSelectedMetric('revenue')}>
                  Revenue
                </button>
                <button className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedMetric === 'orders' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`} onClick={() => setSelectedMetric('orders')}>
                  Orders
                </button>
              </div>
            </div>

            <div className="h-64 flex items-end gap-3 pt-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full flex justify-center">
                    <div 
                      className="w-8 bg-gradient-to-t from-primary-500 to-primary-600 rounded-t-lg transition-all duration-300 group-hover:opacity-90"
                      style={{ height: `${(data.sales / maxSales) * 160}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        ${data.sales}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
                <p className="text-gray-600 text-sm">Best selling items</p>
              </div>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                <Eye className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {topSellingProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                    index === 2 ? 'bg-gradient-to-br from-amber-700 to-amber-900' :
                    'bg-gradient-to-br from-gray-300 to-gray-500'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${product.price}</p>
                    <p className="text-xs text-gray-500">{product.sales} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <p className="text-gray-600 text-sm">Latest transactions</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded-lg mt-2 sm:mt-0">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-medium text-primary-600">#{order.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{order.customer}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Low Stock Alert</h2>
                <p className="text-gray-600 text-sm">Products need restocking</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>

            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">All products well stocked</h3>
                <p className="text-sm text-gray-500">No inventory issues detected</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-12 h-12 bg-white rounded-lg border border-red-200 overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 bg-red-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-500 to-red-600"
                            style={{ width: `${(product.stock / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-red-600">
                          {product.stock} left
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-700 font-medium">Active Visitors</p>
                <p className="text-2xl font-bold text-primary-900">1,243</p>
              </div>
              <Users className="w-8 h-8 text-primary-400" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Conversion Rate</p>
                <p className="text-2xl font-bold text-green-900">4.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Avg. Session</p>
                <p className="text-2xl font-bold text-blue-900">3m 42s</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Bounce Rate</p>
                <p className="text-2xl font-bold text-purple-900">28.5%</p>
              </div>
              <TrendingDown className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;