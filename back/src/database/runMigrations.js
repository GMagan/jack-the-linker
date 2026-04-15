import pool from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runScript = async (filePath) => {
  const script = fs.readFileSync(
    path.join(__dirname, filePath),
    'utf-8'
  );

  try {
    await pool.query(script);
    console.log(`${filePath} rodou com sucesso`);
  } catch (error) {
    console.error(`Erro em ${filePath}:`, error);
  }
};

const runAllScripts = async () => {
  await runScript('./sql/tableCreator.sql');
  process.exit();
};

runAllScripts();