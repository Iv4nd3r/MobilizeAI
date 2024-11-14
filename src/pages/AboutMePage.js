import React, { useState, useEffect } from 'react';
import './AboutMe.css';
import { FaPen } from 'react-icons/fa'; // Pencil icon

const AboutMePage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [name, setName] = useState('Ivander'); // Default name
    const [isEditing, setIsEditing] = useState(false); // To toggle edit mode

    // Add state for selected month and year
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // Load the name from localStorage on initial load
    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            setName(savedName);
        }
    }, []);

    // Save the name to localStorage whenever it changes
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

    // Sample data for energy history
    const historyData = [
        { month: 'October', year: 2024, energy: '1,078 kWh' },
        { month: 'September', year: 2024, energy: '5,167 kWh' },
        { month: 'August', year: 2024, energy: '3,045 kWh' },
        { month: 'July', year: 2024, energy: '2,300 kWh' },
        // Add more data if needed
    ];

    return (
        <div className="about-me-page">
            <div className="about-me-container">
                <div className="user-info">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            onBlur={toggleEditMode} // Turn off edit mode when input loses focus
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
                    <div className="dropdown-container">
                        <select
                            className="history-dropdown"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            <option value="">Select Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>

                        <select
                            className="history-dropdown"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="">Select Year</option>
                            {[2024, 2023, 2022, 2021, 2020].map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Year</th>
                                <th>Total Energy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.filter(item => 
                                (selectedMonth ? item.month === selectedMonth : true) &&
                                (selectedYear ? item.year === selectedYear : true)
                            ).map((item, index) => (
                                <tr key={index}>
                                    <td>{item.month}</td>
                                    <td>{item.year}</td>
                                    <td>{item.energy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;
