/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import axios from "axios";
export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsable = this.onChangeTodoResponsable.bind(this);
    this.onChangeTodoPriorite = this.onChangeTodoPriorite.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      todo_description: "",
      todo_responsable: "",
      todo_priorite: "",
      todo_completed: false,
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsable: response.data.todo_responsable,
          todo_priorite: response.data.todo_priorite,
          todo_completed: response.data.todo_completed,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value,
    });
  }

  onChangeTodoResponsable(e) {
    this.setState({
      todo_responsable: e.target.value,
    });
  }
  onChangeTodoPriorite(e) {
    this.setState({
      todo_priorite: e.target.value,
    });
  }
  onChangeTodoCompleted(e) {
    this.setState({
      todo_completed: !this.state.todo_completed,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      todo_description: this.state.todo_description,
      todo_responsable: this.state.todo_responsable,
      todo_priorite: this.state.todo_priorite,
      todo_completed: this.state.todo_completed,
    };
    axios
      .post(
        "http://localhost:4000/todos/update" + this.props.match.params.id,
        obj
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h3>Modification</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
              placeholder="Description"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.todo_responsable}
              onChange={this.onChangeTodoResponsable}
              placeholder="Responsable"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.todo_priorite}
              onChange={this.onChangeTodoPriorite}
              placeholder="Priorité"
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priorite === "Low"}
                onChange={this.OnchangeTodoPriorite}
              />
              <label className="form-check-label">Bas</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priorite === "Medium"}
                onChange={this.OnchangeTodoPriorite}
              />
              <label className="form-check-label">Moyen</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priorite === "High"}
                onChange={this.OnchangeTodoPriorite}
              />
              <label className="form-check-label">Urgent</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="completedCheckbox"
                name="completedCheckbox"
                onChange={this.onChangeTodoCompleted}
                checked={this.state.todo_completed}
                value={this.state.todo_completed}
              />
              <label className="form-check-label" htmlFor="completedCheckbox">
                Effectué
              </label>
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Modifier"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
