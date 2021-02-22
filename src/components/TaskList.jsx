/* This file contains the main layout for the application
 * with add, remove, edit tasks tot the frontend
 * and redirecting to functions that deal with the backend
 * for more info about backend connection refer to taskService.js
 */

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

/* 2 hooks are used
 * one for the search term sent to the backend
 * the other is for the tasks
 */
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  //get tasks from the backend and set it to tasks in this file
  useEffect(() => {
    async function noName() {
      setTasks(await getTasks());
    }
    noName();
  }, []);

  // add new tasks in the tasks (frontend and backend)
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
    //add the new task to the state hook
    setTasks(newTasks);
    //save the new task to the backend (refer to taskService.js)
    saveTask(task);
  };

  //update task with edits (frontend and backend)
  const updateTask = (taskId, newValue) => {
    // this condition omits the spaces from the task input
    if (
      !newValue.title ||
      /^\s*$/.test(newValue.title) ||
      !newValue.description ||
      /^\s*$/.test(newValue.description)
    ) {
      return;
    }

    // add the edited task to the state hook
    setTasks((prev) =>
      prev.map((item) => (item.id === taskId ? newValue : item))
    );
    //save the edited task to the backend (refer to taskService.js)
    editTask(newValue);
  };

  //remove task with certain id
  const removeTask = (id) => {
    const removedArr = [...tasks].filter((task) => task.id !== id);

    //remove task with certain id from the state hook
    setTasks(removedArr);
    //remove task with certain id from the backend (refer to taskService.js)
    deleteTask(id);
  };

  //remove task with certain id in the frontend only
  const completeTask = (id) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  //search for a task (frontend and backend)
  const handleSearch = (query) => {
    if (!query || /^\s*$/.test(query)) {
      return;
    } else {
      //search task with certain query from the state hook
      setSearchTerm(query);
      //search task with certain query from the backend (refer to taskService.js)
      async function setSearchResults() {
        setTasks(await search(query));
      }
      setSearchResults();
    }
  };

  /* Main return to the app containing
   * a header
   * a searchBox (refer to ./../common/searchBox)
   * a TaskForm to add a new task or edit one
   * and finally mapped tasks
   */
  return (
    <>
      <h1>Add New Tasks ...</h1>
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
