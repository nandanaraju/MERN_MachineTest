import React from 'react'
import {createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route} 

from "react-router-dom";
import TaskForm from './pages/TaskForm';
import TaskList from './pages/TaskList';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<TaskForm />} />
      <Route path="/task" element={<TaskList />} />

      </>
    ))
  return (
    <div>
            <RouterProvider router={router} />

    </div>
  )
}

export default App