import React, { useState, useEffect } from 'react';
import { Calendar, Printer, RotateCcw } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';

const Header = () => {
  const [date, setDate] = useState('');
  const resetTasks = useTaskStore(state => state.resetTasks);

  useEffect(() => {
    const d = new Date();
    const s = d.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    setDate(s.charAt(0).toUpperCase() + s.slice(1));
  }, []);

  return (
    <header className="glass sticky top-0 z-50 py-4 px-8 mb-8 shadow-sm">
      <div className="flex items-center justify-between gap-4 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-xl shadow-sm">
            <img 
              src="http://www.jardimsainttropez.com.br/logo-palavra3.png" 
              alt="Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#027191] leading-tight">
              Quadro de Tarefas
            </h1>
            <p className="text-xs text-[#009999] font-semibold tracking-wide uppercase">
              SD Saint Tropez • Gestão 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3 bg-white/50 px-4 py-2 rounded-full border border-white/40 shadow-sm mr-2">
            <Calendar className="w-4 h-4 text-[#039CC9]" />
            <span className="text-sm font-medium text-slate-700">
              {date}
            </span>
          </div>
          
          <button 
            onClick={() => window.print()}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
            title="Imprimir Quadro"
          >
            <Printer className="w-5 h-5" />
          </button>
          
          <button 
            onClick={resetTasks}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
            title="Resetar Tarefas"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};


export default Header;
