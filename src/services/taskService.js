import axios from "axios";
const apiEndpoint = "http://localhost:9000/api/tasks";
const apiSearch = "http://localhost:9000/api/tasks/search";

function taskUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getTasks() {
  const result = await axios.get(apiEndpoint);
  return result.data;
}
export async function saveTask(task) {
  return await axios.post(apiEndpoint, task);
}

export async function editTask(task) {
  return await axios.put(apiEndpoint, task);
}

export async function deleteTask(taskId) {
  return await axios.delete(taskUrl(taskId));
}

export async function search(searchTerm) {
  const result = await axios.get(`${apiSearch}/${searchTerm}`);
  return result.data;
}
