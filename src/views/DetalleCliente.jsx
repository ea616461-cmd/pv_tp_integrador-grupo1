import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

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

  if (loading) return <h2>Cargando cliente...</h2>;

  if (error) return <h2>{error}</h2>;

  const eliminarCliente = async () => {
  const confirmar = window.confirm(
    "¿Está seguro que desea eliminar este cliente?"
  );

  if (!confirmar) return;

  try {
    const respuesta = await fetch(
      `https://fakestoreapi.com/users/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!respuesta.ok) {
      throw new Error("No se pudo eliminar el cliente");
    }

    alert("Cliente eliminado correctamente.");

    navigate("/clientes");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ficha del Cliente</h2>

      <p><strong>ID:</strong> {cliente.id}</p>

      <p>
        <strong>Nombre:</strong>{" "}
        {cliente.name.firstname} {cliente.name.lastname}
      </p>

      <p><strong>Email:</strong> {cliente.email}</p>

      <p><strong>Teléfono:</strong> {cliente.phone}</p>

      <hr />

      <h3>Dirección</h3>

      <p>Calle: {cliente.address.street}</p>

      <p>Número: {cliente.address.number}</p>

      <p>Ciudad: {cliente.address.city}</p>

      <p>Código Postal: {cliente.address.zipcode}</p>

      <hr />

      <h3>Credenciales</h3>

      <p>Usuario: {cliente.username}</p>

      <p>Contraseña: {cliente.password}</p>

        <hr />

        <button onClick={() => navigate("/clientes")}>
        Volver
        </button>

        {admin?.sector === "Gerencia" && (
        <button
             onClick={eliminarCliente}
            style={{
             marginLeft: "10px",
             backgroundColor: "red",
             color: "white",
            border: "none",
            padding: "8px 15px",
            cursor: "pointer",
            }}
            >
            Eliminar Cliente
            </button>
            )}

    </div>
  );
}

export default DetalleCliente;