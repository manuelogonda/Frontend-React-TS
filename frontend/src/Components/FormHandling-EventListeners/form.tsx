import { useState } from "react";
import { useTheme } from "../StateManagement/UseStateThemeToggler";

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
        const { isDark } = useTheme();
        const hasError = touched && error;

        return (
            <div className="mb-6">
                <label
                htmlFor={name}
                className={`
                    block text-sm font-medium mb-2
                    ${isDark ? 'text-ray-300' : 'text-gray-700'}
                    `}
                >{label}
                {required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {/* input */}
                <input 
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                    transition-colors duration-300
                    w-full px-4 py-2 rounded-lg border-2 focus:outline-none
                    disabled:opacity-50 cursor-not-allowed
                    ${hasError ? 
                        `${isDark ? 'border-red-500 bg-red-900/20' : 'border-red-500 bg-red-50'}` : 
                    `${isDark ? 'border-gray-600 bg-gray-700 text-white focus:border-blue-500' :
                        'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    }`}
                `}
                />

                {/* Error Message */}
                {hasError && (
                    <p className={`
                    mt-2 text-sm font-medium
                    ${isDark ? 'text-red-400' : 'text-red-600'}
                    `}>
                    {error}
                    </p>
                )}

                {/* Help Text */}
                {!hasError && helpText && (
                    <p className={`
                    mt-2 text-sm
                    ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}>
                    {helpText}
                    </p>
                )}
            </div>
        )
    }

    //checkbox component
    interface FormCheckboxProps {
    name: string;
    label: string | React.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
      onBlur?: () => void;
    error?: string;
    touched?: boolean;
    required?: boolean;
    disabled?: boolean;
}

export function FormCheckbox({
  name,
  label,
  checked,
  onChange,
  error,
  touched,
  required,
  disabled
}: FormCheckboxProps) {
  const { isDark } = useTheme();
  const hasError = touched && error;

  return (
    <div className="mb-6">
      <label className="flex items-start gap-3 cursor-pointer">
        {/* Checkbox */}
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        //   onBlur={onBlur}
          disabled={disabled}
          className="mt-1 w-5 h-5 accent-blue-500 cursor-pointer disabled:opacity-50"
        />

        {/* Label */}
        <span className={`
          text-sm
          ${isDark ? 'text-gray-300' : 'text-gray-700'}
        `}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>

      {/* Error */}
      {hasError && (
        <p className={`
          mt-2 text-sm font-medium ml-8
          ${isDark ? 'text-red-400' : 'text-red-600'}
        `}>
          {error}
        </p>
      )}
    </div>
  );
}

// complete registration form
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

interface FormTouched {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  agreeTerms?: boolean;
}

export function RegistrationMainForm() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  ///validation logic
    const validateField = (fieldName: keyof FormData) => {
    let error = '';

    switch (fieldName) {
      case 'name': {
        const result = validateName(formData.name);
        error = result.message;
        break;
      }
      case 'email': {
        const result = validateEmail(formData.email);
        error = result.message;
        break;
      }
      case 'password': {
        const result = validatePassword(formData.password);
        error = result.message;
        break;
      }
      case 'confirmPassword': {
        const result = validatepasswordMatch(
          formData.password,
          formData.confirmPassword
        );
        error = result.message;
        break;
      }
      case 'agreeTerms': {
        if (!formData.agreeTerms) {
          error = 'You must agree to the terms';
        }
        break;
      }
    }

    return error;
  };

  const validateAllFields = (): boolean => { 
    const newErrors: FormErrors = {};

    const nameError = validateField('name');
    if (nameError) newErrors.name = nameError;

    const emailError = validateField('email');
    if (emailError) newErrors.email = emailError;

    const passwordError = validateField('password');
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateField('confirmPassword');
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    const agreeError = validateField('agreeTerms');
    if (agreeError) newErrors.agreeTerms = agreeError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  ///input handlers
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate on blur
    const error = validateField(field);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  //form submission
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    if (!validateAllFields()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real app, would be actual API call:
      // const res = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await res.json();

      console.log('Form submitted:', formData);

      setSubmitStatus('success');
      setSubmitMessage('✅ Registration successful! Welcome!');

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
      setTouched({});
      setErrors({});

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        '❌ Registration failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && formData.agreeTerms;
   return (
    <div className={`
      transition-colors duration-300 min-h-screen flex items-center justify-center p-4
      ${isDark ? 'bg-gray-900' : 'bg-gray-50'}
    `}>
      <div className={`
        transition-colors duration-300 w-full max-w-md rounded-2xl shadow-2xl p-8
        ${isDark ? 'bg-gray-800' : 'bg-white'}
      `}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Join us today and get started
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className={`
            mb-6 p-4 rounded-lg
            ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'}
            border ${isDark ? 'border-green-800' : 'border-green-200'}
          `}>
            {submitMessage}
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className={`
            mb-6 p-4 rounded-lg
            ${isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'}
            border ${isDark ? 'border-red-800' : 'border-red-200'}
          `}>
            {submitMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <FormInput
            name="name"
            type="text"
            label="Full Name"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            onBlur={() => handleBlur('name')}
            error={errors.name}
            touched={touched.name}
            placeholder="John Doe"
            disabled={isSubmitting}
            required
          />

          {/* Email */}
          <FormInput
            name="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            onBlur={() => handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            placeholder="john@example.com"
            disabled={isSubmitting}
            required
          />

          {/* Password */}
          <FormInput
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            onBlur={() => handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            placeholder="••••••"
            disabled={isSubmitting}
            required
            helpText="At least 6 characters with uppercase, lowercase, and numbers"
          />

          {/* Confirm Password */}
          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange('confirmPassword', value)}
            onBlur={() => handleBlur('confirmPassword')}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            placeholder="••••••"
            disabled={isSubmitting}
            required
          />

          {/* Terms Checkbox */}
          <FormCheckbox
            name="agreeTerms"
            label={
              <span>
                I agree to the{' '}
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  Terms and Conditions
                </a>
              </span>
            }
            checked={formData.agreeTerms}
            onChange={(checked) => handleInputChange('agreeTerms', checked)}
            onBlur={() => handleBlur('agreeTerms')}
            error={errors.agreeTerms}
            touched={touched.agreeTerms}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className={`
              w-full py-3 rounded-lg font-semibold transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isSubmitting || !isFormValid
                ? isDark
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gray-400 cursor-not-allowed'
                : isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-transparent border-t-white rounded-full animate-spin" />
                Registering...
              </div>
            ) : (
              'Register'
            )}
          </button>

          {/* Login Link */}
          <p className={`
            text-center mt-6 text-sm
            ${isDark ? 'text-gray-400' : 'text-gray-600'}
          `}>
            Already have an account?{' '}
            <a
              href="#"
              className={`
                font-medium transition-colors
                ${isDark
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-500 hover:text-blue-600'
                }
              `}
            >
              Sign in
            </a>
          </p>
        </form>

        {/* Form Status Info */}
        <div className={`
          mt-8 p-4 rounded-lg text-xs
          ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}
        `}>
          <p className="font-medium mb-2">Form Status:</p>
          <ul className="space-y-1">
            <li>
              {errors.name ? '❌' : formData.name ? '✅' : '⭕'} Name
            </li>
            <li>
              {errors.email ? '❌' : formData.email ? '✅' : '⭕'} Email
            </li>
            <li>
              {errors.password ? '❌' : formData.password ? '✅' : '⭕'} Password
            </li>
            <li>
              {errors.confirmPassword ? '❌' : formData.confirmPassword ? '✅' : '⭕'} Confirm
            </li>
            <li>
              {errors.agreeTerms ? '❌' : formData.agreeTerms ? '✅' : '⭕'} Terms
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

}