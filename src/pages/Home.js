import React, { useEffect, useState } from 'react';
import './Home-Navigation.css';
import './Home-Dashboard.css';
import './Home-EnergyHistory.css';

import { Link } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Import SVG icons
import CloudIcon from '../assets/CloudIcon.svg';
import FeelsLikeIcon from '../assets/FeelsLikeIcon.svg';
import HumidityIcon from '../assets/HumidityIcon.svg';
import PressureIcon from '../assets/PressureIcon.svg';
import TempMaxIcon from '../assets/TempMaxIcon.svg';
import TempMinIcon from '../assets/TempMinIcon.svg';
import VisibilityIcon from '../assets/VisibilityIcon.svg';
import WindSpeedIcon from '../assets/WindSpeedIcon.svg';
import SearchIcon from '../assets/search-icon.svg';
import AIIcon from '../assets/ai-icon.svg';
import SendBtn from '../assets/Send-button.svg';

// Initialize Chart.js for line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
    // State to store the user's name
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Retrieve the user's name from local storage
        const name = localStorage.getItem('userName') || 'Ivander';
        setUserName(name);
    }, []);

    // Sample data for the line chart
    const lineChartData = {
        labels: ['Oct 10, 2024', 'Oct 12, 2024', 'Oct 13, 2024', 'Oct 14, 2024', 'Oct 15, 2024'],
        datasets: [
            {
                label: 'Energy Usage (kWh)',
                data: [20, 21, 8, 14, 12],
                borderColor: '#cfd8dc', // Light grayish-blue line
                backgroundColor: 'rgba(207, 216, 220, 0.1)', // Subtle transparent fill
                tension: 0.4, // Smooth curve
                fill: true, // Fill area under the line
                pointBackgroundColor: '#cfd8dc',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#cfd8dc',
            },
        ],
    };
    
    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#cfd8dc', // Matches line color
                },
            },
            title: {
                display: true,
                text: 'Energy Usage (kWh)',
                color: '#cfd8dc', // Title color
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, 
                },
                ticks: {
                    color: '#cfd8dc', 
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(207, 216, 220, 0.2)', // Subtle horizontal grid lines
                },
                ticks: {
                    color: '#cfd8dc', // Light grayish-blue text
                },
            },
        },
    };
    
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
                            <div className="location-input-container">
                                <input
                                    type="text"
                                    placeholder="Change Location"
                                    className="location-input"
                                />
                                <button className="location-search-btn">
                                    <img src={SearchIcon} alt="Temp Max Icon" className="stat-icon" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Weather Stats Section */}
                    <div className="weather-stats">
                        <div className="stat-box wind-speed-box">
                            <h4 className="stat-title">
                                <img src={WindSpeedIcon} alt="Wind Speed Icon" className="stat-icon" />
                                Wind Speed
                            </h4>

                            <div className="wind-speed-content">
                                <div className="wind-speed-item">
                                    <span className="value">6</span>
                                    <span className="unit-label">
                                        <span className="unit">KM/H</span>
                                        <span className="label">Wind</span>
                                    </span>
                                </div>
                                <div className="divider"></div>
                                <div className="wind-speed-item">
                                    <span className="value">12</span>
                                    <span className="unit-label">
                                        <span className="unit">KM/H</span>
                                        <span className="label">Gusts</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Other Stats */}
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
                            <p className="stat-title">25 KM</p>
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
                            <p>
                                <span className="value">1.012</span>
                                <span className="unit"> hPa</span>
                            </p>
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
                    <div className="tips-header">
                        <h3>TIPS</h3>
                        <img src={AIIcon} alt="AI Icon" className="ai-icon" />
                    </div>
                    <div className="tip-message system">
                        Turn off your AC and use natural ventilation or a fan to save energy. Drive steadily on wet roads to conserve fuel!
                    </div>

                    {/* User Message */}
                    <div className="tip-message user">
                        Should I use the heater if it feels chilly?
                    </div>

                    {/* System Message */}
                    <div className="tip-message system">
                        If it’s chilly at 22°C, layering up with warm clothes or using a blanket is more energy–efficient than turning on the heater!
                    </div>

                    <div className="input-container">
                        <input type="text" placeholder="Want to ask more?" className="input-box" />
                        <button className="send-button">
                            <img src={SendBtn} alt="Send" />
                        </button>
                    </div>
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
                <div className="map-placeholder">
                    <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=112.41,-2.53,120,0&layer=mapnik"
                        title="OpenStreetMap"
                        style={{
                            border: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    ></iframe>
                </div>
            </section>

            {/* Energy Usage Section */}
            <section className="energy-usage">
                <h2>
                    Today, you’ve spent <span className="energy-highlight">12.5</span> kWh of energy
                </h2>
                <div className="energy-usage-container">
                    {/* Chart Section */}
                    <div className="energy-chart">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>

                    {/* History Table Section */}
                    <div className="energy-history">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Total Energy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Oct 15, 2024</td>
                                    <td>12.5 kWh</td>
                                </tr>
                                <tr>
                                    <td>Oct 14, 2024</td>
                                    <td>13.4 kWh</td>
                                </tr>
                                <tr>
                                    <td>Oct 13, 2024</td>
                                    <td>10.2 kWh</td>
                                </tr>
                                <tr>
                                    <td>Oct 12, 2024</td>
                                    <td>20.5 kWh</td>
                                </tr>
                                <tr>
                                    <td>Oct 10, 2024</td>
                                    <td>20.3 kWh</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
