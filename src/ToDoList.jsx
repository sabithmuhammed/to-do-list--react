import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTast] = useState("");

  function handleInputChange(event) {
    setNewTast(event.target.value);
  }

  function addTask() {
    setTasks(t=>[...t,{title:newTask,check:false}])
    setNewTast("")
  }
  function removeTask(index) {
    setTasks(t=>t.filter((_,i)=>i!==index))
  }

  function moveUp(index) {
    if(index>0){
        const updatedArray = [...tasks];
        [updatedArray[index],updatedArray[index-1]]=[updatedArray[index-1],updatedArray[index]];
        setTasks(updatedArray)
    }
  }

  function moveDown(index) {
    if(index < tasks.length-1){
        const updatedArray = [...tasks];
        [updatedArray[index+1],updatedArray[index]]=[updatedArray[index],updatedArray[index+1]];
        setTasks(updatedArray)
    }
  }
  function handleCheck (index){
    const updatedArray = [...tasks]
    updatedArray[index].check = !updatedArray[index].check;
    setTasks(updatedArray)
  }
  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div className="input-div">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="task-container">
        {tasks.length ? tasks.map((task, index) => (
          <div className="task-div" key={index}>
            <div className="check">
                <input type="checkbox" name="" id="" checked={task.check} onChange={()=>handleCheck(index)}/>
            </div>
            <div className="task-text">
                {task.title}
            </div>
            <div className="task-actions">
              <button className="action" onClick={()=>moveUp(index)}>👆</button>
              <button className="action" onClick={()=>moveDown(index)}>👇</button>
              <button className="action delete" onClick={()=>removeTask(index)}>🗑️</button>
            </div>
          </div>
        )):<div className="task-div"> <div className="empty">List is empty 😕!</div></div>}
      </div>
    </div>
  );
}
export default ToDoList;
