import { useEffect, useState } from 'react';
import '../assets/styles/board.css';
import { useNavigate } from 'react-router-dom';
import fetcher from '../utils/fetcher.js';

const Board = () => {

    const Nav = useNavigate();

    const [count, setCount] = useState(0)
    const [images, setImages] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const { response, data } = await fetcher(
                "http://localhost:8000/images/",
                "GET"
            );
            if (response.status == 200) {
                setCount(data.count);
                setImages(data.results);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div id="board-container">
                <div id='image-count'>
                    <p>You have <span>{count}</span> images</p>
                </div>
                <div id="images-container" className='image-gallery'>

                    {images && images.length > 0 ? (
                        <div>
                            {images.map((image) => (
                            <div key={image.id}>
                                <img
                                    src={image.url}
                                    alt={image.title || "Image"}
                                    className="image-item"
                                    onClick={() => { Nav(`/my-gallery/${image.id}`) }}
                                />
                            </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ display: "flex" }}>
                            <p style={{ textAlign: "center" }}>No images to display</p>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default Board;
