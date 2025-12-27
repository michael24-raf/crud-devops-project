const { User } = require('../models');

// CREATE - Créer un utilisateur
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;

    // Validation basique
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Le nom et l\'email sont obligatoires'
      });
    }

    // Création de l'utilisateur
    const user = await User.create({ name, email, age });

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// READ ALL - Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// READ ONE - Récupérer un utilisateur par ID
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur introuvable'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE - Mettre à jour un utilisateur
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur introuvable'
      });
    }

    // Mise à jour
    await user.update({ name, email, age });

    res.status(200).json({
      success: true,
      message: 'Utilisateur mis à jour',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// DELETE - Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur introuvable'
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'Utilisateur supprimé'
    });
  } catch (error) {
    next(error);
  }
};