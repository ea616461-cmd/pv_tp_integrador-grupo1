import { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
//cambio de pantalla
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('Soporte'); 
  
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleFormulario = (e) => {
    e.preventDefault();
    
    if (nombre.trim() === '') {
      alert('Por favor, ingresa tu nombre.');
      return;
    }

    login(nombre, sector);
    navigate('/clientes'); 
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Acceso al Sistema</h2>
      <form onSubmit={handleFormulario}>
        <div>
          <label>Nombre del Administrador:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Ej. Walter Avilés"
          />
        </div>

        <div style={{ marginTop: '15px' }}>
          <label>Sector de la Empresa:</label>
          <select value={sector} onChange={(e) => setSector(e.target.value)}>
            <option value="Soporte">Soporte</option>
            <option value="Gerencia">Gerencia</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: '20px', width: '100%' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}