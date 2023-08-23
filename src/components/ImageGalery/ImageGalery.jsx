import ImageItem from './ImageItem';

const ImageGalery = ({ items, handlerImageClick }) => {
  return (
    <ul className="gallery">
      {items.map(item => (
        <ImageItem
          handlerImageClick={handlerImageClick}
          key={item.id}
          largeImageURL={item.largeImageURL}
          previewImage={item.webformatURL}
        />
      ))}
    </ul>
  );
};

export default ImageGalery;
