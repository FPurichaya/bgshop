import React, { Component } from 'react';

const tags = [
  { _id: 1, name: 'dice' },
  { _id: 2, name: 'economic' },
  { _id: 3, name: 'family' },
];

class GameForm extends Component {
  state = {
    name: '',
    description: '',
    price: 0,
    duration: 0,
    players: '',
    featured: false,
    tags: [],
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
  handleCheckboxChange = (e) =>
    this.setState({ [e.target.name]: e.target.checked });
  toggleTag = (tag) =>
    this.state.tags.includes(tag._id)
      ? this.setState({ tags: this.state.tags.filter((id) => id !== tag._id) })
      : this.setState({ tags: [...this.state.tags, tag._id] });

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

        <div className="inline field">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={this.state.featured}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="featured">Featured?</label>
        </div>

        <div className="field">
          <label>Tags</label>
          {tags.map((tag) => (
            <div key={tag._id} className="inline field">
              <input
                id={`tag-${tag._id}`}
                type="checkbox"
                checked={this.state.tags.includes(tag._id)}
                onChange={() => this.toggleTag(tag)}
              />
              <label htmlFor={`tag-${tag._id}`}>{tag.name}</label>
            </div>
          ))}
        </div>

        <button className="ui button" type="submit">
          Create
        </button>
      </form>
    );
  }
}

export default GameForm;
