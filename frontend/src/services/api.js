const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper pour gérer les erreurs
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue');
  }
  
  return data;
};

// CREATE - Créer un utilisateur
export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  return handleResponse(response);
};

// READ ALL - Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return handleResponse(response);
};

// READ ONE - Récupérer un utilisateur par ID
export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  return handleResponse(response);
};

// UPDATE - Mettre à jour un utilisateur
export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  return handleResponse(response);
};

// DELETE - Supprimer un utilisateur
export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  
  return handleResponse(response);
};

// HEALTH CHECK - Vérifier l'état de l'API
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL.replace('/api', '')}/health`);
    return handleResponse(response);
  } catch (error) {
    throw new Error('API non accessible');
  }
};