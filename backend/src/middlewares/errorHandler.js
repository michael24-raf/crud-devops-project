// Middleware de gestion globale des erreurs
const errorHandler = (err, req, res, next) => {
  console.error('🔥 Erreur:', err);

  // Erreur de validation Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: err.errors.map(e => e.message)
    });
  }

  // Erreur unique constraint
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'Cet élément existe déjà'
    });
  }

  // Erreur par défaut
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Erreur serveur'
  });
};

module.exports = errorHandler;