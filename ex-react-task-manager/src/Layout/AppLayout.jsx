import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {


    return (
        <>
            <header className="d-flex justify-item-center">
                <nav>
                    <ul className="d-flex list-unstyled">
                        <li className="nav-item  p-1">
                            <NavLink to="/">Lista Task</NavLink >
                        </li>
                        <li className="nav-item p-1">
                            <NavLink to="/add-task" >Aggiungi Task</NavLink >
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="py-4 bg-light min-vh-100 m-0">
                <Outlet />
            </main>

            <footer>
                <p>© 2024 Task Manager</p>
            </footer>
        </>
    )
}