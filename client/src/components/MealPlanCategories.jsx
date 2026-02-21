import { Link } from 'react-router-dom';

const categories = [
  { icon: '🍱', title: 'Daily Tiffin', desc: 'Fresh lunch and dinner delivered daily to your doorstep.', link: '/tiffin-subscription' },
  { icon: '📅', title: 'Weekly Meal Plan', desc: 'Curated weekly menus tailored to your taste and dietary needs.', link: '/meal-plans' },
  { icon: '📆', title: 'Monthly Subscription', desc: 'Save more with monthly plans. Perfect for working professionals.', link: '/meal-plans' },
  { icon: '🥗', title: 'Special Diet Plans', desc: 'Diabetic-friendly, soft food, low-oil meals crafted by health-conscious chefs.', link: '/meal-plans' },
];

const MealPlanCategories = () => (
  <section className="py-16 bg-orange-50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Meal Services</h2>
      <p className="text-center text-gray-500 mb-10">Choose the meal plan that fits your lifestyle.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link key={cat.title} to={cat.link} className="card p-6 hover:shadow-xl transition-shadow group">
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary mb-2 transition-colors">{cat.title}</h3>
            <p className="text-gray-500 text-sm">{cat.desc}</p>
            <span className="inline-block mt-3 text-primary text-sm font-semibold group-hover:underline">Learn more →</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default MealPlanCategories;
