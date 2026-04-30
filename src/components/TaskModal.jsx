import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERIODS } from '../store/useTaskStore';

const TaskModal = ({ isOpen, onClose, onSave, initialPeriodId }) => {
  const [text, setText] = useState('');
  const [periodId, setPeriodId] = useState(initialPeriodId || 'daily');

  const handleSave = () => {
    if (text.trim()) {
      onSave(periodId, text.trim());
      setText('');
      onClose();
    }
  };

  const currentPeriod = PERIODS.find(p => p.id === periodId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-[110] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full shadow-sm" 
                  style={{ backgroundColor: currentPeriod?.color }} 
                />
                <h2 className="text-xl font-bold text-slate-800">Nova Tarefa</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Descrição da Atividade
                </label>
                <textarea 
                  autoFocus
                  placeholder="Ex: Varrição das alamedas..."
                  className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all resize-none text-slate-700 font-medium"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Periodicidade
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PERIODS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setPeriodId(p.id)}
                      className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                        periodId === p.id 
                        ? 'bg-white border-blue-400 text-blue-600 shadow-md ring-2 ring-blue-50' 
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-4 px-6 rounded-2xl font-bold text-slate-500 hover:bg-slate-200 transition-all text-sm"
              >
                CANCELAR
              </button>
              <button 
                onClick={handleSave}
                disabled={!text.trim()}
                className="flex-1 py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
              >
                <Send className="w-4 h-4" />
                SALVAR TAREFA
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
