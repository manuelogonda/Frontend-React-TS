import { useCartStore } from "./useCartStore";

export function ShoppingCartDashboard() {
  const { cart, updateQuantity, removeItem, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    updateQuantity: state.updateQuantity,
    removeItem: state.removeItem,
    clearCart: state.clearCart,
  }));

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-6 bg-gray-50 border border-dashed rounded-xl text-center text-gray-500">
        Your dynamic shopping basket is currently empty.
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-lg font-bold text-gray-900">Order Manifest Summary</h2>
        <button onClick={clearCart} className="text-xs text-red-600 font-semibold hover:underline">
          Clear All Items
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {cart.map((item) => (
          <div key={item.id} className="py-3 flex justify-between items-center gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900 truncate">{item.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">${item.price.toFixed(2)} each</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded flex items-center justify-center text-sm font-bold"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded flex items-center justify-center text-sm font-bold"
              >
                +
              </button>
            </div>

            <div className="text-right min-w-[70px]">
              <span className="text-sm font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="block text-[10px] text-gray-400 hover:text-red-500 mt-0.5 ml-auto"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex justify-between items-center font-black text-gray-900 text-lg">
        <span>Aggregate Total due:</span>
        <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}