import { test, expect } from '../../src/fixtures/apiFixtures';

test('API-001: GET /objects returns a list', async ({ restful }) => {
  const res = await restful.listObjects();
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty('id');
  expect(body[0]).toHaveProperty('name');
});

test('API-002: GET /objects/1 returns a single object', async ({ restful }) => {
  const res = await restful.getObject('1');
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('name');
});

test('API-003: POST /objects creates an object, then DELETE cleans up', async ({ restful }) => {
  // Create
  const createRes = await restful.createObject({
    name: `E2E Object ${Date.now()}`,
    data: { purpose: 'playwright', framework: 'di' },
  });
  expect(createRes.status()).toBe(200);

  const created = await createRes.json();
  expect(created).toHaveProperty('id');
  expect(created).toHaveProperty('name');
  const createdId = String(created.id);

  // Read-back
  const getRes = await restful.getObject(createdId);
  expect(getRes.status()).toBe(200);
  const fetched = await getRes.json();
  expect(String(fetched.id)).toBe(createdId);

  // Cleanup
  const delRes = await restful.deleteObject(createdId);
  expect(delRes.status()).toBe(200);
});
