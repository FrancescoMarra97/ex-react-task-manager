import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    console.log(tasks);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + "/tasks")
                const data = await response.json()
                setTasks(data)
            } catch (error) {
                console.error("Errore nel recupero dei dati", error)
            }
        }
        fetchTasks()
    }, [])

    return (
        <GlobalContext.Provider value={{ tasks }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;