import React, { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  aria-describedby?: string;
  aria-controls?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className = '',
      children,
      aria-describedby,
      aria-controls,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const widthClass = fullWidth ? 'w-full' : '';

    const getAriaAttributes = () => {
      const attrs: Record<string, string | boolean> = {
        'aria-disabled': isDisabled,
      };

      if (loading) {
        attrs['aria-busy'] = true;
      }

      if (aria-describedby) {
        attrs['aria-describedby'] = aria-describedby;
      }

      if (aria_controls) {
        attrs['aria-controls'] = aria_controls;
      }

      if (loading && children) {
        const labelId = `${props.id || 'button'}-loading-label`;
        attrs['aria-label'] = `Cargando, por favor espere`;
        attrs['aria-describedby'] = labelId;
      }

      return attrs;
    };

    const baseClasses = `
      inline-flex items-center justify-center font-medium rounded-lg
      transition-colors duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `.replace(/\s+/g, ' ').trim();

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${className}`}
        {...getAriaAttributes()}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2" aria-hidden="true">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2" aria-hidden="true">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';