import services from '../services/config'
import { useEffect, useState, useContext } from 'react'

function CalculoHuella() {
  const [dataHabitos, setDataHabitos] = useState([])

  useEffect(() => {
    GetDataHabitos()
    patchTotalHuella()
  }, [])

  const factoresEmision = {
    pollo: 6.9,
    ternera: 27,
    vegetales: 2,
    cerdo: 12.1,
    pescado: 6,
  }
  const factoresEmisionTransporte = {
    coche: {
      gasolina: 192,
      diesel: 171,
      electrico: 0,
      hibrido: 122,
    },
    autobus: 104,
    tren: 41,
    metro: 29,
    bicicleta: 0,
    caminar: 0,
    avion: 285,
  }
  const velocidadesPromedio = {
    coche: 60,
    autobus: 40,
    tren: 80,
    metro: 30,
    bicicleta: 15,
    caminar: 5,
    avion: 800,
  }
  // esto es kilometro hora

  const factoresEmisionEnergia = {
    electricidad: 0.233,
    gasNatural: 0.185,
    butano: 0.25,
  }
  // kg CO2 por kWh

  // Conversión de butano a kWh
  const conversionButanoKwh = 13.75 // kWh por kg de butano

  // Consumos promedio anuales para un hogar en España (en kWh)
  const consumoPromedioDiario = {
    electricidad: 3400 / 365, // kWh por día
    gasNatural: 10000 / 365, // kWh por día
    butano: (100 * conversionButanoKwh) / 365, // Convertir kg a kWh y luego a diario
  }
  const descuentoRenovable = 0.5
  const huellaResiduosPorPersona = 1
  const GetDataHabitos = async () => {
    try {
      const response = await services.get(`huella/user`)

      setDataHabitos(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const hoy = new Date()
  const fechaHoy = hoy.toISOString().split('T')[0]
  const transportes = dataHabitos.filter((cadaHabito) => {
    return cadaHabito.transporte && cadaHabito.createdAt.startsWith(fechaHoy)
  })
  const alimentacion = dataHabitos.filter((cadaHabito) => {
    return cadaHabito.alimentacion && cadaHabito.createdAt.startsWith(fechaHoy)
  })
  const otros = dataHabitos.filter((cadaHabito) => {
    return cadaHabito.otros && cadaHabito.createdAt.startsWith(fechaHoy)
  })

  function calcularHuellaAlimento(alimento, cantidad, esDeProximidad) {
    let cantidadKg = cantidad / 1000
    let factor = factoresEmision[alimento]

    let huellaCarbono = cantidadKg * factor

    if (esDeProximidad) {
      huellaCarbono *= 0.9
    }
    return huellaCarbono
  }

  let huellaTotalAlimento = 0
  alimentacion.forEach((cadaHabito) => {
    const { alimento, cantidad, esDeProximidad } = cadaHabito.alimentacion
    huellaTotalAlimento += calcularHuellaAlimento(
      alimento,
      cantidad,
      esDeProximidad
    )
  })

  function calcularHuellaTransporte(vehiculo, tiempo, motor = null) {
    const velocidad = velocidadesPromedio[vehiculo]
    if (!velocidad) {
      console.error(`Tipo de vehículo no válido: ${vehiculo}`)
      return 0
    }

    const distanciaKm = (tiempo / 60) * velocidad

    let huellaCarbono

    if (vehiculo === 'coche') {
      if (!motor) {
        console.error('Se requiere especificar el tipo de motor para el coche.')
        return 0
      }

      const factor = factoresEmisionTransporte.coche[motor]
      if (!factor) {
        console.error(`Tipo de motor no válido: ${motor}`)
        return 0
      }

      huellaCarbono = distanciaKm * factor
    } else {
      const factor = factoresEmisionTransporte[vehiculo]
      if (!factor) {
        console.error(`Tipo de vehículo no válido: ${vehiculo}`)
        return 0
      }

      huellaCarbono = distanciaKm * factor
    }

    return huellaCarbono / 1000
  }

  function calcularHuellaGeneral(transportes) {
    let huellaTotal = 0

    transportes.forEach((cadaHabito) => {
      const vehiculo = cadaHabito.transporte.vehiculo
      const tiempo = cadaHabito.transporte.tiempo
      const motor = cadaHabito.transporte.motor

      huellaTotal += calcularHuellaTransporte(
        vehiculo,
        tiempo,
        vehiculo === 'coche' ? motor : null
      )
    })
    return huellaTotal
  }
  const huellaGeneraltransportes = calcularHuellaGeneral(transportes)

  function calcularHuellaEnergiaDiaria(consumo) {
    let huellaTotal = 0

    consumo.forEach((fuente) => {
      const { consumoEnergetico, esRenovable, recicla } = fuente.otros
      const factor = factoresEmisionEnergia[consumoEnergetico]
      const cantidadDiaria = consumoPromedioDiario[consumoEnergetico]

      if (!factor) {
        console.error(`Tipo de energía no válido: ${consumoEnergetico}`)
        return
      }

      if (!cantidadDiaria) {
        console.error(
          `No hay datos de consumo promedio para: ${consumoEnergetico}`
        )
        return
      }

      let huella = cantidadDiaria * factor

      if (esRenovable) {
        huella *= 0.9
      }

      huellaTotal += huella

      if (!recicla) {
        huellaTotal += huellaResiduosPorPersona
      }
    })

    return huellaTotal
  }

  const huellaDiariaenergia = calcularHuellaEnergiaDiaria(otros)

  const huellaTotal =
    huellaDiariaenergia + huellaGeneraltransportes + huellaTotalAlimento

  console.log(
    `Huella de carbono total diaria: ${huellaTotal.toFixed(2)} kg CO₂`
  )

  const huellaDiaria = huellaTotal.toFixed(2)

  const patchTotalHuella = async () => {
    try {
      await services.patch('/user/huella', { huella: huellaDiaria })
    } catch (error) {}
  }

  if (dataHabitos.length === undefined) {
    return <h3>Loading...o eso creo</h3>
  }
  //! CONSULTAR A JORGE

  return <div>CalculoHuella</div>
}

export default CalculoHuella
