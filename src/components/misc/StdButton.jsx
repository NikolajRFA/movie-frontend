import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

const StdButton = ({ text, type, onClick, dynamicPath, style}) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const buttonStyle = {
        backgroundColor: isHovered ? '#ffb925' : '#FFE920',
        color: 'black',
        border: 'none',
        borderRadius: '10px',
        minHeight: '35px',
        cursor: 'pointer',
        ...style,
    };

    return (
        <Button
            style={buttonStyle}
            type={type}
            onClick={() => {
                if (onClick) {
                    onClick();
                }

                // Check if dynamicPath is provided before navigating
                if (dynamicPath) {
                    navigate(dynamicPath);
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {text}
        </Button>
    );
};

export default StdButton;
