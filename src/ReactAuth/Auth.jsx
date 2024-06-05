import { createContext, useContext, useEffect, useState } from "react";


const AuthProvider = createContext()

const AuthHook = ({children}) => {
    const [Auth, setAuth] = useState({
        user: null,
        token: ''
    })

    useEffect(() => {
        const data = localStorage.getItem('auth')

        if(data){
            const parseData = JSON.parse(data)

            setAuth({
                ...Auth,
                user:parseData.user,
                token:parseData.token
            })
        }
    },[])

    return(
        <AuthProvider.Provider value={[Auth, setAuth]}>
            {children}
        </AuthProvider.Provider>
    )
}

const useAuth = () => useContext(AuthProvider)

export {useAuth, AuthHook}