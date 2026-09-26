import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();

  // Basic CORS & JSON parser with reasonable limit to prevent payload floods
  app.use(cors());
  app.use(express.json({ limit: '2mb' }));

  // HTTP Security Headers (Anti-Hack & Anti-Clickjacking)
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
    next();
  });

  // Anti-Spam API Rate Limiter
  const requestHistory = new Map<string, { count: number; expiresAt: number }>();
  const apiRateLimiter = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const key = Array.isArray(ip) ? ip[0] : String(ip);
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 60; // Max 60 requests per minute per IP

    const record = requestHistory.get(key);
    if (!record || now > record.expiresAt) {
      requestHistory.set(key, { count: 1, expiresAt: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a minute before trying again.',
        status: 'rate_limited'
      });
    }

    record.count++;
    next();
  };

  // Health check endpoint
  app.get('/api/health', apiRateLimiter, (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Praveen Engineers Portal API',
      timestamp: new Date().toISOString(),
      security: 'active',
      antiSpam: 'active'
    });
  });

  // Setup Vite middlewares for development, or static files for production
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
