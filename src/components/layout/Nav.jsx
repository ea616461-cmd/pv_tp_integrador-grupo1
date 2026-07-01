import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

export default function Nav() {
  const { admin } = useContext(AdminContext);
  if (!admin) return null;

  // Estilo base para los links interactivos
  const linkStyle = {
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  };

  return (
    <nav className="d-flex align-items-center gap-2" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      padding: '4px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <NavLink 
        to="/dashboard" 
        style={linkStyle}
        className={({ isActive }) => isActive ? "bg-primary text-white shadow-sm" : "text-secondary bg-transparent"}
      >
        📊 Dashboard
      </NavLink>

      <NavLink 
        to="/clientes" 
        style={linkStyle}
        className={({ isActive }) => isActive ? "bg-primary text-white shadow-sm" : "text-secondary bg-transparent"}>
        👥 Clientes
      </NavLink>

      {/* Condicional de Rol */}
      {admin.sector === 'Gerencia' && (
        <NavLink 
          to="/clientes/nuevo" 
          style={linkStyle}
          className={({ isActive }) => isActive ? "bg-success text-white shadow-sm" : "text-secondary bg-transparent"}>
        </NavLink>
      )}
    </nav>
  );
}