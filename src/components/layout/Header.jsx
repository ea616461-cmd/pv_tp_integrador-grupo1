import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import Nav from './Nav';
// 1. Agregamos useLocation junto a useNavigate
import { useNavigate, useLocation } from 'react-router-dom'; 

export default function Header() {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate(); 
  
  // 2. Inicializamos el hook para saber la ruta actual
  const location = useLocation();

  const handleCerrarSesion = () => {
    logout();
    navigate('/'); 
  };

  if (!admin) return null;

  // 3. Funciones auxiliares para verificar qué botón debe estar activo
  const esDashboardActivo = location.pathname === '/dashboard';
  const esClientesActivo = location.pathname.startsWith('/clientes');

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px 20px', 
      color: '#eeeeee',
      position: 'sticky',
      top: 0,
      zIndex: 1020,                                 
      backgroundColor: 'rgba(31, 31, 31, 0.45)',     // Tu color traslúcido
      backdropFilter: 'blur(12px)',                 
      WebkitBackdropFilter: 'blur(12px)',            
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',   
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)' 
    }}>
      
      <img 
        src="/2673914f-ca58-4e4b-809e-1957bd301fca.png" 
        alt="Logo UNJu Virtual" 
        style={{ 
          height: '50px', 
          width: 'auto',
          display: 'block'
        }} 
      />
      <h3 style={{ margin: 0, fontSize: '20px' }}>Sistema de Gestión de Clientes</h3>
      
      {/* CONTENEDOR DE BOTONES (Igual al de tu captura image_8e8a38.png) */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '5px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        padding: '5px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        
        {/* BOTÓN DASHBOARD */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            // 💡 Si está activo se pinta azul (#1976d2), si no, queda transparente
            background: esDashboardActivo ? "#1976d2" : "transparent",
            color: esDashboardActivo ? "white" : "#a5b4fc",
            border: "none",
            padding: "8px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s ease" // Suaviza el cambio de color
          }}
        >
          Dashboard
        </button>

        {/* BOTÓN CLIENTES */}
        <button
          onClick={() => navigate("/clientes")}
          style={{
            // 💡 Si está activo se pinta del mismo azul, si no, queda transparente
            background: esClientesActivo ? "#1976d2" : "transparent",
            color: esClientesActivo ? "white" : "#a5b4fc",
            border: "none",
            padding: "8px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s ease"
          }}
        >
          Clientes
        </button>

        <span style={{ marginLeft: '10px', marginRight: '5px', fontSize: '14px' }}>
          👤 <strong>{admin.nombre}</strong> ({admin.sector})
        </span>

        <button onClick={handleCerrarSesion} style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '8px', fontWeight: 'bold' }}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}