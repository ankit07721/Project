import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import BrowseChefs from './pages/BrowseChefs';
import ChefDetail from './pages/ChefDetail';
import MealPlans from './pages/MealPlans';
import TiffinSubscription from './pages/TiffinSubscription';
import BecomeChefPage from './pages/BecomeChefPage';
import HygieneVerification from './pages/HygieneVerification';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

import ChefDashboard from './pages/chef/ChefDashboard';
import ChefOrders from './pages/chef/ChefOrders';
import ChefMenu from './pages/chef/ChefMenu';
import ChefProfile from './pages/chef/ChefProfile';
import ChefVerification from './pages/chef/ChefVerification';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVerifications from './pages/admin/AdminVerifications';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse-chefs" element={<BrowseChefs />} />
              <Route path="/chefs/:id" element={<ChefDetail />} />
              <Route path="/meal-plans" element={<MealPlans />} />
              <Route path="/tiffin-subscription" element={<TiffinSubscription />} />
              <Route path="/become-chef" element={<BecomeChefPage />} />
              <Route path="/hygiene-verification" element={<HygieneVerification />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              <Route path="/my-orders" element={
                <ProtectedRoute roles={['customer', 'caregiver']}>
                  <MyOrders />
                </ProtectedRoute>
              } />

              <Route path="/chef/dashboard" element={
                <ProtectedRoute roles={['chef']}>
                  <ChefDashboard />
                </ProtectedRoute>
              } />
              <Route path="/chef/orders" element={
                <ProtectedRoute roles={['chef']}>
                  <ChefOrders />
                </ProtectedRoute>
              } />
              <Route path="/chef/menu" element={
                <ProtectedRoute roles={['chef']}>
                  <ChefMenu />
                </ProtectedRoute>
              } />
              <Route path="/chef/profile" element={
                <ProtectedRoute roles={['chef']}>
                  <ChefProfile />
                </ProtectedRoute>
              } />
              <Route path="/chef/verification" element={
                <ProtectedRoute roles={['chef']}>
                  <ChefVerification />
                </ProtectedRoute>
              } />

              <Route path="/admin/dashboard" element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/verifications" element={
                <ProtectedRoute roles={['admin']}>
                  <AdminVerifications />
                </ProtectedRoute>
              } />

              {/* 404 */}
              <Route path="*" element={
                <div className="text-center py-20">
                  <div className="text-8xl mb-4">🍳</div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</h1>
                  <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn-primary inline-block">Go Home</a>
                </div>
              } />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-gray-400 py-8 text-center text-sm">
            <p className="text-white font-semibold text-lg mb-1">Sajha Chulo 🍲</p>
            <p>Homemade Food, Delivered with Love</p>
            <p className="mt-2">© {new Date().getFullYear()} Sajha Chulo. All rights reserved.</p>
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
