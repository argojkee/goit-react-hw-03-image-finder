import SearchBar from './SearchBar/SearchBar';
import ImageGalery from './ImageGalery/ImageGalery';
import { Component } from 'react';
import { fetchPixabay } from 'services/pixabay';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import * as basicLightbox from 'basiclightbox';

const STATUS = {
  IDEL: 'idel',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    items: [],
    currentValue: '',
    status: STATUS.IDEL,
    error: '',
    totalHits: 0,
    currentHits: 0,
    selectedIMG: null,
  };

  handlerImageClick = e => {
    e.preventDefault();

    const instance = basicLightbox.create(
      `(
        <div class="modal">
          <img src="${e.target.dataset.original}" alt="Selected image" />
        </div>
      )`
    );
    instance.show();
  };

  handlerFetch = (searchText, currentButton) => {
    if (searchText === this.state.currentValue && currentButton === 'FORM') {
      console.log('Its current fetch');
    } else {
      this.setState({ status: STATUS.PENDING });
      fetchPixabay
        .fetchImages(searchText, currentButton)
        .then(resp => {
          if (!resp.ok) {
            this.setState({
              error: 'Sorry, something wrong. Try again later',
              status: STATUS.REJECTED,
            });
            throw new Error();
          } else {
            return resp.json();
          }
        })
        .then(resp => {
          if (resp.totalHits === 0) {
            this.setState({
              status: STATUS.REJECTED,
              error: "We can't found anything for your request",
            });
            throw new Error();
          }
          return resp;
        })
        .then(data => {
          this.setState({
            totalHits: data.totalHits,
            currentHits:
              currentButton === 'FORM'
                ? data.hits.length
                : this.state.currentHits + data.hits.length,
            status: STATUS.RESOLVED,
            currentValue: searchText,
            items:
              currentButton === 'BUTTON'
                ? [
                    ...this.state.items,
                    ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
                      id,
                      webformatURL,
                      largeImageURL,
                    })),
                  ]
                : [
                    ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
                      id,
                      webformatURL,
                      largeImageURL,
                    })),
                  ],
          });
        })
        .catch(err => console.log(err));
    }
  };
  render() {
    if (this.state.status === STATUS.IDEL) {
      return <SearchBar handlerFetch={this.handlerFetch} />;
    } else if (this.state.status === STATUS.PENDING) {
      return (
        <>
          <SearchBar handlerFetch={this.handlerFetch} />
          <Loader />
        </>
      );
    } else if (this.state.status === STATUS.RESOLVED) {
      if (this.state.currentHits < this.state.totalHits) {
        return (
          <>
            <SearchBar handlerFetch={this.handlerFetch} />
            <ImageGalery
              handlerImageClick={this.handlerImageClick}
              items={this.state.items}
            />
            <Button
              handlerFetch={this.handlerFetch}
              searchText={this.state.currentValue}
            />
          </>
        );
      } else {
        return (
          <>
            <SearchBar handlerFetch={this.handlerFetch} />
            <ImageGalery
              handlerImageClick={this.handlerImageClick}
              items={this.state.items}
            />
          </>
        );
      }
    } else if (this.state.status === STATUS.REJECTED) {
      return (
        <>
          <SearchBar handlerFetch={this.handlerFetch} />
          <p>{this.state.error}</p>
        </>
      );
    }
    // return (
    //   <div
    //     style={{
    //       height: '100vh',
    //       display: 'flex',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       fontSize: 40,
    //       color: '#010101'
    //     }}
    //   >
    //     React homework template
    //   </div>
    //   <></>
    // );
  }
}
