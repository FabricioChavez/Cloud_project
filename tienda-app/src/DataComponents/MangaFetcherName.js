import React from "react";
import {MangaList} from "./mangalist.js";
import { useState, useEffect } from "react";
import { banckend_URL } from "./config.js";
function MangaFetcherName({ userdata , name}) {
  
  const [manga, setManga] = useState([]);

  const fetcherbyName = () =>{
    fetch(`${banckend_URL}/manga/byn/${name}`, {
      'methods': "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => setManga(resp))
      .catch(error => console.log(error));

  }                          

  useEffect(() => {
   fetcherbyName()
  }, []);

  return (
    <div>
    <MangaList manga={manga}/>
    </div>
  )
  
}

export default MangaFetcherName;
