import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { banckend_URL } from './config';

const UpdateImage = (props) => {
  const { id } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      console.log('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${banckend_URL}/upload/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Se actualizo correctamente')
      } else {
        alert('Error al actualizar imagen')
      }
    } catch (error) {
      
      console.log('Network or other error occurred', error);
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};



function UploadImage(props) {
  const { id } = props
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

 

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${banckend_URL}/upload/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
    
        alert('Se subio correctamente ')
      } else {
        
        console.log('No se subio correcametne');
      }
    } catch (error) {
     
      console.log('Network or other error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}





export {UploadImage , UpdateImage}
