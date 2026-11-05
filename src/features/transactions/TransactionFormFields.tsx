import React, { useId } from 'react';
import { Button } from '@shared/components/Button';
import { useAccessibility } from '@shared/hooks/useAccessibility';

interface TransactionFormFieldsProps {
  amount: string;
  onAmountChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  transactionType: 'deposit' | 'withdrawal' | 'transfer';
  onTypeChange: (type: 'deposit' | 'withdrawal' | 'transfer') => void;
  targetAccount?: string;
  onTargetAccountChange?: (value: string) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  errors?: {
    amount?: string;
    description?: string;
    targetAccount?: string;
  };
}

export const TransactionFormFields: React.FC<TransactionFormFieldsProps> = ({
  amount,
  onAmountChange,
  description,
  onDescriptionChange,
  transactionType,
  onTypeChange,
  targetAccount = '',
  onTargetAccountChange,
  isSubmitting,
  onSubmit,
  onCancel,
  errors = {},
}) => {
  const { announceToScreenReader, preferences } = useAccessibility();
  const amountId = useId();
  const descriptionId = useId();
  const typeGroupId = useId();
  const targetAccountId = useId();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    onAmountChange(value);
  };

  const handleTypeChange = (type: 'deposit' | 'withdrawal' | 'transfer') => {
    onTypeChange(type);
    announceToScreenReader(`Tipo de transacción cambiado a ${type}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const validateForm = (): boolean => {
    if (!amount || parseFloat(amount) <= 0) {
      announceToScreenReader('El monto debe ser mayor que cero');
      return false;
    }
    if (transactionType === 'transfer' && (!targetAccount || targetAccount.length < 5)) {
      announceToScreenReader('La cuenta destino debe tener al menos 5 caracteres');
      return false;
    }
    return true;
  };

  const formatCurrency = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return '$0.00';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  const hasError = (field: 'amount' | 'description' | 'targetAccount'): boolean => {
    return !!errors[field];
  };

  const getErrorMessage = (field: 'amount' | 'description' | 'targetAccount'): string => {
    return errors[field] || '';
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="form"
      aria-labelledby="transaction-form-title"
      aria-describedby="transaction-form-description"
    >
      <h2 id="transaction-form-title" className="sr-only">
        Formulario de Transacción
      </h2>
      <p id="transaction-form-description" className="sr-only">
        Complete los detalles de su transacción bancaria
      </p>

      <fieldset
        role="radiogroup"
        aria-labelledby={`${typeGroupId}-label`}
        aria-describedby="transaction-type-help"
      >
        <legend id={`${typeGroupId}-label`} className="form-legend">
          Tipo de Transacción
        </legend>
        <p id="transaction-type-help" className="sr-only">
          Seleccione el tipo de transacción que desea realizar
        </p>

        <div className="radio-group" role="group" aria-label="Opciones de tipo de transacción">
          {(['deposit', 'withdrawal', 'transfer'] as const).map((type) => (
            <label
              key={type}
              className={`radio-label ${transactionType === type ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="transactionType"
                value={type}
                checked={transactionType === type}
                onChange={() => handleTypeChange(type)}
                aria-describedby={transactionType === type ? `${type}-description` : undefined}
              />
              <span className="radio-label-text">
                {type === 'deposit' && 'Depósito'}
                {type === 'withdrawal' && 'Retiro'}
                {type === 'transfer' && 'Transferencia'}
              </span>
              <span
                id={`${type}-description`}
                className="sr-only"
              >
                {type === 'deposit' && 'Agregar fondos a su cuenta'}
                {type === 'withdrawal' && 'Retirar fondos de su cuenta'}
                {type === 'transfer' && 'Enviar fondos a otra cuenta'}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-field">
        <label
          htmlFor={amountId}
          className="form-label"
        >
          Monto
          <span className="required-indicator" aria-hidden="true">*</span>
        </label>
        <div className="input-wrapper">
          <span
            className="input-prefix"
            aria-hidden="true"
          >
            $
          </span>
          <input
            id={amountId}
            type="text"
            inputMode="decimal"
            pattern="[0-9]*\.?[0-9]{0,2}"
            value={amount}
            onChange={handleAmountChange}
            className={`form-input ${hasError('amount') ? 'input-error' : ''}`}
            aria-required="true"
            aria-invalid={hasError('amount')}
            aria-describedby={hasError('amount') ? `${amountId}-error` : `${amountId}-help`}
            aria-label="Monto en dólares"
            autoComplete="transaction-amount"
            disabled={isSubmitting}
          />
        </div>
        {amount && (
          <p
            id={`${amountId}-formatted`}
            className="sr-only"
            aria-live="polite"
          >
            Equivalente a {formatCurrency(amount)}
          </p>
        )}
        <p id={`${amountId}-help`} className="form-help">
          Ingrese el monto en dólares (ej: 100.50)
        </p>
        {hasError('amount') && (
          <p
            id={`${amountId}-error`}
            className="form-error"
            role="alert"
            aria-live="assertive"
          >
            {getErrorMessage('amount')}
          </p>
        )}
      </div>

      <div className="form-field">
        <label
          htmlFor={descriptionId}
          className="form-label"
        >
          Descripción
          <span className="required-indicator" aria-hidden="true">*</span>
        </label>
        <textarea
          id={descriptionId}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className={`form-textarea ${hasError('description') ? 'input-error' : ''}`}
          aria-required="true"
          aria-invalid={hasError('description')}
          aria-describedby={hasError('description') ? `${descriptionId}-error` : `${descriptionId}-help`}
          aria-label="Descripción de la transacción"
          maxLength={200}
          rows={3}
          disabled={isSubmitting}
        />
        <div className="textarea-counter" aria-hidden="true">
          {description.length}/200
        </div>
        <p id={`${descriptionId}-help`} className="form-help">
          Agregue una descripción opcional para esta transacción
        </p>
        {hasError('description') && (
          <p
            id={`${descriptionId}-error`}
            className="form-error"
            role="alert"
            aria-live="assertive"
          >
            {getErrorMessage('description')}
          </p>
        )}
      </div>

      {transactionType === 'transfer' && onTargetAccountChange && (
        <div className="form-field">
          <label
            htmlFor={targetAccountId}
            className="form-label"
          >
            Cuenta Destino
            <span className="required-indicator" aria-hidden="true">*</span>
          </label>
          <input
            id={targetAccountId}
            type="text"
            value={targetAccount}
            onChange={(e) => onTargetAccountChange(e.target.value)}
            className={`form-input ${hasError('targetAccount') ? 'input-error' : ''}`}
            aria-required="true"
            aria-invalid={hasError('targetAccount')}
            aria-describedby={hasError('targetAccount') ? `${targetAccountId}-error` : `${targetAccountId}-help`}
            aria-label="Número de cuenta destino"
            autoComplete="off"
            placeholder="Ingrese el número de cuenta"
            disabled={isSubmitting}
          />
          <p id={`${targetAccountId}-help`} className="form-help">
            Ingrese el número de cuenta de 5 a 20 dígitos
          </p>
          {hasError('targetAccount') && (
            <p
              id={`${targetAccountId}-error`}
              className="form-error"
              role="alert"
              aria-live="assertive"
            >
              {getErrorMessage('targetAccount')}
            </p>
          )}
        </div>
      )}

      <div
        className="form-actions"
        role="group"
        aria-label="Acciones del formulario"
      >
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          aria-describedby={isSubmitting ? 'submitting-status' : undefined}
        >
          {isSubmitting ? 'Procesando...' : 'Confirmar Transacción'}
        </Button>
        {isSubmitting && (
          <span
            id="submitting-status"
            className="sr-only"
            role="status"
            aria-live="polite"
          >
            Su transacción está siendo procesada
          </span>
        )}
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          aria-label="Cancelar y volver al listado de cuentas"
        >
          Cancelar
        </Button>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Complete todos los campos requeridos para continuar
      </p>
    </form>
  );
};