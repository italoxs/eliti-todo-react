import { motion } from "framer-motion"
import { useState } from "react";
import { FiCheckSquare, FiTrash } from "react-icons/fi";

import './styles.css'
import { useEffect } from "react";

export function TaskList() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('task') ?? '[]'))
  const [newTaskTitle, setNewTaskTitle] = useState('')

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(tasks))
  }, [tasks])

  function handleCreateNewTask() {
    if (!newTaskTitle) return

    const newTask = {
      id: (Math.random(), tasks.length),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete
      }
      return task
    }))
  }

  function handleRemoveTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  return (
    <section className="task-list container">
        <h1>Minhas tarefas</h1>
      <header>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar nova tarefa"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button 
            type="submit" 
            data-id="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#f1f5f9"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <motion.li 
              key={task.id}
              initial= 'initial'
              animate= 'animate'
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className={task.isComplete ? 'completed' : ''} data-id="tasks">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button 
                className="remove"
                type="button"
                data-id="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </motion.li>
          ))}
        </ul>
      </main>
    </section>
  )
}