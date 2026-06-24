import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

export default function Header() {
  const { admin, logout } = useContext(AdminContext);
  if (!admin) return null;

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#222', color: '#fff' }}>
      <h3>Panel Admin</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span>
          👤 <strong>{admin.nombre}</strong> ({admin.sector})
        </span>
        <button onClick={logout} style={{ background: '#d32f2f', color: '#white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}