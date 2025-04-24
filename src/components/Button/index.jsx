import React from 'react';

const Button = ({
  children,
  type = 'button',
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  className = '',
  iconLeft,
  iconRight,
  ...props
}) => {
  // Base classes that apply to all buttons
  const baseClasses = 'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-blue-500',
  };

  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  // Disabled state
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  // Full width
  const fullWidthClasses = 'w-full';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? disabledClasses : ''}
        ${fullWidth ? fullWidthClasses : ''}
        ${className}
      `}
      {...props}
    >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
          {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button;