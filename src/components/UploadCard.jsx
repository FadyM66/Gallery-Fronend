import { useState } from 'react';
import '../assets/styles/confirmprompt.css';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AppContext } from './Mygallery';
import fetcher from '../utils/fetcher.js';

const UploadCard = () => {

    const { isUploadCard, handleCancel } = useContext(AppContext);
    const [error, setError] = useState(null);
    const [content, setContent] = useState(null);
    const [file, setFile] = useState(null); 
    const [desc, setDesc] = useState('');  
    const Nav = useNavigate();

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setError(null)
        } else {
            setFile(null);
            setError('Please select a valid image file.');
        }
    };

    const onDescChange = (e) => {
        setDesc(e.target.value);
    };

    const onClick = async () => {
        if (!file) {
            setError('Please select an image to upload.');
            return;
        }

        const {response, data} = await fetcher(
            'https://gallery-backend-i8pdbvxs0-fady-mohsens-projects-42394b73.vercel.app/images/upload',
            "POST",
            {"description":desc, "image":file});

        if (response.status == 200) {
            handleCancel()
            Nav(`/my-gallery/${data.image_id}`);
        } else {
            setError(true);
            setContent("Something went wrong");
        }
    };

    if (!isUploadCard) return null;

    return (
        <div className="prompt-container">
            <div className="prompt">
                <h3>Image Uploader</h3>
                <label htmlFor='file'>{file?.name || 'Select Image'}</label>
                <input
                    id="file"
                    type="file"
                    onChange={onFileChange} 
                />
                {error && <p id="upload-error" className='error'>{content || error}</p>} 
                <textarea
                    id="desc"
                    type="text"
                    placeholder="Enter a description"
                    value={desc} 
                    onChange={onDescChange} 
                />
                <button onClick={async ()=>{
                    await onClick()
                    handleCancel(false)
                    setDesc(null)
                    setFile(null)
                    setError(null)
                    }}>Upload</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default UploadCard;
