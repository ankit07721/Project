import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import DietaryBadge from '../components/DietaryBadge';
import LoadingSpinner from '../components/LoadingSpinner';

const ChefDetail = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const { data } = await api.get(`/api/chefs/${id}`);
        setChef(data.chef);
        setMenuItems(data.menuItems);
      } catch (err) {
        console.error('Failed to load chef:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChef();
  }, [id]);

  const handleAddToCart = (item) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      chefId: chef._id,
    });
  };

  if (loading) return <LoadingSpinner />;
  if (!chef) return <div className="text-center py-16 text-gray-400">Chef not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Chef Info */}
      <div className="card p-6 mb-8 flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-orange-400 rounded-full flex items-center justify-center text-5xl flex-shrink-0">
          👩‍🍳
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-800">{chef.kitchenName}</h1>
            {chef.isVerified && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">✓ Verified</span>
            )}
          </div>
          <p className="text-gray-500 mb-2">by {chef.user?.name}</p>
          <p className="text-gray-600 mb-3">{chef.bio}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {(chef.cuisines || []).map((c) => (
              <span key={c} className="bg-orange-50 text-primary border border-orange-200 text-xs px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <span>⭐ {chef.avgRating || '—'} rating</span>
            <span>📦 {chef.totalOrders || 0} total orders</span>
            <span>📍 Serves within {chef.serviceRadiusKm} km</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
      {menuItems.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No menu items available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <div key={item._id} className="card p-4 flex gap-4">
              <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                🍛
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <span className="text-primary font-bold">Rs. {item.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                <DietaryBadge tags={item.dietaryTags} />
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-3 btn-primary text-sm py-1 px-4"
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefDetail;
