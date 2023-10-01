import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MangaFetcherGenre from './DataComponents/MangaFetcherGenre';
import MangaFetcherName from './DataComponents/MangaFetcherName';
import Manga_fetch from './DataComponents/MangaFetcher';

function Interfaz({ userdata }) {
  const [selection, setSelection] = useState('');
  const [nombre, setNombre] = useState('');
  const [iscommenting, setIsCommenting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelection(e.target.value);
    setIsCommenting(false);
  };

  const handleChangeName = (e) => {
    setNombre(e.target.value);
    setIsCommenting(false);
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    setIsCommenting(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleProfile = () => {
      navigate('/Profile')
  }

  let content = null;

  if (selection === 'General') {
    content = <Manga_fetch userdata={userdata} />;
  } else if (selection) {
    content = <MangaFetcherGenre userdata={userdata} genre={selection} />;
  } else if (iscommenting) {
    content = <MangaFetcherName userdata={userdata} name={nombre} />;
  } else {
    content = <Manga_fetch userdata={userdata} />;
  }

  return (
    <>
      <div className="home">
        <header>
          <div>
          <h1>
            Tienda Mangas
          </h1>
        </div>
          <div className="home__search-container">
            <div className="box">
            <select id="categorias" name="categorias" value={selection} onChange={handleChange}>
              <option value="">General</option>
              <option value="Seinen">Seinen</option>
              <option value="Shonen">Shonen</option>
              <option value="Dempa">Dempa</option>
              <option value="Shoujo">Shoujo</option>
            </select>
          </div>
            <form action="" className="search-form" onSubmit={handleBuscar}>
              <div className="input-control">
                <input
                  type="text"
                  id='Nombre'
                  placeholder="Search Anime"
                  value={nombre}
                  onChange={handleChangeName}
                />
                <button type="submit" value={iscommenting} onClick={handleBuscar}>Search</button>
              </div>
            </form>
            <div className='perfil'>
              <button onClick={handleProfile}>Profile</button>
            </div>

            <div className='logout'>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </header>
        <div className='imagenes'>
        {content}
        </div>
      </div>
    </>
  );
}

export default Interfaz;
