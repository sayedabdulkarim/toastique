import { useState } from 'react';
import { useToast, ToastPosition } from 'react-toastique';

const positions: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const positionLabels: Record<ToastPosition, string> = {
  'top-left': 'Top Left',
  'top-center': 'Top Center',
  'top-right': 'Top Right',
  'bottom-left': 'Bottom Left',
  'bottom-center': 'Bottom Center',
  'bottom-right': 'Bottom Right',
};

function App() {
  const toast = useToast();
  const [position, setPosition] = useState<ToastPosition>('top-right');

  const handleSuccess = () => {
    toast.success('Operation completed successfully!', { position });
  };

  const handleError = () => {
    toast.error('Something went wrong. Please try again.', { position });
  };

  const handleWarning = () => {
    toast.warning('Please review your input before continuing.', { position });
  };

  const handleInfo = () => {
    toast.info('A new update is available for download.', { position });
  };

  const handleLoading = () => {
    const id = toast.loading('Processing your request...', { position });

    // Simulate completion after 3 seconds
    setTimeout(() => {
      toast.dismiss(id);
      toast.success('Processing complete!', { position });
    }, 3000);
  };

  const handlePromise = () => {
    const fakeApiCall = () =>
      new Promise<{ data: string }>((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.3
            ? resolve({ data: 'User data loaded' })
            : reject(new Error('Network error'));
        }, 2000);
      });

    toast.promise(
      fakeApiCall(),
      {
        loading: 'Fetching user data...',
        success: (data) => `Success: ${(data as { data: string }).data}`,
        error: (err) => `Error: ${(err as Error).message}`,
      },
      { position }
    );
  };

  const handleDismissAll = () => {
    toast.dismissAll();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Toastique</h1>
        <p>A lightweight, elegant toast notification library for React</p>
      </header>

      <main className="playground">
        <section className="section">
          <h2>Toast Types</h2>
          <div className="button-grid">
            <button className="btn btn--success" onClick={handleSuccess}>
              <span>✓</span> Success
            </button>
            <button className="btn btn--error" onClick={handleError}>
              <span>✕</span> Error
            </button>
            <button className="btn btn--warning" onClick={handleWarning}>
              <span>⚠</span> Warning
            </button>
            <button className="btn btn--info" onClick={handleInfo}>
              <span>ℹ</span> Info
            </button>
            <button className="btn btn--loading" onClick={handleLoading}>
              <span>◌</span> Loading
            </button>
            <button className="btn btn--promise" onClick={handlePromise}>
              <span>⟳</span> Promise
            </button>
          </div>
        </section>

        <section className="section">
          <h2>Position</h2>
          <div className="position-grid">
            {positions.map((pos) => (
              <button
                key={pos}
                className={`position-btn ${position === pos ? 'active' : ''}`}
                onClick={() => setPosition(pos)}
              >
                {positionLabels[pos]}
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Actions</h2>
          <div className="button-grid">
            <button className="btn btn--secondary" onClick={handleDismissAll}>
              Dismiss All
            </button>
          </div>
        </section>

        <section className="section">
          <h2>Usage</h2>
          <div className="code-block">
            <code>
              <span className="keyword">import</span> {'{ '}
              <span className="function">useToast</span>
              {' }'} <span className="keyword">from</span>{' '}
              <span className="string">'toastique'</span>;
              <br />
              <br />
              <span className="keyword">const</span> toast ={' '}
              <span className="function">useToast</span>();
              <br />
              <br />
              <span className="comment">{'// Show different toast types'}</span>
              <br />
              toast.<span className="function">success</span>(
              <span className="string">'Saved!'</span>);
              <br />
              toast.<span className="function">error</span>(
              <span className="string">'Error occurred'</span>);
              <br />
              toast.<span className="function">warning</span>(
              <span className="string">'Check input'</span>);
              <br />
              toast.<span className="function">info</span>(
              <span className="string">'New update'</span>);
              <br />
              <br />
              <span className="comment">{'// Promise-based toast'}</span>
              <br />
              toast.<span className="function">promise</span>(fetchData(), {'{'}
              <br />
              {'  '}loading: <span className="string">'Loading...'</span>,
              <br />
              {'  '}success: <span className="string">'Done!'</span>,
              <br />
              {'  '}error: <span className="string">'Failed'</span>
              <br />
              {'}'});
            </code>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Made with <span className="heart">❤</span> by <a href="https://github.com/saykarim">Sayed Abdul Karim</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
