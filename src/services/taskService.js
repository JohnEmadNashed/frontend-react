/*This file is responsible of sending CRUD requests to our testApi */

import axios from "axios";
const apiEndpoint = "http://localhost:9000/api/tasks";
const apiSearch = "http://localhost:9000/api/tasks/search";

// get task url  ex=> http://localhost:9000/api/tasks/1
function taskUrl(id) {
  return `${apiEndpoint}/${id}`;
}

//get all tasks from backend
export async function getTasks() {
  const result = await axios.get(apiEndpoint);
  return result.data;
}

//send new tasks created at the frontend
export async function saveTask(task) {
  return await axios.post(apiEndpoint, task);
}

//edit tasks at backend
export async function editTask(task) {
  return await axios.put(apiEndpoint, task);
}

//delete tasks from backend
export async function deleteTask(taskId) {
  return await axios.delete(taskUrl(taskId));
}

//search functionality
export async function search(searchTerm) {
  const result = await axios.get(`${apiSearch}/${searchTerm}`);
  return result.data;
}
