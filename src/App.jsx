//componente principal de enrutamiento 
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListaClientes from './views/ListaClientes';
import Login from './views/Login';
import Header from './components/layout/Header';
import { AdminContext } from './context/AdminContext'; 

function App() {
  const { admin } = useContext(AdminContext); 

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clientes" element={admin ? <ListaClientes /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
}

export default App;