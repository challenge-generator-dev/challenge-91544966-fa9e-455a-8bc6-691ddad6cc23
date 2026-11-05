import { memo } from 'react';
import type { Account } from './AccountList';

interface AccountListItemProps {
  account: Account;
  isSelected: boolean;
  onSelect: () => void;
  formatCurrency: (amount: number, currency: string) => string;
}

const accountTypeLabels: Record<Account['accountType'], string> = {
  checking: 'Cuenta Corriente',
  savings: 'Cuenta de Ahorros',
  investment: 'Cuenta de Inversión',
};

const accountTypeIcons: Record<Account['accountType'], string> = {
  checking: '🏦',
  savings: '💰',
  investment: '📈',
};

const statusLabels: Record<Account['status'], string> = {
  active: 'Activa',
  inactive: 'Inactiva',
  blocked: 'Bloqueada',
};

export const AccountListItem = memo(function AccountListItem({
  account,
  isSelected,
  onSelect,
  formatCurrency,
}: AccountListItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  const getStatusAriaLabel = (): string => {
    const baseLabel = `Cuenta ${account.alias}`;
    if (account.status === 'active') {
      return `${baseLabel}, tipo ${accountTypeLabels[account.accountType]}, saldo ${formatCurrency(account.balance, account.currency)}, estado activo`;
    }
    if (account.status === 'inactive') {
      return `${baseLabel}, tipo ${accountTypeLabels[account.accountType]}, saldo ${formatCurrency(account.balance, account.currency)}, estado inactivo`;
    }
    return `${baseLabel}, tipo ${accountTypeLabels[account.accountType]}, saldo ${formatCurrency(account.balance, account.currency)}, estado bloqueado`;
  };

  const formattedBalance = formatCurrency(account.balance, account.currency);
  const formattedDate = new Date(account.lastTransactionDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <li
      className={`account-item ${isSelected ? 'account-item--selected' : ''} ${account.status !== 'active' ? 'account-item--inactive' : ''}`}
      role="listitem"
    >
      <button
        className="account-item-button"
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        aria-pressed={isSelected}
        aria-label={getStatusAriaLabel()}
        aria-describedby={`account-${account.id}-details`}
        disabled={account.status === 'blocked'}
        tabIndex={0}
      >
        <div className="account-item-icon" aria-hidden="true">
          {accountTypeIcons[account.accountType]}
        </div>
        
        <div className="account-item-info">
          <div className="account-item-header">
            <span className="account-alias">{account.alias}</span>
            <span 
              className={`account-status account-status--${account.status}`}
              role="text"
              aria-label={`Estado: ${statusLabels[account.status]}`}
            >
              {account.status !== 'active' && (
                <span aria-hidden="true">•</span>
              )}
              {statusLabels[account.status]}
            </span>
          </div>
          
          <div 
            id={`account-${account.id}-details`}
            className="account-item-details"
          >
            <span className="account-number">
              <span className="sr-only">Número de cuenta:</span>
              {account.accountNumber}
            </span>
            <span className="account-type">
              {accountTypeLabels[account.accountType]}
            </span>
          </div>
        </div>
        
        <div className="account-item-balance">
          <span className="sr-only">Saldo actual:</span>
          <span 
            className={`balance-amount ${account.balance < 0 ? 'balance-negative' : ''}`}
            aria-hidden="true"
          >
            {formattedBalance}
          </span>
          {account.balance < 0 && (
            <span className="sr-only">Saldo negativo</span>
          )}
        </div>
        
        <div className="account-item-footer">
          <span className="last-transaction">
            <span className="sr-only">Última transacción:</span>
            {formattedDate}
          </span>
          <span className="sr-only">
            Presiona Enter para seleccionar esta cuenta
          </span>
        </div>
      </button>

      {isSelected && (
        <div 
          className="account-item-expanded"
          role="region"
          aria-label="Detalles de cuenta seleccionada"
          aria-expanded="true"
        >
          <h4 className="sr-only">Opciones de la cuenta</h4>
          <div className="account-actions">
            <button
              className="account-action-button"
              aria-label={`Ver movimientos de la cuenta ${account.alias}`}
            >
              Ver Movimientos
            </button>
            <button
              className="account-action-button"
              aria-label={`Realizar transferencia desde la cuenta ${account.alias}`}
            >
              Transferir
            </button>
            {account.accountType === 'savings' && (
              <button
                className="account-action-button"
                aria-label={`Configurar ahorros objetivos para la cuenta ${account.alias}`}
              >
                Ahorro Objetivo
              </button>
            )}
          </div>
        </div>
      )}
    </li>
  );
});