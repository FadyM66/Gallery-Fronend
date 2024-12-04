import { useEffect, useState } from 'react';
import '../assets/styles/description.css';
import fetcher from '../utils/fetcher';

const Description = ({ image_id, desc }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedDesc, setEditedDesc] = useState(desc || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {

        await fetcher(
            "https://localhost:8000/images/update-description",
            "POST",
            { image_id, "description":editedDesc }
        );
        setIsEditing(false);
    };

    const handleGenerating = async () => {
        setIsLoading(true);
        const { response, data } = await fetcher(
            "http://localhost:8000/images/generate-caption",
            "POST",
            { image_id }
        ); 
        setEditedDesc(data.caption || "");
        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        setEditedDesc(e.target.value);
    };

    useEffect(()=>{
        setEditedDesc(desc === null || desc === 'null' ? "" : desc);
    }
    
    ,[desc, image_id])

    return (
        <div className="description-container">
            <p><strong>description: </strong></p>
            {isEditing ? (
                <textarea
                    className="desc"
                    value={editedDesc}
                    onChange={handleInputChange}
                />
            ) : (
                <p className='desc after'>{editedDesc || ""}</p>
            )}
            <div className='btn'>
                {isEditing ? (
                    <>
                        <button onClick={handleSaveClick} disabled={isLoading} className={isLoading ? 'muted' : ''}>Save</button>
                        <button
                            onClick={handleGenerating}
                            className='aibtn'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Generating...' : 'AI Generate'}
                        </button>
                    </>
                ) : (
                    <button onClick={handleEditClick}>Edit</button>
                )}
            </div>
        </div>
    );
}

export default Description;