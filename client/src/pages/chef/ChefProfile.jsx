import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const ChefProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    kitchenName: '',
    bio: '',
    cuisines: '',
    serviceRadiusKm: 10,
    address: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: chefs } = await api.get('/api/chefs');
        const myChef = chefs.find((c) => c.user?.email === user.email);
        if (myChef) {
          setForm({
            kitchenName: myChef.kitchenName || '',
            bio: myChef.bio || '',
            cuisines: (myChef.cuisines || []).join(', '),
            serviceRadiusKm: myChef.serviceRadiusKm || 10,
            address: myChef.location?.address || '',
            lat: myChef.location?.lat || '',
            lng: myChef.location?.lng || '',
          });
        } else {
          setIsNew(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        kitchenName: form.kitchenName,
        bio: form.bio,
        cuisines: form.cuisines.split(',').map((c) => c.trim()).filter(Boolean),
        serviceRadiusKm: Number(form.serviceRadiusKm),
        location: {
          address: form.address,
          lat: form.lat ? parseFloat(form.lat) : undefined,
          lng: form.lng ? parseFloat(form.lng) : undefined,
        },
      };

      if (isNew) {
        await api.post('/api/chefs/profile', payload);
        setIsNew(false);
      } else {
        await api.put('/api/chefs/profile', payload);
      }
      setSuccess('Profile saved successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Chef Profile</h1>
      <p className="text-gray-500 mb-8">{isNew ? 'Set up your chef profile' : 'Update your profile'}</p>

      <div className="card p-6">
        {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">✓ {success}</div>}
        {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kitchen Name *</label>
            <input className="input-field" value={form.kitchenName} onChange={(e) => setForm({ ...form, kitchenName: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea className="input-field resize-none" rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell customers about your cooking style..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cuisines (comma-separated)</label>
            <input className="input-field" value={form.cuisines} onChange={(e) => setForm({ ...form, cuisines: e.target.value })} placeholder="e.g. Nepali, Indian, Continental" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Radius (km)</label>
            <input type="number" min={1} max={100} className="input-field" value={form.serviceRadiusKm} onChange={(e) => setForm({ ...form, serviceRadiusKm: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kitchen Address</label>
            <input className="input-field" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="e.g. Thamel, Kathmandu" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude (optional)</label>
              <input type="number" step="any" className="input-field" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} placeholder="27.7172" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude (optional)</label>
              <input type="number" step="any" className="input-field" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} placeholder="85.3240" />
            </div>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Saving...' : isNew ? 'Create Profile' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChefProfile;
