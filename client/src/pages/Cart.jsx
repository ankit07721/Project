import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, cartTotal, cartChefId } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Browse chefs and add some delicious food to your cart!</p>
        <Link to="/browse-chefs" className="btn-primary inline-block">Browse Chefs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Cart</h1>
      <p className="text-gray-500 mb-6">{cartItems.length} item(s) from {cartItems[0]?.chefId ? 'a chef' : ''}</p>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item._id} className="card p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
              🍛
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{item.name}</h3>
              <p className="text-primary font-semibold">Rs. {item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item._id)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center font-bold transition-colors"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => addToCart(item)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 flex items-center justify-center font-bold transition-colors"
              >
                +
              </button>
            </div>
            <div className="text-right min-w-[80px]">
              <p className="font-bold text-gray-800">Rs. {item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="card p-6">
        <div className="flex justify-between items-center text-lg mb-4">
          <span className="font-semibold text-gray-700">Subtotal</span>
          <span className="font-bold text-gray-800">Rs. {cartTotal}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>Delivery</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="border-t pt-4 flex justify-between items-center text-xl font-bold text-gray-800 mb-6">
          <span>Total</span>
          <span className="text-primary">Rs. {cartTotal}</span>
        </div>
        <div className="flex gap-3">
          <button onClick={clearCart} className="btn-outline flex-1">Clear Cart</button>
          <Link to="/checkout" className="btn-primary flex-1 text-center">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
