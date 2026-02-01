import { useContext, useCallback } from 'react';
import { ToastContext } from '../context/ToastContext';
import type { ToastOptions, ToastPromiseOptions } from '../types';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, dismissToast, dismissAll, updateToast } = context;

  const success = useCallback(
    (message: string, options?: ToastOptions) => addToast('success', message, options),
    [addToast]
  );

  const error = useCallback(
    (message: string, options?: ToastOptions) => addToast('error', message, options),
    [addToast]
  );

  const warning = useCallback(
    (message: string, options?: ToastOptions) => addToast('warning', message, options),
    [addToast]
  );

  const info = useCallback(
    (message: string, options?: ToastOptions) => addToast('info', message, options),
    [addToast]
  );

  const loading = useCallback(
    (message: string, options?: ToastOptions) => addToast('loading', message, options),
    [addToast]
  );

  const promise = useCallback(
    <T>(
      promiseOrFn: Promise<T> | (() => Promise<T>),
      messages: ToastPromiseOptions,
      options?: ToastOptions
    ): Promise<T> => {
      const id = addToast('loading', messages.loading, { ...options, duration: Infinity });

      const promise = typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn;

      promise
        .then((data) => {
          const successMessage =
            typeof messages.success === 'function'
              ? messages.success(data)
              : messages.success;
          updateToast(id, { type: 'success', message: successMessage });

          // Auto dismiss after success
          setTimeout(() => {
            dismissToast(id);
          }, options?.duration ?? 4000);
        })
        .catch((err) => {
          const errorMessage =
            typeof messages.error === 'function'
              ? messages.error(err)
              : messages.error;
          updateToast(id, { type: 'error', message: errorMessage });

          // Auto dismiss after error
          setTimeout(() => {
            dismissToast(id);
          }, options?.duration ?? 4000);
        });

      return promise;
    },
    [addToast, updateToast, dismissToast]
  );

  const dismiss = useCallback(
    (id: string) => dismissToast(id),
    [dismissToast]
  );

  return {
    success,
    error,
    warning,
    info,
    loading,
    promise,
    dismiss,
    dismissAll,
  };
};
