const app = require('./src/app');
const { testConnection } = require('./src/config/database');
const { syncDatabase } = require('./src/models');

const PORT = process.env.PORT || 5000;

// Fonction de démarrage
const startServer = async () => {
  try {
    // Test connexion DB
    await testConnection();
    
    // Synchronisation DB
    await syncDatabase();
    
    // Démarrage serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`👥 API Users: http://localhost:${PORT}/api/users`);
    });
  } catch (error) {
    console.error('❌ Erreur démarrage serveur:', error.message);
    process.exit(1);
  }
};

startServer();