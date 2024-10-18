
// import services from "../services/config"
// import { useEffect, useState, useContext } from "react"
// import { AuthContext } from "../context/auth.context"
// import { Navigate, useNavigate } from "react-router-dom"


// function CalculoHuella() {


//   const [dataHabitos, setDataHabitos]=useState([])
  

  
//   useEffect(()=>{
//     GetDataHabitos()
//     //handleMediaHuella()
//   }, [])

//   const GetDataHabitos = async () =>{
//     try {
//       const response =await services.get(`huella/user`)
//       console.log(response.data)
//       setDataHabitos(response.data)
      
//     } catch (error) {
//       console.log(error)
//     }
//   }

//  //   const patchMediHuella = async () =>{

//     //   try {
        
//     //   } catch (error) {
        
//     //   }

//     // }
// //  const handleMediaHuella = (array)=>{

// //     const sumar =array.reduce((acu, valor)=> acu + valor, 0)
// //     return sumar / array.length
  
// //   }

//   return (
//     <div>CalculoHuella</div>
//   )
// }

// export default CalculoHuella