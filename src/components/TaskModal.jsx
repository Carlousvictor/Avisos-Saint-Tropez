import React, { useState, useEffect } from 'react';
import { PERIODS } from '../store/useTaskStore';

const TaskModal = ({ isOpen, onClose, onSave, initialPeriodId }) => {
  const [text, setText] = useState('');
  const [periodId, setPeriodId] = useState(initialPeriodId || 'daily');

  useEffect(() => {
    if (isOpen) {
      setPeriodId(initialPeriodId || 'daily');
      setText('');
    }
  }, [isOpen, initialPeriodId]);

  const handleSave = () => {
    if (text.trim()) {
      onSave(periodId, text.trim());
      onClose();
    }
  };

  const currentPeriod = PERIODS.find(p => p.id === periodId);

  if (!isOpen) return null;

  return (
    <div className={`modal-bg ${isOpen ? 'open' : ''}`} onClick={(e) => e.target.classList.contains('modal-bg') && onClose()}>
      <div className="modal" style={{ '--modal-color': currentPeriod?.color }}>
        <div className="modal-header">
          <div className="modal-dot" style={{ background: currentPeriod?.color }}></div>
          <h2>Nova Tarefa</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div>
            <label className="field-label">Descrição da Tarefa</label>
            <textarea 
              className="field" 
              placeholder="Descreva a tarefa..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="field-label">Periodicidade</label>
            <select 
              className="field" 
              value={periodId} 
              onChange={(e) => setPeriodId(e.target.value)}
            >
              {PERIODS.map(p => (
                <option key={p.id} value={p.id}>{p.label} – {p.sub}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSave}>Salvar Tarefa</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
