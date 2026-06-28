import React, { useState } from 'react';

export default function FormularioCliente() {
  // 1. ZONA DE ESTADOS
    const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    ciudad: ''
    });

    const [loading, setLoading] = useState(false);
    const [mensajeExito, setMensajeExito] = useState(null);
    const [error, setError] = useState(null);

  // 2. MANEJADOR UNIVERSAL DE INPUTS
    const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
        ...cliente,
        [name]: value
    });
    };

  // 3. ENVÍO ASINCRÓNICO (PETICIÓN POST)
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMensajeExito(null);

    // Mapeo de datos para FakeStore API
    const datosEnviar = {
        email: cliente.email,
        username: cliente.nombre.toLowerCase() + '123',
        password: 'password123',
        name: { firstname: cliente.nombre, lastname: cliente.apellido },
        address: { city: cliente.ciudad, street: 'Av. Fascio', number: 123, zipcode: '4600' },
        phone: cliente.telefono
    };

    try {
        const respuesta = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosEnviar)
        });

        if (!respuesta.ok) throw new Error('Error al procesar el alta en el servidor');

        const data = await respuesta.json();

      // Notificación de éxito capturando el ID retornado por la API (Requisito Módulo C)
        setMensajeExito(`¡Cliente creado exitosamente! ID Asignado por la API: ${data.id}`);
        
      // Limpiamos los campos del formulario
        setCliente({ nombre: '', apellido: '', email: '', telefono: '', ciudad: '' });
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    };

  // 4. INTERFAZ GRÁFICA DEL FORMULARIO
    const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
    };

    return (
    <div style={{ 
        backgroundColor: '#f9f9f9', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
    }}>
        <h3 style={{ marginTop: 0, color: '#1976d2' }}>Módulo C: Alta de Nuevo Cliente</h3>

        <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Nombre:</label>
            <input type="text" name="nombre" required value={cliente.nombre} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Apellido:</label>
            <input type="text" name="apellido" required value={cliente.apellido} onChange={handleChange} style={inputStyle} />
            </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Email:</label>
            <input type="email" name="email" required value={cliente.email} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Teléfono:</label>
            <input type="text" name="telefono" required value={cliente.telefono} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Ciudad:</label>
            <input type="text" name="ciudad" required value={cliente.ciudad} onChange={handleChange} style={inputStyle} />
            </div>
        </div>

        <button 
            type="submit" 
            disabled={loading}
            style={{
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%'
            }}
        >
            {loading ? 'Procesando alta...' : 'Dar de Alta Cliente'}
        </button>
        </form>

      {/* FEEDBACK VISUAL */}
        {mensajeExito && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', fontWeight: 'bold' }}>
            {mensajeExito}
        </div>
        )}
        {error && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', fontWeight: 'bold' }}>
            Error: {error}
        </div>
        )}
    </div>
    );
}