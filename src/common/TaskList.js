import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import SearchBox from "./searchBox";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], searchQuery: "" };
  }
  callApi() {
    fetch("http://localhost:9000/api/tasks")
      .then((res) => res.json())
      .then((data) => this.setState({ tasks: data }));
  }

  componentWillMount() {
    this.callApi();
  }
  changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { tasks } = this.state;
    let task = {
      id: this.state.tasks.length + 1,
      title: this.state.title,
      description: this.state.description,
    };
    let newTasks = [...tasks, task];
    this.setState({ tasks: newTasks });
    delete this.state.title;
    delete this.state.description;
  };

  removeTask = (id) => {
    const { tasks } = this.state;
    let removedArr = [...tasks].filter((task) => task.id !== id);

    this.setState({ tasks: removedArr });
  };

  render() {
    const { tasks: allTasks, searchQuery } = this.state;
    let filteredTasks = allTasks;
    if (searchQuery)
      filteredTasks = allTasks.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    return (
      <form>
        <h1>Enter Your Tasks for Today ...</h1>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <input
          placeholder="Add a task title"
          className="task-input"
          name="title"
          type="text"
          onChange={this.changeHandler}
          ref={(el) => (filteredTasks.title = el)}
        />
        <input
          placeholder="Add a task description"
          className="task-input"
          name="description"
          type="text"
          onChange={this.changeHandler}
        />
        <br></br>
        <button onClick={this.handleSubmit} className="task-button">
          Add task
        </button>

        <div>
          {filteredTasks &&
            filteredTasks.map((task) => (
              <div className="task-row" key={task.id}>
                <div className="task-title">Title:{task.title}</div>
                <div className="task-description">
                  Description:{task.description}
                  <div className="icons">
                    <HighlightOffIcon
                      onClick={() => this.removeTask(task.id)}
                      className="delete-icon"
                    />
                    <EditIcon className="edit-icon" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </form>
    );
  }
}

export default TaskList;
