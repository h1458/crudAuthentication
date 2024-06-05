
import axios from "axios";

export const RegisterApi = async (data) => {
    try{
        const res = await axios.post('https://wtsacademy.dedicateddevelopers.us/api/user/signup', data)
        return res.data
    }catch(error){
        console.log(error,"while posting a register")
    }
}