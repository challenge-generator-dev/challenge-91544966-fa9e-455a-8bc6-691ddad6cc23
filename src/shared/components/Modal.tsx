import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  aria-describedby?: string;
  aria-labelledby?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = 'md',
  aria_describedby,
  aria_labelledby,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getGeneratedId = useCallback((prefix: string) => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const titleId = aria_labelledby || getGeneratedId('modal-title');
  const descriptionId = description
    ? aria_describedby || getGeneratedId('modal-description')
    : undefined;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (closeOnEscape && event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [isOpen, closeOnEscape, onClose]
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      setTimeout(() => {
        const focusableElement = modalRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        focusableElement?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);

      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen && !isAnimating) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4
        ${isOpen ? 'opacity-100' : 'opacity-0'}
        transition-opacity duration-200`}
      role="presentation"
      aria-hidden="true"
      onClick={handleOverlayClick}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]}
          w-full transform transition-all duration-200
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2
            id={titleId}
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {description && (
          <div id={descriptionId} className="px-4 py-2 text-sm text-gray-600">
            {description}
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};