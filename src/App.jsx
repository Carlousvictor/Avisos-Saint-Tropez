import React, { useState } from 'react';
import Header from './components/Header';
import TaskColumn from './components/TaskColumn';
import TaskModal from './components/TaskModal';
import { useTaskStore, PERIODS } from './store/useTaskStore';

function App() {
  const { tasks, addTask, removeTask, updateTask } = useTaskStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const handleOpenAdd = (periodId) => {
    setSelectedPeriod(periodId);
    setModalOpen(true);
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="board-wrap">
        <div className="board">
          {PERIODS.map((period) => (
            <TaskColumn 
              key={period.id}
              period={period}
              tasks={tasks[period.id] || []}
              onAddTask={() => handleOpenAdd(period.id)}
              onRemoveTask={(idx) => removeTask(period.id, idx)}
              onUpdateTask={(idx, text) => updateTask(period.id, idx, text)}
            />
          ))}
        </div>
      </div>

      <TaskModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(pid, text) => addTask(pid, text)}
        initialPeriodId={selectedPeriod}
      />
    </div>
  );
}

export default App;
