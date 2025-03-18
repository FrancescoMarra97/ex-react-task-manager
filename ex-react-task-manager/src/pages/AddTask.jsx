import { useRef, useState, useMemo } from "react"
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {

    const [title, setTitle] = useState("")
    let descriptionRef = useRef(null)
    let statusRef = useRef(null)

    const isTitleValid = useMemo(() => {
        const charsValid = !title.split("").some((char) =>
            symbols.includes(char)
        )
        return charsValid && title.length > 0

    }, [title])

    const handleSubmit = (e) => {
        e.preventDefault()
        let description = descriptionRef.current.value
        let status = statusRef.current.value
        if (isTitleValid) {
            console.log("task aggiunto",
                {
                    title,
                    description,
                    status
                }

            )
            setTitle("")
            descriptionRef.current.value = ""
            statusRef.current.value = "To do"
        } else {
            alert("Errore: Compilare il form correttamemnte")
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">Aggiungi Task</h1>
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
                        <div className="mb-3">
                            <label className="form-label">Nome del task</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descrizione</label>
                            <textarea className="form-control" ref={descriptionRef}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select className="form-select" ref={statusRef}>
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mt-3">Aggiungi Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
}