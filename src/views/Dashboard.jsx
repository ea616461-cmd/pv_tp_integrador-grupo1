import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ShieldIcon from "@mui/icons-material/Shield";
import PublicIcon from "@mui/icons-material/Public";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Dashboard() {
  const { admin } = useContext(AdminContext);

  return (
    <Container
    maxWidth="lg"
    sx={{
      mt: 5,
      mb: 5,
      background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)",
      borderRadius: 3,
      p: 5,
    }}
  >
      <Typography variant="h4" gutterBottom
          variant="h4"
            gutterBottom
              sx={{
                 fontWeight: "bold",
                 color: "#1976d2",
                textAlign: "center",
                mb: 4,
                }}>
        Dashboard Administrativo
      </Typography>

      <Typography variant="h6" sx={{ mb: 4 }}>
        Bienvenido, {admin?.nombre}
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={6} lg={3}>
          <Card   elevation={6}
                 sx={{
                   borderRadius: 4, minHeight: 220, display: "flex", justifyContent: "center", transition: "0.3s", "&:hover": { transform: "translateY(-5px)", },
                 }}>
            <CardContent sx={{ width: "100%", textAlign: "center", }}>
              <GroupsIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6" sx={{ mt: 1 }}>
                 Clientes registrados
                </Typography>

              <Typography variant="h3">
                10
              </Typography>

              <Typography color="text.secondary">
                Datos obtenidos desde FakeStore API
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card elevation={6}
                 sx={{
                 borderRadius: 4, minHeight: 220, display: "flex", justifyContent: "center", transition: "0.3s", "&:hover": { transform: "translateY(-5px)", },
                 }}>
            <CardContent sx={{ width: "100%", textAlign: "center", }}>
              <ShieldIcon color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h6" sx={{ mt: 1 }}>
                     Sector
                </Typography>

              <Typography variant="h4">
                {admin?.sector}
              </Typography>

              <Typography color="text.secondary">
                Permisos del administrador
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card elevation={6}
                 sx={{
                 borderRadius: 4, minHeight: 220, display: "flex", justifyContent: "center", transition: "0.3s", "&:hover": { transform: "translateY(-5px)", },
                 }}>
            <CardContent sx={{ width: "100%", textAlign: "center", }}>
              <PublicIcon color="info" sx={{ fontSize: 40 }} />
                <Typography variant="h6" sx={{ mt: 1 }}>
                     API
                </Typography>

              <Typography variant="h5">
                FakeStoreAPI
              </Typography>

              <Typography color="green">
                Conectada
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card elevation={6}
                 sx={{
                 borderRadius: 4, minHeight: 220, display: "flex", justifyContent: "center", transition: "0.3s", "&:hover": { transform: "translateY(-5px)", },
                 }}>
            <CardContent sx={{ width: "100%", textAlign: "center", }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                 <Typography variant="h6" sx={{ mt: 1 }}>
                         Estado
                </Typography>

              <Typography variant="h5">
                Sistema Operativo
              </Typography>

              <Typography color="text.secondary">
                Gestión de Clientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;