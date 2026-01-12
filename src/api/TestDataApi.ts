import type { APIRequestContext } from '@playwright/test';

export class TestDataApi {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string
  ) {}

  async getTodo(id: number) {
    return this.request.get(`${this.baseUrl}/todos/${id}`);
  }

  async createPost(payload: { title: string; body: string; userId: number }) {
    return this.request.post(`${this.baseUrl}/posts`, { data: payload });
  }
}