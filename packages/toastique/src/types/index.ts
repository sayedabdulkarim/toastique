export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastOptions {
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  options: Required<Omit<ToastOptions, 'icon' | 'className' | 'onClose'>> &
    Pick<ToastOptions, 'icon' | 'className' | 'onClose'>;
  createdAt: number;
}

export interface ToastPromiseOptions {
  loading: string;
  success: string | ((data: unknown) => string);
  error: string | ((error: unknown) => string);
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, options?: ToastOptions) => string;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
  updateToast: (id: string, updates: Partial<Pick<Toast, 'type' | 'message'>>) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
  defaultDuration?: number;
  maxToasts?: number;
}
