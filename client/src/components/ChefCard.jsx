import { Link } from 'react-router-dom';

const ChefCard = ({ chef }) => (
  <div className="card hover:shadow-xl transition-shadow">
    {/* Photo placeholder */}
    <div className="h-40 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-6xl">
      👩‍🍳
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800">{chef.kitchenName}</h3>
        {chef.isVerified && (
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            ✓ Verified
          </span>
        )}
      </div>
      {chef.user && (
        <p className="text-sm text-gray-500 mb-2">by {chef.user.name}</p>
      )}
      <div className="flex flex-wrap gap-1 mb-3">
        {(chef.cuisines || []).map((c) => (
          <span key={c} className="bg-orange-50 text-primary text-xs px-2 py-0.5 rounded-full border border-orange-200">
            {c}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>⭐ {chef.avgRating || '—'} rating</span>
        <span>📦 {chef.totalOrders || 0} orders</span>
        {chef.distanceKm != null && (
          <span>📍 {chef.distanceKm.toFixed(1)} km</span>
        )}
      </div>
      <Link
        to={`/chefs/${chef._id}`}
        className="btn-primary w-full text-center block text-sm"
      >
        View Menu
      </Link>
    </div>
  </div>
);

export default ChefCard;
