import { Link } from 'react-router-dom';

const benefits = [
  { icon: '💰', title: 'Earn from Home', desc: 'Turn your cooking skills into a steady income without leaving your kitchen.' },
  { icon: '⏰', title: 'Flexible Hours', desc: 'Cook on your own schedule. You decide when and how many orders to take.' },
  { icon: '🍽️', title: 'Your Own Menu', desc: 'Create your unique menu with the dishes you love to cook.' },
  { icon: '🌟', title: 'Build Your Brand', desc: 'Grow your reputation, get ratings, and build a loyal customer base.' },
  { icon: '🔒', title: 'Safe & Secure', desc: 'Get paid securely and enjoy the support of our platform.' },
  { icon: '📱', title: 'Easy Management', desc: 'Manage orders, menu, and subscriptions from your dashboard.' },
];

const steps = [
  { step: '1', title: 'Register', desc: 'Create your account as a chef.' },
  { step: '2', title: 'Setup Profile', desc: 'Add your kitchen name, bio, and cuisines.' },
  { step: '3', title: 'Get Verified', desc: 'Submit a short video of your kitchen for verification.' },
  { step: '4', title: 'Start Cooking', desc: 'Once approved, start receiving orders!' },
];

const BecomeChefPage = () => (
  <div>
    {/* Hero */}
    <div className="bg-gradient-to-br from-primary to-orange-800 text-white py-20 px-4 text-center">
      <div className="text-7xl mb-4">👩‍🍳</div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Chef on Sajha Chulo</h1>
      <p className="text-orange-100 text-lg max-w-2xl mx-auto mb-8">
        Share your culinary passion, earn from home, and bring the taste of homemade food to families around you.
      </p>
      <Link to="/register" className="bg-white text-primary hover:bg-orange-50 font-bold py-3 px-10 rounded-xl shadow-lg transition-colors inline-block">
        Start Your Journey
      </Link>
    </div>

    {/* Benefits */}
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Join Sajha Chulo?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{b.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{b.title}</h3>
              <p className="text-gray-500 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How to join */}
    <section className="py-16 bg-orange-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How to Get Started</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {s.step}
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/register" className="btn-primary text-lg px-10">Register Now — It's Free!</Link>
        </div>
      </div>
    </section>
  </div>
);

export default BecomeChefPage;
