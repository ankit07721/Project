import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ChefCard from '../components/ChefCard';
import LoadingSpinner from '../components/LoadingSpinner';

const BrowseChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [range, setRange] = useState(50);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initialCity = searchParams.get('city') || '';
    setCity(initialCity);
    fetchChefs(initialCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchChefs = async (cityVal) => {
    setLoading(true);
    try {
      const params = {};
      const { data } = await api.get('/api/chefs', { params });
      setChefs(data);
    } catch (err) {
      console.error('Failed to load chefs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchChefs(city);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Chefs</h1>
      <p className="text-gray-500 mb-8">Find verified home chefs near you</p>

      {/* Filters */}
      <form onSubmit={handleSearch} className="bg-white rounded-xl shadow p-4 mb-8 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">City / Area</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Kathmandu"
            className="input-field"
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Range: {range} km</label>
          <input
            type="range"
            min={1}
            max={100}
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <button type="submit" className="btn-primary">Search</button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : chefs.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-4">🍳</div>
          <p className="text-xl">No chefs found. Try a different area!</p>
        </div>
      ) : (
        <>
          <p className="text-gray-500 mb-4 text-sm">{chefs.length} chef(s) found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {chefs.map((chef) => <ChefCard key={chef._id} chef={chef} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default BrowseChefs;
