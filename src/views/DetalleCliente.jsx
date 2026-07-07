import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";

function DetalleCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);  
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setLoading(true);

        //  INTERCEPTAMOS EL ID 11
        if (id === "11") {
          const datosGuardados = localStorage.getItem('nuevo_cliente_card');
          
          if (datosGuardados) {
            const clienteParseado = JSON.parse(datosGuardados);
            
            // Estructuramos la información
            setCliente({
              id: 11,
              email: clienteParseado.email,
              username: (clienteParseado.name?.firstname || "nuevo").toLowerCase() + "123",
              password: "password123",
              name: { 
                firstname: clienteParseado.name?.firstname || "Usuario", 
                lastname: clienteParseado.name?.lastname || "Nuevo" 
              },
              address: { 
                city: clienteParseado.address?.city || "Sin ciudad", 
                street: "Av. Fascio", 
                number: 123, 
                zipcode: "4600" 
              },
              phone: clienteParseado.phone
            });
          } else {
            // Backup por si se accede a /clientes/11 directamente sin crearlo antes
            setCliente({
              id: 11,
              email: "cliente11@email.com",
              username: "nuevocliente123",
              password: "password123",
              name: { firstname: "Cliente", lastname: "No Encontrado" },
              address: { city: "San Salvador de Jujuy", street: "Av. Siempre Viva", number: 742, zipcode: "4600" },
              phone: "1-234-567-8901"
            });
          }
          
          setLoading(false);
          return;
        }

        // Si es del ID 1 al 10, busca normalmente en la API de internet
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener el cliente");
        }

        const datos = await respuesta.json();
        setCliente(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerCliente();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Cargando cliente...</h2>;

  if (error) return <h2 style={{ textAlign: "center", color: "red", marginTop: "50px" }}>{error}</h2>;

  const eliminarCliente = async () => {
    const confirmar = window.confirm(
      "¿Está seguro que desea eliminar este cliente?"
    );

    if (!confirmar) return;

    try {
      // Si es el ID 11, lo borramos de la memoria del navegador para que desaparezca de las Cards
      if (id === "11") {
        localStorage.removeItem('nuevo_cliente_card');
      } else {

  // DELETE simulado
  const respuesta = await fetch(
    `https://fakestoreapi.com/users/${id}`,
    { method: "DELETE" }
  );

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el cliente");
  }

  // Guardamos el ID eliminado
  const eliminados =
    JSON.parse(localStorage.getItem("clientes_eliminados")) || [];

  if (!eliminados.includes(Number(id))) {
    eliminados.push(Number(id));
  }

  localStorage.setItem(
    "clientes_eliminados",
    JSON.stringify(eliminados)
  );
}

      alert("Cliente eliminado correctamente (Simulado).");
      navigate("/clientes");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center",  p: 5, borderRadius: 3, background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)", }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: "bold", color: "#1976d2"}}
      >
        Ficha del Cliente
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {/* Información personal */}
        <Grid item xs={12} md={4}>
          <Card elevation={5} sx={{ height: "100%", minHeight: 280, display: "flex", transition: "0.3s", "&:hover": { transform: "translateY(-6px)", boxShadow: 10, }, }}>
            <CardContent>
              <PersonIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Información Personal
              </Typography>
              <Typography><strong>Nombre:</strong> {cliente?.name?.firstname} {cliente?.name?.lastname}</Typography>
              <Typography><strong>Email:</strong> {cliente?.email}</Typography>
              <Typography><strong>Teléfono:</strong> {cliente?.phone}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Dirección */}
        <Grid item xs={12} md={4}>
          <Card elevation={5} sx={{ height: "100%", minHeight: 280, display: "flex", transition: "0.3s", "&:hover": { transform: "translateY(-6px)", boxShadow: 10, }, }}>
            <CardContent>
              <HomeIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Dirección
              </Typography>
              <Typography><strong>Calle:</strong> {cliente?.address?.street}</Typography>
              <Typography><strong>Número:</strong> {cliente?.address?.number}</Typography>
              <Typography><strong>Ciudad:</strong> {cliente?.address?.city}</Typography>
              <Typography><strong>Código Postal:</strong> {cliente?.address?.zipcode}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Credenciales */}
        <Grid item xs={12} md={4}>
          <Card elevation={5} sx={{ height: "100%", minHeight: 280, display: "flex", transition: "0.3s", "&:hover": { transform: "translateY(-6px)", boxShadow: 10, }, }}>
            <CardContent>
              <LockIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Credenciales
              </Typography>
              <Typography><strong>Usuario:</strong> {cliente?.username}</Typography>
              <Typography><strong>ID Cliente:</strong> {cliente?.id}</Typography>
              <Typography><strong>Estado:</strong> Activo</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div
        style={{
          marginTop: "40px",
          marginBottom: "60px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          width: "100%"
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/clientes")}
        >
          Volver
        </Button>

        {admin?.sector === "Gerencia" && (
          <Button
            variant="contained"
            color="error"
            onClick={eliminarCliente}
          >
            Eliminar Cliente
          </Button>
        )}
      </div>
    </Container>
  );
}

export default DetalleCliente;