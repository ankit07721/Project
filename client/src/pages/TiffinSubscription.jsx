import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const TiffinSubscription = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    chefId: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    city: '',
    plan: 'weekly',
    daysOfWeek: [],
    mealsPerDay: 1,
    dietaryConstraints: '',
    startDate: '',
  });

  useEffect(() => {
    const loadChefs = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/api/chefs');
        setChefs(data);
      } catch { /* silent */ }
      setLoading(false);
    };
    loadChefs();
  }, []);

  const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter((d) => d !== day)
        : [...prev.daysOfWeek, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'caregiver') { setError('Only caregivers can create subscriptions.'); return; }
    setSubmitting(true);
    setError('');
    try {
      await api.post('/api/subscriptions', {
        chefId: form.chefId,
        recipientName: form.recipientName,
        recipientPhone: form.recipientPhone,
        deliveryAddress: { street: form.street, city: form.city },
        plan: form.plan,
        daysOfWeek: form.daysOfWeek,
        mealsPerDay: Number(form.mealsPerDay),
        dietaryConstraints: form.dietaryConstraints ? form.dietaryConstraints.split(',').map((s) => s.trim()) : [],
        startDate: form.startDate,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create subscription');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (success) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Subscription Created!</h2>
      <p className="text-gray-500 mb-6">Your tiffin subscription has been set up successfully.</p>
      <button onClick={() => navigate('/my-orders')} className="btn-primary">View My Orders</button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Tiffin Subscription</h1>
      <p className="text-gray-500 mb-8">Set up regular meal delivery for your loved ones.</p>

      {!user && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-orange-800">Please <a href="/login" className="font-bold underline">login</a> as a caregiver to subscribe.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Chef *</label>
          <select className="input-field" value={form.chefId} onChange={(e) => setForm({ ...form, chefId: e.target.value })} required>
            <option value="">-- Choose a chef --</option>
            {chefs.map((c) => <option key={c._id} value={c._id}>{c.kitchenName}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name *</label>
            <input className="input-field" value={form.recipientName} onChange={(e) => setForm({ ...form, recipientName: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Phone *</label>
            <input className="input-field" value={form.recipientPhone} onChange={(e) => setForm({ ...form, recipientPhone: e.target.value })} required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
            <input className="input-field" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input className="input-field" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plan *</label>
            <select className="input-field" value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meals Per Day</label>
            <input type="number" min={1} max={3} className="input-field" value={form.mealsPerDay} onChange={(e) => setForm({ ...form, mealsPerDay: e.target.value })} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Days</label>
          <div className="flex flex-wrap gap-2">
            {daysOptions.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${form.daysOfWeek.includes(day) ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:border-primary'}`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Constraints (comma-separated)</label>
          <input className="input-field" placeholder="e.g. no onion, diabetic, soft food" value={form.dietaryConstraints} onChange={(e) => setForm({ ...form, dietaryConstraints: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
          <input type="date" className="input-field" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          {submitting ? 'Creating Subscription...' : 'Create Subscription'}
        </button>
      </form>
    </div>
  );
};

export default TiffinSubscription;
