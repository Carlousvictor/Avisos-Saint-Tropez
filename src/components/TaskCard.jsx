import React, { useState } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskCard = ({ text, index, periodColor, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex gap-3">
        <div 
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
          style={{ backgroundColor: periodColor }}
        >
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.p 
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[0.9rem] leading-relaxed text-slate-700 font-medium break-words whitespace-pre-wrap"
              >
                {text}
              </motion.p>
            ) : (
              <motion.div 
                key="edit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-2"
              >
                <textarea
                  autoFocus
                  className="w-full text-[0.9rem] p-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none min-h-[80px]"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="flex gap-2 justify-end">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleSave}
                    className="p-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isEditing && (
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-md text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={onRemove}
              className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
