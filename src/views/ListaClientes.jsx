import React, { useState, useEffect } from 'react';
// IMPORTACIÓN DEL MÓDULO C: Formulario de Alta de Clientes
import FormularioCliente from '../components/common/FormularioCliente';

const ListaClientes = () => {
  // 1. ZONA DE ESTADOS (useState)
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. ZONA DE LÓGICA Y CONSUMO DE API (useEffect)
  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setLoading(true);
        const respuesta = await fetch('https://fakestoreapi.com/users');
        if (!respuesta.ok) {
          throw new Error('Error al conectar con el servidor');
        }
        const datos = await respuesta.json();
        setClientes(datos); 
        setLoading(false);
      } catch (err) {
        setError(err.message); 
        setLoading(false);
      }
    };
    obtenerClientes();
  }, []);

  // LÓGICA DEL PUNTO 2: FILTRADO DINÁMICO
  const clientesFiltrados = clientes.filter((user) => {
    const termino = busqueda.toLowerCase();
    const apellido = user.name.lastname.toLowerCase();
    const ciudad = user.address.city.toLowerCase();
    return apellido.includes(termino) || ciudad.includes(termino);
  });

  // LÓGICA DEL PUNTO 3: MANEJADOR DE CLIC PARA DETALLE
  const manejarVerDetalle = (id) => {
    // Alerta interactiva para demostrar que el sistema captura el ID único del cliente para redireccionar
    alert(`Redireccionando a la vista de detalle del Cliente con ID: ${id}`);
    
    // Aquí es donde el sistema del grupo conectará con su router de rutas (ej: navigate(`/detalle/${id}`))
  };

  // 3. RENDERIZADO DE LA INTERFAZ GRÁFICA
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '5px', color: '#333' }}>Módulo B: Vista de Clientes</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Punto 1, 2 y 3 - Sistema Completo con Consumo de API, Buscador y Redirección</p>
      
      {/* INYECCIÓN DEL FORMULARIO INTEGRADO (MÓDULO C) */}
      <FormularioCliente />

      <hr style={{ border: '0', height: '1px', backgroundColor: '#ccc', margin: '30px 0' }} />
      
      {/* CAJA DEL BUSCADOR (Punto 2) */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por apellido o ciudad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '10px 15px',
            fontSize: '16px',
            border: '2px solid #1976d2',
            borderRadius: '6px',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        />
      </div>
      
      {/* Contenedor de la Tabla Profesional */}
      <div style={{ overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#fff' }}>
          
          <thead>
            <tr style={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Nombre Completo</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Teléfono</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Ciudad</th>
              <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          
          <tbody>
            {clientesFiltrados.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#555' }}>{user.id}</td>
                <td style={{ padding: '12px 15px' }}>{user.name.firstname} {user.name.lastname}</td>
                <td style={{ padding: '12px 15px', color: '#555' }}>{user.email}</td>
                <td style={{ padding: '12px 15px', color: '#555' }}>{user.phone}</td>
                <td style={{ padding: '12px 15px', color: '#555' }}>{user.address.city}</td>
                
                {/* BOTÓN DE ACCIÓN (Punto 3) */}
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  <button
                    onClick={() => manejarVerDetalle(user.id)}
                    style={{
                      backgroundColor: '#2e7d32',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1b5e20'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2e7d32'}
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ListaClientes;