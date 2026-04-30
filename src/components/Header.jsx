import React, { useState, useEffect } from 'react';

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
    <header>
      <div className="brand">
        <div className="brand-logo">
          <img src="http://www.jardimsainttropez.com.br/logo-palavra3.png" alt="Jardim Saint Tropez" />
        </div>
        <div className="brand-text">
          <h1>Quadro de Tarefas</h1>
          <p>Gestão de Atividades do Condomínio</p>
        </div>
      </div>
      <div className="header-date">{date}</div>
    </header>
  );
};

export default Header;
