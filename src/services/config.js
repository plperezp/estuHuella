import axios from "axios";

const services = axios.create({

  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
 
})

services.interceptors.request.use((config) => {

const storedToken = localStorage.getItem("authToken")

if(storedToken){
  config.headers.authorization = `Bearer ${storedToken}`
}

return config
})

export default  services