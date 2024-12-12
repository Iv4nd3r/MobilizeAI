import axios from 'axios'

export default async function energyCalculate(distance, duration, type) {
  const emissionRates = {
    car: 0.2,
    bike: 0.05,
    bus: 0.1,
    ecar: 0.0,
    ebike: 0.0,
    hgv: 0.3,
    walk: 0.0
  }
  const emission = emissionRates[type] || 0.2
  const energyUsed = distance * emission * duration
  console.log('Energy used:', energyUsed)
  console.log(distance, duration, energyUsed, type)

  // Send the energyUsed back to mongoDB database.
  await axios
    .post('http://localhost:3001/api/saveEnergyUsage', {
      distance,
      duration,
      energyUsed,
      type
    })
    .then(response => {
      if (response.status === 201) {
        console.log('Energy usage saved successfully')
      } else {
        console.log('Failed to save energy usage')
      }
    })
    .catch(error => {
      console.log('Error occurred while saving energy usage:', error.message)
    })
}
