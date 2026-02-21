import { Link } from 'react-router-dom';

const BecomeChef = () => (
  <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <div className="text-6xl mb-4">👨‍🍳</div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Culinary Passion</h2>
      <p className="text-orange-100 text-lg mb-6 max-w-2xl mx-auto">
        Are you a home cook who loves making delicious food? Join Sajha Chulo as a chef, earn from home,
        and bring joy to families in your community.
      </p>
      <ul className="flex flex-wrap justify-center gap-6 text-orange-100 text-sm mb-8">
        <li>✅ Flexible working hours</li>
        <li>✅ Earn from your kitchen</li>
        <li>✅ Set your own menu & prices</li>
        <li>✅ Build your own brand</li>
      </ul>
      <Link
        to="/register"
        className="bg-white text-primary hover:bg-orange-50 font-bold py-3 px-10 rounded-xl shadow-lg transition-colors inline-block"
      >
        Register as Chef
      </Link>
    </div>
  </section>
);

export default BecomeChef;
