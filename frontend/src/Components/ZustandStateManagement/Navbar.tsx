import { useCartStore } from "./useCartStore";

export function Navbar() {
  // Select and derive data atomically. Re-renders only when total items count shifts.
  const totalItems = useCartStore((state) => 
    state.cart.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="font-black tracking-wider text-xl">SAVANNA EDGE</h1>
      <div className="bg-gray-800 px-4 py-2 rounded-xl border border-gray-700 flex items-center gap-2">
        <span className="text-sm font-medium">Cart Basket</span>
        <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
          {totalItems}
        </span>
      </div>
    </nav>
  );
}