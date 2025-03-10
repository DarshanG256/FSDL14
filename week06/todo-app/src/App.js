import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span>{task}</span>
            <button onClick={() => deleteTask(index)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
