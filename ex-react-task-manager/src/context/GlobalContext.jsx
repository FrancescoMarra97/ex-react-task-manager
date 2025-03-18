import { createContext } from "react";
import useTasks from "../hooks/useTasks";

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const { tasks, addTask, removeTask, updateTask } = useTasks()

    console.log(tasks);



    return (
        <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;