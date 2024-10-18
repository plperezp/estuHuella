import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import services from '../services/config'
import { AuthContext } from '../context/auth.context'
import { useContext } from 'react'


function FormTuHuella() {

  const navigate = useNavigate()
  const params = useParams()
  const[vehiculo, setVehiculo]= useState("")
  const[tiempo, setTiempo]= useState(0)
  const[motor, setMotor]= useState("")
  const[alimento,setAlimento]= useState("")
  const[cantidad, setCantidad]= useState(0)
  const[esDeProximidad,setEsDeProximidad]= useState(false)
  const[consumoEnergetico,setConsumoEnergetico]= useState("")
  const[esRenovable,setEsRenovable]= useState(false)
  const[recicla,setRecicla]= useState(false)
  const [errorMessage, setErrorMesage] = useState("") 
  const { loggedUserId } = useContext(AuthContext)


 const handleOnChangeVehiculo = (e)=>{
  setVehiculo(e.target.value)
 }
 const handleOnChangeTiempo = (e)=>{
  setTiempo(e.target.value)
 } 
 const handleOnChangeMotor = (e)=>{
  setMotor(e.target.value)
 } 
 const handleOnChangeAlimento = (e)=>{
  setAlimento(e.target.value)
 } 
 const handleOnChangeCantidad = (e)=>{
  setCantidad(e.target.value)
 } 
 const handleOnChangeEsDeProximidad = (e)=>{
  setEsDeProximidad(!esDeProximidad)
 } 
 const handleOnChangeConsumoEnergetico = (e)=>{
  setConsumoEnergetico(e.target.value)
 }
 const handleOnChangeRecicla = (e)=>{
  setRecicla(!recicla)
}
const handleOnChangeEsRenovable = (e)=>{
  setEsRenovable(!esRenovable)
}
 

 const handleFormTransporteSubmit = async (e) =>{
    e.preventDefault()
    try {
      
      const formTransport = {
        transporte:{
          vehiculo,
          tiempo,
          motor
        },
        user:loggedUserId
        
      }
      await services.post(`/huella/transporte`, formTransport)
      console.log("Añadido correctamente")
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message);
      } else {
        navigate("/error");
      }
    }    

    
  }

 const handleFormOtrosSubmit = async (e) =>{
  console.log()
  e.preventDefault()
    try {
      
      const formOtros = {
        otros:{
          consumoEnergetico,
          esRenovable,
          recicla
        },
        user: loggedUserId
        
      }
      await services.post("/huella/otros", formOtros)
      console.log("Añadido correctamente")
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message);
      } else {
        navigate("/error");
      }
    }    
}

const handleFormAlimentacionSubmit = async (e) => {
  e.preventDefault()
  try {
    const formAlimentacion ={
      alimentacion:{
        alimento,
        cantidad,
        esDeProximidad
      },
      user: loggedUserId
    }

    await services.post("/huella/alimentacion", formAlimentacion)
    console.log("Añadido correctamente")
  } catch (error) {
    console.log(error)
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message);
      } else {
        navigate("/error");
      }
  }
}




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
      onSubmit={handleFormTransporteSubmit}
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
        <select onChange={handleOnChangeVehiculo} name="transportes" multiple required>
        <option value="">--Selecciona una opción--</option>
          <option value="coche">Coche</option>
          <option value="autobús">Autobús</option>
          <option value="tren">Tren</option>
          <option value="metro">Metro</option>
          <option value="bicicleta">Bicicleta</option>
          <option value="caminar">Caminar</option>
        </select>

        <label>Tiempo (minutos):</label>
        <input type="number" name="tiempo" value={tiempo} onChange={handleOnChangeTiempo} min="1" max="450" required />

        <label>Tipo de motor:</label>
        <select  onChange={handleOnChangeMotor} name="motor"  >
          <option value="">--Selecciona una opción--</option>
          <option value="gasolina">Gasolina</option>
          <option value="diesel">Diesel</option>
          <option value="electrico">Eléctrico</option>
          <option value="hibrido">Híbrido</option>
        </select>
        <button type="submit">Enviar</button>
        </form>
        <form onSubmit={handleFormOtrosSubmit} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#aae6aa',
          padding: '50px',
          gap: '20px',
          marginTop: '100px',
        }}>

        <label>Consumo energético:</label>
        <select onChange={handleOnChangeConsumoEnergetico} name="consumoEnergetico" required>
        <option value="">--Selecciona una opción--</option>
          <option value="electricidad">Electricidad</option>
          <option value="gas natural">Gas Natural</option>
          <option value="butano">Butano</option>
        </select>

        <label>¿Es renovable?</label>
        <input onClick={handleOnChangeEsRenovable} value={esRenovable} type="checkbox" name="esRenovable" />
        <label>¿Reciclas?</label>
        <input onClick={handleOnChangeRecicla} value={recicla} type="checkbox" name="recicla" />
        <button type="submit">Enviar</button>
        </form>
        <form onSubmit={handleFormAlimentacionSubmit}  style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: '#aae6aa',
          padding: '50px',
          gap: '20px',
          marginTop: '100px',
        }}>
        <label>Tipo de alimentación:</label>
        <select onChange={handleOnChangeAlimento} name="alimentacion" multiple>
          <option value="pollo">Pollo</option>
          <option value="cerdo">Cerdo</option>
          <option value="ternera">Ternera</option>
          <option value="vegetales">Vegetales</option>
        </select>

        <label>Cantidad(g):</label>
        <input onChange={handleOnChangeCantidad} value={cantidad} type="number" name="cantidadCarne" min="0" />

        <label>¿Es de proximidad?</label>
        <input onClick={handleOnChangeEsDeProximidad} value={esDeProximidad} type="checkbox" name="esDeProximidad" />

        

        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default FormTuHuella
