import '../styles/UserList.css';

const UserItem = ({ user, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Supprimer ${user.name} ?`)) {
      onDelete(user.id);
    }
  };

  // ✨ FONCTION POUR FORMATER LA DATE
  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    
    try {
      const date = new Date(dateString);
      
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) {
        return 'Date invalide';
      }
      
      // Formater en français
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return 'Date invalide';
    }
  };

  return (
    <div className="user-item">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-email">📧 {user.email}</p>
        {user.age && <p className="user-age">🎂 {user.age} ans</p>}
        <p className="user-date">
          {/* ✨ GÉRER LES DEUX FORMATS: createdAt ET created_at */}
          📅 Créé le {formatDate(user.createdAt || user.created_at)}
        </p>
      </div>
      
      <div className="user-actions">
        <button onClick={() => onEdit(user)} className="btn btn-edit" title="Modifier">
          ✏️
        </button>
        <button onClick={handleDelete} className="btn btn-delete" title="Supprimer">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default UserItem;