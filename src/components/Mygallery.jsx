import React, { createContext, useState } from 'react';
import '../assets/styles/dashboard.css';
import ConfirmationPrompt from './ConfirmPrompt';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import UploadCard from './UploadCard.jsx';


const AppContext = createContext();

const MyGallery = ({ children }) => {

    const [isUploadCard, setUploadCard] = useState(false)

    const Nav = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const handleSignOutClick = () => {
        setShowModal(true);
    };

    const handleConfirmSignOut = () => {
        Cookies.remove('token')
        Nav("/")
    };

    const handleCancel = () => {
        setUploadCard(false);
    };

    const showCard = () => {
        setUploadCard(true)
    }

    const handleCancelOut = () => {
        setShowModal(false)
    }

    return (
        <AppContext.Provider value={{ isUploadCard, setUploadCard, handleCancel }}>

            <div id='overlay'>
                <div id='dashboard-container'>
                    <div id='nav-bar'>
                        <ul>
                            <li onClick={() => { Nav('/my-gallery') }}>My Gallery</li>
                            <li onClick={showCard}>Upload</li>
                            <li onClick={handleSignOutClick}>
                                Sign out
                            </li>
                        </ul>
                    </div>
                    {children}
                </div>
            </div>


            {/* Pop ups */}

            <ConfirmationPrompt
                isOpen={showModal}
                onConfirm={handleConfirmSignOut}
                onCancel={handleCancelOut}
                message="Are you sure you want to leave?"
                options={{ confirm: "Leave", cancel: "Stay" }}
            />

            <UploadCard

            />

        </AppContext.Provider>
    )
}

export { MyGallery, AppContext };
