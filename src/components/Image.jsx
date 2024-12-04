import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/imagedetail.css';
import Description from './Description';
import ConfirmationPrompt from './ConfirmPrompt';
import { useNavigate } from 'react-router-dom';
import fetcher from '../utils/fetcher';

const ImageDetails = () => {

    const { image_id } = useParams();
    const [imageData, setImageData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [loadingContent, setloadingContent] = useState("Loading...")
    const Nav = useNavigate();

    const handleConfirm = async (image_id) => {
        const { response, data } = await fetcher(
            `http://localhost:8000/images/delete-image`,
            "POST",
            { 'image_id': image_id }
        );
        if (response.status == 200) {
            Nav('/my-gallery')
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const { response, data } = await fetcher(
                `http://localhost:8000/images/${image_id}`,
                "GET"
            );
            if (response.status == 200) {
                setImageData(data.image);
            }
            if (response.status == 404) {
                setloadingContent("Not Found!")
            }
            if (response.status == 403) {
                setloadingContent("Not Found!")
            }
        };

        fetchData();
    }, [image_id]);

    if (!imageData) {
        return <p style={{ display: 'flex', margin: 'auto', marginTop: "5rem" }}>{loadingContent}</p>;
    }


    return (
        <div className="container">
            <div className="image-section">
                <img src={imageData.url} alt={imageData.title} />
            </div>
            <div className="data-section">
                {Object.keys(imageData).map((key, index) => {
                    if (key === "title") {
                        const title = imageData[key];
                        let parts = title.split(".");
                        return (
                            <div key={key}>
                                <p><strong>title:</strong> {parts[0]}</p>
                                <p><strong>format:</strong> {parts[1]}</p>
                            </div>
                        );
                    }
                    if (key === "created_at" || key === "modified_at") {
                        const date = new Date(imageData[key]);
                        return (
                            <p key={key}>
                                <strong>{key.replace('_', ' ')}:</strong> {date.toLocaleString()}
                            </p>
                        );
                    }
                    if (key === "url") {
                        return null;
                    }
                    if (key === "description") {
                        return (
                            <Description desc={imageData[key]} key={key} image_id={image_id} />
                        );
                    }

                    return null;
                })}

                <div className='delete-container'>
                    <button id='delete-btn' onClick={() => { setShowModal(true) }}>Delete</button>
                </div>


                <ConfirmationPrompt
                    isOpen={showModal}
                    onConfirm={() => handleConfirm(image_id)}
                    onCancel={handleCancel}
                    message="Are you sure you want to delete it?"
                    options={{ confirm: "delete", cancel: "cancel" }}
                />
            </div>

        </div>
    );

};

export default ImageDetails;