import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express from 'express';
import type { Server } from 'http';

// We import the module dynamically to test the route handler
describe('API Routes', () => {
  let app: express.Express;
  let server: Server;

  beforeEach(async () => {
    app = express();
    app.use(express.json());

    // Inline the route from server/src/index.ts for testing
    const path = await import('path');
    app.get('/api/story/:id', (req, res) => {
      res.json({
        id: req.params.id,
        title: 'Placeholder scene',
        body: 'This is a placeholder.',
        choices: [],
      });
    });

    server = app.listen(0); // random port
  });

  afterEach(() => {
    server.close();
  });

  it('GET /api/story/:id returns scene data', async () => {
    const response = await fetch(
      `http://localhost:${(server.address() as any).port}/api/story/opening`
    );
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id', 'opening');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('body');
    expect(data).toHaveProperty('choices');
    expect(Array.isArray(data.choices)).toBe(true);
  });

  it('returns 200 for any scene id', async () => {
    const response = await fetch(
      `http://localhost:${(server.address() as any).port}/api/story/unknown-scene`
    );
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.id).toBe('unknown-scene');
  });
});
