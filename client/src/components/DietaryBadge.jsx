const tagConfig = {
  isVeg: { label: 'Veg', color: 'bg-green-100 text-green-700 border-green-200' },
  isNonVeg: { label: 'Non-Veg', color: 'bg-red-100 text-red-700 border-red-200' },
  diabeticFriendly: { label: 'Diabetic Friendly', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  softFood: { label: 'Soft Food', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  lowOil: { label: 'Low Oil', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
};

const spiceLevelConfig = {
  mild: { label: '🌶 Mild', color: 'bg-green-50 text-green-600 border-green-200' },
  medium: { label: '🌶🌶 Medium', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  hot: { label: '🌶🌶🌶 Hot', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  'extra-hot': { label: '🌶🌶🌶🌶 Extra Hot', color: 'bg-red-100 text-red-700 border-red-200' },
};

const DietaryBadge = ({ tags }) => {
  if (!tags) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {Object.entries(tagConfig).map(([key, cfg]) =>
        tags[key] ? (
          <span key={key} className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.color}`}>
            {cfg.label}
          </span>
        ) : null
      )}
      {tags.spiceLevel && spiceLevelConfig[tags.spiceLevel] && (
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${spiceLevelConfig[tags.spiceLevel].color}`}>
          {spiceLevelConfig[tags.spiceLevel].label}
        </span>
      )}
    </div>
  );
};

export default DietaryBadge;
