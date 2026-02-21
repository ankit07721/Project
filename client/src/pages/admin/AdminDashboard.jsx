import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome, {user?.name}!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/verifications" className="card p-6 hover:shadow-xl transition-shadow group">
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-primary mb-2 transition-colors">
            Chef Verifications
          </h2>
          <p className="text-gray-500 text-sm">Review and approve/reject pending chef kitchen verifications.</p>
          <span className="inline-block mt-3 text-primary text-sm font-semibold group-hover:underline">Manage →</span>
        </Link>

        <Link to="/browse-chefs" className="card p-6 hover:shadow-xl transition-shadow group">
          <div className="text-4xl mb-3">👩‍🍳</div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-primary mb-2 transition-colors">
            All Chefs
          </h2>
          <p className="text-gray-500 text-sm">Browse all registered chefs on the platform.</p>
          <span className="inline-block mt-3 text-primary text-sm font-semibold group-hover:underline">View →</span>
        </Link>

        <div className="card p-6 bg-orange-50 border border-orange-200">
          <div className="text-4xl mb-3">📊</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Platform Stats</h2>
          <p className="text-gray-500 text-sm">More analytics and reporting features coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
