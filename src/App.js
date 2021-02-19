import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask"

function App() {
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState([]);

  // get tasks from json server
  useEffect(() => {
    const getTasks = async () => {
      // console.log(fetchTasks())
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    // console.log(data)
    return data
  }

  const toggServerTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data 
  }

  // Add task
  const addTask = async (task) => {
    // const id = Date.now().toString()
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    // console.log('delete', id)
    setTasks(tasks.filter((item) => item.id !== id))
  }

  // toggle form
  const toggleForm = () => {
    setShowForm(!showForm)
    // console.log(showForm)
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    // console.log(id)
    const taskToToggle = await toggServerTask(id)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()



    setTasks(tasks.map((item) => item.id === id ? {...item, reminder: !item.reminder} : item
    ))
    // console.log(tasks)
  }

  return (
    <div className="container">
      <Header title="task" toggle={toggleForm} shown={showForm}/>
      {showForm && <AddTask addTask={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks to show'}
    </div>
  );
}

export default App;
