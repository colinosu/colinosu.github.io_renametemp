import React from 'react';

class SearchBar extends React.Component {

  state = { term: '' };

//callback method called with an event object, take value of input out of that event object
//allows us to actually type in searchbar, which would otherwise be read only
  onInputChange = event => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    // calls callback from parent component
    this.props.onFormSubmit(this.state.term);
  };

  render(){
    return (<div className="search-bar ui segment">
      <form onSubmit={this.onFormSubmit} className="ui form">
        <div className="field">
          <label>Video Search</label>
          <input
            type="text"
            value={this.state.term}
            onChange={this.onInputChange}
          />
        </div>
      </form>
    </div>);
  }
}

export default SearchBar;
