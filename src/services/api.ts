import type { Account, Transaction, ApiResponse, ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: response.statusText,
        code: `HTTP_${response.status}`,
        status: response.status,
      }));
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }
    
    const data: T = await response.json();
    return { data, status: response.status };
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeader(),
      },
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeader(),
      },
      credentials: 'include',
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();

export const accountService = {
  async getAccounts(): Promise<ApiResponse<Account[]>> {
    return apiClient.get<Account[]>('/accounts');
  },

  async getAccountById(id: string): Promise<ApiResponse<Account>> {
    return apiClient.get<Account>(`/accounts/${id}`);
  },

  async getAccountBalance(id: string): Promise<ApiResponse<{ balance: number }>> {
    return apiClient.get<{ balance: number }>(`/accounts/${id}/balance`);
  },
};

export const transactionService = {
  async getTransactions(accountId: string, params?: Record<string, string>): Promise<ApiResponse<Transaction[]>> {
    return apiClient.get<Transaction[]>(`/accounts/${accountId}/transactions`, params);
  },

  async createTransaction(transaction: Omit<Transaction, 'id' | 'date'>): Promise<ApiResponse<Transaction>> {
    return apiClient.post<Transaction>('/transactions', transaction);
  },

  async getTransactionById(id: string): Promise<ApiResponse<Transaction>> {
    return apiClient.get<Transaction>(`/transactions/${id}`);
  },
};

export default apiClient;