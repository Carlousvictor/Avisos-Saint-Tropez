import React, { useState } from 'react';
import logo from '../assets/logo-sainttropez.png';
import { useTaskStore } from '../store/useTaskStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useTaskStore(state => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #039CC9 0%, #027191 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '14px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <img 
          src={logo} 
          alt="Jardim Saint Tropez" 
          style={{ height: '60px', marginBottom: '30px' }} 
        />
        
        <h2 style={{ 
          fontFamily: 'Montserrat, sans-serif', 
          fontSize: '1.4rem', 
          color: '#027191',
          marginBottom: '8px'
        }}>
          Quadro de Avisos
        </h2>
        <p style={{ 
          fontSize: '0.85rem', 
          color: '#64748b', 
          marginBottom: '25px' 
        }}>
          Gestão de Atividades Saint Tropez
        </p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              color: '#009999',
              marginBottom: '5px'
            }}>
              Usuário
            </label>
            <input 
              type="text" 
              className="field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%' }}
              placeholder="Digite o usuário"
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              color: '#009999',
              marginBottom: '5px'
            }}>
              Senha
            </label>
            <input 
              type="password" 
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%' }}
              placeholder="Digite a senha"
            />
          </div>

          {error && (
            <p style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: '15px', fontWeight: '600' }}>
              {error}
            </p>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '14px', marginTop: '10px' }}
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
