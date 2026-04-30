import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ period, tasks, onAddTask, onRemoveTask, onUpdateTask }) => {
  return (
    <div className="col" style={{ '--col-color': period.color }}>
      <div className="col-head">
        <div className="col-head-top">
          <span className="col-period-label">{period.sub}</span>
          <span className="col-badge">{tasks.length}</span>
        </div>
        <div className="col-title">{period.label}</div>
      </div>
      <div className="col-body">
        {tasks.length === 0 ? (
          <div className="col-empty"><span>📋</span>Nenhuma tarefa cadastrada.</div>
        ) : (
          tasks.map((text, idx) => (
            <TaskCard 
              key={`${period.id}-${idx}`}
              text={text}
              index={idx}
              periodId={period.id}
              periodColor={period.color}
              onRemove={() => onRemoveTask(idx)}
              onUpdate={(newText) => onUpdateTask(idx, newText)}
            />
          ))
        )}
      </div>
      <div className="col-footer">
        <button className="add-btn" onClick={onAddTask}>
          <span className="add-icon">＋</span> Adicionar Tarefa
        </button>
      </div>
    </div>
  );
};

export default TaskColumn;
