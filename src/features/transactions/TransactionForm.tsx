import { useState, useCallback } from 'react';
import { api } from '@services/api';
import type { Account } from '../accounts/AccountList';

export interface TransactionFormData {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
  category: 'transfer' | 'payment' | 'withdrawal' | 'deposit';
  scheduledDate?: string;
}

export interface TransactionFormErrors {
  fromAccountId?: string;
  toAccountId?: string;
  amount?: string;
  description?: string;
  category?: string;
  scheduledDate?: string;
}

interface TransactionFormProps {
  accounts: Account[];
  onSuccess?: (transactionId: string) => void;
  onCancel?: () => void;
  initialData?: Partial<TransactionFormData>;
}

interface TransactionFormState {
  data: TransactionFormData;
  errors: TransactionFormErrors;
  isSubmitting: boolean;
  submitError: string | null;
  touched: Record<string, boolean>;
}

const initialState: TransactionFormState = {
  data: {
    fromAccountId: '',
    toAccountId: '',
    amount: 0,
    description: '',
    category: 'transfer',
    scheduledDate: undefined,
  },
  errors: {},
  isSubmitting: false,
  submitError: null,
  touched: {},
};

export function TransactionForm({ accounts, onSuccess, onCancel, initialData }: TransactionFormProps) {
  const [state, setState] = useState<TransactionFormState>(() => ({
    ...initialState,
    data: { ...initialState.data, ...initialData },
  }));

  const validateField = useCallback((name: keyof TransactionFormData, value: string | number): string | undefined => {
    switch (name) {
      case 'fromAccountId':
        if (!value) return 'Selecciona una cuenta de origen';
        if (value === state.data.toAccountId) return 'La cuenta de origen no puede ser igual a la de destino';
        break;
      case 'toAccountId':
        if (!value) return 'Selecciona una cuenta de destino';
        break;
      case 'amount':
        if (!value || Number(value) <= 0) return 'El monto debe ser mayor a 0';
        if (Number(value) > 10000) return 'El monto máximo es 10,000 EUR';
        break;
      case 'description':
        if (!value || String(value).trim().length < 3) return 'La descripción debe tener al menos 3 caracteres';
        if (String(value).length > 200) return 'La descripción no puede exceder 200 caracteres';
        break;
      case 'category':
        if (!value) return 'Selecciona una categoría';
        break;
      case 'scheduledDate':
        if (value) {
          const date = new Date(String(value));
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (date < today) return 'La fecha no puede ser anterior a hoy';
        }
        break;
    }
    return undefined;
  }, [state.data.toAccountId]);

  const validateForm = useCallback((): boolean => {
    const newErrors: TransactionFormErrors = {};
    let isValid = true;
    
    (Object.keys(state.data) as Array<keyof TransactionFormData>).forEach((field) => {
      const error = validateField(field, state.data[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    
    setState(prev => ({ ...prev, errors: newErrors }));
    return isValid;
  }, [state.data, validateField]);

  const handleChange = useCallback((field: keyof TransactionFormData, value: string | number) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      touched: { ...prev.touched, [field]: true },
    }));
    
    if (state.touched[field]) {
      const error = validateField(field, value);
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: error },
      }));
    }
  }, [state.touched, validateField]);

  const handleBlur = useCallback((field: keyof TransactionFormData) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true },
    }));
    
    const error = validateField(field, state.data[field]);
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error },
    }));
  }, [state.data, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const allTouched = Object.keys(state.data).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setState(prev => ({ ...prev, touched: allTouched }));
    
    if (!validateForm()) {
      return;
    }
    
    setState(prev => ({ ...prev, isSubmitting: true, submitError: null }));
    
    try {
      const result = await api.createTransaction(state.data);
      
      setState(prev => ({ ...prev, isSubmitting: false }));
      
      if (onSuccess) {
        onSuccess(result.transactionId);
      }
      
      setState(prev => ({
        ...prev,
        data: initialState.data,
        touched: {},
        errors: {},
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al procesar la transacción';
      setState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        submitError: errorMessage 
      }));
    }
  };

  const handleReset = () => {
    setState(initialState);
    onCancel?.();
  };

  const getInputAriaDescribedBy = (field: keyof TransactionFormErrors): string => {
    return `${field}-error`;
  };

  const getAccountBalance = (accountId: string): number => {
    const account = accounts.find(acc => acc.id === accountId);
    return account?.balance ?? 0;
  };

  const activeAccounts = accounts.filter(acc => acc.status === 'active');

  return (
    <form 
      onSubmit={handleSubmit}
      className="transaction-form"
      aria-labelledby="transaction-form-title"
      noValidate
    >
      <h1 id="transaction-form-title" className="transaction-form-title">
        Nueva Transacción
      </h1>

      {state.submitError && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="transaction-form-error"
        >
          <span aria-hidden="true">⚠️</span>
          <span>{state.submitError}</span>
        </div>
      )}

      <fieldset className="transaction-form-fieldset">
        <legend className="sr-only">Detalles de la transacción</legend>

        <div className="form-group">
          <label 
            htmlFor="fromAccountId" 
            className="form-label"
          >
            Cuenta de Origen <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <select
            id="fromAccountId"
            name="fromAccountId"
            value={state.data.fromAccountId}
            onChange={(e) => handleChange('fromAccountId', e.target.value)}
            onBlur={() => handleBlur('fromAccountId')}
            aria-required="true"
            aria-invalid={!!state.errors.fromAccountId}
            aria-describedby={state.errors.fromAccountId ? getInputAriaDescribedBy('fromAccountId') : undefined}
            className="form-select"
          >
            <option value="">Selecciona una cuenta...</option>
            {activeAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.alias} - Saldo: {account.balance.toFixed(2)} {account.currency}
              </option>
            ))}
          </select>
          {state.errors.fromAccountId && (
            <span 
              id="fromAccountId-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.fromAccountId}
            </span>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="toAccountId" 
            className="form-label"
          >
            Cuenta de Destino <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <select
            id="toAccountId"
            name="toAccountId"
            value={state.data.toAccountId}
            onChange={(e) => handleChange('toAccountId', e.target.value)}
            onBlur={() => handleBlur('toAccountId')}
            aria-required="true"
            aria-invalid={!!state.errors.toAccountId}
            aria-describedby={state.errors.toAccountId ? getInputAriaDescribedBy('toAccountId') : undefined}
            className="form-select"
          >
            <option value="">Selecciona una cuenta...</option>
            {activeAccounts
              .filter(acc => acc.id !== state.data.fromAccountId)
              .map((account) => (
                <option key={account.id} value={account.id}>
                  {account.alias} ({account.accountNumber})
                </option>
              ))}
          </select>
          {state.errors.toAccountId && (
            <span 
              id="toAccountId-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.toAccountId}
            </span>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="amount" 
            className="form-label"
          >
            Monto (EUR) <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={state.data.amount || ''}
            onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
            onBlur={() => handleBlur('amount')}
            min="0.01"
            max="10000"
            step="0.01"
            aria-required="true"
            aria-invalid={!!state.errors.amount}
            aria-describedby={state.errors.amount ? getInputAriaDescribedBy('amount') : 'amount-hint'}
            className="form-input"
            placeholder="0.00"
          />
          <span id="amount-hint" className="form-hint">
            Monto máximo: 10,000 EUR
          </span>
          {state.errors.amount && (
            <span 
              id="amount-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.amount}
            </span>
          )}
          {state.data.fromAccountId && state.data.amount > 0 && (
            <div 
              className="form-info"
              aria-live="polite"
            >
              <span className="sr-only">Saldo disponible después de la transacción:</span>
              {(getAccountBalance(state.data.fromAccountId) - state.data.amount).toFixed(2)} EUR
            </div>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="category" 
            className="form-label"
          >
            Categoría <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <select
            id="category"
            name="category"
            value={state.data.category}
            onChange={(e) => handleChange('category', e.target.value)}
            onBlur={() => handleBlur('category')}
            aria-required="true"
            aria-invalid={!!state.errors.category}
            aria-describedby={state.errors.category ? getInputAriaDescribedBy('category') : undefined}
            className="form-select"
          >
            <option value="transfer">Transferencia</option>
            <option value="payment">Pago</option>
            <option value="withdrawal">Retiro</option>
            <option value="deposit">Depósito</option>
          </select>
          {state.errors.category && (
            <span 
              id="category-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.category}
            </span>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="description" 
            className="form-label"
          >
            Descripción <span aria-hidden="true">*</span>
            <span className="sr-only"> (requerido)</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={state.data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            aria-required="true"
            aria-invalid={!!state.errors.description}
            aria-describedby={state.errors.description ? getInputAriaDescribedBy('description') : 'description-hint'}
            className="form-textarea"
            rows={3}
            maxLength={200}
            placeholder="Describe el motivo de la transacción..."
          />
          <span id="description-hint" className="form-hint">
            <span aria-hidden="true">
              {state.data.description.length}/200 caracteres
            </span>
            <span className="sr-only">
              {state.data.description.length} de 200 caracteres utilizados
            </span>
          </span>
          {state.errors.description && (
            <span 
              id="description-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.description}
            </span>
          )}
        </div>

        <div className="form-group">
          <label 
            htmlFor="scheduledDate" 
            className="form-label"
          >
            Programar para más tarde (opcional)
          </label>
          <input
            type="date"
            id="scheduledDate"
            name="scheduledDate"
            value={state.data.scheduledDate || ''}
            onChange={(e) => handleChange('scheduledDate', e.target.value)}
            onBlur={() => handleBlur('scheduledDate')}
            aria-describedby={state.errors.scheduledDate ? getInputAriaDescribedBy('scheduledDate') : 'scheduled-hint'}
            className="form-input"
          />
          <span id="scheduled-hint" className="form-hint">
            Deja vacío para ejecutar inmediatamente
          </span>
          {state.errors.scheduledDate && (
            <span 
              id="scheduledDate-error" 
              role="alert" 
              className="form-error"
            >
              {state.errors.scheduledDate}
            </span>
          )}
        </div>
      </fieldset>

      <div className="transaction-form-actions" role="group" aria-label="Acciones del formulario">
        <button
          type="submit"
          disabled={state.isSubmitting}
          aria-busy={state.isSubmitting}
          className="form-button form-button--primary"
        >
          {state.isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>Procesando...</span>
              <span className="sr-only">Por favor espera</span>
            </>
          ) : (
            'Confirmar Transacción'
          )}
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          disabled={state.isSubmitting}
          className="form-button form-button--secondary"
          aria-label="Cancelar y limpiar el formulario"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}