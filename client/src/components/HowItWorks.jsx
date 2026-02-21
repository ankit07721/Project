const steps = [
  { step: '1', icon: '👩‍🍳', title: 'Choose Chef', desc: 'Browse verified home chefs near you and explore their menus.' },
  { step: '2', icon: '🍽️', title: 'Select Meals', desc: 'Pick your favourite dishes and add them to cart.' },
  { step: '3', icon: '📅', title: 'Schedule Delivery', desc: 'Choose your delivery time and address.' },
  { step: '4', icon: '😋', title: 'Enjoy!', desc: 'Receive freshly cooked food right at your doorstep.' },
];

const HowItWorks = () => (
  <section className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">How It Works</h2>
      <p className="text-center text-gray-500 mb-12">Order homemade food in just 4 simple steps.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, idx) => (
          <div key={s.step} className="text-center relative">
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-3/4 w-1/2 border-t-2 border-dashed border-orange-200 z-0" />
            )}
            <div className="relative z-10 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              {s.icon}
            </div>
            <div className="w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center mx-auto -mt-2 mb-3">
              {s.step}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
            <p className="text-gray-500 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
