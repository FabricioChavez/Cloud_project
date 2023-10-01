import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import './mangalist.css'
const MangaListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  height: 100vh; /* Ajustar al 100% del viewport */
`;

const MangaItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(2.1);
  }
`;

const MangaImage = styled.img`
  width: 100%;
  height: 90%;
  object-fit: cover;
  border: 4px solid;
  animation: colorAnimation 3s infinite;

  @keyframes colorAnimation {
    0% {
      border-color: rgb(0, 255, 159);
    }
    25% {
      border-color: rgb(0, 184, 255);
    }
    50% {
      border-color: rgb(0, 30, 255);
    }
    75% {
      border-color: rgb(189, 0, 255);
    }
    100% {
      border-color: rgb(214, 0, 255);
    }
  }
`;

const MangaName = styled.h2`
  color: white;
`;

function MangaList(props) {
  const { manga, userdata } = props;
  const [selectedMangaId, setSelectedMangaId] = useState(null);

  const handleMouseEnter = (manga) => {
    setSelectedMangaId(manga.id);
  };

  const handleMouseLeave = () => {
    setSelectedMangaId(null);
  };

  const handleClick = (id) => {
    setSelectedMangaId(id);
  };





  const conditionalRender = () => {
    if (!manga) {
      return manga?.map((manga) => {
        return (<Link to={`/MasInfo/${manga.id}`} key={manga.id}>
              <MangaImage
                src={manga.link}
                id={manga.id}
                alt={manga.nombre}
                style={{
                  border: selectedMangaId === manga.id ? "6px solid red" : "4px solid",
                }}
              />
               
          </Link>
        );
      });            
    } else {
      return manga?.map((manga) => {
        return (
   
        <Link to={`/MasInfo/${manga.id}`} key={manga.id}>
          
         <MangaImage
                src={manga.link}
                id={manga.id}
                alt={manga.nombre}
                style={{
                  border: selectedMangaId === manga.id ? "3px solid red" : "2px solid",
                }}
                onMouseEnter={() => handleMouseEnter(manga)}
                onMouseLeave={handleMouseLeave}
              >
               

              </MangaImage>
              <MangaName
               key={manga.id}
              style={{
                transform: selectedMangaId === manga.id ? "scale(1.1)" : "scale(1)",
              }}
            >
              {manga.nombre}
            </MangaName>
          
              
      </Link>
    
    );
      });
    }
  };


  return (
    <div className="popular-anime">
      <div className="popular-anime__display-box">{conditionalRender()}</div>
    </div>
  );


 
  
}

export { MangaList };
