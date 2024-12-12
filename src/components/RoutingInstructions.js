import React from 'react'

const RoutingInstructions = ({ instructions }) => {
  return (
    <div className="routing-instructions">
      <h3>Routing Instructions</h3>
      <ul>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  )
}

export default RoutingInstructions
