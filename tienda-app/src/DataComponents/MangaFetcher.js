import React, { useState, useEffect } from "react";
import { MangaList } from "./mangalist.js";
import { banckend_URL } from "./config.js";

function Manga_fetch(props) {
  const {userdata}=props
  const [manga, setManga] = useState([]);

  useEffect(() => {
    fetch(`${banckend_URL}/manga`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => setManga(resp))
      .catch(error => console.log(error));
  }, [userdata]);

  return <MangaList manga={manga} userdata={userdata} />;
}

export default Manga_fetch;