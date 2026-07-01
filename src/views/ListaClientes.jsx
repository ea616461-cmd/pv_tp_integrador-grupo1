import React, { useState, useEffect } from 'react';
// IMPORTACIÓN DEL MÓDULO C: Formulario de Alta de Clientes
import FormularioCliente from '../components/common/FormularioCliente';
import { useNavigate } from "react-router-dom";

const ListaClientes = () => {
  const navigate = useNavigate();
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

  // FUNCIÓN CALLBACK PARA ACOPLAR EL ALTA (MÓDULO C) CON ESTA LISTA LOCAL
const agregarNuevoClienteALista = (nuevoCliente) => {
  // Validación de seguridad: comprobamos que no exista ya un ID 11
  const existeId = clientes.some(c => c.id === nuevoCliente.id);
  if (!existeId) {
    // CAMBIO DE ORDEN: Primero desestructuramos los clientes que ya estaban (1 al 10) 
    // y al final empujamos el nuevoCliente (el 11)
    setClientes([...clientes, nuevoCliente]); 
  }
};

  // LÓGICA DEL PUNTO 2: FILTRADO DINÁMICO
  const clientesFiltrados = clientes.filter((user) => {
    const termino = busqueda.toLowerCase();
    // Validaciones opcionales por si el formato del nuevo cliente difiere levemente de la API
    const apellido = user.name?.lastname?.toLowerCase() || '';
    const ciudad = user.address?.city?.toLowerCase() || '';
    return apellido.includes(termino) || ciudad.includes(termino);
  });

  // LÓGICA DEL PUNTO 3: MANEJADOR DE CLIC PARA DETALLE
  const manejarVerDetalle = (id) => {
    // Alerta interactiva para demostrar que el sistema captura el ID único del cliente para redireccionar
    navigate(`/clientes/${id}`);
    
    // Aquí es donde el sistema del grupo conectará con su router de rutas (ej: navigate(`/detalle/${id}`))
  };

  // 3. RENDERIZADO DE LA INTERFAZ GRÁFICA
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>

      
      {/* INYECCIÓN DEL FORMULARIO INTEGRADO (MÓDULO C) PASANDO EL CALLBACK COMO PROP */}
      <FormularioCliente alAgregarCliente={agregarNuevoClienteALista} />

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
      
{/* Contenedor de Cards de Clientes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {clientesFiltrados.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '18px',
              borderLeft: '4px solid #1976d2',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '17px', color: '#222' }}>
                {user.name.firstname} {user.name.lastname}
              </span>
              <span style={{ fontSize: '12px', color: '#999' }}>#{user.id}</span>
            </div>

            <span style={{ color: '#555', fontSize: '14px' }}>📧 {user.email}</span>
            <span style={{ color: '#555', fontSize: '14px' }}>📞 {user.phone}</span>
            <span style={{ color: '#555', fontSize: '14px' }}>📍 {user.address.city}</span>

            <button
              onClick={() => manejarVerDetalle(user.id)}
              style={{
                marginTop: '10px',
                backgroundColor: '#1976d2',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
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