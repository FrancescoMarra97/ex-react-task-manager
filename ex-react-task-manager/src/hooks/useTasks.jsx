import { useEffect, useState } from "react"


export default function useTasks() {
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

    const addTask = () => {

    }

    const removeTask = () => { }

    const updateTask = () => { }

    return {
        tasks,
        addTask,
        removeTask,
        updateTask
    }
}