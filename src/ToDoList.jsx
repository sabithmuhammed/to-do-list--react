import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('to-do-app')) ?? []);
  const [newTask, setNewTast] = useState("");

  function handleInputChange(event) {
    setNewTast(event.target.value);
  }

  function addTask(e) {
    e.preventDefault()
    
    if (newTask.trim()) {
      setTasks((t) => [{ title: newTask, check: false }, ...t]);
      localStorage.setItem('to-do-app', JSON.stringify([...tasks, { title: newTask, check: false }]))
      setNewTast("");
    }
  }
  function removeTask(index) {
    setTasks((t) => t.filter((_, i) => i !== index));
    localStorage.setItem('to-do-app', JSON.stringify(tasks.filter((_, i) => i !== index)))

  }

  function moveUp(index) {
    if (index > 0) {
      const updatedArray = [...tasks];
      [updatedArray[index], updatedArray[index - 1]] = [
        updatedArray[index - 1],
        updatedArray[index],
      ];
      setTasks(updatedArray);
      localStorage.setItem('to-do-app', JSON.stringify(updatedArray))
    }
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const updatedArray = [...tasks];
      [updatedArray[index + 1], updatedArray[index]] = [
        updatedArray[index],
        updatedArray[index + 1],
      ];
      setTasks(updatedArray);
      localStorage.setItem('to-do-app', JSON.stringify(updatedArray))
    }
  }
  function handleCheck(index) {
    const updatedArray = [...tasks];
    updatedArray[index].check = !updatedArray[index].check;
    setTasks(updatedArray);
    localStorage.setItem('to-do-app', JSON.stringify(updatedArray))
  }
  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <form className="input-div" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
      <div className="task-container">
        {tasks.length ? (
          tasks.map((task, index) => (
            <div className="task-div" key={index}>
              <div className="check">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={task.check}
                  onChange={() => handleCheck(index)}
                />
              </div>
              <div className={`task-text ${task.check ? 'completed' : ''}`}>{task.title}</div>
              <div className="task-actions">
                <button className="action" onClick={() => moveUp(index)}>
                  👆
                </button>
                <button className="action" onClick={() => moveDown(index)}>
                  👇
                </button>
                <button
                  className="action delete"
                  onClick={() => removeTask(index)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="task-div">
            {" "}
            <div className="empty">List is empty 😕!</div>
          </div>
        )}
      </div>
    </div>
  );
}
export default ToDoList;
