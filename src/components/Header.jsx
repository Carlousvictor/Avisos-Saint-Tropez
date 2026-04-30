import React, { useState, useEffect } from 'react';
import logo from '../assets/logo-sainttropez.png';
import { Printer, LogOut } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';

const Header = () => {
  const [date, setDate] = useState('');
  const logout = useTaskStore(state => state.logout);

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
    <header>
      <div className="brand">
        <div className="brand-logo">
          <img src={logo} alt="Jardim Saint Tropez" />
        </div>
        <div className="brand-text">
          <h1>Quadro de Tarefas</h1>
          <p>Gestão de Atividades do Condomínio</p>
        </div>
      </div>
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="header-date">{date}</div>
        <button 
          onClick={() => window.print()}
          className="print-btn"
          style={{
            background: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            color: '#027191'
          }}
          title="Imprimir Quadro"
        >
          <Printer size={18} />
        </button>
        <button 
          onClick={logout}
          className="logout-btn"
          style={{
            background: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            color: '#dc2626'
          }}
          title="Sair"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
