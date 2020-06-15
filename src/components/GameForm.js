import React, { Component } from 'react';

class GameForm extends Component {
  state = {
    name: '',
    description: '',
  };

  //define handleSubmit  as a class property
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  //Universal event handler
  //To make it universal, we need to identify from which component data came from. So, we can use name method before it.
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Game Title</label>
          <input
            type="text"
            id="name"
            //add name to make universal handler
            name="name"
            placeholder="Full game title"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="description ">Game Description</label>
          <textarea
            type="text"
            id="description "
            //add name to make universal handler
            name="description"
            placeholder="Game Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <button className="ui button" type="submit">
          Create
        </button>
      </form>
    );
  }
}

export default GameForm;
