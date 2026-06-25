import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
// 1. IMPORTÁS EL HOOK DE NAVEGACIÓN
import { useNavigate } from 'react-router-dom'; 

export default function Header() {
  const { admin, logout } = useContext(AdminContext);
  // 2. CREÁS LA CONSTANTE NAVIGATE
  const navigate = useNavigate(); 

  // 3. CREÁS LA FUNCIÓN QUE LOGUEA Y REDIRIGE
  const handleCerrarSesion = () => {
    logout();
    navigate('/'); // Te manda a la raíz obligatoriamente
  };

  if (!admin) return null;

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#222', color: '#fff' }}>
      <h3>Panel Admin</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span>
          👤 <strong>{admin.nombre}</strong> ({admin.sector})
        </span>
        {/* 4. CAMBIÁS EL ONCLICK PARA QUE USE TU FUNCIÓN */}
        <button onClick={handleCerrarSesion} style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}