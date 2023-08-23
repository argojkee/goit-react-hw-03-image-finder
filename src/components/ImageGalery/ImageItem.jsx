const ImageItem = ({ largeImageURL, previewImage, handlerImageClick }) => {
  return (
    <li className="gallery-item">
      <img
        onClick={handlerImageClick}
        className="image-galery-item"
        src={previewImage}
        data-original={largeImageURL}
        alt=""
      />
    </li>
  );
};

export default ImageItem;
