import fetchRoutes from './routing'

export default async function energyCalculate(data) {
  const emission = 0 //Some value later based on types of vehicle used to commute
  
  const energyUsed = distance * emission * duration

  // Send the energyUsed back to mongoDB database.
}
