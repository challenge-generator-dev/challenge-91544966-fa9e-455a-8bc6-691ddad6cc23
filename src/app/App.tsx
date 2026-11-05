import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainNav from '@features/navigation/MainNav';
import './App.css';

const AccountList = lazy(() => import('@features/accounts/AccountList'));
const TransactionForm = lazy(() => import('@features/transactions/TransactionForm'));

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);

  const handleOpenTransactionForm = (accountId: string) => {
    setActiveAccountId(accountId);
    setIsModalOpen(true);
  };

  const handleCloseTransactionForm = () => {
    setIsModalOpen(false);
    setActiveAccountId(null);
  };

  return (
    <div className="app-container" role="application" aria-label="Aplicación bancaria">
      <MainNav aria-label="Navegación principal" />
      <main
        id="main-content"
        tabIndex={-1}
        aria-label="Contenido principal"
        className="main-content"
      >
        <Suspense fallback={
          <div
            role="status"
            aria-live="polite"
            aria-label="Cargando contenido"
            className="loading-indicator"
          >
            Cargando...
          </div>
        }>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/accounts" replace />}
            />
            <Route
              path="/accounts"
              element={
                <AccountList
                  onTransactionClick={handleOpenTransactionForm}
                />
              }
            />
            <Route path="*" element={<Navigate to="/accounts" replace />} />
          </Routes>
        </Suspense>
      </main>

      {isModalOpen && activeAccountId && (
        <TransactionForm
          accountId={activeAccountId}
          onClose={handleCloseTransactionForm}
          aria-modal="true"
          aria-labelledby="transaction-form-title"
        />
      )}
    </div>
  );
};

export default App;