import UserItem from './UserItem';
import '../styles/UserList.css';

const UserList = ({ users, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="user-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <div className="error-box">
          <p>❌ {error}</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="user-list-container">
        <div className="empty-state">
          <p>👤 Aucun utilisateur pour le moment</p>
          <p className="empty-hint">Ajoutez-en un avec le formulaire ci-dessus</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2>👥 Liste des utilisateurs ({users.length})</h2>
      
      <div className="user-list">
        {users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;