import React from 'react'
import { useState } from 'react'

const RoutingInstructions = ({ instructions }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div className="routing-instructions">
      <button onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? 'Show Instructions' : 'Hide Instructions'}
      </button>
      {!isCollapsed && (
        <div className="instructions-content">
          {instructions.map((instruction, index) => (
            <p key={index} style={{ color: 'black' }}>
              {instruction}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default RoutingInstructions
