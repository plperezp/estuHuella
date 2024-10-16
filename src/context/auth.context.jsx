import { createContext, useEffect, useState } from "react";
import services from "../services/config";

const AuthContext = createContext()

function AuthWrapper(props){
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState (null)
  const [isValidatingToken, setIsValidatingToken] = useState(true)

  useEffect(() =>{
    authenticateUser()
  }, [])

  const authenticateUser = async () =>{

    try {
      const response = await services.get("/auth/verify")

      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setIsValidatingToken(false)

    } catch (error) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsValidatingToken(false)
      
    }
  }

    const passedContext = {
      isLoggedIn,
      loggedUserId,
      authenticateUser
    }
    if(isValidatingToken){
      return <h3>...Validando credenciales</h3>

      //meter spinner
    }
    return(
      <AuthContext.Provider value = {passedContext}>
        {props.children}
      </AuthContext.Provider>
    )

}

export{
  AuthContext,
  AuthWrapper
}

