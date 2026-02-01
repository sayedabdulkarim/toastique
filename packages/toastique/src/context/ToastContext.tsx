import { createContext, useCallback, useReducer, useMemo } from 'react';
import type {
  Toast,
  ToastType,
  ToastOptions,
  ToastContextValue,
  ToastProviderProps,
  ToastPosition,
} from '../types';
import { generateId } from '../utils';
import { ToastContainer } from '../components/ToastContainer';

type ToastAction =
  | { type: 'ADD'; payload: Toast }
  | { type: 'DISMISS'; payload: string }
  | { type: 'DISMISS_ALL' }
  | { type: 'UPDATE'; payload: { id: string; updates: Partial<Pick<Toast, 'type' | 'message'>> } };

const toastReducer = (state: Toast[], action: ToastAction): Toast[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DISMISS':
      return state.filter((toast) => toast.id !== action.payload);
    case 'DISMISS_ALL':
      return [];
    case 'UPDATE':
      return state.map((toast) =>
        toast.id === action.payload.id
          ? { ...toast, ...action.payload.updates }
          : toast
      );
    default:
      return state;
  }
};

export const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 4000;
const DEFAULT_POSITION: ToastPosition = 'top-right';
const DEFAULT_MAX_TOASTS = 5;

export const ToastProvider = ({
  children,
  defaultPosition = DEFAULT_POSITION,
  defaultDuration = DEFAULT_DURATION,
  maxToasts = DEFAULT_MAX_TOASTS,
}: ToastProviderProps) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = useCallback(
    (type: ToastType, message: string, options?: ToastOptions): string => {
      const id = generateId();
      const toast: Toast = {
        id,
        type,
        message,
        options: {
          duration: options?.duration ?? (type === 'loading' ? Infinity : defaultDuration),
          position: options?.position ?? defaultPosition,
          dismissible: options?.dismissible ?? true,
          icon: options?.icon,
          className: options?.className,
          onClose: options?.onClose,
        },
        createdAt: Date.now(),
      };

      dispatch({ type: 'ADD', payload: toast });

      // Auto dismiss (except for loading toasts)
      if (toast.options.duration !== Infinity) {
        setTimeout(() => {
          dispatch({ type: 'DISMISS', payload: id });
          options?.onClose?.();
        }, toast.options.duration);
      }

      return id;
    },
    [defaultDuration, defaultPosition]
  );

  const dismissToast = useCallback((id: string) => {
    const toast = toasts.find((t) => t.id === id);
    dispatch({ type: 'DISMISS', payload: id });
    toast?.options.onClose?.();
  }, [toasts]);

  const dismissAll = useCallback(() => {
    toasts.forEach((toast) => toast.options.onClose?.());
    dispatch({ type: 'DISMISS_ALL' });
  }, [toasts]);

  const updateToast = useCallback(
    (id: string, updates: Partial<Pick<Toast, 'type' | 'message'>>) => {
      dispatch({ type: 'UPDATE', payload: { id, updates } });
    },
    []
  );

  // Limit visible toasts
  const visibleToasts = useMemo(() => {
    return toasts.slice(-maxToasts);
  }, [toasts, maxToasts]);

  const value = useMemo(
    () => ({
      toasts: visibleToasts,
      addToast,
      dismissToast,
      dismissAll,
      updateToast,
    }),
    [visibleToasts, addToast, dismissToast, dismissAll, updateToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={visibleToasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};
