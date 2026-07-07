import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormularioCliente() {
    const navigate = useNavigate(); 
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        ciudad: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatearTelefono = (valor) => {
        const numeros = valor.replace(/\D/g, '');
        if (!numeros) return '';
        const numCortado = numeros.slice(0, 11);
        if (numCortado.length <= 1) return numCortado;
        if (numCortado.length <= 4) return `${numCortado.slice(0, 1)}-${numCortado.slice(1)}`;
        if (numCortado.length <= 7) return `${numCortado.slice(0, 1)}-${numCortado.slice(1, 4)}-${numCortado.slice(4)}`;
        return `${numCortado.slice(0, 1)}-${numCortado.slice(1, 4)}-${numCortado.slice(4, 7)}-${numCortado.slice(7)}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({
            ...cliente,
            [name]: name === 'telefono' ? formatearTelefono(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const datosEnviar = {
            email: cliente.email,
            username: cliente.nombre.toLowerCase() + '123',
            password: 'password123',
            name: { firstname: cliente.nombre, lastname: cliente.apellido },
            address: { city: cliente.ciudad, street: 'Av. Fascio', number: 123, zipcode: '4600' },
            phone: cliente.telefono
        };

        fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosEnviar)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al guardar la información en el servidor');
            }
        })
        .then(data => {
            const clienteParaGuardar = {
                id: 11,
                email: cliente.email,
                phone: cliente.telefono,
                name: { firstname: cliente.nombre, lastname: cliente.apellido },
                address: { city: cliente.ciudad }
            };

            // Guardamos en el navegador para que aparezca la card #11 en la otra pestaña
            localStorage.setItem('nuevo_cliente_card', JSON.stringify(clienteParaGuardar));

            alert('¡Cliente creado exitosamente!');
            setLoading(false);

            // Redireccionamos a la lista de tarjetas
            navigate('/clientes');
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    };

    const inputStyle = {
        width: '100%', padding: '8px 12px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box'
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '30px auto' }}>
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
                        <input type="text" name="telefono" required placeholder="1-234-567-8901" value={cliente.telefono} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Ciudad:</label>
                        <select name="ciudad" required value={cliente.ciudad} onChange={handleChange} style={inputStyle}>
                            <option value="">Seleccione una ciudad</option>
                            <option value="San Salvador de Jujuy">San Salvador de Jujuy</option>
                            <option value="Palpalá">Palpalá</option>
                            <option value="Perico">Perico</option>
                            <option value="San Pedro">San Pedro</option>
                            <option value="Libertador General San Martín">Libertador General San Martín</option>
                            <option value="Tilcara">Tilcara</option>
                            <option value="Humahuaca">Humahuaca</option>
                            <option value="La Quiaca">La Quiaca</option>
                            <option value="El Carmen">El Carmen</option>
                            <option value="Monterrico">Monterrico</option>
                        </select>
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        type="button" 
                        onClick={() => navigate('/clientes')} 
                        style={{ backgroundColor: '#757575', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', width: '30%' }}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        style={{ backgroundColor: '#1976d2', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', width: '70%' }}
                    >
                        {loading ? 'Procesando alta...' : 'Dar de Alta Cliente'}
                    </button>
                </div>
            </form>
            {error && <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', fontWeight: 'bold' }}>Error: {error}</div>}
        </div>
    );
}