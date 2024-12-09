import React, { useState, useEffect } from 'react';
import './AboutMe.css';
import { FaPen } from 'react-icons/fa'; 

const AboutMePage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [name, setName] = useState('Ivander'); 
    const [isEditing, setIsEditing] = useState(false); 


    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            setName(savedName);
        }
    }, []);

    useEffect(() => {
        if (name !== 'Ivander') {
            localStorage.setItem('userName', name);
        }
    }, [name]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="about-me-page">
            <div className="about-me-container">
                <div className="user-info">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            onBlur={toggleEditMode} 
                            autoFocus
                        />
                    ) : (
                        <>
                            <h2>{name}</h2>
                            <FaPen className="edit-icon" onClick={toggleEditMode} />
                        </>
                    )}
                    <div className="user-info-line"></div>
                </div>

                <div className="address-section">
                    <h3>Home Address</h3>
                    <input className="address-input" type="text" placeholder="Enter Home Address" />
                </div>

                <div className="address-section">
                    <h3>Work Address</h3>
                    <input className="address-input" type="text" placeholder="Enter Work Address" />
                </div>

                <div className="change-password-section">
                    <input
                        className="change-password-input"
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Change Password"
                    />
                    <button className="change-password-button" onClick={togglePasswordVisibility}>
                        {passwordVisible ? 'Hide' : 'Show'}
                    </button>
                </div>

                <div className="history-section">
                    <h3>Your History</h3>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Total Energy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>October</td>
                                <td>2024</td>
                                <td>1,078 kWh</td>
                            </tr>
                            <tr>
                                <td>September</td>
                                <td>2024</td>
                                <td>5,167 kWh</td>
                            </tr>
                            <tr>
                                <td>August</td>
                                <td>2024</td>
                                <td>3,045 kWh</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;