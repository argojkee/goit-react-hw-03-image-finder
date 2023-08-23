import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGalery from './ImageGalery/ImageGalery';
import Modal from './Modal/Modal';
import fetchPixabay from 'services/pixabay';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    searchText: '',
    currentPage: 1,
    totalHits: 0,
    items: [],
    error: '',
    isLoading: false,
    isShowModal: false,
    selectedIMG: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.searchText !== this.state.searchText) {
      this.setState({ currentPage: 1, items: [], error: '', isLoading: true });
      fetchPixabay(this.state.searchText, 1)
        .then(resp => {
          if (!resp.ok) {
            this.setState({
              error: 'Sorry, something not good',
            });
            throw new Error();
          }

          return resp.json();
        })
        .then(data => {
          if (data.totalHits === 0) {
            this.setState({ error: 'Sorry, nothing' });
          } else {
            this.setState({
              error: '',
              items: data.hits,
              totalHits: data.totalHits,
              isLoading: false,
            });
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    } else if (prevState.currentPage < this.state.currentPage) {
      this.setState({ isLoading: true });
      fetchPixabay(this.state.searchText, this.state.currentPage)
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

  handlerCloseModal = () => {
    this.setState({ isShowModal: false });
  };

  handlerImageClick = ({
    target: {
      dataset: { original },
    },
  }) => {
    this.setState({ isShowModal: true, selectedIMG: original });
  };

  handlerLoadMore = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  handlerSubmit = value => {
    this.setState({ searchText: value });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handlerSubmit} />
        {this.state.isShowModal && (
          <Modal
            handlerCloseModal={this.handlerCloseModal}
            selectedIMG={this.state.selectedIMG}
          />
        )}
        {this.state.items.length > 0 && (
          <ImageGalery
            items={this.state.items}
            handlerImageClick={this.handlerImageClick}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.items.length < this.state.totalHits &&
          !this.state.error &&
          !this.state.isLoading && (
            <Button handlerLoadMore={this.handlerLoadMore} />
          )}
        {this.state.error && <p className="error">{this.state.error}</p>}
      </>
    );
  }
}

// import { Component } from 'react';
// import SearchBar from './SearchBar/SearchBar';
// import ImageGalery from './ImageGalery/ImageGalery';
// import Modal from './Modal/Modal';

// export class App extends Component {
//   state = {
//     searchText: '',
//     isShowModal: false,
//     selectedIMG: '',
//   };

//   handlerCloseModal = () => {
//     this.setState({ isShowModal: false });
//   };

//   handlerImageClick = ({
//     target: {
//       dataset: { original },
//     },
//   }) => {
//     this.setState({ isShowModal: true, selectedIMG: original });
//   };

//   handlerSubmit = value => {
//     this.setState({ searchText: value.toLowerCase().trim() });
//   };

//   render() {
//     return (
//       <>
//         <SearchBar onSubmit={this.handlerSubmit} />
//         {this.state.isShowModal && (
//           <Modal
//             handlerCloseModal={this.handlerCloseModal}
//             selectedIMG={this.state.selectedIMG}
//           />
//         )}
//         <ImageGalery
//           searchText={this.state.searchText}
//           handlerImageClick={this.handlerImageClick}
//         />
//       </>
//     );
//   }
// }

// import SearchBar from './SearchBar/SearchBar';
// import ImageGalery from './ImageGalery/ImageGalery';
// import { Component } from 'react';
// import { fetchPixabay } from 'services/pixabay';
// import Button from './Button/Button';
// import Loader from './Loader/Loader';
// import Modal from './Modal/Modal';
// import { Notify } from 'notiflix';

// const STATUS = {
//   IDEL: 'idel',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

// export class App extends Component {
//   state = {
//     items: [],
//     currentValue: '',
//     status: STATUS.IDEL,
//     error: '',
//     totalHits: 0,
//     currentHits: 0,
//     selectedIMG: false,
//     isModal: false,
//   };

//   handlerOverlayClick = ({ target }) => {
//     if (target.classList.contains('overlay')) {
//       this.handlerCloseModal();
//     }
//   };

//   handlerCloseModal = () => {
//     this.setState({ isModal: false });
//   };

//   handlerImageClick = e => {
//     e.preventDefault();
//     this.setState({ isModal: true, selectedIMG: e.target.dataset.original });
//   };

//   handlerFetch = (searchText, currentButton) => {
//     if (searchText === this.state.currentValue && currentButton === 'FORM') {
//       Notify.failure("Sorry, buy it's current request");
//     } else {
//       this.setState({ status: STATUS.PENDING, error: '' });
//       fetchPixabay
//         .fetchImages(searchText, currentButton)
//         .then(resp => {
//           if (!resp.ok) {
//             this.setState({
//               error: 'Sorry, something wrong. Try again later',
//               status: STATUS.REJECTED,
//             });
//             throw new Error();
//           } else {
//             return resp.json();
//           }
//         })
//         .then(resp => {
//           if (resp.totalHits === 0) {
//             this.setState({
//               status: STATUS.REJECTED,
//               error: "We couldn't find anything for your request",
//             });
//             throw new Error();
//           }
//           return resp;
//         })
//         .then(data => {
//           this.setState({
//             totalHits: data.totalHits,
//             currentHits:
//               currentButton === 'FORM'
//                 ? data.hits.length
//                 : this.state.currentHits + data.hits.length,
//             status: STATUS.RESOLVED,
//             error: '',
//             currentValue: searchText,
//             items:
//               currentButton === 'BUTTON'
//                 ? [
//                     ...this.state.items,
//                     ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
//                       id,
//                       webformatURL,
//                       largeImageURL,
//                     })),
//                   ]
//                 : [
//                     ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
//                       id,
//                       webformatURL,
//                       largeImageURL,
//                     })),
//                   ],
//           });
//         })
//         .catch(err => err);
//     }
//   };
//   render() {
//     return (
//       <>
//         <SearchBar onSubmit={this.handlerFetch} />;
//         {this.state.isModal && (
//           <Modal
//             handlerOverlayClick={this.handlerOverlayClick}
//             selectedIMG={this.state.selectedIMG}
//             handlerCloseModal={this.handlerCloseModal}
//           />
//         )}
//         {this.state.status === STATUS.PENDING && <Loader />}
//         {this.state.status === STATUS.RESOLVED && (
//           <ImageGalery
//             handlerImageClick={this.handlerImageClick}
//             items={this.state.items}
//           />
//         )}
//         {this.state.currentHits < this.state.totalHits && !this.state.error && (
//           <Button
//             handlerFetch={this.handlerFetch}
//             searchText={this.state.currentValue}
//           />
//         )}
//         {this.state.status === STATUS.REJECTED && (
//           <p className="error">{this.state.error}</p>
//         )}
//       </>
//     );
//   }
// }
