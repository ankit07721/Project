import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ChefCard from './ChefCard';
import LoadingSpinner from './LoadingSpinner';

const NearbyChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const { data } = await api.get('/api/chefs');
        setChefs(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch chefs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChefs();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Chefs Near You</h2>
            <p className="text-gray-500 mt-1">Discover verified home chefs in your area</p>
          </div>
          <Link to="/browse-chefs" className="btn-outline text-sm hidden sm:inline-block">
            View All Chefs →
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : chefs.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No chefs available yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chefs.map((chef) => <ChefCard key={chef._id} chef={chef} />)}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link to="/browse-chefs" className="btn-outline">View All Chefs →</Link>
        </div>
      </div>
    </section>
  );
};

export default NearbyChefs;
