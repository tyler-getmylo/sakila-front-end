import process from 'process';

import mysql from 'mysql2/promise';

export default async function connect() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'tyler',
    password: process.env.MYSQL_PASS,
    database: 'sakila',
  });
  return { conn, close: () => conn.end() };
}
