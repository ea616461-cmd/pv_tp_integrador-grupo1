import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AdminContext, AdminProvider } from './context/AdminContext';
import Login from './views/Login';
import ListaClientes from './views/ListaClientes';

const RutaProtegida = ({ children }) => {
  const { admin } = useContext(AdminContext);
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default function App() {
  return (
    <AdminProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/clientes" element={
            <RutaProtegida>
              <ListaClientes />
            </RutaProtegida>
          } />
          <Route path="*" element={<Navigate to="/clientes" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}