const { sequelize } = require('../config/database');
const User = require('./user.model');

// Synchronisation des modèles avec la base de données
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // alter: true = mise à jour automatique du schéma
    console.log('✅ Base de données synchronisée');
  } catch (error) {
    console.error('❌ Erreur synchronisation DB:', error.message);
  }
};

module.exports = {
  User,
  syncDatabase
};