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

        // SALVAVIDAS TÉCNICO: Si es el ID 11 (creado localmente), simulamos la respuesta
        if (id === "11") {
          const clienteSimulado = {
            id: 11,
            email: "cliente11@email.com",
            username: "nuevocliente123",
            password: "password123",
            name: { firstname: "Cliente", lastname: "Simulado (ID 11)" },
            address: { city: "Ciudad Alta", street: "Av. Siempre Viva", number: 742, zipcode: "4600" },
            phone: "1-234-567-8901"
          };
          setCliente(clienteSimulado);
          setLoading(false);
          return; // Cortamos la ejecución para que no vaya a la API real
        }

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
      // Si es el ID simulado 11, salteamos la llamada real a la API para evitar el error 
      if (id !== "11") {
        const respuesta = await fetch(
          `https://fakestoreapi.com/users/${id}`,
          { method: "DELETE" }
        );

        if (!respuesta.ok) {
          throw new Error("No se pudo eliminar el cliente");
        }
      }

      alert("Cliente eliminado correctamente (Simulado).");
      navigate("/clientes");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Ficha del Cliente
      </Typography>

      <Grid container spacing={3}>
        {/* Información personal */}
        <Grid item xs={12} md={4}>
          <Card elevation={5}>
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
          <Card elevation={5}>
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
          <Card elevation={5}>
            <CardContent>
              <LockIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Credenciales
              </Typography>
              <Typography><strong>Usuario:</strong> {cliente?.username}</Typography>
              <Typography><strong>Contraseña:</strong> {cliente?.password}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
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