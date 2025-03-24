import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";


export default function EditTaskModal({ show, onClose, task, onSave }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('To do')
    const formRef = useRef(null)

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task])


    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = { id: task.id, title, description, status };
        onSave(updatedTask);
        onClose();
    }
    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Modifica Task"
            content={
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome Task</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descrizione</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Stato</label>
                        <select
                            id="status"
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </form>
            }
            confirmText="Salva"
            onConfirm={() => formRef.current.requestSubmit()}

        />
    )
}