/* This is the task section
 * including the task itselt aligned to the left
 * and 2 buttons (edit and delete)
 */
import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import TaskForm from "./TaskForm";

// one hook is used for the edit task
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

  /* this returns the task mapped into a div containing title and description
   * after this the icons div containing 2 icons edit and delete
   * each icon onclicked is prompted with its functionality
   */
  return tasks.map((task, index) => (
    <div
      className={task.isComplete ? "task-row complete" : "task-row"}
      key={index}
    >
      <div
        key={task.id}
        onClick={() => completeTask(task.id)}
        className="task-content"
      >
        <p>Title: {task.title}</p>
        <br></br>
        <p>Description: {task.description}</p>
      </div>

      <div className="icons">
        <br></br>
        <RiCloseCircleLine
          onClick={() => removeTask(task.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() =>
            setEdit({
              id: task.id,
              title: task.title,
              description: task.description,
            })
          }
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Task;
