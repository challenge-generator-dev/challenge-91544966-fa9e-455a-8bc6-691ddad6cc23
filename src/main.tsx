import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div role="alert" aria-live="assertive">
    <h1 aria-label="Error de aplicación">Ocurrió un error inesperado</h1>
    <pre aria-label="Detalle del error">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      aria-label="Reintentar"
      className="retry-button"
    >
      Reintentar
    </button>
  </div>
);

root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);