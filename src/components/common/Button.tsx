import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'success' | 'danger' | 'default';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  onClick,
  children,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseStyles = 'btn';
  const variantStyles = {
    primary: 'btn-primary',
    success: 'btn-success',
    danger: 'btn-danger',
    default: 'btn-default'
  };
  const sizeStyles = {
    sm: 'text-sm px-2 py-1',
    md: 'px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;