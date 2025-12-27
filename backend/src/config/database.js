const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuration de la connexion à PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test de connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion PostgreSQL réussie');
  } catch (error) {
    console.error('❌ Erreur connexion PostgreSQL:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection };