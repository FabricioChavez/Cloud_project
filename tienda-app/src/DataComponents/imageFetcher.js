import React, { useState, useEffect } from "react";
import { banckend_URL } from "./config";


function ImageGet({id}) {
  const [imageUrl, setImageUrl] = useState('');
 

  const fetchImageData = async () => {
    try {
      const response = await fetch(`${banckend_URL}/image/${id}`);
      if (response.ok) {
        const imageData = await response.json();
        setImageUrl(imageData.data);
      } else {
        console.log('Error fetching image data');
      }
    } catch (error) {
      console.log('Network or other error occurred');
    }
  };

  useEffect(() => {
    fetchImageData();
  }, [id]);

  return (
    <div>
      {imageUrl && <img src={`data:image/png;base64,${imageUrl}`} alt="Uploaded Image" className="image" />}
    </div>
  );
}

export default ImageGet;
