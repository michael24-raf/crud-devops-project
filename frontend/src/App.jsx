import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import * as api from './services/api';
import './styles/App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  // Vérifier l'état de l'API au chargement
  useEffect(() => {
    checkApiHealth();
  }, []);

  // Charger les utilisateurs au chargement
  useEffect(() => {
    if (apiStatus === 'online') {
      fetchUsers();
    }
  }, [apiStatus]);

  // Vérifier la santé de l'API
  const checkApiHealth = async () => {
    try {
      await api.checkHealth();
      setApiStatus('online');
    } catch (err) {
      setApiStatus('offline');
      setError('❌ Backend non accessible. Vérifie que le serveur est démarré.');
    }
  };

  // Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Créer ou mettre à jour un utilisateur
  const handleSubmit = async (userData) => {
    try {
      setError(null);
      
      if (userToEdit) {
        // Mise à jour
        await api.updateUser(userToEdit.id, userData);
        setUserToEdit(null);
      } else {
        // Création
        await api.createUser(userData);
      }
      
      // Recharger la liste
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  // Préparer l'édition
  const handleEdit = (user) => {
    setUserToEdit(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Annuler l'édition
  const handleCancelEdit = () => {
    setUserToEdit(null);
  };

  // Supprimer un utilisateur
  const handleDelete = async (id) => {
    try {
      setError(null);
      await api.deleteUser(id);
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 CRUD DevOps - Gestion Utilisateurs</h1>
        <div className={`api-status ${apiStatus}`}>
          <span className="status-dot"></span>
          <span>
            {apiStatus === 'checking' && 'Vérification...'}
            {apiStatus === 'online' && 'API en ligne'}
            {apiStatus === 'offline' && 'API hors ligne'}
          </span>
        </div>
      </header>

      <main className="app-main">
        {apiStatus === 'offline' ? (
          <div className="offline-message">
            <h2>⚠️ Backend non accessible</h2>
            <p>Assure-toi que le backend est démarré :</p>
            <code>cd backend && npm run dev</code>
            <button onClick={checkApiHealth} className="btn btn-primary">
              🔄 Réessayer
            </button>
          </div>
        ) : (
          <>
            <section className="form-section">
              <UserForm
                onSubmit={handleSubmit}
                userToEdit={userToEdit}
                onCancelEdit={handleCancelEdit}
              />
            </section>

            {error && (
              <div className="error-banner">
                ⚠️ {error}
              </div>
            )}

            <section className="list-section">
              <UserList
                users={users}
                loading={loading}
                error={null}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </section>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ for DevOps Learning | Backend: Node.js + PostgreSQL | Frontend: React + Vite</p>
      </footer>
    </div>
  );
}

export default App;