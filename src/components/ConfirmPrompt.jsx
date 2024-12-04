import { useState } from 'react';
import '../assets/styles/confirmprompt.css';

const ConfirmationPrompt = ({ isOpen, onConfirm, onCancel, message, options, showInput
 }) => {
    
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleConfirm = () => {
        onConfirm(inputValue);
    };
    
    if (!isOpen) return null;

    return (
        <div className="prompt-container">
            <div className="prompt">
                <h3>{message}</h3>
                {showInput && (
                    <input
                        id="prompt-input"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter your response"
                    />
                )}
                <button onClick={handleConfirm}>{options.confirm}</button>
                <button onClick={onCancel}>{options.cancel}</button>
            </div>
        </div>
    );
};

export default ConfirmationPrompt;
