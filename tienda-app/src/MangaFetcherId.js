import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './MangaId.css';
import { banckend_URL } from "./DataComponents/config";

function MangaFetcherId(props) {
  const { id } = props;
  const [manga, setManga] = useState(null);

  useEffect(() => {
    fetch(`${banckend_URL}/manga/${id}`)
      .then(resp => resp.json())
      .then(data => setManga(data))
      .catch(error => console.log(error));
  }, [id]);

  if (!manga) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1  className="p">Información de {manga.nombre}</h1>
      <div className="MangaInfo">
      <img className="Imagen" src={manga.link} alt={manga.nombre} />
        <h2 className="Texto">Nombre: <strong>{manga.nombre}</strong></h2>
        <h2 className="Texto3">Edición: {manga.edicion}</h2>
        <h2 className="Texto4">Stock: {manga.cant_stock}</h2>
        <h2 className="Texto5"><em>Género: {manga.genero}</em></h2>
        <h2 className="Texto6"> ${manga.precio}</h2>
        <div className="rectangulo"></div>
        <div className="rectangulo2"></div>
        <button    className="btn btn-primary Texto2">Comprar</button>
        
      </div>
    </div>
  );
}

export default MangaFetcherId;
