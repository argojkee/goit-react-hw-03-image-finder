const Modal = ({ selectedIMG }) => {
  console.log(selectedIMG);
  return (
    <div className="overlay">
      <div className="modal">
        <img className="image-original" src={selectedIMG} alt="" />
      </div>
    </div>
  );
};

export default Modal;
