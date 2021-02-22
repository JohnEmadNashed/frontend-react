import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import SearchBox from "./../common/searchBox";
import {
  getTasks,
  deleteTask,
  saveTask,
  editTask,
  search,
} from "../services/taskService";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
    async function noName() {
      setTasks(await getTasks());
    }
    noName();
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
    setTasks(newTasks); //state
    saveTask(task);
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
    editTask(newValue);
  };

  const removeTask = (id) => {
    const removedArr = [...tasks].filter((task) => task.id !== id);

    setTasks(removedArr);
    deleteTask(id);
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
  const handleSearch = (query) => {
    if (!query || /^\s*$/.test(query)) {
      return;
    } else {
      setSearchTerm(query);

      async function setSearchResults() {
        setTasks(await search(query));
      }
      setSearchResults();
    }
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <SearchBox onChange={handleSearch} />
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
