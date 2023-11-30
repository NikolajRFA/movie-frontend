import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const StdButton = ({ to, text, type, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        backgroundColor: isHovered ? '#ffb925' : '#FFE920',
        color: 'black',
        border: 'none',
        borderRadius: '10px',
        minHeight: '35px',
    };

    return (
        <Button
            href={to}
            style={buttonStyle}
            type={type}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {text}
        </Button>
    );
};

export default StdButton;
