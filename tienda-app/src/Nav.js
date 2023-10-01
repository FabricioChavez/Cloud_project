  import React from "react";
  import './Nav.css';
  import ReactDOM from "react-dom";
  import Carousel from "react-elastic-carousel";
  import Item from "./Item";
  import { useState, useEffect } from "react";
  import { banckend_URL } from './DataComponents/config';


function Navbar({ children }) {
  const navLinkStyle = {
    marginRight: "300%",
    
  };
  const Logo = {
    position: "absolute",
    left: "2%",
  };
  const Navbartotal = {
    position: "fixed",
    zIndex: 9999,
    width: "120%",
    height:"10%",
    background: "white",
  };

  return (
    <nav style={Navbartotal} className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#" style={Logo}>
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                Acerca
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                Servicios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {children}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
    
  );
}

function Buscar() {
  const buscadorStyle = {
    position: "absolute",
    top: "12.5%",
    right: "26%",
    width:"50%",
    
    zIndex: 0,
  };

  return (
    <div className="input-group" style={buscadorStyle}>
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <button type="button" className="btn btn-outline-primary">
        Search
      </button>
    </div>
  );
}

function Principal() {
    const rectanguloStyle = {
      width: "100%",
      height: "70%",    
      background: "linear-gradient(180deg, #262626 0%, #A2B2EE 50%, #F2F3F3 100%)",
     position: "absolute",
      top: "55%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };

   


    return <div style={rectanguloStyle}></div>;
  
  }

function Principal2() {
  const rectanguloStyle = {
    width: "100%",
    height: "70%",    
    background: "#A9BCF5",
    position: "absolute",
    top: "210%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  function Car() {
    const carrucelStyle = {
     
      position: "relative",
      top: "-30vh"
    };

    const containerStyle = {
      position: "relative",
      top: "80%",
    };
    const imageStyle = {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "cover"
    };
    const [manga, setManga] = useState([]);

    useEffect(() => {
      fetch(`${banckend_URL}/manga`, {
        'methods': "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(resp => setManga(resp))
        .catch(error => console.log(error));
    }, []);

    return (
      <div className="Car" style={containerStyle}>
        <div style={carrucelStyle}>
          <Carousel breakPoints={breakPoints}>
            {manga.map((manga, index) => (
              <Item id={manga.id}>
                <img style={imageStyle} src={manga.link} alt="Imagen 1" />
              </Item>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }

  return (
    <div style={rectanguloStyle}>
      {/* Contenido del componente */}
      <Car />
    </div>
  );

}
const rootElement = document.getElementById("root");


  
      
  function Final() {
    const rectangulStyle = {
      width: "100%",
      height: "20em",
      background: "white",
      position: "relative",
      textAlign: "center",
      top: "200%",
      zIndex:0
    };
    const pagos = {
        width: "130%",
        height: "10em",
        position: "relative",
        textAlign: "center",
        backgroundImage: 'url("https://www.escueladeriqueza.org/wp-content/uploads/tarjetas.png")',
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        zIndex: 0
      };
    const derecho={
        position:"relative",
        top:"10em",

    }
      
      return (
        <footer style={rectangulStyle}>
          <div className="container" style={pagos}>
            <p style={derecho}>&copy; 2023 Todos los derechos reservados | Creado ayer</p>
            <p style={derecho}>Información de contacto: correo@utec.edu.pe</p>
          </div>
        </footer>
      );
      
  }
  
  function TextoAnimesMas() {
    const textStyles = {
        backgroundImage: "linear-gradient(to right, #3366ff, #00cc00), linear-gradient(to bottom, #3366ff, #FFFFFF)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text", 
        color: "transparent",
        position: "absolute",
        bottom: "-13%",
        left: "32%",
        fontSize: "400%",
        fontFamily: "Comic Sans MS	",
        letterSpacing: "0.15%",
        zIndex: 3
    };
  
    return (
        <div>
          <p style={textStyles}>Top mangas actuales</p>
        </div>
    );
  }


function Cards1() {
    const cartas={
        position:"absolute",
        top:"134%",
        left:"5%",
        width:"40% ",
        height:"33%"
    }
  return (
    <div className="card text-bg-dark" style={cartas}>
      <img src="..." className="card-img" alt="..." />
      <div className="card-img-overlay">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small>Last updated 3 mins ago</small></p>
      </div>
    </div>
  );
}

  
function Cards2() {
    const cartas={
        position:"absolute",
        top:"134%",
        left:"54%",
        width:"40%",
        height:"33%"
    }
  
 

  return (
    <div className="card text-bg-dark" style={cartas}>
      <img src="..." className="card-img" alt="..." />
      <div className="card-img-overlay">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small>Last updated 3 mins ago</small></p>
      </div>
    </div>
  );
} 

function Extra(){
    const text = {
        backgroundImage: "linear-gradient(to right, #3366ff, #2E64FE)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text", 
        color: "transparent",
        position: "absolute",
        bottom: "-195%",
        left: "36%",
        fontSize: "250%",
        fontFamily: "Comic Sans MS	",
        letterSpacing: "0.15em",
        zIndex: 7
    };
  
    return (
        <div>
          <p style={text}>¿Buscas otros mangas?</p>
        </div>
    );
}

function BottonExtra(){
   

  
    return (
        <div >
<a  className="text2" href="#"> Ver toda la tienda</a>
        </div>
    );
}



  
function Titulo(){

    return(
        <div>
            <p className="titulo1"> Grupo5  </p>
            <p className="titulo2">Tienda de Mangas oficial</p>
            <p className="titulono">Tambien tenemos:</p>

        </div>
    );
}
function Imagenes(){
  const cosa={
    position:"absolute",
    top:"20%",
    height:"70%",
    left:"9%"
  }
  return ( 
  <div>
    <img style={cosa} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6d884f9f-e1ae-4073-b972-4cb8869f91d2/d93pm75-0db4498d-1b04-4812-8ef3-a3682e1064ae.png/v1/fill/w_669,h_896/madoka_magica_renders__maid_dress_kaname_madoka_by_asamirosa_d93pm75-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODk2IiwicGF0aCI6IlwvZlwvNmQ4ODRmOWYtZTFhZS00MDczLWI5NzItNGNiODg2OWY5MWQyXC9kOTNwbTc1LTBkYjQ0OThkLTFiMDQtNDgxMi04ZWYzLWEzNjgyZTEwNjRhZS5wbmciLCJ3aWR0aCI6Ijw9NjY5In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.jxsuipMqZJRtUgLbZTbdG6Pk6hSyjfFtmeN9a05Fu_0"/> 
  </div>);
 
}


  
  

  

export { Navbar, Buscar ,Principal,Final, TextoAnimesMas,Cards1,Cards2,Extra,BottonExtra,Titulo,Principal2,Imagenes};
