import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Serve static files from client build (for production)
app.use(express.static(path.resolve(__dirname, '../../dist/client')));

// API route placeholder – in dev mode will serve story JSON
app.get('/api/story/:id', (req, res) => {
  // TODO: load story data from file or in-memory store
  res.json({ id: req.params.id, title: 'Placeholder scene', body: 'This is a placeholder.', choices: [] });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
