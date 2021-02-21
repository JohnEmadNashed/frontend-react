import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const result = await axios("http://localhost:9000/api/tasks");
      console.log(result.data);
      setTasks(result.data);
    }
    getUsers();
  }, []);

  const addTask = (task) => {
    if (
      !task.title ||
      /^\s*$/.test(task.title) ||
      !task.description ||
      /^\s*$/.test(task.description)
    ) {
      return;
    }
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    console.log("newTasks", newTasks);
  };

  const updateTask = (taskId, newValue) => {
    if (
      !newValue.title ||
      /^\s*$/.test(newValue.title) ||
      !newValue.description ||
      /^\s*$/.test(newValue.description)
    ) {
      return;
    }

    setTasks((prev) =>
      prev.map((item) => (item.id === taskId ? newValue : item))
    );
  };

  const removeTask = (id) => {
    const removedArr = [...tasks].filter((task) => task.id !== id);

    setTasks(removedArr);
  };

  const completeTask = (id) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TaskForm onSubmit={addTask} />
      <Task
        tasks={tasks}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </>
  );
}

export default TaskList;
