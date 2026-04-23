import { useState } from 'react'
import './App.css'

function TaskItem({ task, index, onRemove }) {
  return (
    <li className="task-item" data-index={String(index).padStart(2, '0')}>
      <span className="task-text">{task.text}</span>
      <button
        className="remove-btn"
        onClick={() => onRemove(task.id)}
        aria-label="Remover tarefa"
      >
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </li>
  )
}

export default function App() {
  const [tasks, setTasks] = useState([
    { id: Date.now(), text: 'Aprender Hooks' },
  ])

  const [inputValue, setInputValue] = useState('')

  function handleAddTask() {
    const text = inputValue.trim()
    if (!text) return
    setTasks([...tasks, { id: Date.now(), text }])
    setInputValue('')
  }

  function handleRemoveTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleAddTask()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">lista de tarefas</h1>
        <span className="app-count">
          {tasks.length > 0 ? `${tasks.length} ${tasks.length === 1 ? 'item' : 'itens'}` : ''}
        </span>
      </header>

      <form className="input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          className="task-input"
          placeholder="nova tarefa..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          maxLength={120}
          aria-label="Nova tarefa"
        />
        <button type="submit" className="add-btn">+ adicionar</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-state">nenhuma tarefa ainda...</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task, i) => (
            <TaskItem
              key={task.id}
              task={task}
              index={i + 1}
              onRemove={handleRemoveTask}
            />
          ))}
        </ul>
      )}
    </div>
  )
}