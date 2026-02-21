const trustPoints = [
  {
    icon: '🏠',
    title: 'Verified Kitchens',
    desc: 'Every chef goes through our rigorous kitchen hygiene verification process before being listed.',
  },
  {
    icon: '🌿',
    title: 'Fresh Ingredients',
    desc: 'Chefs use fresh, locally sourced ingredients daily to prepare your meals.',
  },
  {
    icon: '⏰',
    title: 'On-time Delivery',
    desc: 'We ensure your meals are delivered hot and on time, every time.',
  },
  {
    icon: '🧼',
    title: 'Health & Hygiene',
    desc: 'Strict hygiene standards are maintained at every step from cooking to delivery.',
  },
];

const TrustSection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Why Trust Sajha Chulo?</h2>
      <p className="text-center text-gray-500 mb-10">We prioritize quality, hygiene, and reliability above everything else.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustPoints.map((point) => (
          <div key={point.title} className="text-center p-6 rounded-xl border border-orange-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">{point.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{point.title}</h3>
            <p className="text-gray-500 text-sm">{point.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
