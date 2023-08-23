import PropTypes from 'prop-types';
import { Component } from 'react';
import { Notify } from 'notiflix';

class SearchBar extends Component {
  state = {
    value: '',
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      return Notify.failure('Please, write something');
    }

    this.props.onSubmit(this.state.value, e.target.nodeName);
    this.setState({ value: '' });
  };

  handlerChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    return (
      <header className="searchbar">
        <form onSubmit={this.onSubmit} className="form">
          <button type="submit" className="searchform-button">
            <span className="searchform-button-label">Search</span>
          </button>

          <input
            value={this.state.value}
            onChange={this.handlerChange}
            className="searchform-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// import { Component } from 'react';

// class SearchBar extends Component {
//   state = { value: '' };

//   handlerSubmit = e => {
//     e.preventDefault();
//     this.props.handlerFetch(this.state.value.toLowerCase(), e.target.nodeName);

//     this.setState({ value: '' });
//   };

//   handlerChange = ({ target: { value } }) => {
//     this.setState({ value });
//   };

//   render() {
//     return (
//       <header className="searchbar">
//         <form onSubmit={this.handlerSubmit} className="form">
//           <button type="submit" className="searchform-button">
//             <span className="searchform-button-label">Search</span>
//           </button>

//           <input
//             className="searchform-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.value}
//             onChange={this.handlerChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default SearchBar;
