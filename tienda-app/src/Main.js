import React from "react";
import {Navbar,Buscar,Principal,Final, TextoAnimesMas,Cards1,Cards2,Extra,BottonExtra,Titulo,Principal2,Imagenes} from "./Nav";
import { Link } from "react-router-dom";

function Main() {
  const navLinkStyle = {
    marginRight: "1em",
    marginLeft: "8em",
    textDecoration: "none",
    position: "relative",
    left: "15em",

  };
  
  const containerStyle = {
    height: "200em",
    maxHeight:"200em", 
    overflow: "auto", 

  };
  const main={
    background: "#F2F3F3"
  }

  return (
    <div style={main}>
        <div style={containerStyle}>
      <Navbar>
        <Link to={"/login"} style={navLinkStyle}>
          Login
        </Link>
        <Link to={"/signup"} style={navLinkStyle}>
          SignUp
        </Link>
      </Navbar>
      </div>
      <div>
      
      <Buscar ></Buscar>
      <Principal></Principal>
      <Final></Final>
      <TextoAnimesMas></TextoAnimesMas>
      <Cards1></Cards1>
      <Cards2></Cards2>
      
      <Extra></Extra>
      <BottonExtra></BottonExtra>
      <Titulo></Titulo>
      <Principal2></Principal2>


      </div>   
      <div>
        <Imagenes></Imagenes>
        </div>     
    </div>
  );
}

export default Main;
