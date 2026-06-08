import { useState } from "react";

// A. Typing props and state 
interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

interface ProductDetailsProps{
    product: Product;
    onPurchase: (quantity: number) => Promise<void>
}

export function ProductDetail({ product, onPurchase}: ProductDetailsProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handlePurchase = async () => {
        setLoading(true);
        setError(null);

        try{
            await onPurchase(quantity);
        }catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>KES {product.price}</p>

            <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1" 
            />
            {<p>{error}</p>}
            <button 
            onClick={handlePurchase}
            disabled={loading || !product.inStock}
            >
                {loading ? 'processing' : 'Buy Now'}
            </button>
        </div>
    )
}

// B. Typing Event Handlers 

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
}

export function SearchInput({value, onChange, onBlur}: InputProps) {
    //type event handlers explicitly
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            //enter logic
        }
    }

    return(
        <input
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
    )

    // common event types
    // React.ChangeEvent<HTMLInputElement>
// React.FocusEvent<HTMLInputElement>
// React.KeyboardEvent<HTMLInputElement>
// React.MouseEvent<HTMLButtonElement>
// React.FormEvent<HTMLFormElement>
}

// Advanced typing

// 1. Generic components 
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string | number;

}

function List<T>({ items, renderItem, keyExtractor}: ListProps<T>) {
    return (
        <ul>
            {items.map(item => (
                <li key={keyExtractor(item)}>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    )
}

// Union Types & Discriminated Unions
//  A. Union type 
type ButtonVariant = 'primary' | 'secondary' | 'danger';
interface ButtonProps {
    variant: ButtonVariant;
    onClick: () => void;
}

// B. Discriminated union for different form states
type FormState =
| {status: 'idle'; data: null}
| {status: 'loading'; data: null}
| {status: 'success'; data:User}
| {status: 'error'; data:null; error:string}

function UserForm({ formState }: { formState: FormState}) {
    // switch (formState.status) {
    //     case "idle":
    //         return <div>Ready to load...</div>
    //     case "loading":
    //         return <Spinner />
    //     case "success":
    //         return <UserCard user={formState.data} />
    //     case "error":
    //         return <ErrorAlert message={formState.error}
    // }
}

// type utilities
interface User {
 id: number;
 name: string;
 email: string;
}

// Pick - Selet specific properties 
type UserPreview = Pick<User, 'name' | 'email'>;

{/* Omit -exlude properties  */}
type UserWithEmail = Omit<User, 'email'>

{/* Partial - make all properties optional */}
type userDraft = Partial<User>;

{/* Required - make all properties required */}
// type FullUser = Required<UserWithoutEmail>;

{/* Readonly - Prevent mutations  */}
type ImmutableUser = Readonly<User>;

{/* Record - key-value mapping */}
type UserStatus = Record<string, 'active' | 'inactive'>;






