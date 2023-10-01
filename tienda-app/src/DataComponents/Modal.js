import React, { useState } from "react";
import "./Modal.css";
import { banckend_URL } from "./config";

const Modal = ({ userData, handleClose, manga }) => {
  function obtenerFechaActual() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const fechaActual = `${year}-${month}-${day}`;
    return fechaActual;
  }

  const [user_prov, setuser_prov] = useState(null);

  const fechaActual = obtenerFechaActual();
  console.log(fechaActual);

  const handleCompra = async () => {
    const compra = {
      id_user: userData.id,
      manga_id : manga.id,
      fecha: obtenerFechaActual()
    };
    


    console.log(userData.wallet - manga.precio);
    console.log(manga.cant_stock);

    if (userData.wallet >= manga.precio && manga.cant_stock > 0) {

      try {
        const response = await fetch(`${banckend_URL}/compra`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(compra)
        });
  
        if (response.ok) {
          console.log('Compra realizada exitosamente');
        } 
        
        else {
          console.error('Error al realizar la compra');
        }
      }
      
      catch (error) {
        console.error('Error de red:', error);
      }



      const data_user = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        fechaNac: userData.fechaNac,
        pais: userData.pais,
        password: userData.password,
        wallet: userData.wallet - manga.precio
      };
      const data_manga = {
        nombre: manga.nombre,
        edicion: manga.edicion,
        cant_stock: manga.cant_stock - 1,
        genero: manga.genero,
        precio: manga.precio,
        link: manga.link
      };

      const user_response = await fetch(`${banckend_URL}/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_user)
      });

      const manga_response = await fetch(`${banckend_URL}/manga/${manga.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_manga)
      });

      if (user_response.ok && manga_response.ok) {
        alert(`SE HIZO COMPRA ADECUADAMENTE!! Saldo Gastado: ${manga.precio} `);
        setuser_prov(data_user);

        localStorage.setItem('userData', JSON.stringify(data_user));
      }
    } 
    
    else{
       alert('Error, no se pudo realizar la compra');
    }

    window.location.reload();
    console.log(JSON.stringify(user_prov));
    console.log(userData.wallet);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="Title">Favor de efectuar su compra {userData.firstname} {userData.username}</h1>
        </div>
        <div className="modal-body">
          <div className="left-section">
            <img src={require("../images/bannerv.jpg")} alt="Imagen" />
          </div>
          <div className="right-section">
            <div className="F">
              <h3>Producto a comprar :</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 className="info-display" style={{ marginLeft: "10%", marginTop: "2%" }}> o {manga.nombre}</h3>
              </div>
            </div>
            <div className="F">
              <h3 >Volumen :</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 className="info-display" style={{ marginLeft: "10%", marginTop: "2%" }}>o {manga.edicion}</h3>
              </div>
            </div>

            <div className="F">
              <h3>Precio :</h3>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3 className="info-display" style={{ marginLeft: "10%", marginTop: "2%" }}>o ¥ {manga.precio} </h3>
              </div>
            </div>

            <div className="F"><h3>Escoge tu modo de pago, por favor:</h3></div>
            <select id="right-section" name="categorias" className="cyberpunk-select">
              <option value="">Modo de pago</option>
              <option value="tarjeta">Tarjeta de crédito</option>
              <option value="cash">Monedero virtual</option>
            </select>
            <div className="cyber-botones-wrapper">
              <button class="cybr-btn" onClick={handleCompra}>
                Comprar<span aria-hidden>_</span>
                <span aria-hidden class="cybr-btn__glitch">Comprar_</span>
                <span aria-hidden class="cybr-btn__tag">R77</span>
              </button>
              <button class="cybr-btn" onClick={handleClose}>
                Cancelar<span aria-hidden>_</span>
                <span aria-hidden class="cybr-btn__glitch">COMPRALO_</span>
                <span aria-hidden class="cybr-btn__tag">R25</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
