import { Component } from 'react';

class Button extends Component {
  handlerLoadMore = e => {
    this.props.handlerFetch(this.props.searchText, e.target.nodeName);
  };
  render() {
    return (
      <button
        onClick={this.handlerLoadMore}
        className="button-load-more"
        type="button"
      >
        Load more
      </button>
    );
  }
}
export default Button;
