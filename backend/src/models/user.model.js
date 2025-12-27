const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Définition du modèle User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Le nom ne peut pas être vide'
      },
      len: {
        args: [2, 100],
        msg: 'Le nom doit contenir entre 2 et 100 caractères'
      }
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      msg: 'Cet email est déjà utilisé'
    },
    validate: {
      isEmail: {
        msg: 'Email invalide'
      }
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [0],
        msg: 'L\'âge doit être positif'
      },
      max: {
        args: [150],
        msg: 'L\'âge doit être réaliste'
      }
    }
  }
}, {
  tableName: 'users',
  timestamps: true, // Ajoute createdAt et updatedAt
  underscored: true // Utilise snake_case (created_at)
});

module.exports = User;