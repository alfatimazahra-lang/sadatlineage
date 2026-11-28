import pg from 'pg';
import fs from 'fs';
const c = new pg.Client({ connectionString: process.env.DB_URL, ssl: { rejectUnauthorized: false } });
await c.connect();
await c.query(fs.readFileSync(process.argv[2], 'utf8'));
const r = await c.query("select id, length(arabic) as ar, length(transliteration) as tr from ziyarats where id='ashura'");
console.log(r.rows);
await c.end();
