import { useState, useEffect } from 'react';
import '../styles/UserForm.css';

const UserForm = ({ onSubmit, userToEdit, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  
  const [errors, setErrors] = useState({});

  // Pré-remplir le formulaire en mode édition
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        age: userToEdit.age || ''
      });
    }
  }, [userToEdit]);

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est obligatoire';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (formData.age && (formData.age < 0 || formData.age > 150)) {
      newErrors.age = 'L\'âge doit être entre 0 et 150';
    }
    
    return newErrors;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Préparer les données (âge en nombre ou null)
    const submitData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: formData.age ? parseInt(formData.age) : null
    };
    
    onSubmit(submitData);
    
    // Réinitialiser le formulaire si c'est une création
    if (!userToEdit) {
      setFormData({ name: '', email: '', age: '' });
    }
    
    setErrors({});
  };

  // Annuler l'édition
  const handleCancel = () => {
    setFormData({ name: '', email: '', age: '' });
    setErrors({});
    onCancelEdit();
  };

  return (
    <div className="user-form-container">
      <h2>{userToEdit ? '✏️ Modifier l\'utilisateur' : '➕ Ajouter un utilisateur'}</h2>
      
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Nom *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Jean Dupont"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: jean@example.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Âge</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Ex: 25"
            min="0"
            max="150"
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {userToEdit ? '💾 Enregistrer' : '➕ Ajouter'}
          </button>
          
          {userToEdit && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              ❌ Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;