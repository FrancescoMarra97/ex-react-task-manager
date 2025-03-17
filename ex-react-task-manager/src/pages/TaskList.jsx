import { useContext } from "react"
import GlobalContext from "../context/GlobalContext"

export default function TaskList() {
    const { tasks } = useContext(GlobalContext)

    return (
        <>
            <div>
                <h1 className="p-2">Lista di task</h1>
                <ul>
                    {tasks ? tasks.map((task) => {
                        return (
                            <li className="p-2" key={task.id}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <small>Stato: {task.status}</small>
                            </li>
                        )
                    }) : "Errore nel recupero dei task"}
                </ul>
            </div>
        </>
    )
}