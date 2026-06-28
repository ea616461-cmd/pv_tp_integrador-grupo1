import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

export default function Login() {
  const { admin, login, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('Soporte');

  const handleFormulario = (e) => {
    e.preventDefault();
    if (nombre.trim() === '') {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    login(nombre, sector);
    navigate('/clientes');
  };

  // MUESTRA LA TARJETA EN VEZ DEL FORMULARIO
  if (admin) {
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>
        <h2>Sesión Activa</h2>
        
        <div style={{ padding: '20px', margin: '20px 0', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '6px' }}>
          <p style={{ fontSize: '18px', margin: '5px 0' }}>👤 Nombre: <strong>{admin.nombre}</strong></p>
          <p style={{ fontSize: '18px', margin: '5px 0' }}>💼 Sector: <strong>{admin.sector}</strong></p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <button 
            onClick={() => navigate('/clientes')} 
            style={{ width: '100%', padding: '10px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Ir a Lista de Clientes
          </button>
          <button 
            onClick={logout} 
            style={{ width: '100%', padding: '10px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  // EL FORMULARIO ORIGINAL
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Acceso al Sistema</h2>
      <form onSubmit={handleFormulario}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Ej. Walter Avilés"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Sector:</label>
          <select 
            value={sector} 
            onChange={(e) => setSector(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="Soporte">Soporte</option>
            <option value="Gerencia">Gerencia</option>
          </select>
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}