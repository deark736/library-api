// data/db.js
const { MongoClient } = require('mongodb');

let _client;
let _db;

async function initDb() {
  if (_db) return _db;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || 'libraryDB';

  if (!uri) throw new Error('MONGODB_URI is not set');
  _client = new MongoClient(uri);

  await _client.connect();
  _db = _client.db(dbName);
  console.log('Database connected to', dbName);
  return _db;
}

function getDb() {
  if (!_db) throw new Error('Database not initialized. Call initDb() first.');
  return _db;
}

async function closeDb() {
  if (_client) await _client.close();
}

module.exports = { initDb, getDb, closeDb };
