import princesaGalactica from "../assets/avatar.assets/princesaGalactica.png"
import recicledBoy from "../assets/avatar.assets/recicledBoy.png"
import recicledGollum from "../assets/avatar.assets/recicledGollum.png"
import SuperNature from "../assets/avatar.assets/SuperNature.png"
import mrBotellita from "../assets/avatar.assets/mrBotellita.png"
import niñaRama from "../assets/avatar.assets/niñaRama.png"
import neoShrek from "../assets/avatar.assets/neoShrek.png"
import emoNature from "../assets/avatar.assets/emoNature.png"
import hipstree from "../assets/avatar.assets/hipstree.png"
import "../css/areaprivada.css"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import services from "../services/config"


function PrivateArea() {
  const navigate = useNavigate()
  const [img, setImg] = useState("")
  const [dataUser, setDataUser] = useState({})
  const [mediaHuella, setMediaHuella] = useState(0)

  useEffect(()=>{
      handleGetUser();

  }, [])

  const handleGetUser = async () =>{
    try {
      const response = await services.get(`/user`)
      console.log(response.data)
      setDataUser(response.data)
      const numHuella = await handleMediaHuella(response.data.huella); 
      setMediaHuella(numHuella);
      console.log(numHuella)
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMesage(error.response.data.message)
      } else {
        navigate('/error')
      }
    }
  }

  // const handleChangeImg = async () =>{
  //   try {
  //     const img = mrBotellita 
  //     await services.patch("/user", img)
      
  //   } catch (error) {
      
  //   }
  
  // }
 

  const handleMediaHuella =  (array) => {
    if (!array || array.length === 0) return 0; 
    const sumar = array.reduce((acu, valor) => acu + valor, 0);
    return sumar / array.length; 
  };
     

  if(dataUser.huella === undefined){
    return (<h3>Loading</h3>)
  }
  
  const imgAvatar = (img) =>{

    if(img === "mrBotellita"){
      return mrBotellita
    }else if( img === "emoNature"){
      return emoNature
    }else if ( img === "hipstree"){
      return hipstree
    }else if (img === "neoShrek"){
      return neoShrek
    }else if (img === "niñaRama"){
      return niñaRama
    }else if (img === "princesaGalactica"){
      return princesaGalactica
    }else if (img === "recicledBoy"){
      return recicledBoy
    }else if (img === "recicledGollum"){
      return recicledGollum
    }else if (img === "SuperNature"){
      return SuperNature
    }
    
  }
  const avatar =imgAvatar(dataUser.img)

  return (
    <div className='conatainer-areaprivada'>
      <NavBar/>


<div className='avatar'>
  <img style={{width:'250px'}} src={avatar} alt="avatar" />
</div>
<div className="tu-huella">
  <h1>Es tu Huella de hoy:{dataUser.huella[0]}</h1>
  <h3> es tu media {mediaHuella}</h3>
  <p>sigue mejorando</p>
</div>

<div className="info-avatar">
  
  <h3>Name:  {dataUser.name}</h3>
  <h4>Username: {dataUser.username}</h4>  <h4>mail:{dataUser.email} </h4>

</div>


    </div> 
  )
}

export default PrivateArea