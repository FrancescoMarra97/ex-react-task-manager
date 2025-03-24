import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {
    const { id } = useParams()
    const { tasks, removeTask } = useContext(GlobalContext)
    const navigate = useNavigate();


    const task = tasks.find(task => task.id.toString() === id) //task con id corrispondente

    const [showModal, setShowModal] = useState(false)

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

    const handleDelete = async () => {
        try {
            await removeTask(task.id)
            console.log("Elimino task")
            setShowModal(false)
            navigate("/")
        } catch (error) {
            console.error("Errore nell'eliminazione della task", error);
        }

    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    const handleModalConfirm = () => {
        handleDelete();
    }
    return (
        <div className="container mt-5">
            <h2>Dettaglio Task</h2>
            <div className="task-details p-4 border rounded shadow bg-light">
                <h3>{task.title}</h3>
                <p><strong>Descrizione:</strong> {task.description}</p>
                <p><strong>Stato:</strong> {task.status}</p>
                <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                <button className="btn btn-danger mt-3" onClick={() => setShowModal(true)}>Elimina Task</button>
            </div>
            <Modal
                title="Conferma eliminazione"
                content={`Sei sicuro di voler eliminare il task: "${task.title}"?`}
                show={showModal}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
            />
        </div>
    )
}