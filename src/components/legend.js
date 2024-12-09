import React from 'react'
import './Legend.css'

const Legends = () => {
  return (
    <div className="legend-container">
      <div className="info legend-bar">
        <div className="legend-category">
          <h4>Rain</h4>
          <div className="color-bar rain-legend"></div>
        </div>
        <div className="legend-category">
          <h4>Snow</h4>
          <div className="color-bar snow-legend"></div>
        </div>
        <div className="legend-category">
          <h4>Clouds</h4>
          <div className="color-bar clouds-legend"></div>
        </div>
        <div className="legend-category">
          <h4>Temperature</h4>
          <div className="color-bar temperature-legend"></div>
        </div>
        <div className="legend-category">
          <h4>Pressure</h4>
          <div className="color-bar pressure-legend"></div>
        </div>
        <div className="legend-category">
          <h4>Wind</h4>
          <div className="color-bar wind-legend"></div>
        </div>
      </div>
      <div className="buttons-container">
        <button className="zoom-button">Zoom</button>
        <button className="overlays-button">Overlays</button>
      </div>
    </div>
  )
}

export default Legends
