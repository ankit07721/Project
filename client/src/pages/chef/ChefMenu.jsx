import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import DietaryBadge from '../../components/DietaryBadge';
import LoadingSpinner from '../../components/LoadingSpinner';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: 'Main Course',
  isAvailable: true,
  imageUrl: '',
  dietaryTags: { isVeg: false, isNonVeg: false, diabeticFriendly: false, softFood: false, spiceLevel: 'medium', lowOil: false },
};

const ChefMenu = () => {
  const { user } = useAuth();
  const [chefId, setChefId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const chefsRes = await api.get('/api/chefs');
        const myChef = chefsRes.data.find((c) => c.user?.email === user.email);
        if (myChef) {
          setChefId(myChef._id);
          const menuRes = await api.get(`/api/menu/${myChef._id}`);
          setItems(menuRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (editingId) {
        const { data } = await api.put(`/api/menu/${editingId}`, { ...form, price: Number(form.price) });
        setItems((prev) => prev.map((i) => (i._id === editingId ? data : i)));
      } else {
        const { data } = await api.post('/api/menu', { ...form, price: Number(form.price) });
        setItems((prev) => [...prev, data]);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isAvailable: item.isAvailable,
      imageUrl: item.imageUrl,
      dietaryTags: item.dietaryTags,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await api.delete(`/api/menu/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch {
      alert('Failed to delete item');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Menu</h1>
          <p className="text-gray-500">{items.length} item(s)</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }} className="btn-primary">
          + Add Item
        </button>
      </div>

      {!chefId && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center mb-8">
          <p className="text-orange-800">Please set up your chef profile first before adding menu items.</p>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
          {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.) *</label>
                <input type="number" min={1} className="input-field" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea className="input-field resize-none" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {['Main Course', 'Snacks', 'Breakfast', 'Dessert', 'Health Meal', 'Beverages'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spice Level</label>
                <select className="input-field" value={form.dietaryTags.spiceLevel} onChange={(e) => setForm({ ...form, dietaryTags: { ...form.dietaryTags, spiceLevel: e.target.value } })}>
                  {['mild', 'medium', 'hot', 'extra-hot'].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Tags</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'isVeg', label: 'Veg' },
                  { key: 'isNonVeg', label: 'Non-Veg' },
                  { key: 'diabeticFriendly', label: 'Diabetic Friendly' },
                  { key: 'softFood', label: 'Soft Food' },
                  { key: 'lowOil', label: 'Low Oil' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!form.dietaryTags[key]}
                      onChange={(e) => setForm({ ...form, dietaryTags: { ...form.dietaryTags, [key]: e.target.checked } })}
                      className="accent-primary"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                    className="accent-primary"
                  />
                  <span className="text-sm text-gray-700">Available</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                {submitting ? 'Saving...' : editingId ? 'Update Item' : 'Add Item'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item._id} className={`card p-4 ${!item.isAvailable ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <span className="text-primary font-bold">Rs. {item.price}</span>
            </div>
            <p className="text-gray-500 text-sm mb-2">{item.description}</p>
            <p className="text-xs text-gray-400 mb-2">{item.category}</p>
            <DietaryBadge tags={item.dietaryTags} />
            {!item.isAvailable && <p className="text-xs text-red-500 mt-2">⚠ Currently unavailable</p>}
            <div className="flex gap-2 mt-3">
              <button onClick={() => handleEdit(item)} className="text-sm text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="text-sm text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefMenu;
