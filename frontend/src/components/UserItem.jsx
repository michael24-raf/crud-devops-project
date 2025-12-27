import '../styles/UserList.css';

const UserItem = ({ user, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Supprimer ${user.name} ?`)) {
      onDelete(user.id);
    }
  };

  return (
    <div className="user-item">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-email">📧 {user.email}</p>
        {user.age && <p className="user-age">🎂 {user.age} ans</p>}
        <p className="user-date">
          📅 Créé le {new Date(user.created_at).toLocaleDateString('fr-FR')}
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