import { useContext } from "react"
import GlobalContext from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

export default function TaskList() {
    const { tasks } = useContext(GlobalContext)

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista di task</h1>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks ? tasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    )) : (
                        <tr>
                            <td colSpan="3" className="text-center text-danger">
                                Errore nel recupero dei task
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}