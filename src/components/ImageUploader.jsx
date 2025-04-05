import React, { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';

function ImageUploader() {
    const [image, setImage] = useState(null);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [resizedImage, setResizedImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('width', width);
        formData.append('height', height);

        const response = await axios.post('http://localhost:5000/upload', formData);
        setResizedImage(response.data.url);
    };

    return (
        <div className='container'>
            <input type='file' onChange={handleImageChange} />
            <input type='number' placeholder='Width' onChange={(e) => setWidth(e.target.value)} />
            <input type='number' placeholder='Height' onChange={(e) => setHeight(e.target.value)} />
            <button onClick={handleUpload}>Resize</button>
            {resizedImage && <img src={resizedImage} alt='Resized' />}
        </div>
    );
}

export default ImageUploader;