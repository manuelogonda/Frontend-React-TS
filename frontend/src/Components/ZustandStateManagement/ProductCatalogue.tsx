import { useCartStore, type Product } from "./useCartStore";

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Cloud Native Developer Hoodie', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' },
  { id: 'p2', name: 'Mechanical Ergonomic Keyboard', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500' },
];

export function ProductCatalog() {
  // Atomically select just the mutation action function
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {MOCK_PRODUCTS.map((product) => (
        <div key={product.id} className="bg-white border rounded-xl p-4 shadow-sm flex gap-4">
          <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="font-bold text-gray-900">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1">${product.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => addItem(product)}
              className="mt-3 bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition self-start"
            >
              Add To Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}