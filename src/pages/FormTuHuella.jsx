import React from 'react'
import NavBar from '../components/NavBar'

function FormTuHuella() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <NavBar />
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#aae6aa',
          padding: '50px',
          gap: '20px',
          marginTop: '100px',
        }}
      >
        <label>Medio de transporte:</label>
        <select name="transportes" multiple required>
          <option value="coche">Coche</option>
          <option value="autobús">Autobús</option>
          <option value="tren">Tren</option>
          <option value="metro">Metro</option>
          <option value="bicicleta">Bicicleta</option>
          <option value="caminar">Caminar</option>
        </select>

        <label>Tiempo (minutos):</label>
        <input type="number" name="tiempo" min="1" max="450" required />

        <label htmlFor="motor">Tipo de motor:</label>
        <select name="motor">
          <option value="">--Selecciona una opción--</option>
          <option value="gasolina">Gasolina</option>
          <option value="diesel">Diesel</option>
          <option value="electrico">Eléctrico</option>
          <option value="hibrido">Híbrido</option>
        </select>

        <label>Consumo energético:</label>
        <select name="consumoEnergetico" required>
          <option value="electricidad">Electricidad</option>
          <option value="gas natural">Gas Natural</option>
          <option value="butano">Butano</option>
        </select>

        <label>¿Es renovable?</label>
        <input type="checkbox" name="esRenovable" />

        <label>Tipo de alimentación:</label>
        <select name="alimentacion" multiple>
          <option value="pollo">Pollo</option>
          <option value="cerdo">Cerdo</option>
          <option value="ternera">Ternera</option>
          <option value="vegetales">Vegetales</option>
        </select>

        <label>Cantidad(g):</label>
        <input type="number" id="cantidadCarne" name="cantidadCarne" min="0" />

        <label>¿Es de proximidad?</label>
        <input type="checkbox" name="esDeProximidad" />

        <label>¿Reciclas?</label>
        <input type="checkbox" name="recicla" />

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default FormTuHuella
