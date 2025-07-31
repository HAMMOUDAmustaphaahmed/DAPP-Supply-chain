import React from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'date' | 'email' | 'password';
  placeholder?: string;
  value: string | number | undefined; // Modifié pour accepter undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  label,
  error,
  required = false,
  min,
  max,
  step
}) => {
  // Gérer la valeur undefined
  const inputValue = value === undefined ? '' : value;

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`form-control ${error ? 'error' : ''} ${className}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        step={step}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Input;