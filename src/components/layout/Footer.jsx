import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  const redes = [
    { id: 'whatsapp', name: 'WhatsApp', url: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/icons/whatsapp.svg' },
    { id: 'instagram', name: 'Instagram', url: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/icons/instagram.svg' },
    { id: 'facebook', name: 'Facebook', url: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/icons/facebook.svg' },
    { id: 'twitter-x', name: 'X', url: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/icons/twitter-x.svg' }
  ];

  
  const linkStyle = (id) => ({
    color: hoveredLink === id ? '#0d6efd' : '#8a939b',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    display: 'block',
    marginBottom: '4px' 
  });

  return (
    <footer className="w-100" style={{
      backgroundColor: '#11141a', 
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '30px 20px 20px 20px', 
      color: '#ffffff'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* CONTENEDOR HORIZONTAL */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          flexWrap: 'wrap', 
          gap: '30px',
          textAlign: 'left',
          marginBottom: '25px' 
        }}>
          
          {/*  LOGO, REDES */}
          <div style={{ flex: '1 1 250px', minWidth: '220px' }}>
          
            <h6 className="fw-bold" style={{ fontSize: '18px', letterSpacing: '0.5px', margin: '0 0 12px 0', color: '#ffffff', lineHeight: '1.2' }}>
              Programacion Visual
            </h6>

            <p className="m-0 text-secondary small" style={{ fontSize: '13px', marginBottom: '2px' }}>
              &copy; 2026 cliego.com
            </p>
            <p className="text-secondary small" style={{ fontSize: '13px', marginBottom: '12px' }}>
              Todos los derechos reservados.
            </p>

            {/* Iconos de Redes Sociales */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {redes.map((red) => (
                <a 
                  key={red.id}
                  href="#" 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: hoveredIcon === red.id ? '#0d6efd' : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={() => setHoveredIcon(red.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <img 
                    src={red.url} 
                    width="16" 
                    height="16" 
                    style={{ 
                      filter: hoveredIcon === red.id ? 'brightness(0) invert(1)' : 'invert(0.6)',
                      transition: 'filter 0.2s ease'
                    }} 
                    alt={red.name} 
                  />
                </a>
              ))}
            </div>
          </div>

          {/*  NAVEGACIÓN */}
          <div style={{ flex: '1 1 150px', minWidth: '120px' }}>
            {/* Ajustado el tamaño y margen del título para alineación perfecta */}
            <h6 className="fw-bold text-light" style={{ fontSize: '15px', letterSpacing: '0.5px', margin: '3px 0 12px 0', lineHeight: '1.2' }}>
              Navegación
            </h6>
            <span 
              onClick={() => navigate('/dashboard')} 
              style={linkStyle('nav-dash')}
              onMouseEnter={() => setHoveredLink('nav-dash')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Dashboard
            </span>
            <span 
              onClick={() => navigate('/clientes')} 
              style={linkStyle('nav-cli')}
              onMouseEnter={() => setHoveredLink('nav-cli')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Clientes
            </span>
          </div>

          {/*  SOPORTE */}
          <div style={{ flex: '1 1 150px', minWidth: '120px' }}>
            <h6 className="fw-bold text-light" style={{ fontSize: '15px', letterSpacing: '0.5px', margin: '3px 0 12px 0', lineHeight: '1.2' }}>
              Soporte
            </h6>
            <span 
              style={linkStyle('sop-ayuda')}
              onMouseEnter={() => setHoveredLink('sop-ayuda')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Centro de Ayuda
            </span>
            <span 
              style={linkStyle('sop-doc')}
              onMouseEnter={() => setHoveredLink('sop-doc')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Documentación interna
            </span>
          </div>

          {/*  INSTITUCIONAL */}
          <div style={{ flex: '1 1 150px', minWidth: '120px' }}>
            <h6 className="fw-bold text-light" style={{ fontSize: '15px', letterSpacing: '0.5px', margin: '3px 0 12px 0', lineHeight: '1.2' }}>
              Institución
            </h6>
            <a 
              href="https://virtual.unju.edu.ar" 
              target="_blank" 
              rel="noreferrer" 
              style={linkStyle('inst-unju')}
              onMouseEnter={() => setHoveredLink('inst-unju')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              UNJu Virtual
            </a>
          </div>

        </div>

        {/* LÍNEA FINAL  */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.03)',
          paddingTop: '15px',
          textAlign: 'center'
        }}>
          <span className="text-muted" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
            FACULTAD DE INGENIERÍA &bull; UNIVERSIDAD NACIONAL DE JUJUY
          </span>
        </div>

      </div>
    </footer>
  );
}