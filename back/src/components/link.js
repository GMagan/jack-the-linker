import express from 'express';
import pool from '../database/db.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM links');
    res.status(200).json(result.rows);
  } catch (err) {
    console.log('Erro ao buscar links:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/r/:code', async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM links WHERE short_code = $1',
      [code]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Link não encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log('Erro no redirect:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM links WHERE id = $1',
      [id]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.log('Erro ao buscar link:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { original_url } = req.body;

  const short_code = Math.random().toString(36).substring(2, 8);

  try {
    const result = await pool.query(
      'INSERT INTO links (original_url, short_code) VALUES ($1, $2) RETURNING *',
      [original_url, short_code]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log('Erro ao criar link:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'DELETE FROM links WHERE id = $1',
      [id]
    );

    res.status(200).json();
  } catch (err) {
    console.log('Erro ao deletar link:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;