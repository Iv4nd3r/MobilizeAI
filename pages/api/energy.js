var calculation
var distanceInKm
var durationInH
var vehicle

async function energyCalculate(distance, duration, type) {
  const energyUsageInKWhperKm = {
    car: 1.2,
    bike: 0.3,
    bus: 3,
    hgv: 4,
    ecar: 0.2,
    ebike: 0.03,
    ebus: 1.5,
    ehgv: 1.1,
    walk: 0.05
  }
  distanceInKm = distance / 1000
  durationInH = duration / 3600
  vehicle = type
  const energyUsage = energyUsageInKWhperKm[type] || 0.2
  calculation = distanceInKm * energyUsage * durationInH
  return calculation
}

function getCalculation(temperature, humidity) {
  let temperatureCoefficient
  let humidityCoefficient

  if (vehicle === 'car' || vehicle === 'bus' || vehicle === 'hgv') {
    if (temperature >= 10) {
      temperatureCoefficient = 1 - Math.floor(temperature / 10) * 0.02
    } else if (temperature < 10) {
      temperatureCoefficient = 1 + Math.ceil(Math.abs(temperature) / 10) * 0.025
    }
  } else if (vehicle === 'ecar' || vehicle === 'ehgv' || vehicle === 'ebus') {
    if (temperature >= 10) {
      temperatureCoefficient = 1 - Math.floor(temperature / 10) * 0.03
    } else if (temperature < 10) {
      temperatureCoefficient = 1 + Math.ceil(Math.abs(temperature) / 10) * 0.04
    }
  } else if (vehicle === 'bike') {
    if (temperature >= 10) {
      temperatureCoefficient = 1 - Math.floor(temperature / 10) * 0.01
    } else if (temperature < 10) {
      temperatureCoefficient = 1 + Math.ceil(Math.abs(temperature) / 10) * 0.015
    }
  } else if (vehicle === 'ebike') {
    if (temperature >= 10) {
      temperatureCoefficient = 1 - Math.floor(temperature / 10) * 0.02
    } else if (temperature < 10) {
      temperatureCoefficient = 1 + Math.ceil(Math.abs(temperature) / 10) * 0.03
    }
  } else if (vehicle === 'walk') {
    if (temperature >= 10) {
      temperatureCoefficient = 1 - Math.floor(temperature / 10) * 0.05
    } else if (temperature < 10) {
      temperatureCoefficient = 1 + Math.ceil(Math.abs(temperature) / 10) * 0.1
    }
  }

  if (humidity >= 10) {
    humidityCoefficient = 1 + Math.floor(humidity / 10) * 0.01
  } else if (humidity < 10) {
    humidityCoefficient = 1
  }

  calculation = calculation * temperatureCoefficient * humidityCoefficient
  calculation.toFixed(2)
  return calculation
}

async function energySave(email) {
  await fetch('https://server-one-clover.vercel.app/api/saveEnergyUsage', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      distanceInKm,
      durationInH,
      calculation,
      vehicle,
      email
    })
  })
    .then(response => {
      if (response.status === 201) {
        alert('Energy usage saved successfully')
      } else {
        console.error('Failed to save energy usage')
      }
    })
    .catch(error => {
      console.error('Error occurred while saving energy usage:', error.message)
    })
}

async function fetchEnergyData(token) {
  try {
    const response = await fetch(
      'https://server-one-clover.vercel.app/api/getEnergyUsage',
      {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch energy data')
    }

    const energyData = await response.json()
    return energyData
  } catch (error) {
    console.error('Error fetching energy data:', error)
  }
}

export { energyCalculate, energySave, getCalculation, fetchEnergyData }
