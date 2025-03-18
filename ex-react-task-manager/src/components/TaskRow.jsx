import React from "react";

const TaskRow = React.memo(({ task }) => {
    function getStatusClass(status) {
        if (status === "To do") {
            return "bg-danger text-white";
        } else if (status === "Doing") {
            return "bg-warning";
        } else if (status === "Done") {
            return "bg-success text-white";
        } else {
            return "";
        }
    }

    return (
        <tr key={task.id}>
            <td>{task.title}</td>
            <td className={getStatusClass(task.status)}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleString("it-IT")}</td>
        </tr>
    )
})

export default TaskRow;