import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // Define data file path
  const DATA_FILE = path.join(__dirname, 'data.json');

  // API Endpoint to get configuration
  app.get('/api/config', (req, res) => {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        res.json(JSON.parse(data));
      } else {
        res.json(null);
      }
    } catch (e) {
      console.error('Error reading data.json:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // API Endpoint to save configuration
  app.post('/api/config', (req, res) => {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    } catch (e) {
      console.error('Error writing data.json:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server and API running at http://localhost:${PORT}`);
  });
}

startServer();
