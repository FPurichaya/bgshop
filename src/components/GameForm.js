import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';

class GameForm extends Component {
  state = {
    name: '',
    description: '',
    price: 0,
    duration: 0,
    players: '',
    featured: false,
    publisher: 0,
    thumbnail: '',
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

  render() {
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="ui grid">
          <div className="twelve wide column">
            {' '}
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
          </div>
          <div className="four wide column">
            <ReactImageFallback
              src={this.state.thumbnail}
              fallbackImage="http://via.placeholder.com/250x250"
              alt="Thumbnail"
              className="ui image"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            type="text"
            id="thumbnail"
            //add name to make universal handler
            name="thumbnail"
            placeholder="Image URL"
            value={this.state.thumbnail}
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
          <label>Publishers</label>
          <select
            name="publisher"
            value={this.state.publisher}
            onChange={this.handleNumberChange}
          >
            <option value="0">Choose publisher</option>
            {this.props.publishers.map((publisher) => (
              <option value={publisher._id} key={publisher._id}>
                {publisher.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ui fluid buttons">
          <button className="ui primary button" type="submit">
            Create
          </button>
          <div className="or"> </div>
          <a className="ui button" onClick={this.props.cancel}>
            Cancel
          </a>
        </div>
      </form>
    );
  }
}

GameForm.propTypes = {
  publishers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  cancel: PropTypes.func.isRequired,
};

GameForm.defaultProps = {
  publishers: [],
};

export default GameForm;
