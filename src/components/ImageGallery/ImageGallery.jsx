import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
const BASE_URL =
  'https://pixabay.com/api/?key=21859893-eed1f1d786560e2667ad1f26b&image_type=photo&orientation=horizontal';
const STATUS = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};
export class ImageGallery extends Component {
  static propTypes = { searchQuery: PropTypes.string };
  state = {
    images: [],
    page: 1,
    perPage: 12,
    status: STATUS.idle,
    error: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.fetchData()
        .then(data => this.setState({ images: [...data.hits], page: 1 }))
        .catch(error =>
          this.setState({ status: STATUS.rejected, error: error }),
        )
        .finally(() => this.setState({ status: STATUS.resolved }));
    }
    if (
      prevState.page !== this.state.page &&
      this.state.page > 1 &&
      prevProps.searchQuery === this.props.searchQuery
    ) {
      this.fetchData(this.state.page)
        .then(data =>
          this.setState({ images: [...prevState.images, ...data.hits] }),
        )
        .catch(error =>
          this.setState({ status: STATUS.rejected, error: error }),
        )
        .finally(() => this.setState({ status: STATUS.resolved }));
    }
  }

  fetchData = (page = 1) => {
    const { perPage } = this.state;
    const { searchQuery } = this.props;
    this.setState({ status: STATUS.pending });
    return fetch(
      `${BASE_URL}&q=${searchQuery}&per_page=${perPage}&page=${page}`,
    )
      .then(r => {
        if (!r.ok) {
          throw Error(`error request ${searchQuery}`);
        }
      })
      .then(data => data.json());
  };
  loadMoreClickHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { status } = this.state;

    if (status === STATUS.idle) {
      return <></>;
    }
    if (status === STATUS.pending) {
      return <h1>Loading</h1>;
    }
    if (status === STATUS.rejected) {
      return <div>this.state.error();</div>;
    }
    if (status === STATUS.resolved) {
      return (
        <>
          <ul className="ImageGallery">
            {this.state.images.map(image => (
              <ImageGalleryItem key={image.id} src={image.webformatURL} />
            ))}
          </ul>
          <Button onClick={this.loadMoreClickHandler}>Load more</Button>
        </>
      );
    }
  }
}

export default ImageGallery;
