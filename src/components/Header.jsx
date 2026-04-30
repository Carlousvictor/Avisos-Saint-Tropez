import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const Header = () => {
  const [date, setDate] = useState('');

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

        <div className="hidden md:flex items-center gap-3 bg-white/50 px-4 py-2 rounded-full border border-white/40 shadow-sm">
          <Calendar className="w-4 h-4 text-[#039CC9]" />
          <span className="text-sm font-medium text-slate-700">
            {date}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
