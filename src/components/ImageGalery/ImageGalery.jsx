import { Component } from 'react';
import ImageItem from './ImageItem';
import fetchPixabay from 'services/pixabay';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';

class ImageGalery extends Component {
  state = {
    currentPage: 1,
    items: [],
    error: '',
    totalHits: 0,
    isLoading: false,
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ isLoading: true, currentPage: 1, items: [], error: '' });
      fetchPixabay(this.props.searchText, 1)
        .then(resp => {
          if (!resp.ok) {
            this.setState({ error: 'Sorry, something not good', items: [] });
            throw new Error();
          }

          return resp.json();
        })
        .then(data => {
          if (data.totalHits === 0) {
            this.setState({ error: 'Sorry, nothing', items: [] });
          } else {
            this.setState({
              error: '',
              items: data.hits,
              totalHits: data.totalHits,
            });
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else if (prevState.currentPage < this.state.currentPage) {
      this.setState({ isLoading: true });
      fetchPixabay(this.props.searchText, this.state.currentPage)
        .then(resp => {
          if (!resp.ok) {
            this.setState({ error: 'Sorry, something not good', items: [] });
            throw new Error();
          }
          return resp.json();
        })
        .then(data => {
          this.setState({
            error: '',
            items: [...prevState.items, ...data.hits],
          });
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  handlerLoadMore = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  render() {
    return (
      <>
        {this.state.error && <p className="error">{this.state.error}</p>}
        <ul className="gallery">
          {this.state.items.length > 0
            ? this.state.items.map(item => (
                <ImageItem
                  handlerImageClick={this.props.handlerImageClick}
                  key={item.id}
                  largeImageURL={item.largeImageURL}
                  previewImage={item.webformatURL}
                />
              ))
            : ''}
        </ul>
        {this.state.isLoading && <Loader />}
        {this.state.items.length > 0 &&
          this.state.totalHits > this.state.items.length &&
          !this.state.isLoading && (
            <Button handlerLoadMore={this.handlerLoadMore} />
          )}
      </>
    );
  }
}

export default ImageGalery;

ImageGalery.propTypes = {
  searchText: PropTypes.string.isRequired,
  handlerImageClick: PropTypes.func.isRequired,
};

// import ImageItem from './ImageItem';

// const ImageGalery = ({ items, handlerImageClick }) => {
//   return (
//     <ul className="gallery">
//       {items.map(item => (
//         <ImageItem
//           handlerImageClick={handlerImageClick}
//           key={item.id}
//           largeImageURL={item.largeImageURL}
//           previewImage={item.webformatURL}
//         />
//       ))}
//     </ul>
//   );
// };

// export default ImageGalery;
