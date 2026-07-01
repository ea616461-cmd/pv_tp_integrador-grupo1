//componente principal de enrutamiento 
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListaClientes from './views/ListaClientes';
import Login from './views/Login';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { AdminContext } from './context/AdminContext'; 
import DetalleCliente from "./views/DetalleCliente";
import Dashboard from "./views/Dashboard";
import FormularioCliente from './components/common/FormularioCliente';

function App() {
  const { admin } = useContext(AdminContext); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route 
            path="/clientes" 
            element={admin ? <ListaClientes /> : <Navigate to="/" />} 
          />
          
          <Route 
            path="/clientes/nuevo" 
            element={admin ? <FormularioCliente /> : <Navigate to="/" />} 
          />

          <Route 
            path="/clientes/:id"
            element={admin ? <DetalleCliente /> : <Navigate to="/" />}
          />
          
          <Route
            path="/dashboard"
            element={admin ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </main>

      <Footer/>
    </div>
  );
}

export default App;