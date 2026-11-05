import { useState, useEffect } from 'react';
import { AccountListItem } from './AccountListItem';
import { api } from '@services/api';

export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'investment';
  balance: number;
  currency: string;
  alias: string;
  lastTransactionDate: string;
  status: 'active' | 'inactive' | 'blocked';
}

interface AccountListProps {
  onSelectAccount?: (account: Account) => void;
  showInactive?: boolean;
}

interface AccountListState {
  accounts: Account[];
  loading: boolean;
  error: string | null;
  selectedAccountId: string | null;
  sortBy: 'balance' | 'alias' | 'lastTransaction';
  sortOrder: 'asc' | 'desc';
  filterType: Account['accountType'] | 'all';
}

export function AccountList({ onSelectAccount, showInactive = false }: AccountListProps) {
  const [state, setState] = useState<AccountListState>({
    accounts: [],
    loading: true,
    error: null,
    selectedAccountId: null,
    sortBy: 'alias',
    sortOrder: 'asc',
    filterType: 'all',
  });

  useEffect(() => {
    loadAccounts();
  }, [showInactive]);

  const loadAccounts = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await api.getAccounts(showInactive);
      setState(prev => ({ ...prev, accounts: data, loading: false }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar las cuentas';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
    }
  };

  const handleSelectAccount = (account: Account) => {
    setState(prev => ({ ...prev, selectedAccountId: account.id }));
    onSelectAccount?.(account);
  };

  const handleSort = (sortBy: AccountListState['sortBy']) => {
    setState(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilterChange = (filterType: AccountListState['filterType']) => {
    setState(prev => ({ ...prev, filterType }));
  };

  const getFilteredAccounts = (): Account[] => {
    let filtered = [...state.accounts];
    
    if (state.filterType !== 'all') {
      filtered = filtered.filter(acc => acc.accountType === state.filterType);
    }
    
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (state.sortBy) {
        case 'balance':
          comparison = a.balance - b.balance;
          break;
        case 'alias':
          comparison = a.alias.localeCompare(b.alias);
          break;
        case 'lastTransaction':
          comparison = new Date(a.lastTransactionDate).getTime() - new Date(b.lastTransactionDate).getTime();
          break;
      }
      return state.sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return filtered;
  };

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getTotalBalance = (): number => {
    return state.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  };

  if (state.loading) {
    return (
      <div 
        role="status" 
        aria-live="polite" 
        aria-label="Cargando cuentas bancarias"
        className="account-list-loading"
      >
        <span className="sr-only">Cargando cuentas bancarias</span>
        <div className="spinner" aria-hidden="true"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div 
        role="alert" 
        aria-labelledby="error-title"
        className="account-list-error"
      >
        <h2 id="error-title" className="error-title">Error</h2>
        <p>{state.error}</p>
        <button 
          onClick={loadAccounts}
          aria-label="Reintentar cargar cuentas"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const filteredAccounts = getFilteredAccounts();

  return (
    <section 
      className="account-list-container"
      aria-labelledby="account-list-title"
    >
      <header className="account-list-header">
        <h1 id="account-list-title" className="account-list-title">
          Mis Cuentas
        </h1>
        <div 
          className="total-balance"
          aria-label={`Saldo total: ${formatCurrency(getTotalBalance(), 'EUR')}`}
        >
          <span className="total-balance-label">Saldo Total:</span>
          <span className="total-balance-amount">
            {formatCurrency(getTotalBalance(), 'EUR')}
          </span>
        </div>
      </header>

      <div 
        className="account-filters"
        role="search"
        aria-label="Filtrar cuentas"
      >
        <label htmlFor="filter-type" className="filter-label">
          Filtrar por tipo:
        </label>
        <select
          id="filter-type"
          value={state.filterType}
          onChange={(e) => handleFilterChange(e.target.value as AccountListState['filterType'])}
          aria-describedby="filter-type-desc"
          className="filter-select"
        >
          <option value="all">Todas las cuentas</option>
          <option value="checking">Cuenta Corriente</option>
          <option value="savings">Cuenta de Ahorros</option>
          <option value="investment">Cuenta de Inversión</option>
        </select>
        <span id="filter-type-desc" className="sr-only">
          Selecciona el tipo de cuenta para filtrar la lista
        </span>
      </div>

      <div 
        className="account-sort"
        role="group"
        aria-labelledby="sort-group-label"
      >
        <span id="sort-group-label" className="sr-only">Ordenar cuentas</span>
        <button
          onClick={() => handleSort('alias')}
          aria-pressed={state.sortBy === 'alias'}
          className="sort-button"
        >
          Ordenar por Nombre {state.sortBy === 'alias' && (state.sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('balance')}
          aria-pressed={state.sortBy === 'balance'}
          className="sort-button"
        >
          Ordenar por Saldo {state.sortBy === 'balance' && (state.sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('lastTransaction')}
          aria-pressed={state.sortBy === 'lastTransaction'}
          className="sort-button"
        >
          Ordenar por Fecha {state.sortBy === 'lastTransaction' && (state.sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      <ul 
        className="account-list"
        aria-label="Lista de cuentas bancarias"
        role="list"
      >
        {filteredAccounts.length === 0 ? (
          <li 
            role="status" 
            aria-live="polite"
            className="no-accounts-message"
          >
            No se encontraron cuentas con los filtros seleccionados.
          </li>
        ) : (
          filteredAccounts.map((account) => (
            <AccountListItem
              key={account.id}
              account={account}
              isSelected={state.selectedAccountId === account.id}
              onSelect={() => handleSelectAccount(account)}
              formatCurrency={formatCurrency}
            />
          ))
        )}
      </ul>

      <div 
        className="account-list-summary"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="sr-only">
          Mostrando {filteredAccounts.length} de {state.accounts.length} cuentas
        </span>
        <span aria-hidden="true">
          ({filteredAccounts.length} cuentas)
        </span>
      </div>
    </section>
  );
}