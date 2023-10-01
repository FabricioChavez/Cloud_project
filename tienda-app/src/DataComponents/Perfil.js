import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { banckend_URL } from "./config";
import ImageGet from "./imageFetcher";
import "./perfil.css";
const Profile = (props) => {
  const { userData } = props;
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    if (userData) {
      fetch(`${banckend_URL}/compraUser/${userData.id}`)
        .then((response) => response.json())
        .then((data) => setCompras(data))
        .catch((error) => console.log(error));
    }
  }, [userData]);

  const find_manga_id = (manga_id) => {
    return fetch(`${banckend_URL}/manga/${manga_id}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (compras.length > 0) {
      const mangaIds = compras.map((compra) => compra.manga_id);
      Promise.all(mangaIds.map((manga_id) => find_manga_id(manga_id)))
        .then((results) => {
          setMangas(results);
        })
        .catch((error) => console.log(error));
    }
  }, [compras]);

  if (!userData) {
    return <div>Loading ....</div>;
  }

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="container bg-dark text-light text-center">
          <div className="my-4">
            <h1>Username: {userData.username}</h1>
          </div>

          <div className="my-4">
            <h2>Nombre: {userData.firstname}</h2>
            <h2>Apellido: {userData.lastname}</h2>
            <h2>País: {userData.pais}</h2>
            <h2>Saldo: {userData.wallet}</h2>
            <ImageGet id={userData.id} />
          </div>

          <div className="my-4">
            <Link to="/Edit" className="btn btn-primary me-2">
              Editar
            </Link>
            <Link to="/interfaz" className="btn btn-secondary">
              Volver
            </Link>
          </div>

          <div className="my-4">
            <h2>Lista de Compras</h2>
            {compras.length > 0 ? (
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ID Usuario</th>
                    <th>Nombre Manga</th>
                    <th>Edición</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map((compra) => {
                    const manga = mangas.find((manga) => manga.id === compra.manga_id);
                    return (
                      <tr key={compra.id}>
                        <td>{compra.id}</td>
                        <td>{compra.id_user}</td>
                        <td>{manga && manga.nombre}</td>
                        <td>{manga && manga.edicion}</td>
                        <td>{compra.fecha}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-light">No hay compras registradas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
