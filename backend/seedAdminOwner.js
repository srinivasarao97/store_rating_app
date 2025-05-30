require('dotenv').config();
const bcrypt = require('bcrypt');
const pool = require('./config/db');

async function createUser(name, email, password, address, role) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (name, email, password, address, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, role
  `;

  const values = [name, email, hashedPassword, address, role];

  try {
    const result = await pool.query(query, values);
    console.log(`${role.toUpperCase()} created:`, result.rows[0]);
  } catch (err) {
    console.error(`Error creating ${role}:`, err.message);
  }
}

async function seed() {
  await createUser(
    'Administrator Example User',
    'bommina97@gmail.com',
    'bommina',
    'Reddigudem',
    'admin'
  );

  await createUser(
    'Store Owner Full Name',
    'srinivas@gmail.com',
    'srinivas',
    'Reddigudem',
    'store_owner'
  );

  pool.end();
}

seed();
