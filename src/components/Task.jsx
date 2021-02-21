import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import TaskForm from "./TaskForm";
import axios from "axios";

const Task = ({ tasks, completeTask, removeTask, updateTask }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }

  return tasks.map((task, index) => (
    <div
      className={task.isComplete ? "task-row complete" : "task-row"}
      key={index}
    >
      <div key={task.id} onClick={() => completeTask(task.id)}>
        Title:{task.title}
        <br></br> Description:{task.description}
      </div>

      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTask(task.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: task.id, value: task.title })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Task;