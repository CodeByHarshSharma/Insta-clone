import { createContext, useState, useEffect } from "react";
import { getMe } from './services/auth.api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadUser(){
            try {
                const response = await getMe()
                setUser(response.user)
            } catch (error) {
                setUser(null)
            }

            setLoading(false)
        }

        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, loading, setUser, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}