import type { APIRequestContext } from '@playwright/test';

export type RestfulObject = {
  id?: string | number;
  name: string;
  data?: Record<string, unknown> | null;
};

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly apiBaseUrl: string
  ) {}

  private headers() {
    return {
      'content-type': 'application/json'
    };
  }

  async listObjects() {
    return this.request.get(`${this.apiBaseUrl}/objects`, { headers: this.headers() });
  }

  async getObject(id: string) {
    return this.request.get(`${this.apiBaseUrl}/objects/${id}`, { headers: this.headers() });
  }

  async createObject(payload: RestfulObject) {
    return this.request.post(`${this.apiBaseUrl}/objects`, { data: payload, headers: this.headers() });
  }

  async deleteObject(id: string) {
    return this.request.delete(`${this.apiBaseUrl}/objects/${id}`, { headers: this.headers() });
  }
}
