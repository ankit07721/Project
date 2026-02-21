const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-12 h-12 border-4 border-orange-200 border-t-primary rounded-full animate-spin mb-4"></div>
    <p className="text-gray-500">{message}</p>
  </div>
);

export default LoadingSpinner;
