import React, { useState } from 'react'

const TravelCO2Calculator = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    travel_mode: 'car',
    car_type: 'average',
    year: '',
    distance_km: '',
  })

  const [result, setResult] = useState(null)

  const apiKey = '35KHQKD6SH3G3AY64XTKGWWB88'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const calculateCO2 = async () => {
    const { origin, destination, travel_mode, car_type, year, distance_km } =
      formData

    let car_details = null
    if (travel_mode === 'car') {
      car_details = { car_type: car_type }
    }

    const data = {
      origin: { query: origin },
      destination: { query: destination },
      travel_mode: travel_mode,
      year: year ? parseInt(year) : null,
      distance_km: distance_km ? parseFloat(distance_km) : null,
      car_details: car_details,
    }

    try {
      const response = await fetch(
        'https://preview.api.climatiq.io/travel/v1-preview1/distance',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      const resultData = await response.json()
      console.log(resultData)
      setResult(resultData)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1>Calculadora de Emisiones de CO2 por Viaje</h1>
      <form>
        <div>
          <label>Origen:</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            placeholder="Ej. DE-HAM o coordenadas"
          />
        </div>
        <div>
          <label>Destino:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Ej. Berlin o coordenadas"
          />
        </div>
        <div>
          <label>Modo de Transporte:</label>
          <select
            name="travel_mode"
            value={formData.travel_mode}
            onChange={handleChange}
          >
            <option value="car">Coche</option>
            <option value="air">Avión</option>
            <option value="rail">Tren</option>
          </select>
        </div>
        {formData.travel_mode === 'car' && (
          <div>
            <label>Tipo de Coche:</label>
            <select
              name="car_type"
              value={formData.car_type}
              onChange={handleChange}
            >
              <option value="average">Promedio</option>
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
              <option value="plugin_hybrid">Híbrido enchufable</option>
            </select>
          </div>
        )}
        <div>
          <label>Año del Viaje (opcional):</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Distancia en km (opcional):</label>
          <input
            type="number"
            name="distance_km"
            value={formData.distance_km}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={calculateCO2}>
          Calcular emisiones de CO2
        </button>
      </form>

      {result && (
        <div>
          <h2>Resultado:</h2>
          <p>CO2e emitido: {result.co2e} kg</p>
          <p>Distancia calculada: {result.distance_km} km</p>
          <p>Emisiones directas: {result.direct_emissions.co2e} kg</p>
          <p>Emisiones indirectas: {result.indirect_emissions.co2e} kg</p>
        </div>
      )}
    </div>
  )
}

export default TravelCO2Calculator
