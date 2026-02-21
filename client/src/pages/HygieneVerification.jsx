const steps = [
  {
    icon: '📝',
    title: 'Apply & Register',
    desc: 'Create your chef profile with details about your kitchen and cooking experience.',
  },
  {
    icon: '🎥',
    title: 'Submit Kitchen Video',
    desc: 'Record a short walkthrough of your kitchen showcasing cleanliness and hygiene standards.',
  },
  {
    icon: '🔍',
    title: 'Admin Review',
    desc: 'Our team reviews your kitchen video and verifies hygiene compliance within 48 hours.',
  },
  {
    icon: '✅',
    title: 'Get Approved',
    desc: 'Once verified, receive the "Verified Kitchen" badge and start accepting orders.',
  },
];

const standards = [
  'Clean cooking area and utensils',
  'Proper food storage practices',
  'Personal hygiene of the cook',
  'No contamination cross between veg and non-veg',
  'Use of clean water and fresh ingredients',
  'Pest-free kitchen environment',
];

const HygieneVerification = () => (
  <div>
    {/* Hero */}
    <div className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-16 px-4 text-center">
      <div className="text-7xl mb-4">🧼</div>
      <h1 className="text-4xl font-bold mb-3">Hygiene & Verification</h1>
      <p className="text-green-100 text-lg max-w-2xl mx-auto">
        Every chef on Sajha Chulo goes through a rigorous kitchen verification process to ensure the highest standards of hygiene and food safety.
      </p>
    </div>

    {/* Verification Process */}
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Verification Process</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Standards */}
    <section className="py-16 bg-green-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Kitchen Hygiene Standards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {standards.map((std, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
              <span className="text-green-500 text-xl mt-0.5">✓</span>
              <p className="text-gray-700">{std}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Trust Badge */}
    <section className="py-16 bg-white text-center px-4">
      <div className="max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">The Verified Kitchen Badge</h2>
        <p className="text-gray-500">
          Chefs who pass our verification receive the <strong className="text-green-700">"✓ Verified Kitchen"</strong> badge on their profile.
          This badge assures customers that the chef's kitchen meets our hygiene standards.
        </p>
      </div>
    </section>
  </div>
);

export default HygieneVerification;
