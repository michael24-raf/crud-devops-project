require('dotenv').config();
const app = require('./src/app'); // ⚠️ chemin CRUCIAL

const { testConnection } = require('./src/config/database');
const { syncDatabase } = require('./src/models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Vérifier la DB
    await testConnection();
    await syncDatabase();

    // Démarrage serveur
    app.listen(PORT, () => {
      console.log('✅ src/app.js chargé');
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`📈 Metrics: http://localhost:${PORT}/metrics`);
      console.log(`👥 API Users: http://localhost:${PORT}/api/users`);
    });
  } catch (error) {
    console.error('❌ Erreur démarrage serveur:', error.message);
    process.exit(1);
  }
};

startServer();
