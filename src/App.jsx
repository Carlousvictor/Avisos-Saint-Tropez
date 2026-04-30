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
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="px-8 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
      </main>

      <TaskModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(pid, text) => addTask(pid, text)}
        initialPeriodId={selectedPeriod}
      />

      <footer className="mt-16 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
        <p>© 2026 Condomínio Jardim Saint Tropez • Gestão Eficiente</p>
      </footer>
    </div>
  );
}

export default App;
