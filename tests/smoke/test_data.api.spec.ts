// spec: API Tests for TestDataApi
// This file tests the jsonp (JSONPlaceholder) fixture which uses TestDataApi

import { test, expect } from '../../src/fixtures/apiFixtures';

test.describe('Test Data API', () => {
  test('API-T001: GET /todos/{id} returns a single todo', async ({ jsonp }) => {
    // Get a single todo by ID
    const res = await jsonp.getTodo(1);
    expect(res.status()).toBe(200);

    // Verify response contains required properties
    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('completed');
    expect(body).toHaveProperty('userId');
    expect(body.id).toBe(1);
  });

  test('API-T002: GET /todos/{id} with invalid ID returns 404', async ({ jsonp }) => {
    // Try to get a non-existent todo
    const res = await jsonp.getTodo(99999);
    expect(res.status()).toBe(404);
  });

  test('API-T003: POST /posts creates a new post', async ({ jsonp }) => {
    // Prepare post payload
    const postPayload = {
      title: `Test Post ${Date.now()}`,
      body: 'This is a test post created by Playwright E2E tests',
      userId: 1,
    };

    // Create the post
    const res = await jsonp.createPost(postPayload);
    expect(res.status()).toBe(201);

    // Verify the created post
    const created = await res.json();
    expect(created).toHaveProperty('id');
    expect(created.title).toBe(postPayload.title);
    expect(created.body).toBe(postPayload.body);
    expect(created.userId).toBe(postPayload.userId);
  });

  test('API-T004: POST /posts creates multiple posts sequentially', async ({ jsonp }) => {
    // Create 3 posts in sequence
    // Note: JSONPlaceholder doesn't persist posts, so each request returns a generated ID
    const createdPosts: Array<{ id: number; title: string; body: string; userId: number }> = [];

    for (let i = 0; i < 3; i++) {
      const payload = {
        title: `Sequential Post ${i + 1} - ${Date.now()}`,
        body: `Body for post number ${i + 1}`,
        userId: 2,
      };

      const res = await jsonp.createPost(payload);
      expect(res.status()).toBe(201);

      const created = await res.json();
      expect(created).toHaveProperty('id');
      createdPosts.push(created);
    }

    // Verify all posts were created successfully
    expect(createdPosts).toHaveLength(3);
    createdPosts.forEach(post => {
      expect(post.id).toBeDefined();
      expect(post.title).toBeTruthy();
      expect(post.body).toBeTruthy();
      expect(post.userId).toBe(2);
    });
  });
});
