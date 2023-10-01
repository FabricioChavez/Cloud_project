import React from "react";
import { useParams } from "react-router-dom";
import MangaFetcherId from "./MangaFetcherId";
function Componente(){

    const Param=useParams()

    console.log(Param)
    const id = Param.id
    return <MangaFetcherId id={id}/>;
}

export default Componente;