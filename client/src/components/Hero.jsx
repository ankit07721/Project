import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="bg-gradient-to-br from-orange-600 via-primary to-orange-800 text-white py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        Homemade Food,<br />
        <span className="text-yellow-300">Delivered with Love</span>
      </h1>
      <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
        Sajha Chulo connects you with verified home chefs in your neighborhood.
        Enjoy authentic, fresh, and healthy home-cooked meals — just like Mamu's kitchen.
      </p>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-3 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 shadow-xl mb-8">
        <input
          type="text"
          placeholder="📍 Your city or area..."
          className="flex-1 px-4 py-2 text-gray-800 rounded-xl focus:outline-none text-sm"
        />
        <input
          type="text"
          placeholder="🍽️ Search for dishes..."
          className="flex-1 px-4 py-2 text-gray-800 rounded-xl focus:outline-none text-sm"
        />
        <Link
          to="/browse-chefs"
          className="bg-primary hover:bg-orange-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors whitespace-nowrap text-sm"
        >
          Find Food
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/browse-chefs" className="bg-white text-primary hover:bg-orange-50 font-bold py-3 px-8 rounded-xl shadow-lg transition-colors">
          🍛 Order Now
        </Link>
        <Link to="/become-chef" className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-xl transition-colors">
          👩‍🍳 Become a Chef
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-orange-200">
        <span>✅ 100+ Verified Chefs</span>
        <span>🥘 Fresh Daily Meals</span>
        <span>🚀 Quick Delivery</span>
        <span>❤️ Trusted by Families</span>
      </div>
    </div>
  </section>
);

export default Hero;
