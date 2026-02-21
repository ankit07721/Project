import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, cartTotal, cartChefId, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ street: '', city: '', paymentMethod: 'COD', notes: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setError('');
    setLoading(true);
    try {
      await api.post('/api/orders', {
        chefId: cartChefId,
        items: cartItems.map((i) => ({ menuItem: i._id, name: i.name, price: i.price, quantity: i.quantity })),
        deliveryAddress: { street: form.street, city: form.city },
        paymentMethod: form.paymentMethod,
        notes: form.notes,
      });
      clearCart();
      navigate('/my-orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="card p-6 space-y-4">
            {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

            <h2 className="text-xl font-bold text-gray-800">Delivery Address</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
              <input
                className="input-field"
                placeholder="House/Street details"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                className="input-field"
                placeholder="e.g. Kathmandu"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>

            <h2 className="text-xl font-bold text-gray-800 pt-2">Payment Method</h2>
            <div className="space-y-2">
              {[
                { value: 'COD', label: '💵 Cash on Delivery' },
                { value: 'MockKhalti', label: '📱 Mock Khalti (Demo)' },
              ].map((method) => (
                <label key={method.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${form.paymentMethod === method.value ? 'border-primary bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={form.paymentMethod === method.value}
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    className="accent-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">{method.label}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Notes</label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="Any special instructions for your order..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? 'Placing Order...' : '🎉 Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.name} × {item.quantity}</span>
                  <span className="font-medium">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-800">
                <span>Total</span>
                <span className="text-primary">Rs. {cartTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
