import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const ChefDashboard = () => {
  const { user } = useAuth();
  const [chef, setChef] = useState(null);
  const [orders, setOrders] = useState([]);
  const [menuCount, setMenuCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chefsRes, ordersRes] = await Promise.all([
          api.get('/api/chefs'),
          api.get('/api/orders/chef'),
        ]);
        const myChef = chefsRes.data.find((c) => c.user?._id === user._id || c.user?.email === user.email);
        setChef(myChef);
        setOrders(ordersRes.data);
        if (myChef) {
          const menuRes = await api.get(`/api/menu/${myChef._id}`);
          setMenuCount(menuRes.data.length);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-blue-50 text-blue-700' },
    { label: 'Pending Orders', value: orders.filter((o) => o.status === 'Placed').length, icon: '⏳', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Menu Items', value: menuCount, icon: '🍽️', color: 'bg-orange-50 text-orange-700' },
    { label: 'Avg Rating', value: chef?.avgRating || '—', icon: '⭐', color: 'bg-green-50 text-green-700' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Chef Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user.name}!</p>
        </div>
        {chef && (
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${chef.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {chef.isVerified ? '✓ Verified' : '⏳ Pending Verification'}
          </span>
        )}
      </div>

      {!chef && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8 text-center">
          <p className="text-orange-800 mb-3">You haven't set up your chef profile yet.</p>
          <Link to="/chef/profile" className="btn-primary inline-block">Create Profile</Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm font-medium opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { to: '/chef/orders', icon: '📋', label: 'Manage Orders' },
          { to: '/chef/menu', icon: '🍽️', label: 'Manage Menu' },
          { to: '/chef/profile', icon: '👤', label: 'Edit Profile' },
          { to: '/chef/verification', icon: '✅', label: 'Verification' },
        ].map((link) => (
          <Link key={link.to} to={link.to} className="card p-4 hover:shadow-lg transition-shadow text-center">
            <div className="text-3xl mb-2">{link.icon}</div>
            <span className="text-gray-700 font-medium text-sm">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      {orders.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Order ID</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Customer</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">#{o._id.slice(-6).toUpperCase()}</td>
                    <td className="px-4 py-3">{o.customer?.name || '—'}</td>
                    <td className="px-4 py-3 font-medium">Rs. {o.totalAmount}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-orange-50 text-primary rounded-full text-xs font-medium">{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefDashboard;
