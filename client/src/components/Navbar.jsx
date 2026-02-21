import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authDropdown, setAuthDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/browse-chefs?search=${searchQuery}&city=${city}`);
  };

  const handleLogout = () => {
    logout();
    setAuthDropdown(false);
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'chef') return '/chef/dashboard';
    if (user?.role === 'admin') return '/admin/dashboard';
    return '/my-orders';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Sajha Chulo 🍲</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link to="/browse-chefs" className="text-gray-700 hover:text-primary transition-colors">Browse Chefs</Link>
            <Link to="/meal-plans" className="text-gray-700 hover:text-primary transition-colors">Meal Plans</Link>
            <Link to="/tiffin-subscription" className="text-gray-700 hover:text-primary transition-colors">Tiffin Subscription</Link>
            <Link to="/become-chef" className="text-gray-700 hover:text-primary transition-colors">Become a Chef</Link>
            <Link to="/hygiene-verification" className="text-gray-700 hover:text-primary transition-colors">Hygiene &amp; Verification</Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center space-x-3">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="City..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-32 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </form>

            <Link to="/cart" className="relative text-gray-700 hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setAuthDropdown(!authDropdown)}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span>{user.name.split(' ')[0]}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {authDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                    <Link to={getDashboardLink()} onClick={() => setAuthDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50">
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn-outline text-sm py-1 px-3">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-1 px-3">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/browse-chefs', label: 'Browse Chefs' },
              { to: '/meal-plans', label: 'Meal Plans' },
              { to: '/tiffin-subscription', label: 'Tiffin Subscription' },
              { to: '/become-chef', label: 'Become a Chef' },
              { to: '/hygiene-verification', label: 'Hygiene & Verification' },
              { to: '/cart', label: `Cart (${cartCount})` },
            ].map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg">
                {label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg">
                  Dashboard
                </Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2 px-4 pt-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline text-sm">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm">Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
