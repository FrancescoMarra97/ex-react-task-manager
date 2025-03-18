import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {


    return (
        <>
            <header className="bg-dark text-white py-3">
                <nav>
                    <ul className="d-flex justify-content-center list-unstyled mb-0">
                        <li className="nav-item mx-3">
                            <NavLink to="/" className="nav-link text-white text-decoration-none">
                                Lista Task
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink to="/add-task" className="nav-link text-white text-decoration-none">
                                Aggiungi Task
                            </NavLink>
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