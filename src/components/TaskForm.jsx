import React, { useState, useEffect, useRef } from "react";

function TaskForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [description, setDescription] = useState(
    props.edit ? props.edit.value : ""
  );

  const inputRef = useRef(null);
  const descriptionRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      title: input,
      description: description,
    });
    setInput("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
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
          <button onClick={handleSubmit} className="task-button edit">
            Update
          </button>
        </>
      ) : (
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
          <button onClick={handleSubmit} className="task-button">
            Add task
          </button>
        </>
      )}
    </form>
  );
}

export default TaskForm;
