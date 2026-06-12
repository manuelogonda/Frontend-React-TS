import { useReducer } from "react";

// A. Define the structural anatomy of our centralized State
interface CheckoutState {
  fullName: string;
  shippingAddress: string;
  paymentMethod: 'MPESA' | 'CARD';
  isSubmitting: boolean;
  isSuccess: boolean;
}

// B. Enforce a strict Discriminated Union for our Actions
type CheckoutAction =
  | { type: 'UPDATE_FIELD'; field: 'fullName' | 'shippingAddress'; value: string }
  | { type: 'SET_PAYMENT'; method: 'MPESA' | 'CARD' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'RESET_FORM' };

const initialState: CheckoutState = {
  fullName: '',
  shippingAddress: '',
  paymentMethod: 'MPESA',
  isSubmitting: false,
  isSuccess: false,
};

// C. The Pure Reducer Engine (No side-effects allowed inside)
function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_PAYMENT':
      return { ...state, paymentMethod: action.method };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, isSuccess: true };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

export function CheckoutForm() {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });

    // Simulate backend network latency (e.g., hitting a Spring Boot endpoint)
    setTimeout(() => {
      dispatch({ type: 'SUBMIT_SUCCESS' });
    }, 2000);
  };

  if (state.isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-6 text-center p-6 bg-green-50 border border-green-200 rounded-xl">
        <h2 className="text-xl font-bold text-green-800">Order Dispatched Successfully!</h2>
        <p className="text-sm text-green-600 mt-2">Thank you for your purchase, {state.fullName}.</p>
        <button
          onClick={() => dispatch({ type: 'RESET_FORM' })}
          className="mt-4 text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          New Transaction
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 p-6 bg-white border border-gray-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Secure Gateway Checkout</h2>
      
      <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
        <input
          type="text"
          value={state.fullName}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'fullName', value: e.target.value })}
          className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={state.isSubmitting}
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Shipping Address</label>
        <textarea
          value={state.shippingAddress}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'shippingAddress', value: e.target.value })}
          className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
          disabled={state.isSubmitting}
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Payment Category</label>
        <div className="grid grid-cols-2 gap-4">
          {(['MPESA', 'CARD'] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => dispatch({ type: 'SET_PAYMENT', method })}
              className={`p-3 rounded-lg border text-sm font-bold transition ${
                state.paymentMethod === method
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              disabled={state.isSubmitting}
            >
              {method === 'MPESA' ? '⚡ M-Pesa' : '💳 Bank Card'}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={state.isSubmitting}
        className="w-full mt-2 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black disabled:bg-gray-300 transition-colors"
      >
        {state.isSubmitting ? 'Processing Transaction...' : 'Complete Payment'}
      </button>
    </form>
  );
}