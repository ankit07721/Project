import { Link } from 'react-router-dom';

const plans = [
  {
    icon: '📅',
    title: 'Weekly Meal Plan',
    desc: 'Get 7 days of curated home-cooked meals. Perfect for busy professionals.',
    price: 'From Rs. 1,500/week',
    features: ['7 lunches or dinners', 'Chef selection', 'Dietary customization', 'Free delivery'],
    color: 'border-primary',
    badge: 'Popular',
  },
  {
    icon: '📆',
    title: 'Monthly Subscription',
    desc: 'Best value! Enjoy 30 days of fresh home-cooked meals with extra savings.',
    price: 'From Rs. 5,000/month',
    features: ['30 days of meals', 'Priority chef access', 'Full dietary customization', 'Free delivery', '10% savings'],
    color: 'border-secondary',
    badge: 'Best Value',
  },
  {
    icon: '🥗',
    title: 'Special Diet Plan',
    desc: 'Health-focused meal plans for diabetic patients, elderly, and health-conscious eaters.',
    price: 'From Rs. 2,000/week',
    features: ['Nutritionist-guided menus', 'Diabetic-friendly options', 'Soft food options', 'Low oil & low sugar'],
    color: 'border-blue-400',
    badge: 'Health',
  },
];

const MealPlans = () => (
  <div className="max-w-6xl mx-auto px-4 py-12">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-3">Meal Plans</h1>
      <p className="text-gray-500 text-lg max-w-2xl mx-auto">
        Choose from our flexible meal plans and enjoy delicious home-cooked food every day.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div key={plan.title} className={`card border-t-4 ${plan.color} p-6 relative`}>
          {plan.badge && (
            <span className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              {plan.badge}
            </span>
          )}
          <div className="text-4xl mb-3">{plan.icon}</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h2>
          <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
          <p className="text-primary font-bold text-lg mb-4">{plan.price}</p>
          <ul className="space-y-2 mb-6">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span> {f}
              </li>
            ))}
          </ul>
          <Link to="/tiffin-subscription" className="btn-primary w-full text-center block">
            Subscribe Now
          </Link>
        </div>
      ))}
    </div>

    <div className="mt-12 bg-orange-50 rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Custom Meal Plan?</h2>
      <p className="text-gray-500 mb-6">Have special dietary requirements? Our chefs can create a personalized meal plan just for you.</p>
      <Link to="/browse-chefs" className="btn-primary inline-block">Browse Chefs & Customize</Link>
    </div>
  </div>
);

export default MealPlans;
