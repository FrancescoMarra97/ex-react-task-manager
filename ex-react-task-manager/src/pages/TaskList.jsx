import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import GlobalContext from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

export default function TaskList() {
    const { tasks } = useContext(GlobalContext)
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    const [searchQuery, setSearchQuery] = useState("")
    const searchInputRef = useRef(null)
    useEffect(() => {
        console.log(tasks)
    }, [tasks]);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder * -1)  // Inverte l'ordine se è la stessa colonna
        } else {
            setSortBy(column)
            setSortOrder(1)
        }
    }

    function debounce(callback, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback(value)
            }, delay)
        }
    }

    const handleSearch = useCallback(
        debounce((value) => {
            setSearchQuery(value)
        }, 500),
        []
    )
    const sortedTasks = useMemo(() => {

        const filteredTasks = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        const statusOrder = { "To do": 0, "Doing": 1, "Done": 2 };
        return filteredTasks.sort((a, b) => {
            let valueA = a[sortBy]
            let valueB = b[sortBy]
            if (sortBy === "title") {
                return valueA.localeCompare(valueB) * sortOrder;
            }
            if (sortBy === "status") {
                return (statusOrder[valueA] - statusOrder[valueB]) * sortOrder;
            }
            if (sortBy === "createdAt") {
                return (new Date(valueA).getTime() - new Date(valueB).getTime()) * sortOrder;
            }
            return 0
        })
    }, [tasks, sortBy, sortOrder, searchQuery])
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista di task</h1>
            <input type="text"
                className="form-control mb-3"
                ref={searchInputRef}
                onChange={(e) => handleSearch(e.target.value)} />
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th onClick={() => handleSort("title")}>Nome {sortBy === "title" ? (sortOrder === 1 ? "⬆️" : "⬇️") : ""}</th>
                        <th onClick={() => handleSort("status")}>Stato {sortBy === "status" ? (sortOrder === 1 ? "⬆️" : "⬇️") : ""}</th>
                        <th onClick={() => handleSort("createdAt")}>Data di Creazione {sortBy === "createdAt" ? (sortOrder === 1 ? "⬆️" : "⬇️") : ""}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.length > 0 ? sortedTasks.map((task) => (
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