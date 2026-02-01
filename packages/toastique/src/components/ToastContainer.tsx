import { useMemo } from 'react';
import type { Toast as ToastType, ToastPosition } from '../types';
import { Toast } from './Toast';
import './ToastContainer.css';

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'toastique-container--top-left',
  'top-center': 'toastique-container--top-center',
  'top-right': 'toastique-container--top-right',
  'bottom-left': 'toastique-container--bottom-left',
  'bottom-center': 'toastique-container--bottom-center',
  'bottom-right': 'toastique-container--bottom-right',
};

export const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => {
  // Group toasts by position
  const groupedToasts = useMemo(() => {
    const groups: Record<ToastPosition, ToastType[]> = {
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [],
    };

    toasts.forEach((toast) => {
      groups[toast.options.position].push(toast);
    });

    return groups;
  }, [toasts]);

  return (
    <>
      {(Object.keys(groupedToasts) as ToastPosition[]).map((position) => {
        const positionToasts = groupedToasts[position];
        if (positionToasts.length === 0) return null;

        return (
          <div
            key={position}
            className={`toastique-container ${positionClasses[position]}`}
            aria-label={`Notifications ${position}`}
          >
            {positionToasts.map((toast) => (
              <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
          </div>
        );
      })}
    </>
  );
};
