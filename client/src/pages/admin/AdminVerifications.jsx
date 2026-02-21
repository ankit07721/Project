import { useState, useEffect } from 'react';
import api from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminVerifications = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const { data } = await api.get('/api/admin/verifications');
      setChefs(data);
    } catch (err) {
      console.error('Failed to load verifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (chefId, action) => {
    setProcessingId(chefId);
    try {
      await api.put(`/api/admin/verifications/${chefId}`, { action });
      setChefs((prev) => prev.filter((c) => c._id !== chefId));
      alert(`Chef ${action}d successfully!`);
    } catch (err) {
      alert(`Failed to ${action} chef`);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Chef Verifications</h1>
      <p className="text-gray-500 mb-8">{chefs.length} pending verification(s)</p>

      {chefs.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-4">✅</div>
          <p className="text-xl">All caught up! No pending verifications.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {chefs.map((chef) => (
            <div key={chef._id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{chef.kitchenName}</h3>
                  <p className="text-gray-500">{chef.user?.name} ({chef.user?.email})</p>
                  <p className="text-sm text-gray-400 mt-1">📍 {chef.location?.address || 'Address not provided'}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 text-sm font-semibold px-3 py-1 rounded-full">
                  ⏳ Pending
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3">{chef.bio || 'No bio provided.'}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {(chef.cuisines || []).map((c) => (
                  <span key={c} className="bg-orange-50 text-primary border border-orange-200 text-xs px-2 py-1 rounded-full">{c}</span>
                ))}
              </div>

              {chef.verificationVideoUrl && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">🎥 Verification Video:</p>
                  <a href={chef.verificationVideoUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline break-all">
                    {chef.verificationVideoUrl}
                  </a>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(chef._id, 'approve')}
                  disabled={processingId === chef._id}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleAction(chef._id, 'reject')}
                  disabled={processingId === chef._id}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-60"
                >
                  ✗ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVerifications;
