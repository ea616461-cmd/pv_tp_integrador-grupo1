import React, { useState, useEffect } from 'react';

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
      <p style={{ color: '#666', marginBottom: '20px' }}>Punto 1, 2 y 3 - Formato Tarjetas</p>

      {/* Contenedor tipo Grilla para las Tarjetas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {clientesFiltrados.map((user) => (
          <div key={user.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{user.name.firstname} {user.name.lastname}</h3>
            <p style={{ margin: '5px 0', color: '#555' }}><strong>Email:</strong> {user.email}</p>
            <p style={{ margin: '5px 0', color: '#555' }}><strong>Ciudad:</strong> {user.address.city}</p>
            <button 
              onClick={() => manejarVerDetalle(user.id)} 
              style={{ marginTop: '10px', width: '100%', padding: '8px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Ver Detalle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaClientes;