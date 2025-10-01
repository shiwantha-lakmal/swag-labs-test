import { APIResponse } from '@playwright/test';
import { getBaseURL } from '@config/env.config';

/**
 * BaseClient class provides common functionality for API interactions.
 * Handles request configuration, authentication, and response processing.
 */
export class BaseClient {
  private headers!: Record<string, string>;
  protected baseURL: string;

  constructor(baseUrl?: string) {
    this.baseURL = baseUrl || getBaseURL();
  }

  /**
   * Initialize the client. Must be called before making any requests.
   */
  async initialize(): Promise<void> {
    await this.init();
  }

  /**
   * Initialize API context with authentication
   * @param auth - Authentication token or credentials
   */
  protected async init(auth?: string) {
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'api_key': auth || '',
      'Authorization': `Bearer ${auth}`
    };
  }

  /**
   * Send GET request
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @returns API response
   */
  protected async get(endpoint: string, params?: Record<string, string>): Promise<Response> {
    const url = this.normalizeEndpoint(endpoint);
    const queryString = params ? `?${this.buildQueryString(params)}` : '';
    const fullUrl = `${this.baseURL}${url}${queryString}`;
    console.log(`GET Request to: ${fullUrl}`);
    return await fetch(fullUrl, {
      method: 'GET',
      headers: this.headers
    });
  }

  /**
   * Send POST request
   * @param endpoint - API endpoint
   * @param data - Request body
   * @returns API response
   */
  protected async post(endpoint: string, data: Record<string, any>): Promise<Response> {
    const url = this.normalizeEndpoint(endpoint);
    const fullUrl = `${this.baseURL}${url}`;
    console.log(`POST Request to: ${fullUrl}`);
    return await fetch(fullUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }

  /**
   * Send PUT request
   * @param endpoint - API endpoint
   * @param data - Request body
   * @returns API response
   */
  protected async put(endpoint: string, data: Record<string, any>): Promise<Response> {
    const url = this.normalizeEndpoint(endpoint);
    const fullUrl = `${this.baseURL}${url}`;
    return await fetch(fullUrl, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }

  /**
   * Send DELETE request
   * @param endpoint - API endpoint
   * @returns API response
   */
  protected async delete(endpoint: string): Promise<Response> {
    const url = this.normalizeEndpoint(endpoint);
    const fullUrl = `${this.baseURL}${url}`;
    return await fetch(fullUrl, {
      method: 'DELETE',
      headers: this.headers
    });
  }

  /**
   * Process API response
   * @param response - API response
   * @returns Parsed response body
   */
  protected async handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return await response.json() as T;
    }
    const errorText = await response.text();
    let errorMessage;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = `${errorJson.message || errorJson.type || errorText}`;
    } catch {
      errorMessage = errorText.substring(0, 100);
    }
    throw new Error(`API Error: ${response.status} - ${errorMessage}`);
  }

  /**
   * Build query string from parameters
   * @param params - Query parameters
   * @returns Formatted query string
   */
  /**
   * Normalize endpoint by handling trailing slashes
   */
  private normalizeEndpoint(endpoint: string): string {
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }

  protected buildQueryString(params: Record<string, string>): string {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

}
