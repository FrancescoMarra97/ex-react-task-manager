import { useEffect, useState } from "react"



export default function useTasks() {
    const [tasks, setTasks] = useState([])


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

    const addTask = async (newTask) => {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask)
            })
            const data = await res.json();
            console.log("Risposta API:", data);
            if (data.success) {
                setTasks((prevTasks) => [...prevTasks, data.task]);
            } else {
                throw new Error("Errore")
            }
        } catch (error) {
            console.error("Errore durante la creazione del task", error);
        }
    }


    const removeTask = async (taskId) => {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + `/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json()

            if (data.success) {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
                alert("Task eliminata con Successo")
            } else {
                throw new Error("Errore nell'eliminiazione della task");
            }
        } catch (error) {
            console.error("Errore", error)
            alert("Si è verificato un errore durante l'eliminazione del task: " + error.message)
        }
    }

    const updateTask = async (updatedTask) => {
        try {
            const res = await fetch(import.meta.env.VITE_API_URL + `/tasks/${updatedTask.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            })
            const data = await res.json()

            if (data.success) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === updatedTask.id ? data.task : task
                    )
                );
                console.log("Task aggiornato con successo");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Errore nell'aggiornamento del task", error);
        }
    }



    return {
        tasks,
        addTask,
        removeTask,
        updateTask
    }
}