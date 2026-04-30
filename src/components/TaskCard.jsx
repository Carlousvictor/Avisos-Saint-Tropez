import React, { useState } from 'react';

const TaskCard = ({ text, index, periodId, periodColor, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <div className="task-item" style={{ '--col-color': periodColor }}>
      <div className="task-num">{index + 1}</div>
      <div className="task-content">
        <div className="task-text">{text}</div>
      </div>
      <div className="task-actions">
        <button 
          className="act-btn" 
          title="Editar" 
          onClick={() => setIsEditing(true)}
        >
          ✎
        </button>
        <button 
          className="act-btn del" 
          title="Remover" 
          onClick={onRemove}
        >
          ✕
        </button>
      </div>
      
      <div className={`edit-overlay ${isEditing ? 'show' : ''}`} style={{ '--col-color': periodColor }}>
        <textarea 
          value={editText} 
          onChange={(e) => setEditText(e.target.value)}
          autoFocus={isEditing}
        />
        <div className="edit-row">
          <button className="edit-save" onClick={handleSave}>✔ Salvar</button>
          <button className="edit-cancel" onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
