import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './MangaId.css';
import Comment_client from "./CommentClient";
import ImageGet from "./imageFetcher";
import Modal from "./Modal";
import { banckend_URL } from "./config";


function MangaFetcherId(props) {
  const Param = useParams();
  const id = Param.id;
  const { userData } = props;
  
  const [manga, setManga] = useState(null);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState([]);
  const [popup , setPpopup] = useState(false);

  const handlePopup =  () =>{
    setPpopup(true)
    console.log(popup);
    
  }


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }

  const handleCommentCancel = () => {
    setComment("");
    setIsCommenting(false);
  }

  const handleCommentSubmit = () => {
    const newComment = {
      contenido: comment,
      user_id: userData.id,
      manga_id : id
    };


    fetch(`${banckend_URL}/comentario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newComment)
    })
      .then(response => response.text())
      .then(data => {
        console.log("Comentario enviado:", data);
        setComment("");
        setIsCommenting(false);
        fetchComments();
      })
      .catch(error => console.log(error));
  };

  const fetchComments = () => {
    fetch(`${banckend_URL}/comentario/by/${id}`)
      .then(resp => resp.json())
      .then(data => setComments(data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetch(`${banckend_URL}/manga/${id}`)
      .then(resp => resp.json())
      .then(data => setManga(data))
      .catch(error => console.log(error));
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, []);

  if (!manga) {
    return <div>Cargando...</div>;
  }
  let content = null;
  if (popup) {
    content = <Modal userData={userData} handleClose={()=>setPpopup(false)} manga={manga} />;
  } else {
    content = null;
  }
  
  return (
    <div>
      <div className="titulo">
        <h1 className="p" style={{backgroundColor: '#000'}}>Información de {manga.nombre}</h1>
      </div>
      <div className="MangaInfo">
        <img className="Imagen" src={manga.link} alt={manga.nombre} />
        <h2 className="Texto_1"><em>Nombre:</em></h2>
        <h2 className="Texto_2"><em>{manga.nombre}</em></h2>
        <h2 className="Texto3_1"><em>Edición:</em></h2>
        <h2 className="Texto3_2"><em>{manga.edicion}</em></h2>
        <h2 className="Texto4_1"><em>Stock:</em></h2>
        <h2 className="Texto4_2"><em>{manga.cant_stock}</em></h2>
        <h2 className="Texto5_1"><em>Género:</em></h2>
        <h2 className="Texto5_2"><em>{manga.genero}</em></h2>
        <h2 className="Texto6_1"><em>Precio:</em></h2>
        <h2 className="Texto6_2"><em>${manga.precio}</em></h2>
        <div className="rectangulo"></div>
        <div className="rectangulo2"></div>
        <button className="Texto2" value={popup} onClick={handlePopup} >Desea Comprar</button>
        {content}
      </div>
      <div className="rectangulo3">
        <h1 className="comentar">Caja de Comentarios</h1>
        {isCommenting ? (
          <div>
            <input
              className="Comentario"
              type="text"
              placeholder="Escriba su comentario aquí"
              value={comment}
              onChange={handleCommentChange}
            />
            <div className="Botones">
              <button onClick={handleCommentSubmit}>Enviar</button>
              <button onClick={handleCommentCancel}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="AgregarComentario" onClick={() => setIsCommenting(true)}>
            Agregar comentario
          </div>
        )}
        
        <div className="Box-comment-container">
          {comments.map(data => (
            <div className="Box-comment" key={data.id}>

              <div className="image-wrapper">
               <ImageGet id={data.user_id}/>
               </div>
              
               <p>
              <Comment_client id={data.user_id} />
                {data.contenido}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangaFetcherId;
