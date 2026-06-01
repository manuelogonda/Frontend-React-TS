import { useState } from "react";

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [isSubmitting, setisSubmitting] = useState(false);

    //input values from useState
    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e:any) => {
        e.prventDefault();
        //validation logichere
        //subbmit
        //Update UI
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}
            <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange} 
            />
            {errors.email && <p>{errors.email}</p>}
            <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register"}
            </button>
        </form>
    )
}

//controlled component example
    function ControlledExample() {
        const [text, setText] = useState('');
        return (
            <div>
                {/* controlled input */}
                <input 
                type="text"
                 value={text} // value comes from state
                 onChange = {(e) => setText(e.target.value)} //update state
                 />

                 <p>You typed: {text}</p>
                 {/* //clear buttton */}
                 <button onClick={() => setText('')}>Clear</button>
            </div>
        )
    }

    //controlled components and events lab
    // A. multi-from step 
    export function MultiStepForm() {
        const [step, setStep] = useState(1);
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
            phone: '',
            address: ''
        })

        const goNext = () => setStep(prev => prev + 1);
        const goBack = () => setStep(prev => prev - 1);

        return (
            <div>
            { step === 1 && (
                <div>
                    <h2>Step 1: Basic Info</h2>
                    <input 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    placeholder="Name"
                    />

                    <input 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    placeholder="Email"
                    />
                    <button onClick={goNext}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div>
                <h2>Step 2: Security</h2>
                <input 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                placeholder="Password"
                />
                <button onClick={goBack}>Back</button>
                <button onClick={goNext}>Next</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>Step 3: Contact Info</h2>
                    <input 
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    placeholder="Phone"
                    />
                    <input 
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({...prev, address: e.target.value}))}
                    placeholder="Address"
                    />
                    <button onClick={goBack}>Back</button>
                    <button onClick={goNext} disabled={step === 3}>Next</button>
                    <button onClick={() => console.log(formData)}>Submit</button>
                </div>
            )}
            <p>Step: {step} of 3</p>
            </div>
            
        )
    }

    // validation utils

    export interface ValidationError {
        isValid: boolean;
        message: string;
    }

    export const validateName = (name: string) : ValidationError => {
        if(!name.trimEnd()) {
            return {isValid: false, message: "Name is required"};
        }

        if(name.length < 4) {
            return {isValid: false, message: "Name must be at least 4 characters"};
        }

        if(name.length > 20) {
            return {isValid: false, message: "Name must be less than 20 characters"};
        }
        return {isValid: true, message: ""};
    }

    export const validateEmail = (email: string) : ValidationError => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email.trimEnd()) {
            return {isValid: false, message: "Email is required"};
        }
        if(!emailRegex.test(email)) {
            return {isValid: false, message: "Invalid email format"};
        }
        return { isValid: true, message: ""};
    }

    export const validatePassword = (password: string) : ValidationError => {
        if(!password) {
            return {isValid: false, message: "Password is required"};
        }

        if(password.length < 6) {
            return {isValid: false, message: "Password must be at least 6 characters"};
        }

        if(password.length > 30) {
            return {isValid: false, message: "Password too long"};
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            return {
            isValid: false,
            message: 'Password must contain uppercase, lowercase, and numbers'
            };
        }
        return {isValid: true, message: ""};
    }

    export const validatepasswordMatch = (password: string, confirmPassword: string) : ValidationError => {
        if(password !== confirmPassword) {
            return {isValid: false, message: "Passwords do not match"};
        }
        return {isValid: true, message: ""};
    }

    //form input component
    interface FormInputProps {
        name: string;
        type?: 'text' | 'email' | 'password';
        label: string;
        value: string;
        onChange: (value: string) => void;
        onBlur?: () => void;
        error?: string;
        touched?: boolean;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        helpText?: string;
    }

    export function FormInput({
        name,
        type = 'text',
        label,
        value,
        onChange,
        onBlur,
        error,
        touched,
        placeholder,
        disabled,
        required,
        helpText
    }: FormInputProps) {
        const hasError = touched && error;
    }