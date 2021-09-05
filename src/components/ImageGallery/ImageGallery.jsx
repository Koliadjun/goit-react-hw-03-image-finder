import Loader from 'react-loader-spinner';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { toast } from 'react-toastify';

const BASE_URL =
  'https://pixabay.com/api/?key=21859893-eed1f1d786560e2667ad1f26b&image_type=photo&orientation=horizontal';
const STATUS = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};
const options = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
export class ImageGallery extends Component {
  static propTypes = { searchQuery: PropTypes.string };
  state = {
    images: [],
    page: 1,
    perPage: 12,
    status: STATUS.idle,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.fetchData()
        .then(data =>
          this.setState({
            images: [...data.hits],
            page: 1,
            status: STATUS.resolved,
          }),
        )
        .catch(error => {
          this.setState({ status: STATUS.rejected, error });
          toast.error(`${error.message}`, options);
        });
    }
    if (
      prevState.page !== this.state.page &&
      this.state.page > 1 &&
      prevProps.searchQuery === this.props.searchQuery
    ) {
      this.fetchData(this.state.page)
        .then(data =>
          this.setState({
            images: [...prevState.images, ...data.hits],
            status: STATUS.resolved,
          }),
        )
        .then(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => {
          this.setState({ status: STATUS.rejected, error });
          toast.error(`${error.message}`, options);
        });
    }
  }
  fetchData = (page = 1) => {
    const { perPage } = this.state;
    const { searchQuery } = this.props;
    this.setState({ status: STATUS.pending });
    return fetch(
      `${BASE_URL}&q=${searchQuery}&per_page=${perPage}&page=${page}`,
    )
      .then(r => r.json())
      .then(data => {
        if (data.hits.length === 0) {
          throw new Error(`Немає фото за пошуковим запитом "${searchQuery}"`);
        } else {
          return data;
        }
      });
  };

  loadMoreClickHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { status } = this.state;

    if (status === STATUS.idle) {
      return <h2 className={'title'}>Введіть пошуковий запит</h2>;
    }
    if (status === STATUS.pending) {
      return (
        <div className="loaderWrapper">
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        </div>
      );
    }
    if (status === STATUS.rejected) {
      setTimeout(() => {
        this.setState({ status: STATUS.idle });
      }, 5000);
      return <></>;
    }
    if (status === STATUS.resolved) {
      return (
        <>
          <ul className="ImageGallery">
            {this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                largeImg={image.largeImageURL}
                onClick={this.props.onClick}
              />
            ))}
          </ul>
          <div className="buttonWrapper">
            <Button onClick={this.loadMoreClickHandler}>Load more</Button>
          </div>
        </>
      );
    }
  }
}

export default ImageGallery;
