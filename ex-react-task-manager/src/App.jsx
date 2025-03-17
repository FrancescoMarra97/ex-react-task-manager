
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AppLayout from './Layout/AppLayout'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<TaskList />} />
            <Route path='/add-task' element={<AddTask />} />

          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
