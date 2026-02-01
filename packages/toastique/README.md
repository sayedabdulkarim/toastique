# react-toastique

A lightweight, elegant toast notification library for React.

[![npm version](https://img.shields.io/npm/v/react-toastique.svg)](https://www.npmjs.com/package/react-toastique)
[![license](https://img.shields.io/npm/l/react-toastique.svg)](https://github.com/sayedabdulkarim/toastique/blob/master/LICENSE)

## Demo

**[Live Playground](https://playground-production-250c.up.railway.app/)**

## Features

- 5 toast types: `success`, `error`, `warning`, `info`, `loading`
- 6 positions: all corners + top/bottom center
- Promise-based toasts for async operations
- Auto-dismiss with configurable duration
- Stacking with max visible limit
- Smooth animations
- Dark mode support
- Fully accessible (ARIA, keyboard nav)
- Tiny bundle size (~4KB)
- TypeScript support

## Installation

```bash
npm install react-toastique
# or
pnpm add react-toastique
# or
yarn add react-toastique
```

## Quick Start

### 1. Wrap your app with ToastProvider

```tsx
import { ToastProvider } from 'react-toastique';
import 'react-toastique/styles.css';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

### 2. Use the hook anywhere

```tsx
import { useToast } from 'react-toastique';

function MyComponent() {
  const toast = useToast();

  return (
    <button onClick={() => toast.success('Saved!')}>
      Save
    </button>
  );
}
```

## API

### Toast Methods

```tsx
const toast = useToast();

// Basic toasts
toast.success('Operation successful!');
toast.error('Something went wrong');
toast.warning('Please check your input');
toast.info('New update available');
toast.loading('Processing...');

// With options
toast.success('Saved!', {
  duration: 5000,
  position: 'bottom-right',
  dismissible: true,
});

// Promise toast
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: 'Data loaded!',
  error: 'Failed to load',
});

// Dismiss
toast.dismiss(toastId);
toast.dismissAll();
```

### ToastProvider Options

```tsx
<ToastProvider
  defaultPosition="top-right"  // Default position for all toasts
  defaultDuration={4000}       // Default duration in ms
  maxToasts={5}                // Max visible toasts
>
  <App />
</ToastProvider>
```

### Positions

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  ToastPosition,
  ToastType,
  ToastOptions
} from 'react-toastique';
```

## Links

- [Live Demo](https://playground-production-250c.up.railway.app/)
- [GitHub Repository](https://github.com/sayedabdulkarim/toastique)
- [npm Package](https://www.npmjs.com/package/react-toastique)

## License

MIT

## Author

**Sayed Abdul Karim**

- GitHub: [@sayedabdulkarim](https://github.com/sayedabdulkarim)
