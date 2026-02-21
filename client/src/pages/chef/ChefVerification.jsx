import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const ChefVerification = () => {
  const { user } = useAuth();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const { data } = await api.get('/api/chefs');
        const myChef = data.find((c) => c.user?.email === user.email);
        setChef(myChef);
        if (myChef) setVideoUrl(myChef.verificationVideoUrl || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChef();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/api/chefs/verification', { verificationVideoUrl: videoUrl });
      setSuccess('Verification submitted successfully! Our team will review within 48 hours.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit verification');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Kitchen Verification</h1>
      <p className="text-gray-500 mb-8">Submit a video walkthrough of your kitchen to get verified.</p>

      {!chef && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8 text-center">
          <p className="text-orange-800">Please create your chef profile first.</p>
        </div>
      )}

      {chef && (
        <>
          <div className="card p-4 mb-6 flex items-center gap-4">
            <div className="text-4xl">🔍</div>
            <div>
              <p className="text-sm font-medium text-gray-700">Verification Status</p>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusColor[chef.verificationStatus] || 'bg-gray-100 text-gray-700'}`}>
                {chef.verificationStatus.charAt(0).toUpperCase() + chef.verificationStatus.slice(1)}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm text-blue-800">
            <p className="font-semibold mb-2">📋 What to include in your kitchen video:</p>
            <ul className="space-y-1 list-disc list-inside text-blue-700">
              <li>Cooking area and stove</li>
              <li>Storage area (fridge, pantry)</li>
              <li>Utensils and cleanliness</li>
              <li>Water source and sink</li>
            </ul>
          </div>

          <div className="card p-6">
            {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">✓ {success}</div>}
            {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL *</label>
                <input
                  type="url"
                  className="input-field"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/... or any video URL"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Upload your kitchen video to YouTube, Google Drive, or any platform and paste the link.</p>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? 'Submitting...' : 'Submit for Verification'}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChefVerification;
