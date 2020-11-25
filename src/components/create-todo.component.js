/* eslint-disable no-this-before-super */
/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import axios from "axios";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.OnchangeTodoDescription = this.OnchangeTodoDescription.bind(this);
    this.OnchangeTodoResponsable = this.OnchangeTodoResponsable.bind(this);
    this.OnchangeTodoPriorite = this.OnchangeTodoPriorite.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      todo_description: "",
      todo_responsable: "",
      todo_priorite: "",
      todo_completed: false,
    };
  }
  OnchangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value,
    });
  }
  OnchangeTodoResponsable(e) {
    this.setState({
      todo_responsable: e.target.value,
    });
  }
  OnchangeTodoPriorite(e) {
    this.setState({
      todo_priorite: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(` Formulaire soumise`);
    console.log(`Description: ${this.state.todo_description}`);
    console.log(`Responsable: ${this.state.todo_responsable}`);
    console.log(`Priorite: ${this.state.todo_priorite}`);
    console.log(`Completed: ${this.state.todo_completed}`);

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsable: this.state.todo_responsable,
      todo_priorite: this.state.todo_priorite,
      todo_completed: this.state.todo_completed,
    };

    axios
      .post("http://localhost:4000/todos/add", newTodo)
      .then((res) => console.log(res.data));

    this.setState = {
      todo_description: "",
      todo_responsable: "",
      todo_priorite: "",
      todo_completed: false,
    };
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Créer une nouvelle tâche</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={this.state.todo_description}
              onChange={this.OnchangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Responsable"
              value={this.state.todo_responsable}
              onChange={this.OnchangeTodoResponsable}
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
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Enregistrer"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
