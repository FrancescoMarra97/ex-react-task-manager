import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

export default function TaskDetail() {
    const { id } = useParams()
    const { tasks, removeTask } = useContext(GlobalContext)
    const navigate = useNavigate();


    const task = tasks.find(task => task.id.toString() === id) //task con id corrispondente

    if (!task) {
        return (
            <div className="container mt-5">
                <h2>Errore</h2>
                <p>Il task non esiste o è stato eliminato.</p>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
                    Torna alla Home
                </button>
            </div>
        );
    }

    const handleDelete = () => {
        console.log("Elimino task")
        navigate("/")

    }

    return (
        <div className="container mt-5">
            <h2>Dettaglio Task</h2>
            <div className="task-details p-4 border rounded shadow bg-light">
                <h3>{task.title}</h3>
                <p><strong>Descrizione:</strong> {task.description}</p>
                <p><strong>Stato:</strong> {task.status}</p>
                <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                <button className="btn btn-danger mt-3" onClick={handleDelete}>Elimina Task</button>
            </div>
        </div>
    )
}