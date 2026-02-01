import { useEffect, useState } from 'react';
import type { Toast as ToastType } from '../types';
import { classNames } from '../utils';
import './Toast.css';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const icons: Record<ToastType['type'], string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
  loading: '◌',
};

export const Toast = ({ toast, onDismiss }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 200); // Match animation duration
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && toast.options.dismissible) {
      handleDismiss();
    }
  };

  return (
    <div
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={classNames(
        'toastique-toast',
        `toastique-toast--${toast.type}`,
        isVisible && 'toastique-toast--visible',
        isExiting && 'toastique-toast--exiting',
        toast.options.className
      )}
    >
      <span className="toastique-toast__icon" aria-hidden="true">
        {toast.options.icon || icons[toast.type]}
      </span>
      <span className="toastique-toast__message">{toast.message}</span>
      {toast.options.dismissible && toast.type !== 'loading' && (
        <button
          type="button"
          className="toastique-toast__close"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      )}
    </div>
  );
};
