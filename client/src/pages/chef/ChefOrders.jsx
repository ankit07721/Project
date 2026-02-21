import { useState, useEffect } from 'react';
import api from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';

const statusOptions = ['Accepted', 'Cooking', 'OutForDelivery', 'Delivered', 'Cancelled'];

const statusColors = {
  Placed: 'bg-yellow-100 text-yellow-700',
  Accepted: 'bg-blue-100 text-blue-700',
  Cooking: 'bg-orange-100 text-orange-700',
  OutForDelivery: 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const ChefOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/api/orders/chef');
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const { data } = await api.put(`/api/orders/${orderId}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: data.status } : o)));
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Orders</h1>
      <p className="text-gray-500 mb-8">{orders.length} total order(s)</p>

      {orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-xl">No orders yet. Keep your menu active to receive orders!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <p className="text-sm text-gray-500">{order.customer?.name} ({order.customer?.email})</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-1 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-gray-600">
                    <span>{item.name} × {item.quantity}</span>
                    <span>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-gray-500">
                  <p>📍 {order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
                  {order.notes && <p className="text-xs mt-1">📝 {order.notes}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary">Rs. {order.totalAmount}</span>
                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <select
                      value=""
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                      className="input-field text-sm py-1 w-auto"
                    >
                      <option value="" disabled>Update Status</option>
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefOrders;
