import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';
import FormInlineMessage from './FormInlineMessage';

class GameForm extends Component {
  state = {
    data: {
      name: '',
      description: '',
      price: 0,
      duration: 0,
      players: '',
      featured: false,
      publisher: 0,
      thumbnail: '',
    },

    errors: {
      name: "This field can't be blank",
    },
  };

  //define handleSubmit  as a class property
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.data);
  };

  //Universal event handler
  //To make it universal, we need to identify from which component data came from. So, we can use name method before it.
  handleStringChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  handleNumberChange = (e) =>
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: parseInt(e.target.value, 10),
      },
    });
  handleCheckboxChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.checked },
    });

  render() {
    const { data, errors } = this.state;

    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="ui grid">
          <div className="twelve wide column">
            {' '}
            <div className={errors.name ? 'field error' : 'field'}>
              <label htmlFor="name">Game Title</label>
              <input
                type="text"
                id="name"
                //add name to make universal handler
                name="name"
                placeholder="Full game title"
                value={data.name}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.name} type="error " />
            </div>
            <div className={errors.description ? 'field error' : 'field'}>
              <label htmlFor="description">Game Description</label>
              <textarea
                type="text"
                id="description "
                //add name to make universal handler
                name="description"
                placeholder="Game Description"
                value={data.description}
                onChange={this.handleStringChange}
              />
              <FormInlineMessage content={errors.description} type="error " />
            </div>
          </div>
          <div className="four wide column">
            <ReactImageFallback
              src={data.thumbnail}
              fallbackImage="http://via.placeholder.com/250x250"
              alt="Thumbnail"
              className="ui image"
            />
          </div>
        </div>

        <div className={errors.thumbnail ? 'field error' : 'field'}>
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            type="text"
            id="thumbnail"
            //add name to make universal handler
            name="thumbnail"
            placeholder="Image URL"
            value={data.thumbnail}
            onChange={this.handleStringChange}
          />
          <FormInlineMessage content={errors.thumbnail} type="error " />
        </div>

        <div className="three fields">
          <div className={errors.price ? 'field error' : 'field'}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              //add name to make universal handler
              name="price"
              value={data.price}
              onChange={this.handleNumberChange}
            />
            <FormInlineMessage content={errors.price} type="error " />
          </div>

          <div className={errors.duration ? 'field error' : 'field'}>
            <label htmlFor="duration">duration (in minutes)</label>
            <input
              type="number"
              id="duration"
              //add name to make universal handler
              name="duration"
              value={data.duration}
              onChange={this.handleNumberChange}
            />
            <FormInlineMessage content={errors.duration} type="error " />
          </div>

          <div className={errors.players ? 'field error' : 'field'}>
            <label htmlFor="players">Players</label>
            <input
              type="text"
              id="players"
              //add name to make universal handler
              name="players"
              value={data.players}
              onChange={this.handleStringChange}
            />
            <FormInlineMessage content={errors.players} type="error " />
          </div>
        </div>

        <div className="inline field">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={data.featured}
            onChange={this.handleCheckboxChange}
          />
          <label htmlFor="featured">Featured?</label>
        </div>

        <div className={errors.publisher ? 'field error' : 'field'}>
          <label>Publishers</label>
          <select
            name="publisher"
            value={data.publisher}
            onChange={this.handleNumberChange}
          >
            <option value="0">Choose publisher</option>
            {this.props.publishers.map((publisher) => (
              <option value={publisher._id} key={publisher._id}>
                {publisher.name}
              </option>
            ))}
          </select>
          <FormInlineMessage content={errors.publisher} type="error " />
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
