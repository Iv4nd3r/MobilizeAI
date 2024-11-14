// home.js
import React, { useEffect, useState } from 'react';

import './Home-Navigation.css';
import './Home-Dashboard.css';
import './Home-EnergyHistory.css';


import { Link } from 'react-router-dom';

// Import SVG icons
import CloudIcon from '../assets/CloudIcon.svg';
import FeelsLikeIcon from '../assets/FeelsLikeIcon.svg';
import HumidityIcon from '../assets/HumidityIcon.svg';
import PressureIcon from '../assets/PressureIcon.svg';
import TempMaxIcon from '../assets/TempMaxIcon.svg';
import TempMinIcon from '../assets/TempMinIcon.svg';
import VisibilityIcon from '../assets/VisibilityIcon.svg';
import WindSpeedIcon from '../assets/WindSpeedIcon.svg';

//const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;



const Home = () => {
    // State to store the user's name
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Retrieve the user's name from local storage
        const name = localStorage.getItem('userName') || 'Ivander';
        setUserName(name);
    }, []);

    return (
        <div className="home-container">
            {/* Greeting Section */}
            <header className="home-greeting">
                <h1>Hello, {userName}!</h1>
                <a href="#" className="energy-history-link">Check Your Energy History</a>
            </header>

            <div className="weather-tips-container">
            <div className="weather-content">
            {/* Weather Information Section */}
            <section className="weather-info">
                <div className="location-info">
                    <h2>Tebet, South Jakarta</h2>
                    <p>Thursday, October 10th 2024</p>
                    <div className="temperature">
                        <h1>22°C</h1>
                        <p>Cool and Rainy</p>
                    </div>
                </div>
                <div className="location-change">
                    <button>Change Location</button>
                    <input type="search" placeholder="Search location" />
                </div>
            </section>

        
            {/* Weather Stats Section */}
            <div className="weather-stats">

                <div className="stat-box">
                    
                <h4 className="stat-title">
                    <img src={WindSpeedIcon} alt="Wind Speed Icon" className="stat-icon" /> 
                        Wind Speed
                    </h4>
                    <p>6 KM/H | 12 KM/H Gusts</p>
                </div>
                <div className="stat-box">
                <h4 className="stat-title">
                    <img src={FeelsLikeIcon} alt="Feels Like Icon" className="stat-icon" /> 
                        Feels Like
                    </h4>
                    <p>25°C</p>
                </div>
                <div className="stat-box">
                <h4 className="stat-title">
                    <img src={VisibilityIcon} alt="Visibility Icon" className="stat-icon" /> 
                        Visibility
                    </h4>
                    <p>25 KM</p>
                </div>
                <div className="stat-box">
                <h4 className="stat-title">
                    <img src={HumidityIcon} alt="Humidity Icon" className="stat-icon" /> 
                        Humidity
                    </h4>
                    <p>75%</p>
                </div>
                <div className="stat-box">
                <h4 className="stat-title">
                    <img src={PressureIcon} alt="Pressure Icon" className="stat-icon" /> 
                        Pressure
                    </h4>
                    <p>1.012 hPa</p>
                </div>
                <div className="stat-box">
                <h4 className="stat-title">
                    <img src={TempMaxIcon} alt="Temp Max Icon" className="stat-icon" /> 
                        Temp. Max
                    </h4>
                    <p>25°C</p>
                </div>
                <div className="stat-box">
                <h4 className="stat-title">
                    <img src={TempMinIcon} alt="Temp Min Icon" className="stat-icon" /> 
                        Temp. Min
                    </h4>
                    <p>25°C</p>
                </div>
                <div className="stat-box">
                <h4 className="stat-title">
                    <img src={CloudIcon} alt="Cloud Icon" className="stat-icon" /> 
                        Cloud
                    </h4>
                    <p>75%</p>
                </div>
            </div>
            </div>

            {/* Tips Section */}
            <aside className="tips-section">
                <h3>TIPS</h3>
                <div className="tip-message">Turn off your AC and use natural ventilation or a fan to save energy. Drive steadily on wet roads to conserve fuel!</div>
                <div className="tip-message">If it’s chilly at 22°C, layering up with warm clothes or using a blanket is more energy–efficient than turning on the heater!</div>
                <input type="text" placeholder="Want to ask more?" />
            </aside>
        </div>


            {/* Map Section */}
            <section className="map-section">
                <div className="map-overlay">
                    <input type="text" placeholder="Your Location" />
                    <input type="text" placeholder="Choose Destination" />
                    <select>
                        <option>Vehicle Type</option>
                    </select>
                </div>
                <div className="map-placeholder">[Map goes here]</div>
            </section>

            {/* Energy Usage Section */}
            <section className="energy-usage">
                <h2>Today, you’ve spent 12.5 kWh of energy</h2>
                <div className="energy-chart">
                    {/* Placeholder for the energy usage chart */}
                </div>
                <div className="energy-history">
                    {/* Placeholder for the energy history table */}
                </div>
            </section>
        </div>
    );
};

export default Home;
