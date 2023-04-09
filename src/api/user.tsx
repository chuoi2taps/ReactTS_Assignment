import { ILogin, IRegister } from '../types/auth'
import instance from './instance'

const onRegister = (data:IRegister) =>{
    return instance.post("/auth/signup/",data)
}
const onLogin = (data:ILogin) =>{
    return instance.post("/auth/signin", data)
}
const handleAccessToken = () => {
    return instance.post('/tokens')
}
export {onRegister,onLogin, handleAccessToken}