/* This file contains the main layout for the form
 * add new task with 2 inputs title and description
 * edit a task with 2 inputs title and description
 */
import React, { useState, useRef } from "react";

function TaskForm(props) {
  /* 2 hooks are used
   * one for input (title)
   * the other is used for description (description)
   */
  const [input, setInput] = useState(props.edit ? props.edit.title : "");
  const [description, setDescription] = useState(
    props.edit ? props.edit.description : ""
  );

  const inputRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // randomly add new ids for the new tasks on submit
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      title: input,
      description: description,
    });
    setInput("");
    setDescription("");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: props.edit.id,
      title: input,
      description: description,
    });
    setInput("");
    setDescription("");
  };

  return (
    //Return edit task tags
    <form onSubmit={handleEdit} className="task-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your task title"
            value={input}
            onChange={handleChange}
            name="title"
            ref={inputRef}
            className="task-input edit"
          />
          <input
            placeholder="Update your task description"
            value={description}
            onChange={handleChangeDescription}
            name="description"
            ref={descriptionRef}
            className="task-input edit"
          />
          <br></br>

          <button onClick={handleEdit} className="task-button edit">
            Update
          </button>
        </>
      ) : (
        //return add task tags
        <>
          <input
            placeholder="Add a task title"
            value={input}
            onChange={handleChange}
            className="task-input"
            ref={inputRef}
          />
          <input
            placeholder="Add a task description"
            value={description}
            onChange={handleChangeDescription}
            className="task-input"
            ref={descriptionRef}
          />
          <br></br>
          <button onClick={handleSubmit} className="task-button">
            Add task
          </button>
        </>
      )}
    </form>
  );
}

export default TaskForm;
