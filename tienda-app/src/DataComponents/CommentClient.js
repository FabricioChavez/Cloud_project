import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { banckend_URL } from "./config";

function Comment_client({id}) {

  const [currentuser, setCurrentuser] = useState(() => {
    const storedUser = localStorage.getItem("currentuser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    fetch(`${banckend_URL}/users/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setCurrentuser(data);
        localStorage.setItem("currentuser", JSON.stringify(data));
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!currentuser) {
    return <div>No hay data</div>;
  }

  return <p>{currentuser.username}</p>;
}

export default Comment_client;
