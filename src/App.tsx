import React, { useState } from 'react';
import axios from 'axios';
import './styles/App.css';

const presets = {
    passport: { width: 3.5, height: 4.5, sizeOption: 50, unit: 'cm' },
    aadhar: { width: 2.0, height: 2.0, sizeOption: 20, unit: 'cm' },
    neet: { width: 3.5, height: 4.5, sizeOption: 40, unit: 'cm' },
    jee: { width: 3.5, height: 4.5, sizeOption: 60, unit: 'cm' },
    ssc: { width: 3.5, height: 4.5, sizeOption: 50, unit: 'cm' }
};

function App() {
    const [image, setImage] = useState(null);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [sizeOption, setSizeOption] = useState('');
    const [unit, setUnit] = useState('cm');
    const [resizedImage, setResizedImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setResizedImage(null); // Reset resized image when a new file is selected
    };
    

    const applyPreset = (preset) => {
        setWidth(presets[preset].width);
        setHeight(presets[preset].height);
        setSizeOption(presets[preset].sizeOption);
        setUnit(presets[preset].unit);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('width', width);
        formData.append('height', height);
        formData.append('sizeOption', sizeOption);
        formData.append('unit', unit);

        const response = await axios.post('http://localhost:5000/upload', formData);
        setResizedImage(response.data.url);
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = resizedImage;
        link.download = "resized-image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='container stylish-container'>
            <h1 className='title'>Advanced Photo Resizer</h1>
            <div className='file-input-container'>
    <input type='file' id='fileInput' className='file-input' onChange={handleImageChange} />
    <label htmlFor='fileInput' className='file-label'>Choose File</label>
</div>

            <div className='presets'>
                <button className='preset-btn' onClick={() => applyPreset('passport')}>Passport Size</button>
                <button className='preset-btn' onClick={() => applyPreset('aadhar')}>Aadhar Card</button>
                <button className='preset-btn' onClick={() => applyPreset('neet')}>NEET Exam</button>
                <button className='preset-btn' onClick={() => applyPreset('jee')}>JEE Exam</button>
                <button className='preset-btn' onClick={() => applyPreset('ssc')}>SSC Exam</button>
                <button className='preset-btn custom-btn'>Custom</button>
            </div>
            <div className='input-group'>
                <input type='number' className='input-field' placeholder='Width' value={width} onChange={(e) => setWidth(e.target.value)} />
                <input type='number' className='input-field' placeholder='Height' value={height} onChange={(e) => setHeight(e.target.value)} />
                <select className='dropdown' value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value='cm'>Centimeters</option>
                    <option value='inch'>Inches</option>
                    <option value='px'>Pixels</option>
                </select>
                <input type='number' className='input-field' placeholder='Size (5KB - 50KB)' value={sizeOption} onChange={(e) => setSizeOption(e.target.value)} />
            </div>
            <button className='resize-btn' onClick={handleUpload}>Resize</button>
            {resizedImage && (
                <div className='image-preview stylish-preview'>
                    <img src={resizedImage} alt='Resized' className='resized-image' />
                    <button className='download-btn' onClick={handleDownload}>Download</button>
                </div>
            )}
        </div>
    );
}

export default App;
