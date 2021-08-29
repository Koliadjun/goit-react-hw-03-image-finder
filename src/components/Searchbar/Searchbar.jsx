import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };
  state = {
    searchInputValue: '',
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchInputValue);
    this.setState({ searchInputValue: '' });
  };
  onChange = e => {
    this.setState({ searchInputValue: e.currentTarget.value.toLowerCase() });
  };
  render() {
    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.onSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              onChange={this.onChange}
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchInputValue}
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;
