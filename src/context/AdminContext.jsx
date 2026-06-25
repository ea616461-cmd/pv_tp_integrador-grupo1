import { createContext, useState, useEffect } from 'react';
export const AdminContext = createContext();
export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const sesionGuardada = localStorage.getItem('admin_session');
    return sesionGuardada ? JSON.parse(sesionGuardada) : null;
  });

  
  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin_session', JSON.stringify(admin));
    } else {
      localStorage.removeItem('admin_session');
    }
  }, [admin]);

 //recibe datos 
  const login = (nombre, sector) => {
    setAdmin({ nombre, sector });
  };
 //resetea 
  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}