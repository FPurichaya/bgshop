import React, { Component } from 'react';

class GameForm extends Component {
  state = {
    name: '',
    description: '',
    price: 0,
    duration: 0,
    players: '',
  };

  //define handleSubmit  as a class property
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  //Universal event handler
  //To make it universal, we need to identify from which component data came from. So, we can use name method before it.
  handleStringChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });
  handleNumberChange = (e) =>
    this.setState({ [e.target.name]: parseInt(e.target.value, 10) });

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
            onChange={this.handleStringChange}
          />
        </div>

        <div className="field">
          <label htmlFor="description">Game Description</label>
          <textarea
            type="text"
            id="description "
            //add name to make universal handler
            name="description"
            placeholder="Game Description"
            value={this.state.description}
            onChange={this.handleStringChange}
          />
        </div>

        <div className="three fields">
          <div className="field">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              //add name to make universal handler
              name="price"
              value={this.state.price}
              onChange={this.handleNumberChange}
            />
          </div>

          <div className="field">
            <label htmlFor="duration">duration (in minutes)</label>
            <input
              type="number"
              id="duration"
              //add name to make universal handler
              name="duration"
              value={this.state.duration}
              onChange={this.handleNumberChange}
            />
          </div>

          <div className="field">
            <label htmlFor="players">Players</label>
            <input
              type="text"
              id="players"
              //add name to make universal handler
              name="players"
              value={this.state.players}
              onChange={this.handleStringChange}
            />
          </div>
        </div>

        <button className="ui button" type="submit">
          Create
        </button>
      </form>
    );
  }
}

export default GameForm;
