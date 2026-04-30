import React from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { motion, AnimatePresence } from 'framer-motion';

const TaskColumn = ({ period, tasks, onAddTask, onRemoveTask, onUpdateTask }) => {
  return (
    <div className="flex flex-col h-full bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-sm">
      {/* Column Header */}
      <div className="p-5 border-b border-white/60 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 right-0 h-1" 
          style={{ backgroundColor: period.color }} 
        />
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {period.sub}
          </span>
          <span 
            className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
            style={{ backgroundColor: period.color }}
          >
            {tasks.length}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800" style={{ color: period.color }}>
          {period.label}
        </h3>
      </div>

      {/* Column Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[400px]">
        <AnimatePresence initial={false}>
          {tasks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 text-slate-300 gap-2"
            >
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center">
                <Plus className="w-6 h-6 opacity-40" />
              </div>
              <p className="text-xs font-medium">Sem tarefas</p>
            </motion.div>
          ) : (
            tasks.map((task, idx) => (
              <TaskCard 
                key={`${period.id}-${idx}-${task.substring(0, 5)}`}
                text={task}
                index={idx}
                periodColor={period.color}
                onRemove={() => onRemoveTask(idx)}
                onUpdate={(newText) => onUpdateTask(idx, newText)}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Column Footer */}
      <div className="p-4 bg-white/30">
        <button 
          onClick={onAddTask}
          className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-semibold text-xs flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-500 hover:bg-white transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          ADICIONAR TAREFA
        </button>
      </div>
    </div>
  );
};

export default TaskColumn;
